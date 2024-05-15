import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import styles from "../ResultBlock/Result_block.module.css"
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const ResultBlock = ({onNext}) => {

  const [ResultValue2, setResultValue2] = useState('10% Non-Refundable');
  const [ResultValue3, setResultValue3] = useState('20% discount');
  const [loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState(null);
  const [norwoodStageValue, setNorwoodStageValue] = useState(null);
  const [getEmail, setEmail] = useCookies(['UserEmail']);


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
        let nearestStageValue = null; // Initialize nearest stage value to null
  
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
          }
        });
  
        // Calculate the total stage range
        const totalMinStageValue = minStageValue;
        const totalMaxStageValue = maxStageValue;

        console.log('stages');
        console.log(`${totalMinStageValue}-${totalMaxStageValue}`);

        // Find the nearest stage value
        const norwoodMidpoint = (totalMinStageValue + totalMaxStageValue) / 2;
        let minDistance = Infinity;
        data.norwood_stages.forEach(stage => {
          const [min, max] = stage.nw_stage_value.split('-').map(val => parseInt(val));
          const midpoint = (min + max) / 2;
          const distance = Math.abs(norwoodMidpoint - midpoint);
          if (distance < minDistance) {
            minDistance = distance;
            nearestStageValue = stage.norwood_stage;
          }
        });
  
        // Update state with total cost and nearest stage value
        setResultData(totalCost);
        setNorwoodStageValue(nearestStageValue);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
      
  }, [hairZonesFromCookie, skinToneFromCookie, hairTypeFromCookie, hairColorFromCookie]);

  
  const handleHairCheckout = async () => {
    setLoading(true);
    // Call the API to add the products to the WooCommerce cart
  
    const url = `${process.env.REACT_APP_URL}/wp-json/wc/v3/products`;
    const consumerKey = 'ck_d855785985899f76845dda1b1f6beb579794a568';
    const consumerSecret = 'cs_cba22b8f4628eec94fe13659c652a66f93a3c42c';
  
    const totalPrice = finalEstimatedCost; // Assuming finalEstimatedCost is the total price
    const depositAmount = totalPrice * 0.1; // 10% of the total price
    const discount = totalPrice * 0.1; // Calculating the discount
  
    const data = {
      name: `${"Stage" + norwoodStageValue + "-" + skinToneFromCookie + "/" + hairTypeFromCookie + "/" + hairColorFromCookie }`,
      type: 'simple',
      regular_price: `${depositAmount}`, // Set the deposit amount as the regular price
      description: `${"Stage" + norwoodStageValue + "-" + skinToneFromCookie + "/" + hairTypeFromCookie + "/" + hairColorFromCookie }`,
      short_description: `You're getting a 10% discount! You're paying ${depositAmount}. Total price: ${totalPrice}.`, // Short description with discount information
    };
  
    try {
      const response = await axios.post(url, data, {
        auth: {
          username: consumerKey,
          password: consumerSecret,
        },
      });
  
      if (response.data) {
        const url =  `${process.env.REACT_APP_URL}/?add-to-cart=${response.data.id}&quantity=1`;
  
        // Create a temporary iframe to load the URL
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        iframe.src = url;
  
        // Wait for the iframe to load, then remove it and proceed to the next product
        iframe.onload = () => {
          document.body.removeChild(iframe);
          setLoading(false);
            window.location.href = `${process.env.REACT_APP_URL}/cart/`;        
        };
      }
  
      return response.data;
  
    } catch (error) {
      console.error('Error creating product:', error);
      return null;
    }
  };
  
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
    console.log(typeof finalEstimatedCost);
    
   

    const handleContactMe = async () => {
      const emailData = {
        to: getEmail.UserEmail, // Change this to your recipient email address
        subject: 'Hair Restoration Inquiry',
        body: `
          According to our calculations, you are Stage ${norwoodStageValue} on the Norwood Scale, 
          and your Hair Restoration Procedure will need around ${resultData} number of grafts to completely restore your hair.
    
          The total cost of a FUE NeoGraft restoration of this level of hair loss is estimated to be $${finalEstimatedCost}.
    
          Our hair restoration procedures are cutting-edge, and this price includes biological booster injections during the procedure and all follow-up appointments for one year.
    
          Please note that the output provided by this online estimator is intended for informational purposes only and should not be considered a firm quote or offer. While we have designed this tool to be as accurate as possible, drawing on extensive research and the expertise of qualified physicians, the complexity and uniqueness of individual circumstances mean that a definitive estimate can only be provided following an in-person consultation. We encourage you to use this tool as a preliminary guide and look forward to further assisting you with a detailed consultation.
    
          *Final cost will be calculated, and the deposit will be adjusted at your in-patient consultation.
        `
      };
    
      try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/wp-json/bmh-hair-calculator/v1/send-email`, emailData); // Assuming you have a server endpoint to handle email sending
        console.log(response.data); // Log the response from the server
        toast.success("Email sent successfully", {
          position: "top-center"
        });
      } catch (error) {
        console.error('Error sending email:', error);
        toast.error("Failed to send email", {
          position: "top-center"
        });
      }
    };

    
  return (
    <div>
      {loading ? (
        <div id="loading-bar-spinner" className="spinner"><div className="spinner-icon"></div></div>
      ) : (
    <>
      <div className={styles.result_module}>
      <ToastContainer />
        <div className="global_small_container">
          <div className={styles.result_content_block}>

            <p>According to our calculations, you are <span><strong> Stage {norwoodStageValue}</strong> </span>on the Norwood Scale, and your Hair Restoration Procedure will need around {resultData} number of grafts to completely restore your hair.</p>

            <p>The total cost of a FUE NeoGraft restoration of this level of hair loss is estimated to be  <span><strong> $ {finalEstimatedCost}</strong></span>. </p>

            <p>Our hair restoration procedures are cutting-edge, and this price includes biological booster injections during the procedure and all follow-up appointments for one year. </p>

            <p>"Please note that the output provided by this online estimator is intended for informational purposes only and should not be considered a firm quote or offer. While we have designed this tool to be as accurate as possible, drawing on extensive research and the expertise of qualified physicians, the complexity and uniqueness of individual circumstances mean that a definitive estimate can only be provided following an in-person consultation. We encourage you to use this tool as a preliminary guide and look forward to further assisting you with a detailed consultation."</p>

            <p>Place a <span><strong>{ResultValue2}</strong></span> Deposit now for an instant <span><strong>{ResultValue3}</strong></span> on your Hair Restoration Procedure.</p>

            <p>*Final cost will be calculated, and the deposit will be adjusted at your in-patient consultation.</p>

            <p>I am ready to place a deposit and schedule my Hair Restoration.</p>
          </div>
          <div className={styles.resultblock_button}>
            <button className="bb_black_button" onClick={() => handleHairCheckout()}>I'm ready to restore my confidence</button>
          </div>
        </div>
      </div>
      <div className={styles.result_cta_module}>
        <div className="global_small_container">
          <h4>I would like to schedule a free consultation or have a staff member contact me for more information.</h4>
          <div className={styles.resultblock_button}>
          <button className="bb_black_button" onClick={handleContactMe}>Please, contact me</button>
          </div>
        </div>
      </div>
    </>
     )}
     </div>
  )
}

export default ResultBlock;