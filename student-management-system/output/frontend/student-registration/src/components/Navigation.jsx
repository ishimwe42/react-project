import { useState } from "react";

function Navigation({ currentPage, setCurrentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const pages = [
    { id: "home", label: "Home" },
    { id: "register", label: "Register" },
    { id: "students", label: "Students" },
    { id: "about", label: "About" }
  ];

  function navigateTo(page) {
    setCurrentPage(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <button
          className="brand"
          type="button"
          onClick={() => navigateTo("home")}
          aria-label="Student System home"
        >
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>Student System</span>
        </button>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul id="primary-navigation" className={`nav-links${menuOpen ? " is-open" : ""}`}>
          {pages.map((page) => (
            <li key={page.id}>
              <button
                type="button"
                className={currentPage === page.id ? "active" : ""}
                aria-current={currentPage === page.id ? "page" : undefined}
                onClick={() => navigateTo(page.id)}
              >
                {page.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
