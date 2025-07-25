import React from "react";

const Experience = () => (
  <section id="experience">
    <p className="section__text__p1">Explore My</p>
    <h1 className="title">Experience</h1>
    <div className="experience-details-container">
      <div className="about-containers">
        <div className="details-container">
          <h2 className="experience-sub-title">Frontend Development</h2>
          <div className="article-container">
            {[
              "HTML",
              "CSS",
              "SASS",
              "JavaScript",
              "TypeScript",
              "Material UI",
            ].map((skill) => (
              <article key={skill}>
                <img
                  src="/assets/checkmark.png"
                  alt="Experience icon"
                  className="icon"
                />
                <div>
                  <h3>{skill}</h3>
                  <p>
                    {skill === "JavaScript" || skill === "TypeScript"
                      ? "Basic"
                      : skill === "SASS" || skill === "Material UI"
                      ? "Intermediate"
                      : "Experienced"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="details-container">
          <h2 className="experience-sub-title">Backend Development</h2>
          <div className="article-container">
            {["PostgreSQL", "Node JS", "Express JS", "Git"].map((skill) => (
              <article key={skill}>
                <img
                  src="/assets/checkmark.png"
                  alt="Experience icon"
                  className="icon"
                />
                <div>
                  <h3>{skill}</h3>
                  <p>
                    {skill === "Git" || skill.includes("JS")
                      ? "Intermediate"
                      : "Basic"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
    <img
      src="/assets/arrow.png"
      alt="Arrow icon"
      className="icon arrow"
      onClick={() => (location.href = "#projects")}
    />
  </section>
);

export default Experience;
