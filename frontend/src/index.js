import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
    // <App /> 만 사용해도 되지만, 개발 중이라면 StrictMode 유지 추천!
);