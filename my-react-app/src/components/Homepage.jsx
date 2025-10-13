import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Home, Book, Headphones, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const lyricIconUrl = "https://raw.githubusercontent.com/Sammypef/software-engineer-group/peen-atempt/lyricicon.png";

  const styles = {
    homepageContainer: {
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #6f0097ff 0%, #ba378dff 50%, #b4ae63ff 100%)',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
      boxSizing: 'border-box'
    },
    navbar: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      padding: 'clamp(12px, 3vw, 20px) clamp(4%, 5vw, 8%)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      boxSizing: 'border-box',
      flexWrap: 'wrap',
      gap: 'clamp(8px, 2vw, 16px)'
    },
    navBrand: {
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(8px, 2vw, 12px)',
      color: 'white',
      fontSize: 'clamp(16px, 4vw, 24px)',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      flexShrink: 0
    },
    navMenu: {
      display: 'flex',
      gap: 'clamp(6px, 1.5vw, 12px)',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      flex: 1
    },
    navButton: {
      padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px)',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: 'clamp(6px, 1.5vw, 8px)',
      color: 'white',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(6px, 1.5vw, 8px)',
      fontSize: 'clamp(12px, 2.5vw, 16px)',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap',
      flexShrink: 0,
      boxSizing: 'border-box'
    },
    mainContent: {
      flex: 1,
      padding: 'clamp(2rem, 8vw, 4rem) clamp(4%, 5vw, 8%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      boxSizing: 'border-box',
      minHeight: 'calc(100vh - clamp(80px, 15vw, 120px))'
    },
    wipCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: 'clamp(16px, 4vw, 24px)',
      padding: 'clamp(2rem, 8vw, 4rem) clamp(1.5rem, 6vw, 3rem)',
      textAlign: 'center',
      width: 'min(95vw, 800px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxSizing: 'border-box',
      margin: 'clamp(1rem, 4vw, 2rem)'
    },
    wipTitle: {
      fontSize: 'clamp(24px, 6vw, 48px)',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 'clamp(12px, 3vw, 24px)',
      lineHeight: '1.2'
    },
    wipText: {
      fontSize: 'clamp(14px, 3vw, 20px)',
      color: '#d8b4fe',
      marginBottom: 'clamp(6px, 2vw, 12px)',
      lineHeight: '1.5'
    },
    userWelcome: {
      color: '#fbcdffff',
      fontSize: 'clamp(14px, 3vw, 16px)',
      marginBottom: '8px'
    }
  };

  return (
    <div style={styles.homepageContainer}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.navBrand}>
          <img 
            src={lyricIconUrl} 
            alt="LyricLingo" 
            style={{ width: '28px', height: '28px', borderRadius: '6px' }}
          />
          <span>LyricLingo</span>
        </div>
        <div style={styles.navMenu} className="nav-menu">
          {currentUser && (
            <div style={styles.userWelcome}>
              Welcome, {currentUser.name}!
            </div>
          )}
          <button 
            style={styles.navButton}
            className="nav-button"
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            <Home size={18} />
            <span>Home</span>
          </button>
          <button 
            style={styles.navButton}
            className="nav-button"
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            <Book size={18} />
            <span>Lessons</span>
          </button>
          <button 
            style={styles.navButton}
            className="nav-button"
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            <Headphones size={18} />
            <span>Music</span>
          </button>
          <button 
          style={styles.navButton}
          className="nav-button"
          onClick={() => navigate('/progression')} // 👈 this line makes it work
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
>
          <User size={18} />
          <span>Profile</span>
          </button>
          <button 
            style={styles.navButton}
            className="nav-button"
            onClick={logout}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <div style={styles.wipCard} className="wip-card">
          <h1 style={styles.wipTitle}>🚧 Work in Progress 🚧</h1>
          <p style={styles.wipText}>Homepage is under construction</p>
          <p style={styles.wipText}>More features coming soon!</p>
          {currentUser && (
            <p style={styles.wipText}>
              Logged in as: <strong>{currentUser.email}</strong>
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Homepage;