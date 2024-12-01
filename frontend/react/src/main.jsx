import React from 'react'
import ReactDOM from 'react-dom/client'
import Customer from './Customer.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { createStandaloneToast } from '@chakra-ui/react'
import {Text } from '@chakra-ui/react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import Login from "./components/login/Login.jsx";
import AuthProvider from "./components/context/AuthContext.jsx";
import ProtectedRoute from "./components/shared/ProtectedRoute.jsx";
import Signup from "./components/signup/Signup.jsx";
import Home from "./Home.jsx";

const { ToastContainer } = createStandaloneToast()

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
        path: "/signup",
        element: <Signup/>
    },
    {
        path: "dashboard",
        element: <ProtectedRoute><Home/></ProtectedRoute>
    },
    {
        path: "dashboard/customers",
        element: <ProtectedRoute> <Customer/> </ProtectedRoute>
    }
])

//getting the 'root' from the index.html
//main.jsx AKA index.jsx
ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
      <React.StrictMode>
          {/*wrap application with Chakra component so we have access to the components chakra offers*/}
          <ChakraProvider>
              <AuthProvider>
                <RouterProvider router={router}/>
              </AuthProvider>
              <ToastContainer/>
          </ChakraProvider>
      </React.StrictMode>,
    )
