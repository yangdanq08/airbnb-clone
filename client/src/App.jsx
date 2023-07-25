import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import {Outlet} from "react-router-dom";
import IndexText from './pages/IndexText';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './pages/UserContext';
import AccountPage from './pages/ProfilePage';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/placesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';



axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {

  return (
   <UserContextProvider>
    <Routes>
      <Route path="/" element={<IndexPage />}>
         <Route index element={<IndexText />} />
         <Route path="/login" element={<LoginPage />} /> 
         <Route path="/register" element={<RegisterPage />} /> 
         <Route path="/account" element={<ProfilePage/>} />
         <Route path="/account/places" element={<PlacesPage/>} />
         <Route path="/account/places/new" element={<PlacesFormPage/>} />
         <Route path="/account/places/:id" element={<PlacesFormPage/>} />
         <Route path="/place/:id" element={<PlacePage/>} />   
         <Route path="/account/bookings" element={<BookingsPage />} />
         <Route path="/account/bookings/:id" element={<BookingPage />} />
      </Route>  
    </Routes>
   </UserContextProvider>

  )
}

export default App
