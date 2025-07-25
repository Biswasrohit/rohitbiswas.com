import React, { useEffect, useRef, useState } from "react";

const Profile = () => {
  const profileRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect && window.VANTA && window.VANTA.GLOBE) {
      setVantaEffect(
        window.VANTA.GLOBE({
          el: profileRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x004030,
          backgroundColor: 0xffffff,
          size: 1.1,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <section id="profile" ref={profileRef}>
      <div className="section__pic-container">
        <img src="/assets/profile-pic.png" alt="Rohit Biswas profile picture" />
      </div>
      <div className="section__text">
        <p className="section__text__p1">Hello, I'm</p>
        <h1 className="title">Rohit Biswas</h1>
        <p className="section__text__p2">Software Developer</p>
        <div className="btn-container">
          <button
            className="btn btn-color-2"
            onClick={() => window.open("/assets/resume-example.pdf")}
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
            onClick={() => (location.href = "https://linkedin.com/")}
          />
          <img
            src="/assets/github.png"
            alt="My Github profile"
            className="icon"
            onClick={() => (location.href = "https://github.com/")}
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;
