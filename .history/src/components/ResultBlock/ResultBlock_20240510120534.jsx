import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import styles from "../ResultBlock/Result_block.module.css"

const ResultBlock = ({onNext}) => {
  const [ResultValue, SetResultValue] = useState('Y');
  const [ResultValue2, setResultValue2] = useState('10% Non-Refundable');
  const [ResultValue3, setResultValue3] = useState('20% discount');
  
  const [resultData, setResultData] = useState(null);

  const [gethairZonecookies] = useCookies(["hairZone"]);
  const [getSkinTonecookies] = useCookies(["skinTone"]);
  const [gethairTypecookies] = useCookies(["hairType"]);
  const [gethairColorcookies] = useCookies(["hairColor"]);

  const [getHairZones, setHairZones] = useState(gethairZonecookies.hairZone);
  const [getSkinTone, setSkinTone] = useState(getSkinTonecookies.skinTone);
  const [getHairType, setHairType] = useState('20% discount');
  const [ResultValue3, setResultValue3] = useState('20% discount');


  console.log('gethairZonecookies');
        console.log(gethairZonecookies.hairZone);

        console.log('getSkinTonecookies');
        console.log(getSkinTonecookies.skinTone);

        console.log('gethairTypecookies');
        console.log(gethairTypecookies.hairType);

        console.log('gethairColorcookies');
        console.log(gethairColorcookies.hairColor);

  useEffect(() => {
    fetch('https://dev.luckistore.in/build-my-hair/wp-json/bmh-hair-modifier-graph/v1/data')
      .then(response => response.json())
      .then(data => {
        setResultData(data);

        // console.log('data');
        // console.log(data);
      




        
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <div className={styles.result_module}>
        <div className="global_small_container">
          <div className={styles.result_content_block}>

            <p>According to our calculations, you are Stage __ on the Norwood Scale, and your Hair Restoration Procedure will need around X number of grafts to completely restore your hair.</p>

            <p>The total cost of a FUE NeoGraft restoration of this level of hair loss is estimated to be <span><strong>{ResultValue}</strong></span>. </p>

            <p>Our hair restoration procedures are cutting-edge, and this price includes biological booster injections during the procedure and all follow-up appointments for one year. </p>

            <p>"Please note that the output provided by this online estimator is intended for informational purposes only and should not be considered a firm quote or offer. While we have designed this tool to be as accurate as possible, drawing on extensive research and the expertise of qualified physicians, the complexity and uniqueness of individual circumstances mean that a definitive estimate can only be provided following an in-person consultation. We encourage you to use this tool as a preliminary guide and look forward to further assisting you with a detailed consultation."</p>

            <p>Place a <span><strong>{ResultValue2}</strong></span> Deposit now for an instant <span><strong>{ResultValue3}</strong></span> on your Hair Restoration Procedure.</p>

            <p>*Final cost will be calculated, and the deposit will be adjusted at your in-patient consultation.</p>

            <p>I am ready to place a deposit and schedule my Hair Restoration.</p>
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
  )
}

export default ResultBlock;