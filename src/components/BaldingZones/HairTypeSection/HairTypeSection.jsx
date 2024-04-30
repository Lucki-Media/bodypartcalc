import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./HairType.module.css";
import Main_desc from "../../MainContent/MainDesc";
import Straight from "../../../image/Straight.png";
import Curly from "../../../image/Curly.png";
import Wavy from "../../../image/Wavy.png";
import Coily from "../../../image/Coily.png";

const HairTypeSection = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/hairColor");
  };
  const handlePrev = () => {
    navigate("/skintone");
  };

  return (
    <div className="global_container">
      <div className={styles.hair_type_section}>
        <div className={styles.left_zone}>
          <Main_desc />
        </div>
        <div className={styles.right_zone}>
          <h3 className={styles.heading}>03. Select Your Hair Type</h3>
          <div className={styles.hair_type_block}>
            <div className={styles.hair_type_inner}>
              <div className={styles.hairBlock}>
                <div className={styles.tone_img_block}>
                  <img
                    className={styles.tone_img}
                    src={Straight}
                    alt="Straight"
                  />
                </div>
                <div className={styles.title_group}>
                  <input
                    type="radio"
                    name="hairType"
                    value="Straight"
                    checked
                  />
                  <h6 className={styles.title}>Straight</h6>
                </div>
              </div>
            </div>
            <div className={styles.hair_type_inner}>
              <div className={styles.hairBlock}>
                <div className={styles.tone_img_block}>
                  <img className={styles.tone_img} src={Curly} alt="Curly" />
                </div>
                <div className={styles.title_group}>
                  <input type="radio" name="hairType" value="Curly" />
                  <h6 className={styles.title}>Curly</h6>
                </div>
              </div>
            </div>
            <div className={styles.hair_type_inner}>
              <div className={styles.hairBlock}>
                <div className={styles.tone_img_block}>
                  <img className={styles.tone_img} src={Wavy} alt="Wavy" />
                </div>
                <div className={styles.title_group}>
                  <input type="radio" name="hairType" value="Wavy" />
                  <h6 className={styles.title}>Wavy</h6>
                </div>
              </div>
            </div>
            <div className={styles.hair_type_inner}>
              <div className={styles.hairBlock}>
                <div className={styles.tone_img_block}>
                  <img className={styles.tone_img} src={Coily} alt="Coily" />
                </div>
                <div className={styles.title_group}>
                  <input type="radio" name="hairType" value="Coily" />
                  <h6 className={styles.title}>Coily</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bb_btn_block">
          <div className="bb_redirect_prev_btn">
          <button className="bb_button" onClick={handlePrev}>Prev</button>
          </div>
          <div className="bb_redirect_next_btn">
            <button className="bb_button" onClick={handleNext}>Next</button>
          </div>
        </div>
    </div>
  );
};

export default HairTypeSection;
