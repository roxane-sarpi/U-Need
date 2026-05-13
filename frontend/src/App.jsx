import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './pages/Profile/Profile'
import EditProfile from './pages/Profile/EditProfile'

/*Pour importer un style de notre fichier index.css :
<button className="btn" style={{ backgroundColor: "var(--color-accent)" }}>Buy Now</button>
*/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App