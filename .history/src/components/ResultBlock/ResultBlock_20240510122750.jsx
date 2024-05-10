import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import styles from "../ResultBlock/Result_block.module.css"

const ResultBlock = ({onNext}) => {
  const [ResultValue, SetResultValue] = useState('Y');
  const [ResultValue2, setResultValue2] = useState('10% Non-Refundable');
  const [ResultValue3, setResultValue3] = useState('20% discount');
  
  const [resultData, setResultData] = useState(null);

  // Get values from cookies
  const [gethairZonecookies] = useCookies(["hairZone"]);
  const [getSkinTonecookies] = useCookies(["skinTone"]);
  const [gethairTypecookies] = useCookies(["hairType"]);
  const [gethairColorcookies] = useCookies(["hairColor"]);

  // Extract values from cookies
  const hairZonesFromCookie = gethairZonecookies.hairZone;
  const skinToneFromCookie = getSkinTonecookies.skinTone;
  const hairTypeFromCookie = gethairTypecookies.hairType;
  const hairColorFromCookie = gethairColorcookies.hairColor;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}` + "/wp-json/bmh-hair-modifier-graph/v1/data")
      .then(response => response.json())
      .then(data => {
        // Initialize total cost
        let totalCost = 0;
  
        // Iterate over hair zones from cookies
        hairZonesFromCookie.forEach(zone => {
          // Find matching zone from API response
          const matchedZone = data.zones.find(apiZone => apiZone.zones === zone.Hair_Zone);

          console.log('matchedZone');
          console.log(matchedZone);

          
          
          // If a matching zone is found, accumulate the cost based on severity
          if (matchedZone) {
            // Determine cost based on severity
            let cost;
            switch (zone.Severity) {
              case 'Mild':
                cost = matchedZone.mild;
                break;
              case 'Moderate':
                cost = matchedZone.moderate;
                break;
              case 'Severe':
                cost = matchedZone.severe;
                break;
              default:
                cost = 0;
            }

            log
            // Add cost to totalCost
            totalCost += cost;
          }
        });
  
        // Update state with total cost
        setResultData(totalCost);
        console.log(totalCost);
         
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [hairZonesFromCookie]);
  
  
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