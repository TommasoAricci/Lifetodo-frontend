import React, { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import "../style/pages/Skills.scss";
import htmlImg from "../images/tokens/html.png";
import cssImg from "../images/tokens/css.png";
import jsImg from "../images/tokens/javascript.png";
import reactImg from "../images/tokens/react.png";
import nodeImg from "../images/tokens/nodejs.png";
import mongoImg from "../images/tokens/mongodb.png";
import git from "../images/tokens/git.png";
import copyImg from "../images/tokens/copywriting.png";
import wpImg from "../images/tokens/wordpress.png";
import blImg from "../images/tokens/blender.png";
import btImg from "../images/tokens/boot.png";
import sassImg from "../images/tokens/sass.png";
import exImg from "../images/tokens/ex.png";
import monImg from "../images/tokens/mon.png";
import aiImg from "../images/tokens/ai.png";
import psImg from "../images/tokens/ps.png";
import seoImg from "../images/tokens/seo.png";

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");

  // content per tab

  const renderTabContent = useMemo(() => {
    switch (activeTab) {
      case "frontend":
        return (
          <>
            <div className="skills-container">
              <h3 id="skills-h3">Languages</h3>
              <div className="languages">
                <div className="skill-badge">
                  <img src={htmlImg} alt="HTML Logo" />
                  <span>HTML</span>
                </div>
                <div className="skill-badge">
                  <img src={cssImg} alt="CSS Logo" />
                  <span>CSS</span>
                </div>
                <div className="skill-badge">
                  <img src={jsImg} alt="JavaScript Logo" />
                  <span>JavaScript</span>
                </div>
              </div>

              <h3 id="skills-h3">Libraries</h3>
              <div className="libraries">
                <div className="skill-badge">
                  <img src={reactImg} alt="React Logo" />
                  <span>ReactJS</span>
                </div>
                <div className="skill-badge">
                  <img src={sassImg} alt="Sass Logo" />
                  <span>Sass</span>
                </div>
                <div className="skill-badge">
                  <img src={btImg} alt="Bootstrap Logo" />
                  <span>Bootstrap</span>
                </div>
                <div className="skill-badge">
                  <img src={git} alt="Git logo" />
                  <span>Git</span>
                </div>
                {/*                 <div className="skill-badge">
                  <img src={axImg} alt="Axios logo" />
                  <span>Axios</span>
                </div> */}
              </div>
            </div>
          </>
        );
      case "backend":
        return (
          <>
            <div className="skills-container">
              <h3 id="skills-h3">Languages</h3>
              <div className="languages">
                <div className="skill-badge">
                  <img src={jsImg} alt="JavaScript Logo" />
                  <span>JavaScript</span>
                </div>
              </div>

              <h3 id="skills-h3">Libraries - Database</h3>
              <div className="libraries">
                <div className="skill-badge">
                  <img src={nodeImg} alt="Node Logo" />
                  <span>NodeJS</span>
                </div>
                <div className="skill-badge">
                  <img src={exImg} alt="Express Logo" />
                  <span>Express</span>
                </div>
                <div className="skill-badge">
                  <img src={mongoImg} alt="Mongo logo" />
                  <span>MONGO DB</span>
                </div>
                <div className="skill-badge">
                  <img src={monImg} alt="Mongoose logo" />
                  <span>MONGOOSE</span>
                </div>
              </div>
            </div>
          </>
        );
      case "extra":
        return (
          <>
            <div className="skills-container">
              <h3 id="skills-h3">Blogging</h3>
              <div className="extra">
                <div className="skill-badge">
                  <img src={wpImg} alt="WORDPRESS Logo" />
                  <span>WORDPRESS</span>
                </div>
                <div className="skill-badge">
                  <img src={copyImg} alt="COPYWRITING logo" />
                  <span>COPYWRITING</span>
                </div>
                <div className="skill-badge">
                  <img src={seoImg} alt="SEO logo" />
                  <span>SEO</span>
                </div>
              </div>

              <h3 id="skills-h3">Graphic</h3>
              <div className="graphic">
                <div className="skill-badge">
                  <img src={psImg} alt="PHOTOSHOP logo" />
                  <span>PHOTOSHOP</span>
                </div>
                <div className="skill-badge">
                  <img src={aiImg} alt="ILLUSTRATOR logo" />
                  <span>ILLUSTRATOR</span>
                </div>
                <div className="skill-badge">
                  <img src={blImg} alt="BLENDER logo" />
                  <span>BLENDER</span>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  }, [activeTab]);

  // rendering elements

  return (
    <>
      <Navbar />
      <>
        <div className="mainAbout mainSkills">
          <div id="aboutTitle">
            <h1>Skills</h1>
          </div>
          {renderTabContent}
        </div>

        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab-link ${activeTab === "frontend" ? "active" : ""}`}
              onClick={() => setActiveTab("frontend")}
            >
              Frontend
            </button>
            <button
              className={`tab-link ${activeTab === "backend" ? "active" : ""}`}
              onClick={() => setActiveTab("backend")}
            >
              Backend
            </button>
            <button
              className={`tab-link ${activeTab === "extra" ? "active" : ""}`}
              onClick={() => setActiveTab("extra")}
            >
              Other
            </button>
          </div>
        </div>
      </>
    </>
  );
}
