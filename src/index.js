import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import {AuthProvider} from './provider/AuthProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Router>
   <AuthProvider>

    
    <App />
    

    </AuthProvider>
    </Router>
  </React.StrictMode>
);

