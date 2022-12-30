import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../context/appContext";
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
    const [star, setStar] = useState('');
    const [info, setInfo] = useState([]);
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [starArr, setStarArr] = useState([]);
    const url = 'https://ucarecdn.com/'

    console.log(arr);
    console.log(id);
    console.log(store.user_id);

    const getUsers = async () => {
        const url = `http://127.0.0.1:5000/api/users`;
        const opts = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + store.token,
          },
        }
        try {
          const response = await fetch(url, opts);
          const data = await response.json();
          console.log(data);
          setStarArr(data);
        }
        catch(error) {
          console.log(error);
        }
      };

    useEffect (() => {
        getUsers();
    },[]);
 //profile_pic 

    return (
        <div>
                {
                    !!starArr && starArr.length > 0 && starArr.map((elem, i) => {
                        if (elem.id === parseInt(stars)) {
                            return (
                                <div key={i} className="profile container-fluid px-5">
                                    <div className="row d-inline-flex">
                                        <div className="col-1"></div>
                                        <div className="col-4 d-flex justify-content-center">
                                            <img src={elem.image} className="card-img-top rounded-0  mx-5" alt="..." style={img_style} />
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
                                                                    <a href={script.uuid}  className="btn">Read Script</a>
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


