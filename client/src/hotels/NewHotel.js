import { useState } from "react";
import { toast } from "react-toastify";
import AlgoliaPlaces from 'algolia-places-react';

const NewHotel = () => {
    // state
    const [values, setValues] = useState({
        title: '',
        content: '',
        location: '',
        image: '',
        price: '',
        from: '',
        to: '',
        bed: '',  // how many pages are available

    });
    // destructuring variables from state
    const {title, content, location, image, price, from, to, bed} = values;
    const handleSubmit = (e) => {

    };
    const handleImageChange = () => {
        //
    };
    const handleChange = (e) => {
        //
    };

    const hotelForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <lable className="btn btn-outline-secondary btn-block m-2 text-left">
                    Image
                    <input type="file" name="image" onChange={handleImageChange} accept="image/*" hidden />
                </lable>
            </div>
        </form>
    )

    return (
        <>
        <div className="container-fluid bg-secondary p-5 text-center">
            <h2>Add Hotel</h2>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <br />
                    {hotelForm()}
                </div>
                <div className="col-md-2">
                    Image
                </div>
            </div>
        </div>
        </>
    )
};

export default NewHotel;