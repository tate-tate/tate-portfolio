import TableauEmbed from "../components/TableauEmbed";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import React from "react";
import currentworksVs from "../assets/currentworks-vs.png";
import style from "../styles/currentworks.module.css";

const CurrentWorks = () => {
    return (
        <>
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
                <h2>JavaScript (React + Vite)</h2>
                <h3>Portfolio Site - This Site!</h3>
                <p>My portfolio site previous to this one was simply HTML and Bootstrap CSS. While simple and easy to integrate, it didn't have the reactivity I was looking for, and its styling was lacking. When tasked to find a project in a Web Apps class, I decided to revamp my portfolio to use Javascript, for ease of future expansion and better interactivity. I am probably still figuring out all of the CSS, bear with me!</p>
                <br />
                <p>Here is a screenshot of the code in Visual Studio Code: Just as proof that I'm actually working on it myself :P</p>
                <img src={currentworksVs} alt="Visual Studio Code for this Website" className={style.vsphoto}/>
            </Wrapper>
            <Wrapper>
                <h2>Data Visualization with D3 js</h2>
                <h3>Coming Soon</h3>
                <p>In my studies at Purdue, I am currently learning D3. Check back soon for a viz!</p>
            </Wrapper>
        </>
    )
}
export default CurrentWorks;