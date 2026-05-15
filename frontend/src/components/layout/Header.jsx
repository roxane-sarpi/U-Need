import MobileDrawer from "./MobileDrawer";

function Header() {
  return (
    <header className="sticky top-0 z-50 flex flex-row justify-around">
      <div className="drawer">
        <input id="main-drawer" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <nav className="navbar bg-canvas border-b border-gray-200 px-4">
            <div className="flex-1">
              <label htmlFor="main-drawer" className="btn btn-ghost btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-7 w-7 stroke-ink">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>
            
            <div className="flex-1 flex justify-end">
              <a href="#" className="text-2xl font-bold text-primary">
                <img src="../../public/logo.webp" alt="logo" className="h-15 w-auto"/>
              </a>
            </div>
          </nav>
        </div>

        <MobileDrawer />
      </div>
    </header>
  );
}

export default Header;