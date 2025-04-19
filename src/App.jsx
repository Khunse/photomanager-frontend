import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { Route, Routes } from 'react-router'
import AuthLayout from './layout/AuthLayout'
import NotFound from './NotFound'
import RootLayout from './layout/RootLayout'
import HomePage from './HomePage'

function App() {


  return (
    <>
    <Routes>
    
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Route>
      
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
      
    </>
  )
}

export default App
