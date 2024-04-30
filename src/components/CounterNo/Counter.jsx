import React, { useRef, useEffect, useState } from 'react';
import { useCountUp } from 'react-countup';
import styles from './Counter.module.css';
import Mask_Group from "../../image/Mask_Group.png";

function Counter() {
  const countUpRef = useRef();
  const [showText, setShowText] = useState(false);

  const { start } = useCountUp({
    start: 19,
    end: 30,
    delay: 1,
    duration: 2,
    onEnd: () => {
      setShowText(true); // Set state to show the text immediately when count-up ends
    },
    ref: countUpRef,
  });

  useEffect(() => {
    start(); // Start the count-up animation when component mounts

    const element = countUpRef.current;
    element.classList.add(styles.animated);
  }, [start]);

  return (
    <div className={styles.counter_with_pattern}>
      <div className={styles.counter}>
        <span className={styles.count_no} ref={countUpRef}></span>
        {showText && (
          <div className={styles.show_counter_text}>seconds</div>
        )}
      </div>
      <div className={styles.pattern_block}>
        <img className={styles.pattern_img} src={Mask_Group} alt="pattern img" />
      </div>
    </div>
  );
}

export default Counter;
