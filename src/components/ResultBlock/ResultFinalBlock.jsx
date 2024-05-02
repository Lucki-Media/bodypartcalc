import React from 'react';
import styles from "../ResultBlock/Result_block.module.css"

const ResultFinalBlock = () => {
  return (
<>
<style>
{
  `  
  .plus_minus{
  background: #fff;
  }
  `
}
</style>
    <div className={styles.finalresult_module}>
      <div className="global_container">

        <div className={styles.finalresult_row}>
          <div className={styles.finalresult_left}>
            <div className={styles.result_heading}>
              Hair Restoration
            </div>
            <div className={styles.final_product_listing}>

              <div className={styles.product_list}>
                <div className={styles.product_box}>
                <span>  Hair loss</span>
                  <h4 className={styles.product_name}>
                  product name
                  </h4>
                 
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>

                  <a href='#'>Read More</a>
                </div>
                <div className={styles.product_add_remove}>
                  <div className='plus_minus'>
                    <span className='p_verticle'></span>
                    <span className='p_horizontal'></span>
                  </div>
                </div>
              </div>
              <div className={styles.product_list}>
                <div className={styles.product_box}>
                <span>  Hair loss</span>
                  <h4 className={styles.product_name}>
                  product name
                  </h4>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>

                  <a href='#'>Read More</a>
                </div>
                <div className={styles.product_add_remove}>
                <div className='plus_minus'>
                    <span className='p_verticle'></span>
                    <span className='p_horizontal'></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.finalresult_right}>
            <div className={styles.cart_produc_box}>
            <div className={styles.result_heading}>
              Your Cart
            </div>
            <div className={styles.cart_product_listing}></div>
            </div>
          </div> 
        </div>

      </div>
    </div>
    </>
  )
}

export default ResultFinalBlock;