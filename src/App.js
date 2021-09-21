import React, { useState } from "react";
import Game from "./game/Game";
import Results from "./results/Results";
import StartMenu from "./startMenu/StartMenu";

function App() {
    const [isPvP, setIsPvP] = useState(true)
    const [playerA, setPlayerA] = useState("");
    const [playerB, setPlayerB] = useState("");
    const [startGame, setStartGame] = useState(false);
    const [results, setResults] = useState([])

    return (
        <div className="app">
            {!startGame ?
                <StartMenu
                    isPvP={isPvP}
                    setIsPvP={setIsPvP}
                    playerA={playerA}
                    setPlayerA={setPlayerA}
                    playerB={playerB}
                    setPlayerB={setPlayerB}
                    startGame={() => setStartGame(true)}
                />
                :
                <>
                    <Game
                        isPvP={isPvP}
                        playerA={playerA}
                        playerB={playerB}
                        onResult={result => setResults([...results, result])}
                    />
                    <Results results={results}/>
                </>
            }
        </div>
    );
}

export default App;
