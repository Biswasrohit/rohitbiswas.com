import React, { useEffect, useRef, useState } from "react";

const Profile = () => {
  const profileRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [theme, setTheme] = useState(
    () =>
      document.documentElement.dataset.theme ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  // Watch for theme changes from the navbar toggle
  useEffect(() => {
    const root = document.documentElement;
    const obs = new MutationObserver(() => {
      setTheme(root.dataset.theme || "light");
    });
    obs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  // Create / recreate Vanta when theme changes; destroy on cleanup
  useEffect(() => {
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If user prefers reduced motion, remove effect entirely
    if (reduceMotion) {
      if (vantaEffect) {
        vantaEffect.destroy();
        setVantaEffect(null);
      }
      return;
    }

    if (!window.VANTA || !window.VANTA.GLOBE || !profileRef.current) return;

    // If an instance exists, destroy before creating a new one
    if (vantaEffect) {
      vantaEffect.destroy();
      setVantaEffect(null);
    }

    const isDark = theme === "dark";

    const effect = window.VANTA.GLOBE({
      el: profileRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      // Softer accent color for dark; your original green for light
      color: isDark ? 0x64ffda : 0x004030,
      // Match your CSS theme backgrounds
      backgroundColor: isDark ? 0x0b0d10 : 0xffffff,
      size: 1.1,
    });

    setVantaEffect(effect);

    return () => {
      if (effect) effect.destroy();
    };
  }, [theme]);

  return (
    <section id="profile" ref={profileRef} style={{ position: "relative" }}>
      {/* Ensure content sits over the Vanta canvas */}
      <div
        className="section__pic-container"
        style={{ position: "relative", zIndex: 1 }}
      >
        <img
          src="/assets/profile-pic.png"
          alt="Rohit Biswas profile picture"
          style={{ borderRadius: "50%", backgroundColor: "transparent" }}
        />
      </div>
      <div
        className="section__text"
        style={{ position: "relative", zIndex: 1 }}
      >
        <p className="section__text__p1">Hello, I'm</p>
        <h1 className="title">Rohit Biswas</h1>
        <p className="section__text__p2">Software Developer</p>
        <div className="btn-container">
          <button
            className="btn btn-color-2"
            onClick={() => window.open("/assets/resume.pdf")}
          >
            Download Resume
          </button>
          <button
            className="btn btn-color-1"
            onClick={() => (location.href = "#contact")}
          >
            Contact Info
          </button>
        </div>
        <div id="socials-container">
          <img
            src="/assets/linkedin.png"
            alt="My LinkedIn profile"
            className="icon"
            onClick={() =>
              (location.href = "https://www.linkedin.com/in/rohitbiswas3/")
            }
          />
          <img
            src="/assets/github.png"
            alt="My Github profile"
            className="icon"
            onClick={() => (location.href = "https://github.com/Biswasrohit")}
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;
