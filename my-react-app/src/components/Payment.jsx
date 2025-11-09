import React from "react";
import { useNavigate } from "react-router-dom";
import { Check, Music, TrendingUp, Mic, BookOpen, Download, Headphones, Star } from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();

  const handleStartFree = () => {
    // Navigate to main app or homepage
    navigate("/");
  };

  const handleSeePremium = () => {
    // Scroll to premium section or show more details
    document.getElementById("premium-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpgradePremium = () => {
    // Navigate to payment processing or show modal
    alert("Premium payment integration coming soon! This would connect to your payment processor (Stripe, PayPal, etc.)");
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
    footer: {
      textAlign: "center",
      maxWidth: "600px",
      fontSize: "0.95rem",
      opacity: 0.8,
      lineHeight: "1.6",
    },
    comparisonSection: {
      maxWidth: "800px",
      width: "100%",
      marginTop: "3rem",
      padding: "2rem",
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "16px",
      backdropFilter: "blur(10px)",
    },
    comparisonTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
      textAlign: "center",
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
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.3)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Start Learning Free
          </button>

          <button
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={handleSeePremium}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
            }}
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
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 6px 30px rgba(255, 215, 0, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 20px rgba(255, 215, 0, 0.3)";
            }}
          >
            Upgrade to Premium
          </button>
        </div>
      </div>

      {/* Comparison Section */}
      <div style={styles.comparisonSection}>
        <h3 style={styles.comparisonTitle}>Why Choose Premium?</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
          <div style={{ textAlign: "center" }}>
            <Music size={40} style={{ marginBottom: "1rem", opacity: 0.9 }} />
            <h4 style={{ marginBottom: "0.5rem", fontSize: "1.1rem" }}>500+ Songs</h4>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              Access the entire library across all languages and genres
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <TrendingUp size={40} style={{ marginBottom: "1rem", opacity: 0.9 }} />
            <h4 style={{ marginBottom: "0.5rem", fontSize: "1.1rem" }}>AI-Powered Learning</h4>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              Personalized recommendations based on your progress
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Download size={40} style={{ marginBottom: "1rem", opacity: 0.9 }} />
            <h4 style={{ marginBottom: "0.5rem", fontSize: "1.1rem" }}>Learn Offline</h4>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              Download songs and practice anywhere, anytime
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p>
          Join thousands of language learners who are making progress through music. 
          Start free today, upgrade when you're ready.
        </p>
        <p style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
          No credit card required for free plan • Cancel premium anytime
        </p>
      </div>
    </div>
  );
};

export default Payment;