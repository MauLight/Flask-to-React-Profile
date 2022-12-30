import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../context/appContext";
import { arr } from '../array';


export const ScriptList = () => {

    const { store, actions } = useContext(Context);
    const [user_id, setUser_id] = useState(store.credentials);
    const [userscripts, setUserScripts] = useState([]);
    const [scriptsforfilter, setscriptsForFilter] = useState([]);
    const [currentscript, setCurrentScript] = useState([]);
    const newScript = 'NEW SCRIPT'


    const handleUser_Id = () => {
        setUser_id(store.user_id);
    }


    const handleScriptId = (e) => {

        actions.setScriptId(e.target.value);
        let value = parseInt(store.scriptId);
        console.log(store.scriptId);

        const filterScripts = userscripts.filter(elem => elem.id === value);
        console.log(filterScripts);
        setCurrentScript(filterScripts);
        console.log(currentscript);
    }

    useEffect(() => {
        if (store.token && store.token !== "" && store.token !== undefined) {
            actions.getCredentials();
            console.log(store.credentials);
        }
    }, [store.token]);

    useEffect(() => {
        if (store.credentials && store.credentials !== "" && store.credentials !== undefined) {
            handleUser_Id();
            console.log(store.user);
            setUserScripts(store.user.myscripts);
        }
    });

    return (
        <div className='px-0'>
            <select class="scriptlist btn-group dropstart my-3 form-select" aria-label="select script" onChange={handleScriptId}>
                <option selected>Select script</option>
                {
                    !!userscripts && userscripts.length > 0 ? (userscripts.map((script, i) => {
                        return (
                            <option value={script.id} key={i} className="dropdown-item">{script.title}</option>
                        )
                    })
                    ) :
                        (
                            <option>User has no scripts</option>
                        )


                }
            </select>
            <div className='col-auto my-5'>

                {
                    !!currentscript && currentscript.length > 0 ? (currentscript.map((script, i) => {
                        return (
                            <div className='row' key={i}>
                                <div className='col'>
                                    <h4>{script.title.toUpperCase()} {script.year} {script.genre}</h4>
                                    <p className='logline w-75 mb-0'>
                                        {script.logline}
                                    </p>

                                </div>
                                <div className='col'>
                                    <img
                                        src={script.cover}
                                        className="card-user img-fluid rounded-0"
                                        alt="poster"
                                    />
                                </div>
                            </div>


                        )
                    })

                    ) : (
                        <p className='newscript'>{newScript}</p>
                    )
                }

            </div>
        </div>

    )
}
