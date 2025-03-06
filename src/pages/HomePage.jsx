import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import style from "../styles/homepage.module.css";
import seniorphoto from "../assets/senior-photo.jpg";
import camera from "../assets/camera.jpg";
import garage from "../assets/parking-garage.jpg";
import FadeIn from "../components/FadeIn";

const HomePage = () => {
    return (
        <Wrapper>
            <Wrapper>
                <FadeIn duration={2000} delay={250}><h1>Hi, <FadeIn duration={2000} delay={750}>I'm Tate Sever.</FadeIn></h1></FadeIn>
                <FadeIn duration={2000} delay={1250}>
                <p>I am a Junior Studying Data Visualization & Information Technology at Purdue University.</p>
                <p>This website serves as both a portfolio of my academic work and a dynamic resume, highlighting the skills I have acquired and continue to develop. With the ever-evolving nature of the technology industry, I am committed to continuous learning and growth.</p>
                <p>Use the navigation bar above to view my works, both past and present; and to get in touch!</p>
                </FadeIn>
                <div className={style.imageContainer}>
                    <FadeIn duration={1000} delay={1600}><img src={seniorphoto} alt="Senior Photo" className={style.homepagepicture} /> </FadeIn>
                    <FadeIn duration={1000} delay={1700}><img src={camera} alt="Camera" className={style.homepagepicture}/> </FadeIn>
                    <FadeIn duration={1000} delay={1800}><img src={garage} alt="Parking Garage" className={style.homepagepicture}/> </FadeIn>
                </div>
                
            </Wrapper>
        </Wrapper>
    )
}
export default HomePage;