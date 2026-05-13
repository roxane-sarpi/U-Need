import MobileDrawer from "./MobileDrawer";

function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="drawer">
        <input id="main-drawer" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <nav className="navbar bg-canvas border-b border-gray-200 px-4">
            <div className="flex-none">
              <label htmlFor="main-drawer" className="btn btn-ghost btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-ink">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>
            
            <div className="flex-1 justify-center pr-10"> {/* pr-10 pour compenser le bouton burger et centrer le logo */}
              <a href="#" className="text-2xl font-bold text-primary">
                <img src="../../public/logo.webp" alt="logo" className="h-20 w-auto"/>
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