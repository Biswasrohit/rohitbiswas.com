import React from "react";

const About = () => (
  <section id="about">
    <p className="section__text__p1">Get To Know More</p>
    <h1 className="title">About Me</h1>
    <div className="section-container">
      <div className="section__pic-container">
        <img
          src="/assets/about-pic.png"
          alt="Profile picture"
          className="about-pic"
        />
      </div>
      <div className="about-details-container">
        <div className="about-containers">
          <div className="details-container">
            <img
              src="/assets/experience.png"
              alt="Experience icon"
              className="icon"
            />
            <h3>Experience</h3>
            <p>
              3+ years <br />
              Software Development
            </p>
          </div>
          <div className="details-container">
            <img
              src="/assets/education.png"
              alt="Education icon"
              className="icon"
            />
            <h3>Education</h3>
            <p>
              B.S. Engineering Physics | Fordham University
              <br />
              B.S. Computer Science | Columbia University
            </p>
          </div>
        </div>
        <div className="text-container">
          <p>
            I am a Computer Science student at Columbia University, with a
            strong interest in software development and cybersecurity.
            Proficient in Python, C++, Java, JavaScript, Node.js, and React, I
            enjoy building efficient web applications and exploring machine
            learning and AI advancements.
          </p>
        </div>
      </div>
    </div>
    <img
      src="/assets/arrow.png"
      alt="Arrow icon"
      className="icon arrow"
      onClick={() => (location.href = "#experience")}
    />
  </section>
);

export default About;
