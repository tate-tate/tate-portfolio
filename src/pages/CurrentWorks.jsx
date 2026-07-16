import TableauEmbed from "../components/TableauEmbed";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import React from "react";
import currentworksVs from "../assets/currentworks-vs.png";
import currentworksXP from "../assets/portfolio-v3-preview.png";
import style from "../styles/currentworks.module.css";
import FadeIn from "../components/FadeIn";

const CurrentWorks = () => {
    return (
        <>
        <FadeIn duration={1000} delay={100}>
            <Wrapper>
                <h1>Currently Working On:</h1>
                <h3>Experimental Portfolio Site - "OS" style navigation</h3>
                <p><b>Libraries:</b>React Draggable, XP.css, React Reveal</p>
                <p><b>Skills: </b>React, Vite, JavaScript, CSS, HTML</p>
                <p><b>Want to see it for yourself? </b><a href="https://tate-tate.github.io/portfolio/">Click here.</a></p>
                <img src={currentworksXP} alt="Current Site Preview" className={style.currentworksimage} width="100%" />
            </Wrapper>
        </FadeIn>
        </>
    )
}
export default CurrentWorks;