import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';
import Getproduct from '../components/getproduct';

function Home() {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [budget, setBudget] = useState("");

  const [showLogout, setShowLogout] = useState(false);

  const components = [
    {
      name: "Processors",
      category: "CPU",
      description: "Choose the brain of your gaming PC.",
      icon: "🧠",
    },
    {
      name: "Graphics Cards",
      category: "GPU",
      description: "Power your games with incredible graphics.",
      icon: "🎮",
    },
    {
      name: "Memory",
      category: "RAM",
      description: "Get smooth performance while gaming.",
      icon: "⚡",
    },
    {
      name: "Motherboards",
      category: "Motherboard",
      description: "Find the perfect foundation for your build.",
      icon: "🔌",
    },
    {
      name: "Storage",
      category: "Storage",
      description: "Make room for all your favourite games.",
      icon: "💾",
    },
    {
      name: "Power Supplies",
      category: "PSU",
      description: "Power your setup with confidence.",
      icon: "🔋",
    },
  ];

  return (
    <div className="app">

      <nav className="navbar">

        <h2 className="logo">
          GAME<span>ZONE</span>
        </h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#components">Components</a>
          <a href="#builder">Build PC</a>
          <a href="#about">About</a>
        </div>

        <div className="nav-auth">

          {user ? (

            <>
              <span className="nav-login">
                Welcome, {user.username}
              </span>

              <button
                className="nav-register"
                onClick={() => setShowLogout(true)}
              >
                Logout
              </button>
            </>

          ) : (

            <>
              <Link to="/login" className="nav-login">
                Login
              </Link>

              <Link to="/register" className="nav-register">
                Register
              </Link>
            </>

          )}

        </div>

        <button
          className="nav-button"
          onClick={() =>
            document
              .getElementById("builder")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Start Building
        </button>

      </nav>

      {showLogout && (
        <div className="logout-overlay">

          <div className="logout-modal">

            <h2>Confirm Logout</h2>

            <p>
              Are you sure you want to logout from GameZone?
            </p>

            <div className="logout-buttons">

              <button
                className="cancel-button"
                onClick={() => setShowLogout(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-button"
                onClick={() => {
                  logout();
                  setShowLogout(false);
                  navigate("/");
                }}
              >
                Yes, Logout
              </button>

            </div>

          </div>

        </div>
      )}

      <section className="hero" id="home">

        <div className="hero-content">

          <p className="tagline">YOUR BUILD. YOUR RULES.</p>

          <h1>
            BUILD YOUR
            <br />
            ULTIMATE <span>GAMING PC</span>
          </h1>

          <p className="hero-description">
            Choose your components, check compatibility, and build
            your dream gaming setup without breaking your budget.
          </p>

          <div className="hero-buttons">

            <a href="#builder" className="primary-button">
              Build Your PC →
            </a>

            <a href="#components" className="secondary-button">
              Explore Components
            </a>

          </div>

        </div>

        <div className="hero-visual">

          <div className="pc-card">
            <div className="pc-icon">🖥️</div>
            <p>YOUR NEXT BUILD</p>
            <h3>LEVEL UP.</h3>
            <span>PERFORMANCE STARTS HERE</span>
          </div>

        </div>

      </section>

      <section className="stats">

        <div>
          <h2>06+</h2>
          <p>Component Categories</p>
        </div>

        <div>
          <h2>100%</h2>
          <p>Your Build, Your Choice</p>
        </div>

        <div>
          <h2>₹</h2>
          <p>Budget-Friendly Builds</p>
        </div>

      </section>

      <section className="components-section" id="components">

        <div className="section-heading">

          <p className="tagline">EXPLORE YOUR OPTIONS</p>

          <h2>CHOOSE YOUR COMPONENTS</h2>

          <p>
            Everything you need to plan your perfect gaming machine.
          </p>

        </div>

        <div className="component-grid">

          {components.map((component) => (

            <div className="component-card" key={component.category}>

              <div className="component-icon">
                {component.icon}
              </div>

              <p className="category-label">
                {component.category}
              </p>

              <h3>{component.name}</h3>

              <p className="component-description">
                {component.description}
              </p>

              <button
                className="card-button"
                onClick={() =>
                  alert(`You selected ${component.name}!`)
                }
              >
                Explore →
              </button>

            </div>

          ))}

        </div>

      </section>

      <section className="builder-section" id="builder">

        <div className="builder-content">

          <p className="tagline">YOUR DREAM BUILD STARTS HERE</p>

          <h2>
            BUILD SMART.
            <br />
            <span>SPEND SMARTER.</span>
          </h2>

          <p>
            Enter your budget and start planning a gaming PC
            that suits your needs.
          </p>

          <div className="budget-form">

            <span>₹</span>

            <input
              type="number"
              placeholder="Enter your budget"
              value={budget}
              min="1"
              onChange={(event) => setBudget(event.target.value)}
            />

            <button
              onClick={() => {

                if (!budget || Number(budget) <= 0) {
                  alert("Please enter a valid budget.");
                  return;
                }

                alert(
                  `Your PC budget is ₹${Number(budget).toLocaleString("en-IN")}`
                );

              }}
            >
              Get Started →
            </button>

          </div>

          <p className="budget-note">
            Plan your build according to your budget.
          </p>

        </div>

      </section>

      <section className="about-section" id="about">

        <h2>WHY GAMEZONE?</h2>

        <p>
          Building a gaming PC shouldn't be confusing. GameZone
          helps you explore hardware, plan your budget, and work
          towards a compatible PC build.
        </p>

      </section>

      <footer className="footer">

        <h2 className="logo">
          GAME<span>ZONE</span>
        </h2>

        <p>Build it. Match it. Game on.</p>

        <p className="copyright">
          © 2026 GameZone. Built for gamers.
        </p>

      </footer>

    </div>
  );
}

export default Home;