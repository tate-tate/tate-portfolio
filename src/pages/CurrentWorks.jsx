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
                <h1>Current Works - As of 2025</h1>
                <p>This page is a collection of projects I have recently completed, or am in the process of completing.</p>
            </Wrapper>
            <Wrapper>
                <h2>Tableau - Data Visualization</h2>
                <h3>2023 in Tornadoes - From a Data Storytelling Perspective</h3>      
                <p>Taken from data recorded by the NOAA, this dashboard shows critical data regarding tornadic activity in the United States in 2023.</p>
                <br />
                <TableauEmbed />        
            </Wrapper>
            <Wrapper>
                <h2>JavaScript JSX (React + Vite)</h2>
                <h3>Portfolio Site - This Site!</h3>
                <p>My portfolio site previous to this one was simply HTML and Bootstrap CSS. While simple and easy to integrate, it didn't have the reactivity I was looking for, and its styling was lacking. When tasked to find a project in a Web Apps class, I decided to revamp my portfolio to use Javascript, for ease of future expansion and better interactivity. I am probably still figuring out all of the CSS, bear with me!</p>
                <br />
                <p>Here is a screenshot of the code in Visual Studio Code: Just as proof that I'm actually working on it myself :P</p>
                <img src={currentworksVs} alt="Visual Studio Code for this Website" className={style.vsphoto}/>
                <p><strong>Tools Used: </strong>Visual Studio Code, Vite + React, Javascript, CSS, HTML</p>
            </Wrapper>
            <Wrapper>
                <h2>Data Visualization with D3.js</h2>
                <h3>April 2025</h3>
                <p>In my studies at Purdue, I am in the process of completing a viz using d3, which can be viewed from the dropdown in the navbar above. Here are some more specific details:</p>
                <p>Originally, this project was supposed to be completely seperate from this portfolio (a different site using HTML and some JS files). However, I decided to find out how to integrate it into my existing website. This proved more difficult than I thought, however, because React + Vite doesn't have native support for CSV files, and Javascript structuring is much more complex than HTML. However, after many headaches and brain breaks, I've (mostly) successfully integrated it here.</p>
                <p><strong>Current Issues: </strong>Tooltips don't always show correctly on the map. Light/Dark mode isn't working properly. I am working on these!</p>
                <p><strong>Tools Used: </strong>Visual Studio Code, Vite + React, RollupCSV, Javascript, CSS, Excel</p>
            </Wrapper>
        </FadeIn>
        </>
    )
}
export default CurrentWorks;