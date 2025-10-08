import { useState } from 'react';
import { Music, Home, Book, Headphones, User, LogOut } from 'lucide-react';

export default function LyricLingoAuth() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'signin', 'signup', 'homepage'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Reset any global styles that might interfere
  const globalReset = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }
    #root {
      margin: 0;
      padding: 0;
      width: 100%;
    }
  `;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = () => {
    // Validation (Frontend only for now)
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // TODO: Backend Integration
    // POST request to /api/auth/signup
    // Body: { email: formData.email, password: formData.password }
    // Expected response: { success: true, token: "jwt_token", user: {...} }
    // On success: Store token in state/context and redirect to homepage
    // On error: Show error message to user
    
    console.log('Sign up with:', { email: formData.email, password: formData.password });
    
    // Bypass for UI purposes - go directly to homepage
    setCurrentView('homepage');
  };

  const handleSignIn = () => {
    // TODO: Backend Integration
    // POST request to /api/auth/signin
    // Body: { email: formData.email, password: formData.password }
    // Expected response: { success: true, token: "jwt_token", user: {...} }
    // Store JWT token in state/context/localStorage
    // Redirect to homepage on success
    // Handle errors (wrong password, user not found, etc.)
    
    console.log('Sign in with:', { email: formData.email, password: formData.password });
    
    // Bypass for UI purposes - go directly to homepage
    setCurrentView('homepage');
  };

  const handleGoogleSignIn = () => {
    // TODO: Backend Integration
    // Initialize Google OAuth flow:
    // 1. Redirect to Google consent screen with your client ID
    // 2. User authorizes the app
    // 3. Google redirects back with authorization code
    // 4. Exchange code for access token
    // 5. Get user info from Google
    // 6. Create/login user in your backend
    // 7. Return JWT token
    // 8. Store token and redirect to homepage
    
    // Libraries to use:
    // - @react-oauth/google (frontend)
    // - google-auth-library (backend)
    // OR use Firebase Authentication
    
    console.log('Google sign in clicked');
    
    // Bypass for UI purposes - go directly to homepage
    setCurrentView('homepage');
  };

  const handleLogout = () => {
    // TODO: Backend Integration
    // Clear JWT token from state/context/localStorage
    // Optional: Call backend to invalidate token
    // Redirect to landing page
    
    setFormData({ email: '', password: '', confirmPassword: '' });
    setCurrentView('landing');
  };

  const styles = {
    container: {
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e1b4b 100%)',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  boxSizing: 'border-box',
},

card: {
  width: '100%',
  maxWidth: '100%',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  padding: '3rem 2.5rem',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxSizing: 'border-box',
  transition: 'all 0.3s ease',
},
    logoContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '24px'
    },
    logo: {
      background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
      padding: '20px',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(167, 139, 250, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'transform 0.3s ease'
    },
    title: {
      fontSize: 'clamp(32px, 8vw, 42px)',
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: '8px',
      letterSpacing: '-0.5px'
    },
    subtitle: {
      fontSize: 'clamp(14px, 4vw, 18px)',
      color: '#d8b4fe',
      textAlign: 'center',
      marginBottom: '32px'
    },
    button: {
      width: '100%',
      padding: '18px',
      fontSize: 'clamp(16px, 4vw, 20px)',
      fontWeight: '600',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginBottom: '14px',
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
      gap: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      margin: '24px 0',
      color: '#d8b4fe'
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      background: 'rgba(255, 255, 255, 0.2)'
    },
    dividerText: {
      padding: '0 16px',
      fontSize: 'clamp(12px, 3vw, 14px)'
    },
    inputGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontSize: 'clamp(12px, 3vw, 14px)',
      fontWeight: '600',
      color: 'white',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '18px',
      fontSize: 'clamp(15px, 4vw, 18px)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      outline: 'none',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box'
    },
    backButton: {
      width: '100%',
      padding: '12px',
      fontSize: 'clamp(14px, 4vw, 16px)',
      fontWeight: '500',
      borderRadius: '12px',
      border: 'none',
      background: 'transparent',
      color: '#d8b4fe',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginTop: '16px',
      boxSizing: 'border-box'
    },
    pageTitle: {
      fontSize: 'clamp(24px, 6vw, 32px)',
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: '8px'
    },
    pageSubtitle: {
      fontSize: 'clamp(14px, 4vw, 16px)',
      color: '#d8b4fe',
      textAlign: 'center',
      marginBottom: '32px'
    },
    // Homepage styles
    homepageContainer: {
  minHeight: '100vh',
  width: '100%',
  background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e1b4b 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxSizing: 'border-box',
  overflowX: 'hidden'
},
    navbar: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxSizing: 'border-box'
    },
    navBrand: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: 'white',
      fontSize: 'clamp(18px, 5vw, 24px)',
      fontWeight: 'bold'
    },
    navMenu: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    navButton: {
      padding: '10px 16px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      color: 'white',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: 'clamp(12px, 3vw, 14px)',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box'
    },
    mainContent: {
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 80px)',
      boxSizing: 'border-box'
    },
    wipCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '60px 40px',
      textAlign: 'center',
      maxWidth: '600px',
      width: '100%',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxSizing: 'border-box'
    },
    wipTitle: {
      fontSize: 'clamp(32px, 8vw, 48px)',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '16px'
    },
    wipText: {
      fontSize: 'clamp(16px, 4vw, 20px)',
      color: '#d8b4fe',
      marginBottom: '8px'
    }
  };

  // Responsive styles for mobile
  const mobileStyles = `
  @media (max-width: 768px) {
    .nav-menu {
      gap: 4px;
    }
    .nav-button span {
      display: none;
    }
    .nav-button {
      padding: 10px;
    }
    .wip-card {
      padding: 40px 20px;
    }
  }

  @media (min-width: 1024px) {
    .nav-button {
      font-size: 16px;
      padding: 12px 20px;
    }
    .card {
      max-width: 600px !important;
      padding: 4rem 3rem !important;
    }
  }
`;


  if (currentView === 'landing') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.logoContainer}>
            <div 
              style={styles.logo}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Music size={48} color="white" strokeWidth={2.5} />
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
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
        </div>
      </div>
    );
  }

  if (currentView === 'signup') {
    return (
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
            style={{...styles.button, ...styles.primaryButton, marginTop: '24px'}}
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
    );
  }

  if (currentView === 'signin') {
    return (
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
            style={{...styles.button, ...styles.primaryButton, marginTop: '24px'}}
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
    );
  }

  if (currentView === 'homepage') {
    return (
      <>
        <style>{mobileStyles}</style>
        <div style={styles.homepageContainer}>
          {/* Navigation Bar */}
          <nav style={styles.navbar}>
            <div style={styles.navBrand}>
              <Music size={28} color="white" />
              <span>LyricLingo</span>
            </div>
            <div style={styles.navMenu} className="nav-menu">
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
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                <User size={18} />
                <span>Profile</span>
              </button>
              <button 
                style={styles.navButton}
                className="nav-button"
                onClick={handleLogout}
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
            <div style={styles.wipCard}>
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