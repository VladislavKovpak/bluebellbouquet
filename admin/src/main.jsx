import React from 'react';
import ReactDOM from 'react-dom/client'; // Замість 'react-dom'
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; // Використовується Router
import './index.css';

// Створюємо корінь за допомогою createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендеримо додаток
root.render(
  <Router>
    <App />
  </Router>
);
