import React, { useState } from 'react';
import styles from './HtContactForm.module.css';

const HtContactForm = ({onNext}) => {
    // State variables to store form data
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: ''
    });

    // Function to handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // You can handle form submission logic here, like sending data to an API
        //console.log(formData);
        // Reset form fields after submission
        setFormData({
            name: '',
            phoneNumber: '',
            email: ''
        });
    };

    return (
        <>

            <div className={styles.ht_contactBlock}>

                <div className={styles.description_block}>
                    <div className={styles.form_container}>
                        <h2 className={styles.heading}>Fill the form to<br />get the price</h2>
                        <p className={styles.description}>Praesent scelerisque viverra tempor. Integer felis leo, dignissim eu est ac, interdum condimentum lacus. Duis laoreet felis bibendum metus dapibus elementum.</p>
                    </div>
                </div>

                <div className={styles.ht_contactform}>
                    <div className={styles.form_container}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.ht_formField}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className={styles.ht_formField}>
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className={styles.ht_formField}>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className={styles.ht_formBtn}>
                                <button type="submit" className="bb_button" onClick={onNext}>Click here to see grafts and price</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HtContactForm;
