import {Routes, Route} from 'react-router-dom'
import SignUpForm from './_auth/forms/SignUpForm'
import SignInForm from './_auth/forms/SignInForm'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Home }  from './_root/pages'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"


const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>
            {/* Public Routes */}
            <Route element={<AuthLayout />} >
               <Route path='/sign-in' element={<SignInForm />} />
               <Route path='/sign-up' element={<SignUpForm />} />
            </Route>

            {/* Private Routes only if User is signed in */}
          <Route element={<RootLayout />} >
            <Route index element={<Home />} />
          </Route>
        </Routes>
        <Toaster />
    </main>
  )
}

export default App