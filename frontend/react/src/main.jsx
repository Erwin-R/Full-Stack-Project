import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { createStandaloneToast } from '@chakra-ui/react'
import './index.css'

const { ToastContainer } = createStandaloneToast()
//getting the 'root' from the index.html
//main.jsx AKA index.jsx
ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
      <React.StrictMode>
          {/*wrap application with Chakra component so we have access to the components chakra offers*/}
          <ChakraProvider>
              <App />
              <ToastContainer/>
          </ChakraProvider>
      </React.StrictMode>,
    )
