import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import BasicLayout from './layouts/BasicLayout';
import HomePage from './pages/HomePage';


const router = createBrowserRouter([
  {
    path: "/",
    Component: BasicLayout,
    children: [
      {
        index: true,
        element: <div>
          <HomePage />
        </div>
      }
    ]
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />

  </StrictMode>
)
