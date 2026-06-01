// import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import Home from './pages/Home';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/Profile/EditProfile';
import Login from './pages/Auth/Login';
import CreateAds from './pages/CreateAds';
import Register from './pages/Auth/Register';
import Notifications from './pages/Notifications';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import About from './pages/About';
import ManageUsers from './pages/Admin/ManageUsers';
import MessagerieScreen from './pages/Messaging/Messaging';
import AdDetail from './pages/AdDetail';
import Catalog from './pages/Catalog';
import FAQ from './pages/FAQ';
import ManageAds from './pages/Admin/ManageAds';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>

      <Routes>
        {/* Layout public */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/catalogue" element={<Catalog />} />
          <Route path="/details" element={<AdDetail />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Layout privé - à implémenter plus tard avec une logique d'authentification */}
          <Route path="/create-ads" element={<CreateAds />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messagerie" element={<MessagerieScreen />} />
       

        </Route>


        {/* Layout admin */}
        {/* handle est utile pour attacher des métadonnées à une route sans les mettre dans le composant lui-même. */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />}/>
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/ads" element={<ManageAds />} />
        </Route>


      </Routes>

    </BrowserRouter>
    </AuthProvider>
  );
}



export default App;