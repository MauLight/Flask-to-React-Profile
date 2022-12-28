import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { arr } from "../array";

export const Details = () => {

    const img_style = {
        "width": '200px',
        "height": '250px',
        objectFit: 'cover'
    }

    const style = {
        "max-width": '486px'
    }

    const { id } = useParams();
    const [stars, setStars] = useState(id);
    const [info, setInfo] = useState([]);

    console.log(arr);
    console.log(id);
    console.log(stars);

    /*
    
        const getStarAsync = async () => {
            try {
                const getStar = await fetch('http://127.0.0.1:5000/api/user/' + id);
                const data = await getStar.json();
                console.log(data)
                setInfo(data);
            }
            catch {
                console.log('error');
            }
        };
    
        */


    return (
        <div>
                {
                    !!arr && arr.length > 0 && arr.map((elem, i) => {
                        if (elem.id === parseInt(stars)) {
                            return (
                                <div key={i} className="profile container-fluid px-5">
                                    <div className="row d-inline-flex">
                                        <div className="col-1"></div>
                                        <div className="col-4 d-flex justify-content-center">
                                            <img src={elem.image} className="card-img-top rounded-0  mx-auto" alt="..." style={img_style} />
                                        </div>
                                        <div className="col-4">
                                            <h1 className="mb-3">{elem.firstname}</h1>
                                            <p className="mb-3">{elem.biography}</p>
                                        </div>
                                        <div className="col-3"></div>
                                    </div>
                                    <div className="underline2 py-5">
                                        <div className="underline col-12 text-center">
                                            <h2 className="title pb-3">SCRIPTS</h2>
                                        </div>
                                    </div>
                                    {
                                        elem.myscripts.map((script, ide) => {
                                            return (
                                                <div key={ide} className="row d-inline-flex my-3">
                                                    <div className="card border-0" style={style}>
                                                        <div className="row g-0">
                                                            <div className="col-md-4">
                                                                <img src={script.cover} className="cover img-fluid rounded-start" alt="cover" />
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{script.title}</h5>
                                                                    <p className="logline card-text">{script.logline}</p>
                                                                    <a href={script.uuid} className="btn">Read Script</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    })
                }
                <div className="mb-5">
            </div>

        </div>
    )
}


