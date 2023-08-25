import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const { setUser } = useAuth;
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [imageError, setImageError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, email, image, password, cpassword } = event.target.elements;
        const body = {
            name: name.value,
            email: email.value,
            image: image.files[0],
            password: password.value,
            password_confirmation: cpassword.value
        };
        await csrfToken();
        try {
            const resp = await axios.post('/register', body);
            if (resp.status === 200) {
                setUser(resp.data.user);
                return <Navigate to="/profile" />
            }
        } catch (error) {
            if (error.respone.status === 422) {
                console.log(error.respone.data.errors);
                if (error.response.data.errors.name) {
                    setNameError(error.response.data.errors.name[0])
                } else {
                    setNameError('');
                }
                if (error.response.data.errors.email) {
                    setEmailError(error.response.data.errors.email[0])
                } else {
                    setEmailError('');
                }
                if (error.response.data.errors.image) {
                    setImageError(error.response.data.errors.image[0])
                } else {
                    setImageError('');
                }
                if (error.response.data.errors.password) {
                    setPasswordError(error.response.data.errors.password[0])
                } else {
                    setPasswordError('');
                }

            }
        }
    };
    return (
        <section>
            <div>
                <a href="">
                    <img src="" alt="" />
                    My Facebook
                </a>
                <div>
                    <div>
                        <h1>Create An Account</h1>
                        <form action="#" method="post" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="image">Choose Image</label>
                                <input type="file" name="image" id="image" placeholder="Choose Image" />
                                {imageError && (
                                    <p className="text-sm text-red-600">{imageError} </p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="name">Full Name</label>
                                <input type="text" name="name" id="name" placeholder="FirstName LastName" />
                                {nameError && (
                                    <p className="text-sm text-red-600">{nameError} </p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                                <input type="email" name="email" id="email" placeholder="someone@mail.com" />
                                {emailError && (
                                    <p className="text-sm text-red-600">{emailError} </p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                                <input type="password" name="password" id="password" placeholder="******"
                                    className="bg-gray-50 border border-grey-300 text-gray-900 sm:text-sm rounded-lg" />
                                {passwordError && (
                                    <p className="text-sm text-red-600">{passwordError} </p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="cpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                <input type="password" name="cpassword" id="cpassword" placeholder="******"
                                    className="bg-gray-50 border border-grey-300 text-gray-900 sm:text-sm rounded-lg" />
                            </div>
                            <button type="submit">Create An Account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already Have An Account? {" "}
                                <Link to="/">Login Here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )

}