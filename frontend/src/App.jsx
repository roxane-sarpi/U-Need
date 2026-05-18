import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import './index.css'
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/Profile/EditProfile';
import Login from './pages/Auth/Login';
import Notifications from './pages/Notifications';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}



export default App;