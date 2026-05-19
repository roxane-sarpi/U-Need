import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/Profile/EditProfile';
import Login from './pages/Auth/Login';
import CreateAds from './pages/CreateAds';
import Register from './pages/Auth/Register';
import Notifications from './pages/Notifications';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import About from './pages/About';
import AdDetail from './pages/AdDetail';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* Layout public */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/a-propos" element={<About />} />

          {/* Layout privé - à implémenter plus tard avec une logique d'authentification */}
          <Route path="/create-ads" element={<CreateAds />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/details" element={<AdDetail />} />

        </Route>


        {/* Layout admin */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
        </Route>


      </Routes>

    </BrowserRouter>
  );
}



export default App;