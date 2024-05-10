import React, { useState, useEffect } from 'react';
import styles from "../ResultBlock/Result_block.module.css";

const ResultBlock = ({ onNext }) => {
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    fetch('https://yourdomain.com/wp-json/custom-api/v1/data')
      .then(response => response.json())
      .then(data => {
        setResultData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array to fetch data only once when the component mounts

  return (
    <>
      <div className={styles.result_module}>
        <div className="global_small_container">
          <div className={styles.result_content_block}>
            {/* Your other content */}
            {/* Use resultData to display data from the API */}
            {resultData && (
              <>
                <p>The total cost of a FUE NeoGraft restoration of this level of hair loss is estimated to be <span><strong>{resultData.zones}</strong></span>. </p>
                {/* Display other data from resultData */}
              </>
            )}
          </div>
          <div className={styles.resultblock_button}>
            <button className="bb_black_button" onClick={onNext}>I'm ready to restore my confidence</button>
          </div>
        </div>
      </div>
      <div className={styles.result_cta_module}>
        <div className="global_small_container">
          <h4>I would like to schedule a free consultation or have a staff member contact me for more information.</h4>
          <div className={styles.resultblock_button}>
            <button className="bb_black_button">Please, contact me</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultBlock;
