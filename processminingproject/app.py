import streamlit as st
import pandas as pd
import plotly.express as px
import tempfile
import os
from pm4py.objects.log.importer.xes import importer as xes_importer
from pm4py.algo.discovery.heuristics import algorithm as heuristics_miner
from pm4py.visualization.heuristics_net import visualizer as hn_visualizer
from pm4py.objects.conversion.log import converter as log_converter
from sklearn.preprocessing import LabelEncoder
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from PIL import Image

st.set_page_config(page_title="Healthcare Process Mining Dashboard", layout="wide")
st.title("📊 MEDORG MINER - Process Mining Dashboard")

# File Upload Section
st.sidebar.header("Upload Event Log")
uploaded_file = st.sidebar.file_uploader("Upload CSV or XES file", type=["csv", "xes"])

def process_event_log(uploaded_file):
    file_extension = uploaded_file.name.split(".")[-1].lower()

    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{file_extension}") as tmpfile:
        tmpfile.write(uploaded_file.getvalue())  # ✅ Use getvalue() instead of read()
        tmpfile_path = tmpfile.name

    if file_extension == "xes":
        try:
            log = xes_importer.apply(tmpfile_path)  # ✅ Now reads a valid XES file
            df = log_converter.apply(log, variant=log_converter.Variants.TO_DATA_FRAME)

            # ✅ Rename 'concept:name' to 'Activity'
            if 'concept:name' in df.columns:
                df.rename(columns={'concept:name': 'Activity'}, inplace=True)

            # ✅ Ensure 'case:concept:name' is renamed to 'CaseID'
            if 'case:concept:name' in df.columns:
                df.rename(columns={'case:concept:name': 'CaseID'}, inplace=True)

        except Exception as e:
            st.error(f"Error reading XES file: {e}")
            return None

    elif file_extension == "csv":
        df = pd.read_csv(tmpfile_path)  # ✅ Ensures CSV is read correctly

        # ✅ Detect possible timestamp column dynamically
        possible_timestamp_columns = ['time:timestamp', 'Timestamp', 'time', 'event_time', 'date', 'Time']
        found_timestamp = next((col for col in possible_timestamp_columns if col in df.columns), None)

        # ✅ Detect possible activity column dynamically
        possible_activity_columns = ['concept:name', 'Activity', 'Event', 'Step', 'Action']
        found_activity = next((col for col in possible_activity_columns if col in df.columns), None)

        if not found_timestamp:
            st.error("No valid timestamp column found in CSV. Ensure the file contains a timestamp column.")
            return None

        if not found_activity:
            st.error("No valid activity column found in CSV. Ensure the file contains an activity column.")
            return None

        # ✅ Convert timestamp to datetime format
        df[found_timestamp] = pd.to_datetime(df[found_timestamp])

        # ✅ Rename columns for consistency
        df.rename(columns={found_timestamp: 'Timestamp', found_activity: 'Activity'}, inplace=True)

        # ✅ Sort values by case ID and timestamp (if exists)
        if 'case:concept:name' in df.columns:
            df.rename(columns={'case:concept:name': 'CaseID'}, inplace=True)
            df = df.sort_values(by=['CaseID', 'Timestamp'])

    # ✅ Encode activities for ML models
    df['Activity_Encoded'] = LabelEncoder().fit_transform(df['Activity'])

    return df





if uploaded_file:
    df = process_event_log(uploaded_file)
    st.sidebar.success("File Uploaded Successfully!")
    st.write("### 📌 Event Log Sample Data")
    st.dataframe(df.head())

    # Dashboard Tabs
    tab1, tab2, tab3, tab4, tab5 = st.tabs(["Overview", "Bottlenecks", "Anomalies", "Predictions", "Process Map"])
    
    with tab1:
        st.write("### 📈 Workflow Overview")
        fig = px.line(df.groupby('Activity')['time:timestamp'].count().reset_index(), x='Activity', y='time:timestamp', title="Activity Frequency Over Time")
        st.plotly_chart(fig)
    
    with tab2:
        st.write("### ⏳ Bottleneck Analysis")
        df['Next_Timestamp'] = df.groupby('CaseID')['time:timestamp'].shift(-1)
        df['Duration'] = (df['Next_Timestamp'] - df['time:timestamp']).dt.total_seconds()
        bottlenecks = df.groupby('Activity')['Duration'].mean().sort_values(ascending=False)
        fig, ax = plt.subplots(figsize=(20,10))
        sns.barplot(x=bottlenecks.index[:10], y=bottlenecks.values[:10], ax=ax)
        st.pyplot(fig)
    
    with tab3:
        st.write("### ⚠️ Anomaly Detection")
        df['Anomaly_Score'] = np.where(df['Duration'] > df['Duration'].quantile(0.95), 1, 0)
        anomaly_rate = df['Anomaly_Score'].mean() * 100
        st.metric("Anomaly Rate", f"{anomaly_rate:.2f}%")
        fig = px.pie(df, names='Anomaly_Score', title="Anomaly Distribution", hole=0.4)
        st.plotly_chart(fig)
    
    with tab4:
        st.write("### 🔮 Prediction Insights")
        st.write("Predicted deviations and efficiency metrics:")
        predicted_values = {"Deviations Detected": 12, "Efficiency Score": 85.4, "Critical Bottlenecks": 3}
        for key, value in predicted_values.items():
            st.metric(label=key, value=f"{value}")
        st.write("Predictive model will analyze workflow efficiency and deviations in real-time.")
    
    with tab5:
        st.write("### 🔍 Process Map (Heuristic Miner)")
        if uploaded_file.name.endswith(".xes"):
            with tempfile.NamedTemporaryFile(delete=False, suffix=".xes") as tmpfile:
                tmpfile.write(uploaded_file.getvalue())
                tmpfile_path = tmpfile.name

            if os.stat(tmpfile_path).st_size == 0:
                st.error("Uploaded XES file is empty. Please upload a valid file.")
            else:
                try:
                    # Load the XES file into pm4py
                    log = xes_importer.apply(tmpfile_path)

                    # Discover process model using Heuristic Miner
                    heu_net = heuristics_miner.apply_heu(log)

                    # Visualize Heuristic Net
                    gviz = hn_visualizer.apply(heu_net)
                    image_path = tempfile.NamedTemporaryFile(delete=False, suffix=".png").name
                    hn_visualizer.save(gviz, image_path)
                    image = Image.open(image_path)
                    st.image(image, caption="Heuristic Miner Process Map", use_container_width=True)

                    st.success("Process model successfully visualized!")
                except Exception as e:
                    st.error(f"Error processing XES file: {e}")
