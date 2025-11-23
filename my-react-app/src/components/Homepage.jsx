// src/components/Homepage.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Home, Book, Headphones, User, LogOut, Search, PlayCircle, Gamepad2, X, HelpCircle, CreditCard } from "lucide-react";

const Homepage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showGuide, setShowGuide] = useState(false);
  const [currentGuideSlide, setCurrentGuideSlide] = useState(0);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const lyricIconUrl =
    "https://raw.githubusercontent.com/Sammypef/software-engineer-group/peen-atempt/lyricicon.png";
  
  const guideImages = [
    "https://raw.githubusercontent.com/Sammypef/software-engineer-group/image/gif-host/guide.png",
    "https://raw.githubusercontent.com/Sammypef/software-engineer-group/image/gif-host/guide2.png",
    "https://raw.githubusercontent.com/Sammypef/software-engineer-group/image/gif-host/guide3.png",
    "https://raw.githubusercontent.com/Sammypef/software-engineer-group/image/gif-host/guide4.png",
    "https://raw.githubusercontent.com/Sammypef/software-engineer-group/image/gif-host/guide5.png",
    "https://raw.githubusercontent.com/Sammypef/software-engineer-group/image/gif-host/guide6.png",
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

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
    songInfo: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    songImage: {
      width: "60px",
      height: "60px",
      borderRadius: "8px",
      objectFit: "cover",
      border: "2px solid rgba(255,255,255,0.2)",
    },
    songText: { display: "flex", flexDirection: "column" },
    // Payment button - BOTTOM LEFT
    paymentButton: {
      position: "fixed",
      bottom: "20px",
      left: "20px",
      background: "linear-gradient(135deg, #ffd700, #ffed4e)",
      border: "2px solid rgba(255, 215, 0, 0.5)",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "#6f0097ff",
      boxShadow: "0 4px 20px rgba(255, 215, 0, 0.3)",
      transition: "all 0.3s ease",
      zIndex: 100,
    },
    // Guide button - BOTTOM RIGHT
    guideButton: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "white",
      backdropFilter: "blur(10px)",
      transition: "all 0.3s ease",
      zIndex: 100,
    },
    guideModal: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0, 0, 0, 0.8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      backdropFilter: "blur(5px)",
    },
    guideContent: {
      position: "relative",
      maxWidth: "90vw",
      maxHeight: "90vh",
      background: "white",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      display: "flex",
      flexDirection: "column",
    },
    guideImage: {
      width: "100%",
      height: "auto",
      display: "block",
      maxHeight: "calc(90vh - 80px)",
      objectFit: "contain",
    },
    guideNavigation: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem",
      background: "rgba(0, 0, 0, 0.05)",
      borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    },
    navButtonGuide: {
      padding: "8px 16px",
      background: "#6f0097ff",
      border: "none",
      borderRadius: "8px",
      color: "white",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    slideIndicator: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
    },
    dot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "rgba(111, 0, 151, 0.3)",
      transition: "all 0.2s ease",
    },
    dotActive: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "#6f0097ff",
      transition: "all 0.2s ease",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "rgba(0, 0, 0, 0.5)",
      border: "none",
      borderRadius: "50%",
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "white",
      zIndex: 10,
      transition: "all 0.2s ease",
    },
    logoutModal: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      backdropFilter: "blur(5px)",
    },
    logoutContent: {
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "16px",
      padding: "2rem",
      width: "min(90vw, 400px)",
      color: "white",
      textAlign: "center",
    },
    logoutTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      marginBottom: "1rem",
    },
    logoutButtons: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      marginTop: "1.5rem",
    },
    confirmButton: {
      padding: "12px 24px",
      background: "rgba(255, 0, 0, 0.3)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "8px",
      color: "white",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.2s ease",
    },
    cancelButton: {
      padding: "12px 24px",
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "8px",
      color: "white",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.2s ease",
    },
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
          <span>LyricaLingo</span>
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
          <button style={styles.navButton} onClick={() => navigate("/lessons")}>
            <Book size={18} /> Lessons 
          </button>
          <button style={styles.navButton} onClick={() => navigate("/game")}>
            <Gamepad2 size={18} /> Game
          </button>
          <button style={styles.navButton} onClick={() => navigate("/music")}>
            <Headphones size={18} /> Music
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
            onClick={() => setShowLogoutConfirm(true)}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.mainContent}>
        {/* Recent Song Section */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Recent Song &gt;</div>

          <div style={styles.songCard} onClick={() => navigate("/song/yoasobi")}>
            <div style={styles.songInfo}>
              <img src={lyricIconUrl} alt="YOASOBI" style={styles.songImage} />
              <div style={styles.songText}>
                <span style={{ fontWeight: "bold" }}>夜に駆ける (Yoru ni Kakeru)</span>
                <span>by YOASOBI</span>
              </div>
            </div>
            <PlayCircle size={36} color="#fbcdfd" />
          </div>

          <div style={styles.songCard} onClick={() => navigate("/song/bluebird")}>
            <div style={styles.songInfo}>
              <img src={lyricIconUrl} alt="Ikimonogakari - Blue Bird" style={styles.songImage} />
              <div style={styles.songText}>
                <span style={{ fontWeight: "bold" }}>Blue Bird</span>
                <span>Ikimonogakari</span>
              </div>
            </div>
            <PlayCircle size={36} color="#fbcdfd" />
          </div>

          <div style={styles.songCard} onClick={() => navigate("/song/gurenge")}>
            <div style={styles.songInfo}>
              <img src={lyricIconUrl} alt="LiSA - Gurenge" style={styles.songImage} />
              <div style={styles.songText}>
                <span style={{ fontWeight: "bold" }}>Gurenge</span>
                <span>LiSA</span>
              </div>
            </div>
            <PlayCircle size={36} color="#fbcdfd" />
          </div>
        </div>

        {/* Recent Album Section */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Recent Album &gt;</div>

          <div style={styles.songCard} onClick={() => navigate("/album/yoasobi")}>
            <div style={styles.songInfo}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/2/27/The_Book_%28Yoasobi_album%29.jpg"
                alt="YOASOBI - The Book"
                style={styles.songImage}
              />
              <div style={styles.songText}>
                <span style={{ fontWeight: "bold" }}>THE BOOK</span>
                <span>YOASOBI • 2021</span>
              </div>
            </div>
            <PlayCircle size={36} color="#fbcdfd" />
          </div>

          <div style={styles.songCard} onClick={() => navigate("/album/taylor-swift")}>
            <div style={styles.songInfo}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_Midnights.png"
                alt="Taylor Swift - Midnights"
                style={styles.songImage}
              />
              <div style={styles.songText}>
                <span style={{ fontWeight: "bold" }}>Midnights</span>
                <span>Taylor Swift • 2022</span>
              </div>
            </div>
            <PlayCircle size={36} color="#fbcdfd" />
          </div>
        </div>

        {/* Trending Section */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Trending Now 🔥</div>

          <div style={styles.songCard} onClick={() => navigate("/song/newjeans")}>
            <div style={styles.songInfo}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/8/8b/NewJeans_-_Super_Shy.png"
                alt="NewJeans - Super Shy"
                style={styles.songImage}
              />
              <div style={styles.songText}>
                <span style={{ fontWeight: "bold" }}>Super Shy</span>
                <span>NewJeans</span>
              </div>
            </div>
            <PlayCircle size={36} color="#fbcdfd" />
          </div>

          <div style={styles.songCard} onClick={() => navigate("/song/ado")}>
            <div style={styles.songInfo}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/b/bf/Ado_-_Show.png"
                alt="Ado - Show"
                style={styles.songImage}
              />
              <div style={styles.songText}>
                <span style={{ fontWeight: "bold" }}>Show</span>
                <span>Ado</span>
              </div>
            </div>
            <PlayCircle size={36} color="#fbcdfd" />
          </div>
        </div>
      </main>

      {/* Payment Button - BOTTOM LEFT */}
      <button 
        style={styles.paymentButton}
        onClick={() => navigate("/payment")}
        title="Upgrade to Premium"
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.1)";
          e.target.style.boxShadow = "0 6px 30px rgba(243, 238, 214, 0.97)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 4px 20px rgba(251, 191, 191, 0.83)";
        }}
      >
        <CreditCard size={28} />
      </button>

      {/* Guide Button - BOTTOM RIGHT */}
      <button 
        style={styles.guideButton}
        onClick={() => {
          setShowGuide(true);
          setCurrentGuideSlide(0);
        }}
        title="Show Guide"
      >
        <HelpCircle size={28} />
      </button>

      {/* Guide Modal with Carousel */}
      {showGuide && (
        <div style={styles.guideModal} onClick={() => setShowGuide(false)}>
          <div style={styles.guideContent} onClick={(e) => e.stopPropagation()}>
            <img 
              src={guideImages[currentGuideSlide]} 
              alt={`Guide ${currentGuideSlide + 1}`}
              style={styles.guideImage}
              onError={(e) => {
                console.error("Failed to load guide image");
              }}
            />
            
            <div style={styles.guideNavigation}>
              <button 
                style={{
                  ...styles.navButtonGuide,
                  opacity: currentGuideSlide === 0 ? 0.5 : 1,
                  cursor: currentGuideSlide === 0 ? "not-allowed" : "pointer"
                }}
                onClick={() => setCurrentGuideSlide(Math.max(0, currentGuideSlide - 1))}
                disabled={currentGuideSlide === 0}
                onMouseEnter={(e) => {
                  if (currentGuideSlide !== 0) e.target.style.background = "#8a00bd";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#6f0097ff";
                }}
              >
                Previous
              </button>
              
              <div style={styles.slideIndicator}>
                {guideImages.map((_, index) => (
                  <div 
                    key={index}
                    style={index === currentGuideSlide ? styles.dotActive : styles.dot}
                  />
                ))}
              </div>
              
              <button 
                style={{
                  ...styles.navButtonGuide,
                  opacity: currentGuideSlide === guideImages.length - 1 ? 0.5 : 1,
                  cursor: currentGuideSlide === guideImages.length - 1 ? "not-allowed" : "pointer"
                }}
                onClick={() => setCurrentGuideSlide(Math.min(guideImages.length - 1, currentGuideSlide + 1))}
                disabled={currentGuideSlide === guideImages.length - 1}
                onMouseEnter={(e) => {
                  if (currentGuideSlide !== guideImages.length - 1) e.target.style.background = "#8a00bd";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#6f0097ff";
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div style={styles.logoutModal} onClick={() => setShowLogoutConfirm(false)}>
          <div style={styles.logoutContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.logoutTitle}>Are you sure?</div>
            <p>Do you really want to log out?</p>
            <div style={styles.logoutButtons}>
              <button 
                style={styles.cancelButton}
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button 
                style={styles.confirmButton}
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;