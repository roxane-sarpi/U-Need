import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/Profile/EditProfile';
import Login from './pages/Auth/Login';
import CreateAds from './pages/CreateAds';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-ads" element={<CreateAds />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;