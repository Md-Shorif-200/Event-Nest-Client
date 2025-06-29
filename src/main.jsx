import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Router from './Routes/Router';
import AuthProvider from './Context/AuthProvider';

const queryClient = new QueryClient()



createRoot(document.getElementById('root')).render(
  <StrictMode>
        <AuthProvider>
               {/* tanstack Query */}
          <QueryClientProvider client={queryClient} >

           <RouterProvider router={Router} />
          </QueryClientProvider>
        </AuthProvider>

               {/* react hot toast */}
      <Toaster></Toaster>
  </StrictMode>,
)
