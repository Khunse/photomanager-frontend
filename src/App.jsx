import { Route, Routes } from "react-router"
import {AuthLayout,LoginForm,SignupForm} from "components/layout/Auth";
import {RootLayout,NotFound} from "components/layout/Root";
import HomePage from "pages/HomePage";
import ProtectedRoute from "./common/ProtectedRoute";
import OAuthCallback from "./components/layout/Auth/OAuthCallback";


function App() {

  return (
    <>
    <Routes>
    
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/auth/callback" element={<OAuthCallback />} />
      </Route>
      
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/inbox" element={<h1>Inbox</h1>} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
      
    </>
  )
}

export default App
