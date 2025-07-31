import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Импорт корневого компонента
import './index.css'; // Глобальные стили, включая Tailwind

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
