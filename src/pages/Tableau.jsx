import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import style from "../styles/otherprojects.module.css";
import FadeIn from "../components/FadeIn";
import TableauEmbed from "../components/TableauEmbed";

const Tableau = () => {
    return (
        <>
        <FadeIn duration={1000} delay={100}>
        <Wrapper className="tableau-section">
                <h2>Tableau - Data Visualization</h2>
                <h3>2023 in Tornadoes - From a Data Storytelling Perspective</h3>      
                <p>Taken from data recorded by the NOAA, this dashboard shows critical data regarding tornadic activity in the United States in 2023.</p>
                <br />
                <TableauEmbed />        
        </Wrapper>

        </FadeIn>
        </>
    )
}
export default Tableau;