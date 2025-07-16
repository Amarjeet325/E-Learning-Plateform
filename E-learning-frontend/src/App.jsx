import React from 'react';
import Navbar from './route/Navbar';
import { BrowserRouter } from 'react-router-dom';
import ComponentsRouter from './route/ClientRoutes';
import { ToastContainer, toast } from "react-toastify";
import { AuthProvider } from './context/context';
import ChatBot from './componenet/ChatBot';


function App() {
  return (<>
  <AuthProvider>
    <div>
      <h1>Welcome to Our E-Learning Platform</h1>
     <BrowserRouter>
      <div className="min-h-screen flex flex-col w-screen">
          <Navbar />
          <ComponentsRouter />
          <ChatBot/>
      </div>
     </BrowserRouter>
   
   


    </div>
    <ToastContainer/>
    </AuthProvider>
    </>
  );
}

export default App;
