import React from "react";
import { Link } from "react-router-dom";
import { arr } from "../array";

const Home = () => {

    const rounded = {
        borderRadius: '100%',
        objectFit: 'cover',
        width: '250px',
        height: '250px',
        objectPosition: 'top'
    }

    return (
        <div className="container-fluid px-5">
            <div className="row">
                <div className="underline2 pb-5">
                    <div className="underline col-12 text-center">
                        <h2 className="title pb-3">STARS HOME</h2>
                    </div>
                </div>

                {
                    !!arr && arr.length > 0 && arr.map((user, i) => {
                        return (
                            <div className='col-3 justify-content-center p-3' key={i}>
                                <div className="trip_card card border-0 rounded-0 pt-2 mb-5">
                                    <div className="frame mx-auto justify-content-center" key={i}>
                                        <Link to={'/star/' + user.id} className="mx-auto" >
                                            <img src={user.image} className="card-img-top mx-auto" alt="..." style={rounded} />
                                        </Link>

                                        <div className="card-body d-flex p-0">

                                            <div className='w-100 text-center pt-2 pb-3'>
                                                <p className="trip_text card-text px-2">{user.firstname} {user.lastname}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;