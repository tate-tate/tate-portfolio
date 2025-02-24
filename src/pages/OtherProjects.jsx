import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import SketchfabEmbed1 from "../components/SketchfabEmbed1";
import SketchfabEmbed2 from "../components/SketchfabEmbed2";
import style from "../styles/otherprojects.module.css";

const OtherProjects = () => {
    return (
        <>
        <Wrapper>
            <h1>Other Projects</h1>
            <p>This section is for any relavent past projects, wether it be from my studies at Purdue or on my own personal time.</p>
        </Wrapper>
        <Wrapper>
            <h2>Autodesk Maya - 3D Modeling</h2>
            <p>During my time at Purdue, I took an introductory course into 3D Modeling. Here are some of my favorite projects.</p>
            </Wrapper>
            <Wrapper>
            <SketchfabEmbed1 />
            <p className={style.caption}>Doric Pillar - Modeled after the Centennial Monument in Corning, NY.</p>
        </Wrapper>
        <Wrapper>
            <SketchfabEmbed2 />
            <p className={style.caption}>3D Animated Graph - # of Tornadoes by Month in 2010</p>
        </Wrapper>
        </>
    )
}
export default OtherProjects;