import React from "react";

const projects = [
  { title: "Project One", img: "/assets/project-1.png" },
  { title: "Project Two", img: "/assets/project-2.png" },
  { title: "Project Three", img: "/assets/project-3.png" },
];

const Projects = () => (
  <section id="projects">
    <p className="section__text__p1">Browse My Recent</p>
    <h1 className="title">Projects</h1>
    <div className="experience-details-container">
      <div className="about-containers">
        {projects.map(({ title, img }) => (
          <div className="details-container color-container" key={title}>
            <div className="article-container">
              <img src={img} alt={title} className="project-img" />
            </div>
            <h2 className="experience-sub-title project-title">{title}</h2>
            <div className="btn-container">
              <button
                className="btn btn-color-2 project-btn"
                onClick={() => (location.href = "https://github.com/")}
              >
                Github
              </button>
              <button
                className="btn btn-color-2 project-btn"
                onClick={() => (location.href = "https://github.com/")}
              >
                Live Demo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <img
      src="/assets/arrow.png"
      alt="Arrow icon"
      className="icon arrow"
      onClick={() => (location.href = "#contact")}
    />
  </section>
);

export default Projects;
