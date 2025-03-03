import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import style from "../styles/personal.module.css";
import gary1 from "../assets/gary1.jpg";
import gary2 from "../assets/gary2.jpg";
import gary3 from "../assets/gary3.jpg";
import gary4 from "../assets/gary4.jpg";


const Personal = () => {
    return (
        <Wrapper>
            <Wrapper>
                <h1>Personal</h1>
                <h3>More about me.</h3>
                <p>I have devoted both my personal life and professional career to absorbing all technology has to offer, wether it be the next new piece of software, database systems, or simply just building myself a new computer. However, I have hobbies (sometimes!).</p>
            </Wrapper>
            <Wrapper>
                <h2>Photography</h2>
                <p>In my (limited) free time, I enjoy taking photos. I shoot both on both 35mm film and digital, but mostly digital these days- darkroom is expensive. Below are some of my best shots.</p>
            </Wrapper>
            <Wrapper>
                <h2>Gary, IN - City Methodist Church</h2>
                <div className={style.imageContainer}>
                    <img src={gary1} alt="Gary IN - 1" className={style.personalPicture} />
                    <img src={gary2} alt="Gary IN - 2" className={style.personalPicture}/>
                </div>
                <div className={style.imageContainer}>
                    <img src={gary3} alt="Gary IN - 3" className={style.personalPicture}/>
                    <img src={gary4} alt="Gary IN - 4" className={style.personalPicture}/>
                </div>
            </Wrapper>
        </Wrapper>
    )
}
export default Personal;