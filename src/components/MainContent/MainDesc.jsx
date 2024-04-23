import React from 'react';
import styles from './Main_desc.module.css';
import Counter from '../CounterNo/Counter';
function Main_desc() {
    return (
        <>
            <div className={styles.description_block}>
                <h2 className={styles.heading}>
                    Get your hair<br />
                    transplant grafts<br />
                    & global pricing
                </h2>
            </div>
            <div>
                <Counter />
            </div>
        </>
    );
}

export default Main_desc;
