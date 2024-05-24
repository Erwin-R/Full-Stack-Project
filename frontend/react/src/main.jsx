import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//getting the 'root' from the index.html
ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
