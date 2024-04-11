import {Routes, Route} from 'react-router-dom'
import SignUpForm from './_auth/forms/SignUpForm'
import SignInForm from './_auth/forms/SignInForm'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { AllUsers, CreatePost, EditPost, Explore, Home, LikedPost, 
PostDetails, Profile, Saved, UpdateProfile }  from './_root/pages'
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
            <Route path='/explore' element={<Explore />} />
            <Route path='/saved' element={<Saved />} />
            <Route path='/all-users' element={<AllUsers />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/update-post/:UserID' element={<EditPost />} />
            <Route path='/posts/:PostID' element={<PostDetails />} />
            <Route path='/profile/:UserID/*' element={<Profile />} />
            <Route path='/update-profile/:UserID' element={<UpdateProfile />} />
            <Route path='/LikedPost/:UserID' element={<LikedPost />} />
          </Route>
        </Routes>
        <Toaster />
    </main>
  )
}

export default App