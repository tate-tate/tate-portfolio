import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import style from "../styles/homepage.module.css";
import seniorphoto from "../assets/senior-photo.jpg";
import camera from "../assets/camera.jpg";
import garage from "../assets/parking-garage.jpg";

const HomePage = () => {
    return (
        <Wrapper>
            <Wrapper>
                <h1>Hi, I'm Tate Sever.</h1>
                <p>I am a Junior Studying Data Visualization & Information Technology at Purdue University.</p>
                <p>This website serves as both a portfolio of my academic work and a dynamic resume, highlighting the skills I have acquired and continue to develop. With the ever-evolving nature of the technology industry, I am committed to continuous learning and growth.</p>
                <p>Use the navigation bar above to view my works, both past and present; and to get in touch!</p>
                <div className={style.imageContainer}>
                    <img src={seniorphoto} alt="Senior Photo" className={style.homepagepicture} />
                    <img src={camera} alt="Camera" className={style.homepagepicture}/>
                    <img src={garage} alt="Parking Garage" className={style.homepagepicture}/>
                </div>
            </Wrapper>
        </Wrapper>
    )
}
export default HomePage;