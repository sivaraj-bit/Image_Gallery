function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-icon">🖼️</span>
            <span>Image Gallery</span>
          </div>

          <p>
            Explore, organize and manage your favorite images
            with a simple React gallery.
          </p>
        </div>

        <div className="footer-links">
          <a href="#gallery">Gallery</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Image Gallery. All rights reserved.</p>
        <p>Built with React ⚛️</p>
      </div>
    </footer>
  );
}

export default Footer;