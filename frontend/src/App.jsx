import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/Profile/EditProfile';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Notifications from './pages/Notifications';
import About from './pages/About';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/a-propos" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}



export default App;