import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../api-helpers/api-helpers';
import {useDispatch} from 'react-redux';
import { userActions } from '../../store';
import { useNavigate } from 'react-router-dom';
const Auth = () => {
const navigate=useNavigate();
  const dispatch = useDispatch();
const onResReceived=(data)=>{console.log(data);
  console.log("Received Data:", data); 
    console.log("Received Data id:", data.user._id); 
  localStorage.setItem("userId",data.user._id);
  dispatch(userActions.login());
  navigate("/");
  
};
  const getData=(data)=>{
    console.log("Auth",data);
    sendUserAuthRequest(data.inputs,data.signup).then(onResReceived).catch(err=>console.log(err));

  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  )
}

export default Auth;
