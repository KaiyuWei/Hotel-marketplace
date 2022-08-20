import React, {useState, useEffect} from "react";
import { read, diffDays } from "../actions/hotel";
import moment from "moment";

const ViewHotel = ({ match }) => {
    const [hotel, setHotel] = useState({});
    const [image, setImage] = useState("");

    useEffect(() => {
        loadSellerHotel();
    }, []);

    const loadSellerHotel = async () => {
        let res = await read(match.params.hotelId);
        // console.log(res);
        setHotel(res.data);
        setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
    }

    return (
    <>
        <div className="container-fluid bg-secondary p-5 text-center">
            <h2>{hotel.title}</h2>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <br />
                    <img src={image} alt={hotel.title} className="img img-fluid m-2" />
                </div>
                <div className="col-mdd-6">
                    <br />
                    <b>{hotel.content}</b>
                    <p className="alert alert-info mt-3">{hotel.price}</p>
                    <p className="card-text">
                        <span className="float-right text-primary">
                            for {diffDays(hotel.from, hotel.to)} {" "}
                            {diffDays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
                        </span>
                    </p>
                    <p>
                        From 
                        <br />{" "}
                        {moment(new Date(hotel.from)).format('DD/MM/YYYY, h:mm:ss a')}
                    </p>
                    <p>
                        To 
                        <br />{" "}
                        {moment(new Date(hotel.to)).format('DD/MM/YYYY, h:mm:ss a')}
                    </p>
                    <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
                    <button className="btn btn-block btn-lg btn-primary mt-3">Book Now</button>
                </div>
            </div>
        </div>
    </>
    );
};

export default ViewHotel;