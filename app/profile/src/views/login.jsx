import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import image from "../img/logo.26_nov.png";



const Login = () => {

    const { store, actions } = useContext(Context);
    const [users, setUsers] = useState('');
    const [isError, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const token = sessionStorage.getItem("token");
    console.log(token);
    const navigate = useNavigate();

    const style = {
        width: '200px'
    }

    const handleEmail = (e) => {
        e.preventDefault()
        setEmail(e.target.value);
        console.log(e.target.value);
    }

    const handlePassword = (e) => {
        //e.preventDefault()
        setPassword(e.target.value);
        console.log(e.target.value);
        let password = e.target.value;
        let caps, small, num, specialSymbol;
        if (password.length < 8) {
            setError(
                "Password should contain minimum 8 characters."
            );
            return;
        } else {
            caps = (password.match(/[A-Z]/g) || []).length;
            small = (password.match(/[a-z]/g) || []).length;
            num = (password.match(/[0-9]/g) || []).length;
            specialSymbol = (password.match(/\W/g) || []).length;
            if (caps < 1) {
                setError("Must add one UPPERCASE letter");
                return;
            } else if (small < 1) {
                setError("Must add one lowercase letter");
                return;
            } else if (num < 1) {
                setError("Must add one number");
                return;
            } else if (specialSymbol < 1) {
                setError("Must add one special symbol");
                return;
            }
            else {
                setError("");
                return;
            }
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        actions.login(email, password);
    };

    useEffect(() => {
        if (store.token && store.token !== "" && store.token !== undefined) {

            //actions.getCredentials()
            //console.log(store.crendentials)
            //actions.getUserId();
            actions.getUsers();
            navigate("/editor");
        }
    })

    return (

        <div className='page container-fluid justify-content-center d-flex'>
            <div className='login row md px-5 py-5 w-25'>

                <form onSubmit={handleLogin} className="needs-validation pb-3">
                    <div className='mb-2 w-auto text-center mb-3'>
                        <img alt='logo' src={image} style={style} />
                        <h5 className="mt-2">Login to STAR</h5>
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control form-control-sm" id="inputEmail1" aria-describedby="emailHelp" value={email} onChange={handleEmail} placeholder='Email' required />
                    </div>
                    <div className="my-3">
                        {isError !== null && <p className="errors">{isError}</p>}
                        <input type="password" className="form-control form-control-sm" id="inputPassword1" value={password} onChange={handlePassword} placeholder='Password' required />

                    </div>
                    <div className='mb-3'>
                        <button type="submit" className="btn btn-primary w-100 mb-3" onClick={handleLogin}>Submit</button>
                        <label className='mb-5'><small>Not a Star member? <a href='/register'>Sign up here.</a></small></label>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login;