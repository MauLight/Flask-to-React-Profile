import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/appContext";
import { Widget } from "@uploadcare/react-widget";
import { arr } from '../array';
import portrait from '../img/portrait.png';
import dummycover from '../img/3.jpg';
import Footer from '../views/footer';
import { ScriptList } from "../components/scriptlist";

const Editor = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    //CURRENT USER VARIABLES
    const [user_id, setUser_id] = useState('');
    const [script_id, setScript_id] = useState(store.scriptId);

    //USER UPDATE VARIABLES
    const [image, setImage] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [biography, setBiography] = useState('');
    const [updateuserok, setUpdatedUserOk] = useState('noupdate')

    //SCRIPT UPDATE/POST VARIABLES
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [length, setLength] = useState('');
    const [genre, setGenre] = useState('');
    const [logline, setLogline] = useState('');
    const [cover, setCover] = useState('');
    const [updatescriptok, setUpdatedscriptOk] = useState('noupdate')

    //IMAGES VARIABLES
    const [scriptcover, setScriptCover] = useState('');
    const [inputkey, setInputKey] = useState('');
    const [imageUser, setImageUser] = useState(null);
    const [photoUser, setPhotoUser] = useState(null);
    const [currentcover, setCurrentCover] = useState(null);
    const [uuid, setUuid] = useState('');

    //ERROR VARIABLES
    const [error, setError] = useState(null);
    const [error2, setError2] = useState(null);
    const [error3, setError3] = useState(null);

    console.log(currentcover);
    console.log(genre);

    //TARGET.FILES CLEANER
    const resetTarget = () => {
        let randomString = Math.random().toString(36);

        setInputKey(randomString);
    };

    //EVENT HANDLERS
    const handleUser_Id = () => {
        setUser_id(store.user_id);
        console.log(user_id);
    }

    const handleUsername = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setUsername(e.target.value);
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

    //FORM SUBMIT
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
                length: length,
                genre: genre,
                logline: logline,
                cover: cover,
                uuid: uuid,
                user_id: user_id
            })
        }
        try {
            const response = await fetch(url, options_get);
            const data = await response.json()
            console.log(data);
            console.log('POST data OK!');

        } catch (error) {
            console.log(error)
        }

    }

    const updateUser = async () => {

        let url = `http://127.0.0.1:5000/api/user/${user_id}/update`;
        let options_get = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                username: username,
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
            if (response.status === 200) setUpdatedUserOk('update')

        } catch (error) {
            console.log(error)
        }
    };

    //IMAGE HANDLERS
    const handleSubmit = (e) => {
        e.preventDefault();

        if (imageUser !== null) {
            console.log("handlesubmit");
            const formData = new FormData();
            console.log(user_id);
            console.log(imageUser[0]);
            formData.append("user_id", user_id);
            formData.append("image", imageUser[0]);
            console.log(formData);
            uploadImage(formData);
            setError3(null);
            e.target.value = null;
        } else {
            setError3("Please, complete the form");
        }
    };

    const uploadImage = async (formData) => {
        console.log("upload image");
        try {
            const response = await fetch(
                `http://127.0.0.1:5000/api/uploads`,
                {
                    method: "POST",
                    body: formData,
                    mode: "cors",
                    cache: "no-cache",
                }
            );
            const data = await response.json();
            console.log(data);
            setPhotoUser(data);
            setImage(data.filename);
            if (response.status === 200) console.log('user image upload was a success!')

        } catch (error) {
            setError("Error uploading image");
            console.log(error.message);
        }
    };

    const handleSubmitCover = (e) => {
        e.preventDefault();

        if (scriptcover !== null) {
            console.log("handlesubmitCover");
            const formData2 = new FormData();
            console.log(script_id);
            console.log(scriptcover[0]);
            formData2.append("script_id", script_id);
            formData2.append("image", scriptcover[0]);
            console.log(formData2);
            uploadCover(formData2);
            setError(null);
            resetTarget();
        } else {
            setError("Please, complete the form");
        }
    };

    const uploadCover = async (formData2) => {
        console.log("upload cover");
        try {
            const response = await fetch(
                `http://127.0.0.1:5000/api/cover`,
                {
                    method: "POST",
                    body: formData2,
                    mode: "cors",
                    cache: "no-cache",
                    headers: {

                        Authorization: "Bearer " + store.token,
                    },
                }
            );
            const data = await response.json();
            console.log(data);
            setCurrentCover(data);
            setCover(data.filename);
            if (response.status === 200) setUpdatedscriptOk('update')

        } catch (error) {
            setError("Error uploading image");
            console.log(error.message);
        }
    };

    //DELETE USER
    const handleDelete = async () => {
        let url = `http://127.0.0.1:5000/api/user/${user_id}/delete`;
        let options_delete = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        }
        try {
            const response = await fetch(url, options_delete);
            const data = await response.json();
            console.log(data);
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    const handleUploadScript = (value) => {
        console.log(value);
        setUuid(value.cdnUrl);
        resetTarget();
    }

    //USEEFFECT    
    useEffect(() => {
        actions.getUserandScripts();
        const totalScripts = store.userScripts;

        totalScripts && totalScripts.length > 0 ? actions.setScriptId(parseInt(totalScripts[totalScripts.length - 1].id) + 1) : actions.setScriptId(1);
        console.log(store.scriptId);
        setScript_id(store.scriptId);
    }, [script_id]);

    useEffect(() => {
        if (store.token && store.token !== "" && store.token !== undefined) {
            actions.getCredentials();
            console.log(store.credentials);
        }
    }, [store.token]);

    useEffect(() => {
        if (store.credentials && store.credentials !== "" && store.credentials !== undefined) {
            handleUser_Id();
        }
    });

    useEffect(() => {
        if (!store.token)
            navigate("/login");
    });

    return (
        <div className="d-grid">
            <div className="underline2 pb-5">
                <div className="underline col-12 text-center">
                    <h2 className="title pb-3">PROFILE EDITOR</h2>
                </div>
            </div>
            <form className="mx-auto my-5" onSubmit={handleUpdateUser}>
                <h4 className="mb-5">Edit profile</h4>
                <div className="d-block px-5">

                    <div className="row g-3  mx-3">
                        <div className="col-auto">
                            <label htmlFor="imageUser" className="col-form-label">Profile Image</label>
                        </div>
                        <div className="col d-flex input-group">
                            {error3 && (
                                <div className="alert alert-danger" role="alert">
                                    {error3}
                                </div>
                            )}

                            <div className="upcover2 d-flex">
                                <input
                                    type="file"
                                    className="form-control form-control-sm"
                                    id="imageUser"
                                    name="imageUser"
                                    onChange={(e) => setImageUser(e.target.files)}
                                />
                                <button className="editor_btn btn btn-sm mx-3 rounded-0 border px-3" type="submit" id="submit" onClick={handleSubmit}>Upload</button>
                            </div>

                            <div className="user-pic">

                                <div className="card rounded-circle m-auto">
                                    <img
                                        src={photoUser ? photoUser.filename : portrait}
                                        className="card-user img-fluid rounded-circle"
                                        key={photoUser ? photoUser.id : "a"}
                                        alt="userpicture"
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row g-3 align-items-center mx-3">
                        <div className="col-auto">
                            <label htmlFor="username" className="col-form-label">Username</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" id="username" className="form-control form-control-sm" aria-describedby="username" value={username} onChange={handleUsername} />
                        </div>
                    </div>
                    <div className="row g-3 align-items-center mx-3">
                        <div className="col-auto">
                            <label htmlFor="firstname" className="col-form-label">Firstname</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" id="firstname" className="form-control form-control-sm" aria-describedby="firstname" value={firstname} onChange={handleFirstname} />
                        </div>
                    </div>
                    <div className="row g-3 align-items-center mx-3">
                        <div className="col-auto">
                            <label htmlFor="lastname" className="col-form-label">Lastname</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" id="lastname" className="form-control form-control-sm" aria-describedby="lastname" value={lastname} onChange={handleLastname} />
                        </div>
                    </div>
                    <div className="row g-3 align-items-center mx-3">
                        <div className="col-auto">
                            <label htmlFor="biography" className="col-form-label">Biography</label>
                        </div>
                        <div className="col-auto">
                            <textarea className="bio form-control form-control-sm" aria-label="With textarea" value={biography} onChange={handleBiography}></textarea>
                        </div>
                        <div className="col-auto">
                            <span id="biographyInline" className="form-text">
                                Max 500 characters.
                            </span>
                        </div>
                        <p className={updateuserok}>User update successful.</p>
                    </div>
                </div>
                <div className="col-auto d-flex mt-5">

                    <button type="submit" className="editor_btn btn mx-auto border rounded-0 px-3" onClick={handleUpdateUser}>Submit</button>
                </div>
            </form>
            <form className="mx-auto my-5" onSubmit={handleScripts}>
                <h4 className=" mb-5">Submit scripts</h4>
                <ScriptList />
                <div className="d-block px-5">

                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label htmlFor="title" className="col-form-label">Title</label>
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
                            <label htmlFor="year" className="col-form-label">Year</label>
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

                    <div className="input-group mb-3">
                        <div className="col-auto">
                            <label htmlFor="year" className="col-form-label me-3">Length</label>
                        </div>
                        <div className="form-check pt-2">
                            <input className="form-check-input" type="radio" name="length" id="1" value="Short" onChange={(e) => setLength(e.target.value)} />
                            <label className="form-check-label" htmlFor="1">
                                Short script
                            </label>
                        </div>
                        <div className="form-check pt-2 mx-3">
                            <input className="form-check-input" type="radio" name="length" id="2" value="Feature" onChange={(e) => setLength(e.target.value)} />
                            <label className="form-check-label" htmlFor="2">
                                Feature script
                            </label>
                        </div>
                    </div>



                    <div className="input-group mb-3">
                        <label htmlFor="genre" className="col-form-label">Genre</label>
                        <select className="genre mx-3 form-select form-select-sm" id="inputGroupSelect01" onChange={(e) => setGenre(e.target.value)}>
                            <option defaultValue>Choose...</option>
                            <option value="Action">Action</option>
                            <option value="Biopic">Biopic</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Drama">Drama</option>
                            <option value="Horror">Horror</option>
                            <option value="Musical">Musical</option>
                            <option value="Romance">Romance</option>
                            <option value="Sci-fi">Sci-fi</option>
                            <option value="Suspense">Suspense</option>
                            <option value="Thriller">Thriller</option>
                        </select>
                    </div>

                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label htmlFor="logline" className="col-form-label">Logline</label>
                        </div>
                        <div className="col-auto">
                            <textarea className="form-control form-control-sm" aria-label="With textarea" value={logline} onChange={handleLogline}></textarea>
                        </div>
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text">
                                Logline of the script.
                            </span>
                        </div>
                    </div>

                    <div className="row g-3 my-2">
                        <div className="col-auto">
                            <label htmlFor="uploadscript" className="col-form-label">Upload script</label>
                        </div>
                        <div className="col d-flex input-group">
                            {error2 && (
                                <div className="alert alert-danger" role="alert">
                                    {error2}
                                </div>
                            )}

                            <div className="upscript d-flex">
                                <p>
                                    <Widget dataTabs="file" publicKey='da5d9fb951c446d7a10f' id='file' key={inputkey || ''} onChange={(value) => handleUploadScript(value)} />
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-auto">
                            <label htmlFor="firstname" className="col-form-label">Script cover</label>
                        </div>
                        <div className="col flex input-group">
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <div className="upcover d-flex">
                                <input
                                    key={inputkey || ''}
                                    type="file"
                                    className="form-control form-control-sm"
                                    id="imageUser"
                                    name="imageUser"
                                    onChange={(e) => setScriptCover(e.target.files)}
                                />
                                <button className="editor_btn btn btn-sm mx-3 rounded-0 border px-3" type="submit" id="submit" onClick={handleSubmitCover}>Upload</button>
                            </div>

                            <div className="user-pic">

                                <div className="card rounded-0 m-auto">
                                    <img
                                        src={currentcover ? currentcover.filename : dummycover}
                                        className="card-user img-fluid rounded-0"
                                        key={currentcover ? currentcover.id : "a"}
                                        alt="userpicture"
                                    />
                                </div>
                            </div>
                        </div>
                        <p className={updatescriptok}>Script update successful.</p>
                    </div>



                </div>
                <div className="col-auto d-flex mt-5">
                    <button type="submit" className="editor_btn btn mx-auto border rounded-0 px-3" onClick={handleScripts}>Submit</button>
                </div>
            </form>
            <div className="container-fluid d-grid mx-auto justify-content-center mb-5">
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label htmlFor="url" className="col-form-label">Delete User</label>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="editor_btn2 btn mx-auto border rounded-0 px-3" onClick={handleDelete}>Delete</button>
                    </div>
                    <div className="col-auto">
                        <span id="passwordHelpInline" className="form-text">
                            This action cannot be undone.
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Editor;




