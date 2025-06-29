import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import Router from './assets/Routes/Router.jsx';
import { QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient()



createRoot(document.getElementById('root')).render(
  <StrictMode>
     {/* tanstack Query */}
          <QueryClientProvider client={queryClient} >

           <RouterProvider router={Router} />
          </QueryClientProvider>

               {/* react hot toast */}
      <Toaster></Toaster>
  </StrictMode>,
)
