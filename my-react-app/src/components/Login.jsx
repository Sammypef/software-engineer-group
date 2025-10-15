// Login.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const { setCurrentUser, signup, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentView, setCurrentView] = useState('landing');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lyricIconUrl = "https://raw.githubusercontent.com/Sammypef/software-engineer-group/peen-atempt/lyricicon.png";

  const from = location.state?.from?.pathname || '/home';

  // เช็คว่ามี user จาก OAuth redirect มาหรือไม่
    useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userParam = params.get('user');
    if (userParam) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userParam));
        console.log("OAuth User Received:", parsedUser);
        setCurrentUser(parsedUser);
        localStorage.setItem('user', JSON.stringify(parsedUser));
        navigate('/home', { replace: true });
      } catch (err) {
        console.error('Failed to parse OAuth user:', err);
      }
    }
  }, [location.search, navigate, setCurrentUser]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignUp = async () => {
    if (!formData.email.trim()) { setError('Email is required'); return; }
    if (!isValidEmail(formData.email)) { setError('Please enter a valid email address'); return; }
    if (!formData.password) { setError('Password is required'); return; }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters long'); return; }
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match!'); return; }

    setLoading(true);
    setError('');
    try {
      await signup(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!formData.email.trim()) { setError('Email is required'); return; }
    if (!isValidEmail(formData.email)) { setError('Please enter a valid email address'); return; }
    if (!formData.password) { setError('Password is required'); return; }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters long'); return; }

    setLoading(true);
    setError('');
    try {
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  // เช็ค validity สำหรับ enable/disable button
  const isSignUpValid = () =>
    formData.email.trim() &&
    isValidEmail(formData.email) &&
    formData.password &&
    formData.password.length >= 6 &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const isSignInValid = () =>
    formData.email.trim() &&
    isValidEmail(formData.email) &&
    formData.password &&
    formData.password.length >= 6;

  const styles = {
    pageContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      margin: 0,
      padding: 0
    },
    container: {
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(0.5rem, 3vw, 1.5rem)',
      background: 'linear-gradient(135deg, #6f0097ff 0%, #ba378dff 50%, #b4ae63ff 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      overflow: 'hidden',
      boxSizing: 'border-box',
      margin: 0
    },
    card: {
      width: 'min(90vw, 400px)',
      minWidth: 'min(300px, 85vw)',
      maxHeight: '95vh',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: 'clamp(16px, 4vw, 24px)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      padding: 'clamp(1.5rem, 6vw, 2.5rem) clamp(1rem, 4vw, 2rem)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      margin: 'auto',
      boxSizing: 'border-box',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    cardContent: {
      flex: 1,
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '100%'
    },
    logoContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 'clamp(12px, 3vw, 20px)',
      flexShrink: 0
    },
    logo: {
      background: 'linear-gradient(135deg, #9f17d0ff 0%, #de3ba5ff 100%)',
      padding: 'clamp(12px, 3vw, 16px)',
      borderRadius: 'clamp(10px, 2.5vw, 14px)',
      boxShadow: '0 10px 30px rgba(167, 139, 250, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      width: 'clamp(60px, 15vw, 80px)',
      height: 'clamp(60px, 15vw, 80px)',
      overflow: 'hidden',
      flexShrink: 0
    },
    logoImage: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      borderRadius: 'clamp(6px, 1.5vw, 10px)'
    },
    title: {
      fontSize: 'clamp(24px, 6vw, 36px)',
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: 'clamp(4px, 1vw, 6px)',
      letterSpacing: '-0.5px',
      lineHeight: '1.2',
      flexShrink: 0
    },
    subtitle: {
      fontSize: 'clamp(12px, 3vw, 16px)',
      color: '#d8b4fe',
      textAlign: 'center',
      marginBottom: 'clamp(20px, 5vw, 28px)',
      lineHeight: '1.4',
      flexShrink: 0
    },
    button: {
      width: '100%',
      padding: 'clamp(12px, 3.5vw, 16px)',
      fontSize: 'clamp(13px, 3vw, 16px)',
      fontWeight: '600',
      borderRadius: 'clamp(8px, 2vw, 10px)',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginBottom: 'clamp(8px, 2vw, 12px)',
      boxSizing: 'border-box',
      opacity: 1,
      flexShrink: 0
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #9f17d0ff 0%, #de3ba5ff 100%)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)'
    },
    disabledButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'rgba(255, 255, 255, 0.5)',
      cursor: 'not-allowed',
      boxShadow: 'none'
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
      gap: 'clamp(6px, 1.5vw, 10px)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      margin: 'clamp(12px, 3vw, 20px) 0',
      color: '#d8b4fe',
      flexShrink: 0
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      background: 'rgba(255, 255, 255, 0.2)'
    },
    dividerText: {
      padding: '0 clamp(8px, 2vw, 12px)',
      fontSize: 'clamp(10px, 2vw, 12px)',
      whiteSpace: 'nowrap'
    },
    inputGroup: {
      marginBottom: 'clamp(12px, 3vw, 16px)',
      flexShrink: 0
    },
    label: {
      display: 'block',
      fontSize: 'clamp(10px, 2vw, 12px)',
      fontWeight: '600',
      color: 'white',
      marginBottom: 'clamp(4px, 1vw, 6px)'
    },
    input: {
      width: '100%',
      padding: 'clamp(12px, 3.5vw, 16px)',
      fontSize: 'clamp(13px, 3vw, 15px)',
      borderRadius: 'clamp(8px, 2vw, 10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      outline: 'none',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box'
    },
    backButton: {
      width: '100%',
      padding: 'clamp(8px, 2.5vw, 10px)',
      fontSize: 'clamp(12px, 2.5vw, 14px)',
      fontWeight: '500',
      borderRadius: 'clamp(8px, 2vw, 10px)',
      border: 'none',
      background: 'transparent',
      color: '#d8b4fe',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginTop: 'clamp(8px, 2vw, 12px)',
      boxSizing: 'border-box',
      flexShrink: 0
    },
    pageTitle: {
      fontSize: 'clamp(20px, 5vw, 24px)',
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: 'clamp(4px, 1vw, 6px)',
      lineHeight: '1.2',
      flexShrink: 0
    },
    pageSubtitle: {
      fontSize: 'clamp(12px, 2.5vw, 14px)',
      color: '#d8b4fe',
      textAlign: 'center',
      marginBottom: 'clamp(20px, 5vw, 28px)',
      lineHeight: '1.4',
      flexShrink: 0
    },
    errorMessage: {
      background: 'rgba(239, 68, 68, 0.2)',
      border: '1px solid rgba(239, 68, 68, 0.5)',
      color: '#fecaca',
      padding: 'clamp(10px, 2.5vw, 14px)',
      borderRadius: 'clamp(6px, 1.5vw, 10px)',
      marginBottom: 'clamp(12px, 3vw, 16px)',
      textAlign: 'center',
      fontSize: 'clamp(11px, 2vw, 13px)',
      flexShrink: 0
    },
    loadingButton: {
      opacity: 0.7,
      cursor: 'not-allowed'
    }
  };

  const preventScrollStyles = `
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      position: fixed;
      width: 100%;
      height: 100%;
    }
    
    html {
      overflow: hidden;
      height: 100%;
    }
    
    ::-webkit-scrollbar {
      display: none;
    }
    
    * {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;

  const renderLandingView = () => (
    <div style={styles.cardContent}>
      <div style={styles.logoContainer}>
        <div 
          style={styles.logo}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img 
            src={lyricIconUrl} 
            alt="LyricLingo Logo" 
            style={styles.logoImage}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>
      
      <h1 style={styles.title}>LyricLingo</h1>
      <p style={styles.subtitle}>Learning new languages through music!</p>

      <button
        style={{...styles.button, ...styles.primaryButton}}
        onClick={() => setCurrentView('signup')}
        disabled={loading}
        onMouseOver={(e) => !loading && (e.currentTarget.style.transform = 'scale(1.02)')}
        onMouseOut={(e) => !loading && (e.currentTarget.style.transform = 'scale(1)')}
        type="submit" 
      >
        Sign Up
      </button>

      <button
        style={{...styles.button, ...styles.secondaryButton}}
        onClick={() => setCurrentView('signin')}
        disabled={loading}
        onMouseOver={(e) => !loading && (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)')}
        onMouseOut={(e) => !loading && (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
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
        disabled={loading}
        onMouseOver={(e) => !loading && (e.currentTarget.style.background = '#f9fafb')}
        onMouseOut={(e) => !loading && (e.currentTarget.style.background = 'white')}
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Google
      </button>
    </div>
  );

  const renderSignUpView = () => (
    <div style={styles.cardContent}>
      <h2 style={styles.pageTitle}>Create Account</h2>
      <p style={styles.pageSubtitle}>Join LyricLingo today</p>
      <p style={styles.pageSubtitle}>The password need to have at least 6 characters</p>

      {error && <div style={styles.errorMessage}>{error}</div>}

      <div style={styles.inputGroup}>
        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          style={styles.input}
          placeholder="you@example.com"
          disabled={loading}
          required
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
          disabled={loading}
          required
          minLength="6"
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
          disabled={loading}
          required
          minLength="6"
        />
      </div>

      <button
        style={{
          ...styles.button, 
          ...styles.primaryButton, 
          ...(!isSignUpValid() && styles.disabledButton),
          marginTop: 'auto',
          ...(loading && styles.loadingButton)
        }}
        onClick={handleSignUp}
        disabled={loading || !isSignUpValid()}
        onMouseOver={(e) => !loading && isSignUpValid() && (e.currentTarget.style.transform = 'scale(1.02)')}
        onMouseOut={(e) => !loading && isSignUpValid() && (e.currentTarget.style.transform = 'scale(1)')}
      >
        {loading ? 'Creating Account...' : 'Sign Up'}
      </button>

      <button
        style={styles.backButton}
        onClick={() => {
          setCurrentView('landing');
          setError('');
        }}
        disabled={loading}
      >
        ← Back
      </button>
    </div>
  );

  const renderSignInView = () => (
    <div style={styles.cardContent}>
      <h2 style={styles.pageTitle}>Welcome Back</h2>
      <p style={styles.pageSubtitle}>Sign in to continue learning</p>

      {error && <div style={styles.errorMessage}>{error}</div>}

      <div style={styles.inputGroup}>
        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          style={styles.input}
          placeholder="you@example.com"
          disabled={loading}
          required
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
          disabled={loading}
          required
          minLength="6"
        />
      </div>

      <button
        style={{
          ...styles.button, 
          ...styles.primaryButton, 
          ...(!isSignInValid() && styles.disabledButton),
          marginTop: 'auto',
          ...(loading && styles.loadingButton)
        }}
        onClick={handleSignIn}
        disabled={loading || !isSignInValid()}
        onMouseOver={(e) => !loading && isSignInValid() && (e.currentTarget.style.transform = 'scale(1.02)')}
        onMouseOut={(e) => !loading && isSignInValid() && (e.currentTarget.style.transform = 'scale(1)')}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>

      <button
        style={styles.backButton}
        onClick={() => {
          setCurrentView('landing');
          setError('');
        }}
        disabled={loading}
      >
        ← Back
      </button>
    </div>
  );

  return (
    <>
      <style>{preventScrollStyles}</style>
      <div style={styles.pageContainer}>
        <div style={styles.container}>
          <div style={styles.card}>
            {currentView === 'landing' && renderLandingView()}
            {currentView === 'signup' && renderSignUpView()}
            {currentView === 'signin' && renderSignInView()}
          </div>
        </div>
      </div>
    </>
  );
}


export default Login;


//function to connect Backend and Frontend
// const Sign_In = async() => {
//     try {
//         const response = await fetch('http://localhost:5000/login', {