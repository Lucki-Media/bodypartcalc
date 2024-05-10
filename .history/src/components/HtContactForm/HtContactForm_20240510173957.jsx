import React, { useState, useEffect } from 'react';
import styles from './HtContactForm.module.css';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HtContactForm = ({ onNext }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setLoading(false);
                onNext();
            }, 1000);
        }
    }, [success, onNext]);

    const [gethairZonecookies] = useCookies(["hairZone"]);
    const [getSkinTonecookies] = useCookies(["skinTone"]);
    const [gethairTypecookies] = useCookies(["hairType"]);
    const [gethairColorcookies] = useCookies(["hairColor"]);

    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        HairZone: gethairZonecookies.hairZone,
        SkinTone: getSkinTonecookies.skinTone,
        HairType: gethairTypecookies.hairType,
        HairColor: gethairColorcookies.hairColor
    });

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateEmail = (email) => {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(String(email).toLowerCase());
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            if (!validateEmail(value)) {
                setEmailError('Please enter a valid email address');
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Reset errors
        setNameError('');
        setPhoneNumberError('');
        setEmailError('');

        // Validate Name
        if (!formData.name.trim()) {
            setNameError('Please enter Your Name');
            return;
        }

        // Validate Phone Number
        if (!formData.phoneNumber.trim()) {
            setPhoneNumberError('Please enter Your Phone Number');
            return;
        }

        // Validate Email
        if (!validateEmail(formData.email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        // Show Loader
        setTimeout(() => {
            setLoading(true);
        }, 2000);

        // If all validations pass, continue with form submission
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const apiUrl = `${process.env.REACT_APP_URL}` + "/wp-json/bmh-hair-calculator/v1/email_data";

            const res = await fetch(apiUrl, requestOptions);
            const data = await res.json();
          
            toast.success("Email sent successfully");
            // Show success message

            setSuccess(true);


        } catch (error) {
            console.log(error);
            toast.error("Failed to send email");
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? (
                <div id="loading-bar-spinner" className="spinner"><div className="spinner-icon"></div></div>
            ) : (
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
                                            onBlur={handleBlur}
                                        />
                                        {nameError && <p className={styles.error}>{nameError}</p>}
                                    </div>
                                    <div className={styles.ht_formField}>
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                        />
                                        {phoneNumberError && <p className={styles.error}>{phoneNumberError}</p>}
                                    </div>
                                    <div className={styles.ht_formField}>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                        />
                                        {emailError && <p className={styles.error}>{emailError}</p>}
                                    </div>
                                    <div className={styles.ht_formBtn}>
                                        <button type="submit" className="bb_button" >Click here to see grafts and price</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </>
            )}
        </div>
    );
}

export default HtContactForm;
