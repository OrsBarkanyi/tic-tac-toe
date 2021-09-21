import styles from "./Results.module.css";
import {useState} from "react";

function Results ({results}) {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.results} ${open ? styles.open : ""}`}>
                <h1>Results</h1>
                {results.map((result, i) =>
                    <div>
                        <span>Game {i+1}:</span>
                        <span>{result}</span>
                    </div>
                )}
            </div>
            <span className={styles.handle} onClick={() => setOpen(!open)}>
                {open ? ">" : "<"}
            </span>
        </div>
    );
}

export default Results;