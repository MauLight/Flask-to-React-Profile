import React, { useState, useContext } from "react";
import image from "../img/logo.26_nov.png"
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [post, setPost] = useState(false);
    const [alert, setAlert] = useState(true);
    const navigate = useNavigate();

    if (post && post === true)
    navigate("/login");

    const style = {
        width: '200px'
    }

    const handleUser = (e) => {
        //e.preventDefault()
        setUser(e.target.value);
        console.log(e.target.value);
    }
    const handleEmail = (e) => {
        //e.preventDefault()
        setEmail(e.target.value);
        console.log(e.target.value);
    }

    const handlePassword = (e) => {
        //e.preventDefault()
        setPassword(e.target.value);
        console.log(e.target.value);
    }

    const alertManager = () => {
        if (alert === false) {
            return (
                <p className="alert">Password must contain at least 1 upper case, numeric, and special character.</p>
            )
        }
    }

    const handleRegister = (e) => {
        //e.preventDefault();
        console.log("Hey!");
        if (user && new RegExp(/\S+@\S+\.\S+/).test(email) && new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")) {
            console.log("Correct email format");
            postNewUser(email, password);
          }
        else {
            setAlert(false);
        }
    };

    const postNewUser = async (email, password) => {
        const opts = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        };

        try {
            const resp = await fetch(
                "http://127.0.0.1:5000/api/user",
                opts
            );
            if (resp.status !== 200) {
                alert("There was an error");
                return false;
            }
            const data = await resp.json();
            console.log(data);
            console.log("data posted!");
            if (resp.status === 200) {
                setPost(true)
            }
        } catch (error) {
            console.error("There was an error in your request");
        }
    };


    return (
        <div className='page-r container-fluid justify-content-center d-flex'>
            <div className='login row md px-5  py-5 w-25'>
                <form onSubmit={handleRegister} className="needs-validation">
                    <div className='mb-2 w-auto text-center mb-3'>
                        <img alt='logo' src={image} style={style} />
                        <h5 className="mt-2">Register to STAR</h5>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control form-control-sm" id="inputUsername" aria-describedby="usernameHelp" value={user} onChange={handleUser} placeholder='Username' required />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control form-control-sm" id="inputEmail1" aria-describedby="emailHelp" value={email} onChange={handleEmail} placeholder='Email' required />
                    </div>
                    <div className="my-3">
                        <input type="password" className="form-control form-control-sm" id="inputPassword1" value={password} onChange={handlePassword} placeholder='Password' required />
                        {
                            alertManager()
                        }
                    </div>
                    <div className="mb-5">
                        <button type="submit" className="btn btn-primary w-100 mb-2" onClick={handleRegister}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;