import { useState } from 'react';
import { Music, Home, Book, Headphones, User, LogOut } from 'lucide-react';

export default function LyricLingoAuth() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'signin', 'signup', 'homepage'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Sign up with:', { email: formData.email, password: formData.password });
    setCurrentView('homepage');
  };

  const handleSignIn = () => {
    console.log('Sign in with:', { email: formData.email, password: formData.password });
    setCurrentView('homepage');
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked');
    setCurrentView('homepage');
  };

  const handleLogout = () => {
    setFormData({ email: '', password: '', confirmPassword: '' });
    setCurrentView('landing');
  };

  // Use the raw GitHub URL for direct image access
  const lyricIconUrl = "https://raw.githubusercontent.com/Sammypef/software-engineer-group/image/gif-host/lyricicon.png";

  const styles = {
    container: {
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(1rem, 5vw, 3rem)',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e1b4b 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      overflowX: 'hidden',
      boxSizing: 'border-box'
    },
    card: {
      width: 'min(95vw, 600px)',
      minWidth: 'min(320px, 90vw)',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: 'clamp(16px, 4vw, 24px)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      padding: 'clamp(2rem, 8vw, 4rem) clamp(1.5rem, 6vw, 3rem)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      margin: 'clamp(0.5rem, 3vw, 2rem)',
      boxSizing: 'border-box'
    },
    logoContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 'clamp(16px, 4vw, 24px)'
    },
    logo: {
      background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
      padding: 'clamp(16px, 4vw, 20px)',
      borderRadius: 'clamp(12px, 3vw, 16px)',
      boxShadow: '0 10px 30px rgba(167, 139, 250, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      width: 'clamp(80px, 20vw, 120px)',
      height: 'clamp(80px, 20vw, 120px)',
      overflow: 'hidden'
    },
    logoImage: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      borderRadius: 'clamp(8px, 2vw, 12px)'
    },
    title: {
      fontSize: 'clamp(28px, 7vw, 42px)',
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: 'clamp(4px, 2vw, 8px)',
      letterSpacing: '-0.5px',
      lineHeight: '1.2'
    },
    subtitle: {
      fontSize: 'clamp(13px, 3.5vw, 18px)',
      color: '#d8b4fe',
      textAlign: 'center',
      marginBottom: 'clamp(24px, 6vw, 32px)',
      lineHeight: '1.4'
    },
    button: {
      width: '100%',
      padding: 'clamp(14px, 4vw, 18px)',
      fontSize: 'clamp(14px, 3.5vw, 20px)',
      fontWeight: '600',
      borderRadius: 'clamp(10px, 2vw, 12px)',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginBottom: 'clamp(10px, 3vw, 14px)',
      boxSizing: 'border-box'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)'
    },
    secondaryButton: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      border: '2px solid rgba(255, 255, 255, 0.3)'
    },
    googleButton: {
      background: 'white',
      color: '#374151',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'clamp(8px, 2vw, 12px)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      margin: 'clamp(16px, 4vw, 24px) 0',
      color: '#d8b4fe'
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      background: 'rgba(255, 255, 255, 0.2)'
    },
    dividerText: {
      padding: '0 clamp(12px, 3vw, 16px)',
      fontSize: 'clamp(11px, 2.5vw, 14px)',
      whiteSpace: 'nowrap'
    },
    inputGroup: {
      marginBottom: 'clamp(16px, 4vw, 20px)'
    },
    label: {
      display: 'block',
      fontSize: 'clamp(11px, 2.5vw, 14px)',
      fontWeight: '600',
      color: 'white',
      marginBottom: 'clamp(6px, 2vw, 8px)'
    },
    input: {
      width: '100%',
      padding: 'clamp(14px, 4vw, 18px)',
      fontSize: 'clamp(14px, 3.5vw, 18px)',
      borderRadius: 'clamp(10px, 2vw, 12px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      outline: 'none',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box'
    },
    backButton: {
      width: '100%',
      padding: 'clamp(10px, 3vw, 12px)',
      fontSize: 'clamp(13px, 3vw, 16px)',
      fontWeight: '500',
      borderRadius: 'clamp(10px, 2vw, 12px)',
      border: 'none',
      background: 'transparent',
      color: '#d8b4fe',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginTop: 'clamp(12px, 3vw, 16px)',
      boxSizing: 'border-box'
    },
    pageTitle: {
      fontSize: 'clamp(22px, 5vw, 32px)',
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: 'clamp(6px, 2vw, 8px)',
      lineHeight: '1.2'
    },
    pageSubtitle: {
      fontSize: 'clamp(13px, 3vw, 16px)',
      color: '#d8b4fe',
      textAlign: 'center',
      marginBottom: 'clamp(24px, 6vw, 32px)',
      lineHeight: '1.4'
    },
    // Homepage styles
    homepageContainer: {
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e1b4b 100%)',
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
    }
  };

  // Enhanced responsive styles
  const responsiveStyles = `
    /* Ensure no horizontal scroll and proper scaling */
    html, body {
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      width: 100%;
    }
    
    /* Mobile-first responsive adjustments */
    @media (max-width: 480px) {
      .nav-brand span {
        font-size: 18px;
      }
      .nav-button span {
        display: none;
      }
      .nav-button {
        padding: 10px;
      }
    }
    
    @media (max-width: 768px) {
      .navbar {
        justify-content: center;
        gap: 12px;
      }
      .nav-menu {
        justify-content: center;
      }
    }
    
    /* Very small screens */
    @media (max-width: 320px) {
      .card {
        min-width: 280px;
        margin: 0.5rem;
        padding: 1.5rem 1rem;
      }
      .nav-brand {
        font-size: 16px;
      }
    }
    
    /* Large desktop screens */
    @media (min-width: 1440px) {
      .navbar {
        padding: 24px 10%;
      }
      .main-content {
        padding: 5rem 10%;
      }
    }
    
    /* Extra large screens */
    @media (min-width: 1920px) {
      .navbar {
        padding: 28px 12%;
      }
      .main-content {
        padding: 6rem 12%;
      }
      .wip-card {
        max-width: 1000px;
      }
    }
  `;

  // Render different views
  if (currentView === 'landing') {
    return (
      <>
        <style>{responsiveStyles}</style>
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.logoContainer}>
              <div 
                style={styles.logo}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onClick={() => setCurrentView('landing')} // Optional: make it clickable to refresh landing page
              >
                <img 
                  src={lyricIconUrl} 
                  alt="LyricLingo Logo" 
                  style={styles.logoImage}
                  onError={(e) => {
                    // Fallback in case image fails to load
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<Music size={48} color="white" strokeWidth={2.5} />';
                  }}
                />
              </div>
            </div>
            
            <h1 style={styles.title}>LyricLingo</h1>
            <p style={styles.subtitle}>Learn languages through music</p>

            <button
              style={{...styles.button, ...styles.primaryButton}}
              onClick={() => setCurrentView('signup')}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.4)';
              }}
            >
              Sign Up
            </button>

            <button
              style={{...styles.button, ...styles.secondaryButton}}
              onClick={() => setCurrentView('signin')}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Sign In
            </button>

            <div style={styles.divider}>
              <div style={styles.dividerLine}></div>
              <span style={styles.dividerText}>or continue with</span>
              <div style={styles.dividerLine}></div>
            </div>

            <button
              style={{...styles.button, ...styles.googleButton}}
              onClick={handleGoogleSignIn}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#f9fafb';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <svg width={clampValue(20, 24)} height={clampValue(20, 24)} viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
          </div>
        </div>
      </>
    );
  }

  // ... rest of your component code for signup, signin, and homepage views
  // (The remaining code stays the same as in your previous implementation)

  if (currentView === 'signup') {
    return (
      <>
        <style>{responsiveStyles}</style>
        <div style={styles.container}>
          <div style={styles.card}>
            <h2 style={styles.pageTitle}>Create Account</h2>
            <p style={styles.pageSubtitle}>Join LyricLingo today</p>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="you@example.com"
                onFocus={(e) => e.currentTarget.style.border = '2px solid #a78bfa'}
                onBlur={(e) => e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.3)'}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="••••••••"
                onFocus={(e) => e.currentTarget.style.border = '2px solid #a78bfa'}
                onBlur={(e) => e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.3)'}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="••••••••"
                onFocus={(e) => e.currentTarget.style.border = '2px solid #a78bfa'}
                onBlur={(e) => e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.3)'}
              />
            </div>

            <button
              style={{...styles.button, ...styles.primaryButton, marginTop: 'clamp(16px, 4vw, 24px)'}}
              onClick={handleSignUp}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.4)';
              }}
            >
              Sign Up
            </button>

            <button
              style={styles.backButton}
              onClick={() => setCurrentView('landing')}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              ← Back
            </button>
          </div>
        </div>
      </>
    );
  }

  if (currentView === 'signin') {
    return (
      <>
        <style>{responsiveStyles}</style>
        <div style={styles.container}>
          <div style={styles.card}>
            <h2 style={styles.pageTitle}>Welcome Back</h2>
            <p style={styles.pageSubtitle}>Sign in to continue learning</p>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="you@example.com"
                onFocus={(e) => e.currentTarget.style.border = '2px solid #a78bfa'}
                onBlur={(e) => e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.3)'}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="••••••••"
                onFocus={(e) => e.currentTarget.style.border = '2px solid #a78bfa'}
                onBlur={(e) => e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.3)'}
              />
            </div>

            <button
              style={{...styles.button, ...styles.primaryButton, marginTop: 'clamp(16px, 4vw, 24px)'}}
              onClick={handleSignIn}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.4)';
              }}
            >
              Sign In
            </button>

            <button
              style={styles.backButton}
              onClick={() => setCurrentView('landing')}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              ← Back
            </button>
          </div>
        </div>
      </>
    );
  }

  if (currentView === 'homepage') {
    return (
      <>
        <style>{responsiveStyles}</style>
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
              <button 
                style={styles.navButton}
                className="nav-button"
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                <Home size={clampValue(16, 18)} />
                <span>Home</span>
              </button>
              <button 
                style={styles.navButton}
                className="nav-button"
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                <Book size={clampValue(16, 18)} />
                <span>Lessons</span>
              </button>
              <button 
                style={styles.navButton}
                className="nav-button"
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                <Headphones size={clampValue(16, 18)} />
                <span>Music</span>
              </button>
              <button 
                style={styles.navButton}
                className="nav-button"
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                <User size={clampValue(16, 18)} />
                <span>Profile</span>
              </button>
              <button 
                style={styles.navButton}
                className="nav-button"
                onClick={handleLogout}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                <LogOut size={clampValue(16, 18)} />
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
            </div>
          </main>
        </div>
      </>
    );
  }
}

// Helper function for dynamic icon sizing
function clampValue(min, max) {
  return window.innerWidth < 768 ? min : max;
}