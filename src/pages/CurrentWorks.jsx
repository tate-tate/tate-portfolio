import TableauEmbed from "../components/TableauEmbed";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import React from "react";
import currentworksVs from "../assets/currentworks-vs.png";
import style from "../styles/currentworks.module.css";
import FadeIn from "../components/FadeIn";

const CurrentWorks = () => {
    return (
        <>
        <FadeIn duration={1000} delay={100}>
            <Wrapper>
                <h1>Current Works - As of Dec. 2025</h1>
                <p>This page is a collection of projects I have recently completed, or am in the process of completing.</p>
            </Wrapper>
            <Wrapper>
                <h2>JavaScript JSX (React + Vite)</h2>
                <h3>Portfolio Site - This Site!</h3>
                <p>My portfolio site previous to this one was simply HTML and Bootstrap CSS. While simple and easy to integrate, it didn't have the reactivity I was looking for, and its styling was lacking. When tasked to find a project in a Web Apps class, I decided to revamp my portfolio to use Javascript, for ease of future expansion and better interactivity. I am probably still figuring out all of the CSS, bear with me!</p>
                <br />
                <p>Here is a screenshot of the code in Visual Studio Code: Just as proof that I'm actually working on it myself :P</p>
                <img src={currentworksVs} alt="Visual Studio Code for this Website" className={style.vsphoto}/>
                <p><strong>Tools Used: </strong>Visual Studio Code, Vite + React, Javascript, CSS, HTML</p>
                <p>Currently working on (12/1/2025) - Beginning a redesign, with better interactivity.</p>
            </Wrapper>
            <Wrapper>
                <h2>D3 - Spotify Data Visualization</h2>
                <p>Under Construction (Nov/Dec. 2025). Check Back Soon.</p>
                <p><strong>Tools Used: </strong> Visual Studio Code, React+Vite, Python, Excel, HTML, CSS. </p>
            </Wrapper>
            <Wrapper>
                <h2>Microsoft Customer Experience Team - Site Design</h2>
                <p>Capstone project with the goal of providing a brand redesign for a team within Microsoft. Expected Completion: Apr. 2026. Details will follow.</p>
                <p><strong>Tools Used: </strong> Figma, Canva, Microsoft 365 Suite, Sharepoint, HTML, CSS, Javascript</p>
            </Wrapper>
        </FadeIn>
        </>
    )
}
export default CurrentWorks;