import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import './index.css'
import HomePage from './components/Pages/HomePage'
import PageNotFound from './components/Pages/PageNotFound'
import SignupForm from './components/Forms/SignupForm'
import LoginForm from './components/Forms/LoginForm'
import App from './components/App/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index element={<HomePage/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/signup' element={<SignupForm/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)