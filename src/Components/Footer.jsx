import { Box } from "@mui/system";
import styles from "./Footer.module.css"
import trophyIcon from "../Assets/trophyImg.png"


function Footer(props) {

    return (
        <Box className={styles.footerContainer}>
            <h2>{props.userName.teamName}</h2>

            <article className={styles.position}>
                <h5>22</h5>
                <img src={trophyIcon} alt="" />
            </article>
        </Box>
    );
}

export default Footer;