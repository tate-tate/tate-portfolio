import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import style from "../styles/uxstudio.module.css";
import FadeIn from "../components/FadeIn";
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
            <p>Content Here</p>
        </Wrapper>
        <Wrapper>
            <h2>Projects 2/3 - Martie, the smart shopping app</h2>
            <p>Content here</p>
        </Wrapper>
        </>
    )
}
export default UXstudio;