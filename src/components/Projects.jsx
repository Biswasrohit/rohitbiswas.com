import React from "react";

const projects = [
  {
    title: "R2D3",
    img: "/assets/r2d3.jpg",
    github: "https://github.com/Biswasrohit/r2d3",
    demo: "https://github.com/Biswasrohit/r2d3",
  },
  {
    title: "HobbyHub",
    img: "/assets/hobbyhub.jpg",
    github: "https://github.com/Biswasrohit/HobbyHub",
    demo: "https://github.com/Biswasrohit/HobbyHub",
  },
  {
    title: "Crewmate Creator",
    img: "/assets/crewmatecreator.jpg",
    github: "https://github.com/Biswasrohit/CrewmateCreator",
    demo: "https://github.com/Biswasrohit/CrewmateCreator",
  },
];

const Projects = () => (
  <section id="projects">
    <p className="section__text__p1">Browse My Recent</p>
    <h1 className="title">Projects</h1>

    <div className="experience-details-container">
      <div className="about-containers">
        {projects.map(({ title, img, github, demo }) => (
          <div className="details-container color-container" key={title}>
            <div className="article-container">
              <img src={img} alt={title} className="project-img" />
            </div>

            <h2 className="experience-sub-title project-title">{title}</h2>

            <div className="btn-container">
              <button
                className="btn btn-color-2 project-btn"
                onClick={() => window.open(github, "_blank")}
              >
                Github
              </button>

              <button
                className="btn btn-color-2 project-btn"
                onClick={() => window.open(demo, "_blank")}
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
