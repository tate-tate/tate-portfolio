import Wrapper from "../../components/Wrapper";
import { Link } from "react-router-dom";
import style from "../../styles/uxstudio.module.css";
import proj1mindmap from "./proj1-mindmap.png";
import proj1affinity from "./proj1-affinity.png";
import FadeIn from "../../components/FadeIn";
import React from "react";


const UXstudio = () => {
    return (
        <>
        <FadeIn duration={1000} delay={100}>
        <Wrapper>
            <h1>UX Studio Projects</h1>
            <p>This section contains projects completed for the UX Studio course at Purdue University.</p>
        </Wrapper>
        </FadeIn>
        <Wrapper>
            <h2>Project 1 - Starship Analysis + Redesign</h2>
            <p>For this project, we were up in the air with several ideas for repurposing starships, until we landed on a campus guide / accessibility aide. The idea is that users could request a guide or aide depending on their needs on the App, and it would be their "buddy" and lead them to their destination. It would also be able to function as an automated tour guide for prospective and new students around campus. </p>
            <h3>Mindmap</h3> <br />
            <div className={style.imageContainer}>
                <img src={proj1mindmap} alt="Project 1 Mindmap" className={style.responsiveImage} />
            </div> <br />
            <h3>Target Audience</h3> <br />
            <ul>
            <li>Looking to assist and aid those who may have physical disabilities, visual impairments, etc.</li>
            <li>Not just for students, could assist faculty, staff, and even visitors who are coming to campus as well</li>
            <li>Hoping to impact campus in a positive way, and not just focusing on a specific set of those with disabilities (not just students, or just faculty)</li>
            </ul> <br />
            <h3>Affinity Diagram</h3> <br />
            <div className={style.imageContainer}>
                <img src={proj1affinity} alt="Project 1 Affinity Diagram" className={style.responsiveImage} />
            </div>

        </Wrapper>
        <Wrapper>
            <h2>Projects 2/3 - Martie, the smart shopping app</h2>
            <p>Content here</p>
        </Wrapper>
        </>
    )
}
export default UXstudio;