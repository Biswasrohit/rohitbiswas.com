// src/components/Experience.jsx
import React from "react";

const Experience = () => (
  <section id="experience">
    <p className="section__text__p1">Explore My</p>
    <h1 className="title">Experience</h1>
    <div className="experience-details-container">
      <div className="about-containers">
        {/* Frontend */}
        <div className="details-container">
          <h2 className="experience-sub-title">Frontend Development</h2>
          <div className="article-container">
            {[
              "HTML",
              "CSS",
              "SASS",
              "JavaScript",
              "Tailwind",
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
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Backend */}
        <div className="details-container">
          <h2 className="experience-sub-title">Backend Development</h2>
          <div className="article-container">
            {["Git", "Node JS", "React", "Supabase", "GraphQL", "VantaJS"].map(
              (skill) => (
                <article key={skill}>
                  <img
                    src="/assets/checkmark.png"
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>{skill}</h3>
                  </div>
                </article>
              )
            )}
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
