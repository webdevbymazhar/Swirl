import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContext from './context/auth-context.jsx'
import {Toaster} from "react-hot-toast"
import PostContext from './context/post-context.jsx'


createRoot(document.getElementById('root')).render(
  <AuthContext>
    <PostContext>
    <Toaster position='top-right'/>
    <App />
    </PostContext>
    
  </AuthContext>
)
