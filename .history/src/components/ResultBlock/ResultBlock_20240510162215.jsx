import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import styles from "../ResultBlock/Result_block.module.css"

const ResultBlock = ({onNext}) => {

  const [ResultValue2, setResultValue2] = useState('10% Non-Refundable');
  const [ResultValue3, setResultValue3] = useState('20% discount');
  
  const [resultData, setResultData] = useState(null);
  const [norwoodStageValue, setNorwoodStageValue] = useState(null);

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
        let totalCost = 0;
        let minStageValue = 0; // Initialize minimum stage value to a very large number
        let maxStageValue = 0; // Initialize maximum stage value to 0
        let norwoodStage = null; // Initialize norwood stage to null
  
        // Iterate over hair zones from cookies
        hairZonesFromCookie.forEach(zone => {
          // Find matching zone from API response
          const matchedZone = data.zones.find(apiZone => apiZone.zones === zone.Hair_Zone);
  
          // If a matching zone is found, accumulate the cost based on severity
          if (matchedZone) {
            // Determine cost based on severity
            let cost;
            switch (zone.Severity) {
              case 'Minimal':
                cost = parseInt(matchedZone.mild);
                break;
              case 'Moderate':
                cost = parseInt(matchedZone.moderate);
                break;
              case 'Severe':
                cost = parseInt(matchedZone.severe);
                break;
              default:
                cost = 0;
            }
  
            // Add cost to totalCost
            totalCost += cost;
          }
  
          // Find corresponding stage for the zone
          const matchedStage = data.norwood_stages.find(stage => stage.zones === zone.Hair_Zone);
  
          if (matchedStage) {
            // Extract the severity range for the selected zone
            let severityValue;
            switch (zone.Severity) {
              case 'Minimal':
                severityValue = matchedStage.mild;
                break;
              case 'Moderate':
                severityValue = matchedStage.moderate;
                break;
              case 'Severe':
                severityValue = matchedStage.severe;
                break;
              default:
                severityValue = "0-0";
            }
  
            // Split the severity range
            const [min, max] = severityValue.split('-').map(val => parseInt(val));
            // Update minStageValue if the current min is less than the stored min
            minStageValue += min;
            // Update maxStageValue if the current max is greater than the stored max
            maxStageValue += max;

            console.log(matchedStage.nw_stage_value);
            
  
            // Check if the calculated stage range falls within the nw_stage_value range
            if (minStageValue >= parseInt(matchedStage.nw_stage_value.split('-')[0]) &&
                maxStageValue <= parseInt(matchedStage.nw_stage_value.split('-')[1])) {
              // Set the corresponding norwood_stage value
              norwoodStage = matchedStage.norwood_stage;

              console.log('norwoodStage');
              console.log(norwoodStage);

              
            }
          }
        });
  
        // Calculate the total stage range
        const totalMinStageValue = minStageValue;
        const totalMaxStageValue = maxStageValue;
  
        // Update state with total cost and stage range
        setResultData(totalCost);
        setNorwoodStageValue(norwoodStage ? norwoodStage : `${totalMinStageValue}-${totalMaxStageValue}`);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [hairZonesFromCookie, skinToneFromCookie, hairTypeFromCookie, hairColorFromCookie]);
  
  
  

    const calculatePricePerGraft = (totalCost) => {
      let pricePerGraft;
      if (totalCost < 1000) {
        pricePerGraft = 8; // $8/g
      } else if (totalCost >= 1001 && totalCost <= 2000) {
        pricePerGraft = 6.5; // $6.50/g
      } else {
        pricePerGraft = 5; // $5/g
      }
      return pricePerGraft;
    };

    // Calculate final estimated cost based on price per graft
    const finalEstimatedCost = resultData ? resultData * calculatePricePerGraft(resultData) : null;
  
  return (
    <>
      <div className={styles.result_module}>
        <div className="global_small_container">
          <div className={styles.result_content_block}>

            <p>According to our calculations, you are Stage {norwoodStageValue} on the Norwood Scale, and your Hair Restoration Procedure will need around {resultData} number of grafts to completely restore your hair.</p>

            <p>The total cost of a FUE NeoGraft restoration of this level of hair loss is estimated to be  <span><strong> $ {finalEstimatedCost}</strong></span>. </p>

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