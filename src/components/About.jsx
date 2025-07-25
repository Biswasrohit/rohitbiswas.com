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
              B.S. Engineering Physics
              <br />
              B.S. Computer Science
            </p>
          </div>
        </div>
        <div className="text-container">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quis
            reprehenderit et laborum, rem, dolore eum quod voluptate
            exercitationem nobis...
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
