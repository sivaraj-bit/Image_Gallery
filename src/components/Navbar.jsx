function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <a href="/" className="navbar-logo">
           <span className="logo-icon">🖼️</span>
          <span>Image Gallery</span>
        </a>

        <div className="navbar-links">
          <a href="#gallery">Gallery</a>
        </div>

        <div className="navbar-badge">
          <span className="status-dot"></span>
          React Project
        </div>

      </div>
    </nav>
  );
}

export default Navbar;