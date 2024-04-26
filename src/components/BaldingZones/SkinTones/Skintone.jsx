import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./skintone.module.css";
import Main_desc from "../../MainContent/MainDesc";
import pearl_white from "../../../image/pearl_white.png";
import white from "../../../image/white.png";
import light_brown from "../../../image/light_brown.png";
import moderate from "../../../image/moderate.png";
import dark_brown from "../../../image/dark_brown.png";
import dark from "../../../image/dark.png";

const Skintone = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/hairTypeSection");
  };

  const handlePrev = () => {
    navigate("/horizontalTab");
  };

  return (
    <>
      <div className="global_container">
        <div className={styles.skin_tones_section}>
          <div className={styles.left_zone}>
            <Main_desc />
          </div>
          <div className={styles.right_zone}>
            <h3 className={styles.heading}>02. Select Your Skin Tone</h3>
            <div className={styles.skin_tones_block}>
              <div className={styles.tone_inner}>
                <div className={styles.SkinBlock}>
                  <div className={styles.tone_img_block}>
                    <img
                      className={styles.tone_img}
                      src={pearl_white}
                      alt="top image"
                    />
                  </div>
                  <div className={styles.title_group}>
                    <input
                      type="radio"
                      name="skinTone"
                      value="Pearl White"
                      checked
                    />
                    <h6 className={styles.title}>Pearl White</h6>
                  </div>
                </div>
              </div>

              <div className={styles.tone_inner}>
                <div className={styles.SkinBlock}>
                  <div className={styles.tone_img_block}>
                    <img className={styles.tone_img} src={white} alt="White" />
                  </div>
                  <div className={styles.title_group}>
                    <input type="radio" name="skinTone" value="White" />
                    <h6 className={styles.title}>White</h6>
                  </div>
                </div>
              </div>
              <div className={styles.tone_inner}>
                <div className={styles.SkinBlock}>
                  <div className={styles.tone_img_block}>
                    <img
                      className={styles.tone_img}
                      src={light_brown}
                      alt="Light Brown"
                    />
                  </div>
                  <div className={styles.title_group}>
                    <input
                      type="radio"
                      name="Light Brown"
                      value="Light Brown"
                    />
                    <h6 className={styles.title}>Light Brown</h6>
                  </div>
                </div>
              </div>
              <div className={styles.tone_inner}>
                <div className={styles.SkinBlock}>
                  <div className={styles.tone_img_block}>
                    <img
                      className={styles.tone_img}
                      src={moderate}
                      alt="Moderate Brown"
                    />
                  </div>
                  <div className={styles.title_group}>
                    <input
                      type="radio"
                      name="Moderate Brown"
                      value="Moderate Brown"
                    />
                    <h6 className={styles.title}>Moderate Brown</h6>
                  </div>
                </div>
              </div>
              <div className={styles.tone_inner}>
                <div className={styles.SkinBlock}>
                  <div className={styles.tone_img_block}>
                    <img
                      className={styles.tone_img}
                      src={dark_brown}
                      alt="Dark Brown"
                    />
                  </div>
                  <div className={styles.title_group}>
                    <input type="radio" name="Dark Brown" value="Dark Brown" />
                    <h6 className={styles.title}>Dark Brown</h6>
                  </div>
                </div>
              </div>
              <div className={styles.tone_inner}>
                <div className={styles.SkinBlock}>
                  <div className={styles.tone_img_block}>
                    <img className={styles.tone_img} src={dark} alt="Dark" />
                  </div>
                  <div className={styles.title_group}>
                    <input type="radio" name="Dark" value="Dark" />
                    <h6 className={styles.title}>Dark</h6>
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
    </>
  );
};

export default Skintone;
