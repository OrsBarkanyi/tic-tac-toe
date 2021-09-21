import React, { useState } from "react";
import styles from './App.module.css';
import Game from "./game/Game";

function App() {
    const [isPvP, setIsPvP] = useState(true)
    const [playerA, setPlayerA] = useState("");
    const [playerB, setPlayerB] = useState("");
    const [startGame, setStartGame] = useState(false);
    const [results, setResults] = useState([])

    return (
        <div className={styles.app}>
            {startGame ?
                <Game
                    isPvP={isPvP}
                    playerA={playerA}
                    playerB={playerB}
                    onResult={result => setResults([...results, result])}
                />
                :
                <div className={styles.StartMenu}>
                    <label htmlFor="pvp">PvP</label>
                    <input id="pvp" type="checkbox" checked={isPvP} onChange={e => setIsPvP(e.target.checked)}/>

                    <input type="text" placeholder="Player A Name" value={playerA} onInput={e => setPlayerA(e.target.value)} />
                    {isPvP &&
                        <input type="text" placeholder="Player B Name" value={playerB} onInput={e => setPlayerB(e.target.value)} />
                    }

                    <button onClick={() => setStartGame(true)}>Start Game</button>
                </div>
            }
            <div className={styles.results}>
                {results.map((result, i) =>
                    <div>
                        <span>Game {i+1}:</span>
                        <span>{result}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
