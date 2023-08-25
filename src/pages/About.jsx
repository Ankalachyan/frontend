import React from "react";
import { Link,Navigate } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";


export default function Login(){
    const {setUser, csrfToken} = useAuth();
    const [error, setError] = useState(null);

    const handleSubmit = async (error) =>{
        error.preventDefault();
        const {email, password} = error.target.elements;
        const body = {
            email: email.value,
            password :password.value
        };
        await csrfToken();
        try {
            const resp = await axios.post('/login',body)
            if (condition) {
                
            }
        } catch (error) {
            
        }
    }
}