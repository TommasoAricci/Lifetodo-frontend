import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "../style/pages/Work.scss";
import "../style/pages/About.scss";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"; */
import { useStore } from "../store";

export default function Skills() {
  const [activeTab, setActiveTab] = useState("works");
  const { setIsOpen } = useStore();

  useEffect(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  // content per tab

  const renderTabContent = () => {
    switch (activeTab) {
      case "works":
        return (
          <>
            <VerticalTimeline animate={false}>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: "#FFD700", color: "black" }}
                contentArrowStyle={{
                  borderRight: "7px solid  #03a9f4",
                }}
                date="2024 - present"
                iconStyle={{ background: "#03a9f4", color: "#fff" }}
                position="left" // A sinistra
              >
                <h3 className="vertical-timeline-element-title">
                  Frontend Developer
                </h3>
                <p>Erbrand srl and Technip</p>
                {/*                 <div className="infoIcon">
                  <FontAwesomeIcon icon={faCircleInfo} />
                </div> */}
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "#162129",
                  color: "#fff",
                }}
                date="2010 - 2011"
                iconStyle={{ background: "#03a9f4", color: "#fff" }}
                position="right" // A destra
              >
                <h3 className="vertical-timeline-element-title">
                  Art Director
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  San Francisco, CA
                </h4>
                <p>
                  Creative Direction, User Experience, Visual Design, SEO,
                  Online Marketing
                </p>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "#162129",
                  color: "#fff",
                }}
                date="2008 - 2010"
                iconStyle={{ background: "#03a9f4", color: "#fff" }}
                position="left" // A sinistra
              >
                <h3 className="vertical-timeline-element-title">
                  Web Designer
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Los Angeles, CA
                </h4>
                <p>User Experience, Visual Design</p>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "#162129",
                  color: "#fff",
                }}
                date="2006 - 2008"
                iconStyle={{ background: "#03a9f4", color: "#fff" }}
                position="right" // A destra
              >
                <h3 className="vertical-timeline-element-title">
                  Web Designer
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  San Francisco, CA
                </h4>
                <p>User Experience, Visual Design</p>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </>
        );
      case "education":
        return (
          <>
            <>
              <VerticalTimeline animate={false}>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{ background: "#03a9f4", color: "#fff" }}
                  contentArrowStyle={{
                    borderRight: "7px solid  #03a9f4",
                  }}
                  date="2023 - present"
                  iconStyle={{ background: "#03a9f4", color: "#fff" }}
                  position="left" // A sinistra
                >
                  <h3 className="vertical-timeline-element-title">
                    Start2Impact School
                  </h3>
                  <p>Full Stack Developer Course</p>
                  {/*                 <div className="infoIcon">
                  <FontAwesomeIcon icon={faCircleInfo} />
                </div> */}
                </VerticalTimelineElement>

                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{
                    background: "#162129",
                    color: "#fff",
                  }}
                  date="2010 - 2011"
                  iconStyle={{ background: "#03a9f4", color: "#fff" }}
                  position="right" // A destra
                >
                  <h3 className="vertical-timeline-element-title">
                    Art Director
                  </h3>
                  <h4 className="vertical-timeline-element-subtitle">
                    San Francisco, CA
                  </h4>
                  <p>
                    Creative Direction, User Experience, Visual Design, SEO,
                    Online Marketing
                  </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{
                    background: "#162129",
                    color: "#fff",
                  }}
                  date="2008 - 2010"
                  iconStyle={{ background: "#03a9f4", color: "#fff" }}
                  position="left" // A sinistra
                >
                  <h3 className="vertical-timeline-element-title">
                    Web Designer
                  </h3>
                  <h4 className="vertical-timeline-element-subtitle">
                    Los Angeles, CA
                  </h4>
                  <p>User Experience, Visual Design</p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{
                    background: "#162129",
                    color: "#fff",
                  }}
                  date="2006 - 2008"
                  iconStyle={{ background: "#03a9f4", color: "#fff" }}
                  position="right" // A destra
                >
                  <h3 className="vertical-timeline-element-title">
                    Web Designer
                  </h3>
                  <h4 className="vertical-timeline-element-subtitle">
                    San Francisco, CA
                  </h4>
                  <p>User Experience, Visual Design</p>
                </VerticalTimelineElement>
              </VerticalTimeline>
            </>
          </>
        );
      default:
        return null;
    }
  };

  // rendering elements

  return (
    <>
      <Navbar />
      <>
        <div className="mainAbout mainWork">
          <div id="aboutTitle">
            <h1>experience</h1>
          </div>
          {renderTabContent()}
        </div>
        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab-link ${activeTab === "works" ? "active" : ""}`}
              onClick={() => setActiveTab("works")}
            >
              Works
            </button>
            <button
              className={`tab-link ${
                activeTab === "education" ? "active" : ""
              }`}
              onClick={() => setActiveTab("education")}
            >
              Education
            </button>
          </div>
        </div>
      </>
    </>
  );
}
