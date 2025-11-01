import { Outlet, Link, useLocation } from 'react-router-dom';
import './Layout.scss';

const Layout = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <h1>💰 Investment Dashboard</h1>
            </Link>
            <nav className="nav">
              <Link
                to="/"
                className={isActive('/') ? 'nav-link active' : 'nav-link'}
              >
                Dashboard
              </Link>
              <Link
                to="/portfolios"
                className={isActive('/portfolios') ? 'nav-link active' : 'nav-link'}
              >
                Portfolios
              </Link>
              <Link
                to="/funds"
                className={isActive('/funds') ? 'nav-link active' : 'nav-link'}
              >
                Funds
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Investment Dashboard - Practice Project</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

