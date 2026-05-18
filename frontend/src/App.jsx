import './index.css'
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/Profile/EditProfile';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Notifications from './pages/Notifications';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/Admin/Dashboard/Dashboard';


function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        {/* Layout public */}
        <Route element={<MainLayout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notifications" element={<Notifications />} />
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