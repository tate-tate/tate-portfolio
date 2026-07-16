import Wrapper from "../components/Wrapper";
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
                    <h3 className="h3">I'm a Data Visualization architect and Full Stack Web Developer.</h3>                <p>Use the navigation bar above to view my works, both past and present; and to get in touch!</p>
                </FadeIn>
                <div className={style.imageContainer}>
                    <FadeIn duration={1000} delay={1600}><img src={seniorphoto} alt="Senior Photo" className={style.homepagepicture} /> </FadeIn>
                    <FadeIn duration={1000} delay={1700}><img src={camera} alt="Camera" className={style.homepagepicture}/> </FadeIn>
                    <FadeIn duration={1000} delay={1800}><img src={garage} alt="Parking Garage" className={style.homepagepicture}/> </FadeIn>
                </div>
                <br />
                <p className={style.infoText}><b>My Development Toolkit: </b>Python, SQL, HTML/CSS, Bootstrap 5, PHP, JavaScript, D3, React, ASP.NET</p>
                <p className={style.infoText}><b>My Softwares, Tools, Methodologies: </b>Tableau, Microsoft Power BI, Adobe Software Suite, Microsoft 365 Suite, Visual Paradigm, Google SketchUp, Google Software Suite, Visual Studio, UML, SCRUM</p>

                
            </Wrapper>
        </Wrapper>
    )
}
export default HomePage;