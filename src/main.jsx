import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import router from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
<RouterProvider router={router}>
<Toaster
  position="top-center"
  reverseOrder={false}
>
    <App/>
    </Toaster>
    </RouterProvider>

  
  
  </StrictMode>,
)
