import React from "react";
import { useNavigate } from "react-router-dom";
import { Check, Music, TrendingUp, Download, Star } from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = React.useState(false);

  const handleStartFree = () => {
    navigate("/");
  };

  const handleSeePremium = () => {
    document.getElementById("premium-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpgradePremium = () => {
    setShowModal(true);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      width: "100vw",
      background: "linear-gradient(135deg, #6f0097ff 0%, #ba378dff 50%, #b4ae63ff 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "3rem 2rem",
      color: "white",
      overflowY: "auto",
    },
    header: {
      textAlign: "center",
      marginBottom: "3rem",
      maxWidth: "800px",
    },
    logo: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    subtitle: {
      fontSize: "1.2rem",
      opacity: 0.9,
      lineHeight: "1.6",
    },
    pricingContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "2rem",
      maxWidth: "1100px",
      width: "100%",
      marginBottom: "3rem",
    },
    card: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      padding: "2.5rem",
      border: "2px solid rgba(255, 255, 255, 0.2)",
      transition: "all 0.3s ease",
      display: "flex",
      flexDirection: "column",
      position: "relative",
    },
    premiumCard: {
      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 215, 0, 0.1) 100%)",
      border: "2px solid rgba(255, 215, 0, 0.4)",
      boxShadow: "0 8px 32px rgba(255, 215, 0, 0.2)",
    },
    badge: {
      position: "absolute",
      top: "-12px",
      right: "20px",
      background: "linear-gradient(135deg, #ffd700, #ffed4e)",
      color: "#6f0097ff",
      padding: "0.4rem 1rem",
      borderRadius: "20px",
      fontSize: "0.85rem",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
    },
    planName: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    price: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    priceSubtext: {
      fontSize: "0.95rem",
      opacity: 0.8,
      marginBottom: "2rem",
    },
    featureList: {
      listStyle: "none",
      padding: 0,
      margin: "0 0 2rem 0",
      flex: 1,
    },
    feature: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.75rem",
      marginBottom: "1rem",
      fontSize: "1rem",
      lineHeight: "1.5",
    },
    checkIcon: {
      color: "#4ade80",
      flexShrink: 0,
      marginTop: "0.2rem",
    },
    button: {
      width: "100%",
      padding: "1rem 2rem",
      borderRadius: "12px",
      border: "none",
      fontSize: "1.1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },
    freeButton: {
      background: "rgba(255, 255, 255, 0.2)",
      color: "white",
      border: "2px solid rgba(255, 255, 255, 0.3)",
    },
    premiumButton: {
      background: "linear-gradient(135deg, #ffd700, #ffed4e)",
      color: "#6f0097ff",
      boxShadow: "0 4px 20px rgba(255, 215, 0, 0.3)",
    },
    secondaryButton: {
      background: "transparent",
      border: "2px solid rgba(255, 255, 255, 0.3)",
      color: "white",
      marginTop: "1rem",
    },
    backButton: {
      marginTop: "3rem",
      padding: "0.8rem 1.2rem",
      borderRadius: "12px",
      border: "2px solid rgba(255, 255, 255, 0.3)",
      background: "transparent",
      color: "white",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>
          <Music size={40} />
          <span>Lyricalingo</span>
        </div>
        <h1 style={styles.title}>Choose Your Learning Journey</h1>
        <p style={styles.subtitle}>
          Start learning languages through music with our free plan or unlock everything with Premium
        </p>
      </div>

      {/* Pricing Cards */}
      <div style={styles.pricingContainer}>

        {/* Free Plan */}
        <div style={styles.card}>
          <h2 style={styles.planName}>Start Free</h2>
          <div style={styles.price}>Free</div>
          <p style={styles.priceSubtext}>No payment required</p>

          <ul style={styles.featureList}>
            <li style={styles.feature}>
              <Check size={20} style={styles.checkIcon} />
              <span>Algorithm-selected song daily</span>
            </li>
            <li style={styles.feature}>
              <Check size={20} style={styles.checkIcon} />
              <span>Community translation & annotations</span>
            </li>
            <li style={styles.feature}>
              <Check size={20} style={styles.checkIcon} />
              <span>Basic progress tracking</span>
            </li>
            <li style={styles.feature}>
              <Check size={20} style={styles.checkIcon} />
              <span>Karaoke-style lyric display</span>
            </li>
          </ul>

          <button
            style={{ ...styles.button, ...styles.freeButton }}
            onClick={handleStartFree}
          >
            Start Learning Free
          </button>

          <button
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={handleSeePremium}
          >
            See Premium Features
          </button>
        </div>

        {/* Premium Plan */}
        <div style={{ ...styles.card, ...styles.premiumCard }} id="premium-section">
          <div style={styles.badge}>
            <Star size={16} />
            BEST VALUE
          </div>

          <h2 style={styles.planName}>Premium</h2>
          <div style={styles.price}>$9.99</div>
          <p style={styles.priceSubtext}>per month • cancel anytime</p>

          <ul style={styles.featureList}>
            <li style={styles.feature}>
              <Check size={20} style={styles.checkIcon} />
              <span><strong>Full song library access</strong> (500+ songs)</span>
            </li>
            <li style={styles.feature}>
              <Check size={20} style={styles.checkIcon} />
              <span><strong>Personalized learning path</strong></span>
            </li>
            <li style={styles.feature}>
              <Check size={20} style={styles.checkIcon} />
              <span><strong>Advanced scoring & pronunciation</strong></span>
            </li>
            <li style={styles.feature}>
              <Check size={20} style={styles.checkIcon} />
              <span><strong>Create & share annotations</strong></span>
            </li>
            <li style={styles.feature}>
              <Check size={20} style={styles.checkIcon} />
              <span><strong>Offline mode & downloads</strong></span>
            </li>
            <li style={styles.feature}>
              <Check size={20} style={styles.checkIcon} />
              <span><strong>Priority support</strong></span>
            </li>
          </ul>

          <button
            style={{ ...styles.button, ...styles.premiumButton }}
            onClick={handleUpgradePremium}
          >
            Upgrade to Premium
          </button>
        </div>
      </div>

      {/* Back to Homepage Button */}
      <button
        style={styles.backButton}
        onClick={() => navigate("/")}
      >
        ⬅ Back to Homepage
      </button>

      {/* Modal Popup */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}>
          <div style={{
            background: "white",
            color: "black",
            padding: "2rem",
            borderRadius: "14px",
            width: "90%",
            maxWidth: "420px",
            textAlign: "center",
            boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
          }}>
            <h2 style={{ marginBottom: "1rem", fontWeight: "bold" }}>
              Premium Coming Soon
            </h2>
            <p style={{ marginBottom: "2rem", opacity: 0.7 }}>
              Payment integration (Stripe/PayPal) is on the way!  
              You'll be able to upgrade from here soon.
            </p>

            <button
              style={{
                padding: "0.8rem 1.5rem",
                background: "#6f0097",
                color: "white",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
              }}
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;