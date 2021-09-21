import styles from "./StartMenu.module.css";

function StartMenu ({isPvP, setIsPvP, playerA, setPlayerA, playerB, setPlayerB, startGame}) {
    return (
        <div className={styles.startMenu}>
            <div>
                <label htmlFor="pvp">2 Player</label>
                <input
                    id="pvp"
                    type="checkbox"
                    checked={isPvP}
                    onChange={e => setIsPvP(e.target.checked)}
                />
            </div>
            <input
                type="text"
                placeholder="Player A Name"
                value={playerA}
                onInput={e => setPlayerA(e.target.value)}
            />
            {isPvP &&
                <input
                    type="text"
                    placeholder="Player B Name"
                    value={playerB}
                    onInput={e => setPlayerB(e.target.value)}
                />
            }
            <button onClick={startGame}>Start Game</button>
        </div>
    );
}

export default StartMenu;