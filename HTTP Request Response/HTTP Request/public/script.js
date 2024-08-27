document.addEventListener('DOMContentLoaded', () => {
    const workerId = 'worker-' + Math.floor(Math.random() * 10000);
    document.getElementById('worker-id').textContent = workerId;
});