
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/appContext";
import {arr} from '../array';


const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [user_id, setUser_id] = useState('');

    useEffect(() => {
        if (!store.token)
            navigate("/login");
        else {
            actions.getCredentials();
        }
    });

    useEffect(() => {
        if (store.credentials && store.credentials != "" && store.credentials != undefined) {
            handleUser_Id();
        }
    });

    const handleUser_Id = () => {
        console.log(store.credentials);
        const currentUser = arr.filter(elem => elem.email === store.credentials);
        console.log(currentUser);
        const id = currentUser[0].id;
        console.log(id);
        setUser_id(id);
    };

    useEffect(() => {
        if (user_id && user_id != "" && user_id != undefined) {
            navigate(`/star/${user_id}`);
        }
    });

    return (
        <h1>Hey!</h1>
    )
}

export default Profile;