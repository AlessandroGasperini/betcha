import { Grid, Button } from "@mui/material";
import styles from "./ChangeModal.module.css"

function ChangeModal(props) {
    return (
        <Grid className={styles.modalContainer}>
            <article>
                <h1 className={styles.text}>Är du säker på att du vill ändra ditt bet?</h1>
                <article>
                    <Button onClick={() => props.removeAndChange(props.displayBet.category)} color="success" variant="contained" size="small">Ja</Button>
                    <Button onClick={() => props.setRemoveCheck(false)} color="error" size="small" variant="contained" >Ångra</Button>
                </article>
            </article>
        </Grid>
    );
}

export default ChangeModal;