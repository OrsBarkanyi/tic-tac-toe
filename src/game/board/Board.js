import styles from './Board.module.css';

function Board({squares, onClick}) {
    return (
        <div className={styles.board}>
            {squares.map((value, i) =>
                <button data-value={value} className={styles.square} onClick={onClick.bind(this, i)}>
                    {value}
                </button>
            )}
        </div>
    );
}

export default Board;