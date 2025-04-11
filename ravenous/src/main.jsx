import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import HomePage from './components/Pages/HomePage'
import PageNotFound from './components/Pages/PageNotFound'
import SignupForm from './components/Forms/SignupForm'
import LoginForm from './components/Forms/LoginForm'
import Account from './components/Account/Account'
import App from './components/App/App'
import store from './store/store'
import ProtectedRoute from './util/ProtectedRoute'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route index element={<HomePage/>}/>
            <Route path='/login' element={<LoginForm/>}/>
            <Route path='/signup' element={<SignupForm/>}/>
            <Route path='/account' element={
              <ProtectedRoute>
                <Account/>
              </ProtectedRoute>
            }/>
            <Route path='*' element={<PageNotFound/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)