import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/appContext";
import { arr } from '../array';

const Editor = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();


    const [user_id, setUser_id] = useState('');
    const [image, setImage] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [biography, setBiography] = useState('');
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [logline, setLogline] = useState('');
    const [cover, setCover] = useState('');
    const [url, setUrl] = useState('');

    const handleUser_Id = () => {
        console.log(store.credentials);
        const currentUser = arr.filter(elem => elem.email === store.credentials);
        console.log(currentUser);
        const id = currentUser[0].id;
        console.log(id);
        setUser_id(id);
    }

    const handleImage = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setImage(e.target.value);
    }

    const handleFirstname = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setFirstname(e.target.value);
    }

    const handleLastname = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setLastname(e.target.value);
    }

    const handleBiography = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setBiography(e.target.value);
    }

    const handleTitle = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setTitle(e.target.value);
    }

    const handleYear = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setYear(e.target.value);
    }

    const handleLogline = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setLogline(e.target.value);
    }

    const handleCover = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setCover(e.target.value);
    }

    const handleUrl = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setUrl(e.target.value);
    }

    const handleScripts = (e) => {
        e.preventDefault();
        console.log('ready to submit!');
        submitScript();
    }

    const handleUpdateUser = (e) => {
        e.preventDefault();
        console.log('ready to submit!');
        updateUser();
    }

    const submitScript = async () => {

        let url = `http://127.0.0.1:5000/api/scripts`;
        let options_get = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                title: title,
                year: year,
                logline: logline,
                cover: cover,
                url: url,
                user_id: user_id
            })
        }
        try {
            //console.log("attempt to fetch")
            const response = await fetch(url, options_get);
            const data = await response.json()
            console.log(data);
            console.log('data posted!');

        } catch (error) {
            console.log(error)
        }
    };

    const updateUser = async () => {

        let url = `http://127.0.0.1:5000/api/user/${user_id}/update`;
        let options_get = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                biography: biography,
                image: image
            })
        }
        try {
            //console.log("attempt to fetch")
            const response = await fetch(url, options_get);
            const data = await response.json()
            console.log(data);
            console.log('data posted!');

        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (store.token && store.token != "" && store.token != undefined) {
            actions.getCredentials();
            console.log(store.credentials);
        }
    }, [store.token]);

    useEffect(() => {
        if (store.credentials && store.credentials != "" && store.credentials != undefined) {
            handleUser_Id();
        }
    })

/*
    useEffect(() => {
        if (!store.token)
            navigate("/login");
    })

*/

    return (
        <>
            <div className="underline2 pb-5">
                <div className="underline col-12 text-center">
                    <h2 className="title pb-3">PROFILE EDITOR</h2>
                </div>
            </div>
            <form className="mx-auto my-5" onSubmit={handleUpdateUser}>
                <h4 className="mx-5">Edit profile</h4>
                <div className="d-flex justify-content-center px-5">
                    <div className="row g-3 align-items-center mx-3">
                        <div className="col-auto">
                            <label for="firstname" className="col-form-label">Profile Image</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" id="image" className="form-control form-control-sm" aria-describedby="image" value={image} onChange={handleImage} />
                        </div>
                    </div>
                    <div className="row g-3 align-items-center mx-3">
                        <div className="col-auto">
                            <label for="firstname" className="col-form-label">Firstname</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" id="title" className="form-control form-control-sm" aria-describedby="firstname" value={firstname} onChange={handleFirstname} />
                        </div>
                    </div>
                    <div className="row g-3 align-items-center mx-3">
                        <div className="col-auto">
                            <label for="lastname" className="col-form-label">Lastname</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" id="title" className="form-control form-control-sm" aria-describedby="lastname" value={lastname} onChange={handleLastname} />
                        </div>
                    </div>
                    <div className="row g-3 align-items-center mx-3">
                        <div className="col-auto">
                            <label for="biography" className="col-form-label">Biography</label>
                        </div>
                        <div className="col-auto">
                            <textarea class="form-control form-control-sm" aria-label="With textarea" value={biography} onChange={handleBiography}></textarea>
                        </div>
                        <div className="col-auto">
                            <span id="biographyInline" className="form-text">
                                Max 500 characters.
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-auto d-flex mt-5">
                    <button type="submit" class="editor_btn btn mx-auto border rounded-0 px-3" onClick={handleUpdateUser}>Submit</button>
                </div>
            </form>
            <form className="mx-auto my-5" onSubmit={handleScripts}>
                <h4 className="mx-5">Submit scripts</h4>
                <div className="d-flex justify-content-center px-5">
                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label for="title" className="col-form-label">Title</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" id="title" className="form-control form-control-sm" aria-describedby="title" value={title} onChange={handleTitle} />
                        </div>
                        <div className="col-auto">
                            <span id="titleInline" className="form-text">
                                Max 120 characters long.
                            </span>
                        </div>
                    </div>
                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label for="year" className="col-form-label">Year</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" id="year" maxLength="4" className="form-control form-control-sm" aria-describedby="year" value={year} onChange={handleYear} />
                        </div>
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text">
                                Year of finished script.
                            </span>
                        </div>
                    </div>
                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label for="logline" className="col-form-label">Logline</label>
                        </div>
                        <div className="col-auto">
                            <textarea class="form-control form-control-sm" aria-label="With textarea" value={logline} onChange={handleLogline}></textarea>
                        </div>
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text">
                                Logline of the script.
                            </span>
                        </div>
                    </div>
                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label for="cover" className="col-form-label">Cover</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" id="cover" className="form-control form-control-sm" aria-describedby="cover" value={cover} onChange={handleCover} />
                        </div>
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text">
                                Link to script promotional cover.
                            </span>
                        </div>
                    </div>
                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label for="url" className="col-form-label">Url</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" id="url" className="form-control form-control-sm" aria-describedby="url" value={url} onChange={handleUrl} />
                        </div>
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text">
                                Link to script.
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-auto d-flex mt-5">
                    <button type="submit" class="editor_btn btn mx-auto border rounded-0 px-3" onClick={handleScripts}>Submit</button>
                </div>
            </form>

        </>
    )
}

export default Editor;