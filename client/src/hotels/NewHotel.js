import { useState } from "react";
import { toast } from "react-toastify";
import { DatePicker, Select } from 'antd';
import { createHotel } from "../actions/hotel";
import { useSelector } from "react-redux";
import HotelCreateForm from "../components/forms/HotelCreateForm";

// to-do: add location autoComplete (goole map places service)

const {Option} = Select;


const NewHotel = () => {
    const {auth} = useSelector((state) => ({...state}));
    const {token, user} = auth;
    // state
    const [values, setValues] = useState({
        title: '',
        content: '',
        image: '',
        location: '',
        price: '',
        from: '',
        to: '',
        bed: '',  

    });
    // destructuring variables from state
    const [preview, setPreview] = useState(
        "https://via.placeholder.com/100x100.png?text=PREVIEW");
    const {title, content, image, price, from, to, bed, location} = values;
    const handleSubmit = async (e) => {
        e.preventDefault();
        // create form data, since we have file data (the image), so cannot be simply sent by json data
        let hotelData = new FormData();
        hotelData.append('title', title);
        hotelData.append('content', content);
        hotelData.append('location', location);
        hotelData.append('price', price);
        hotelData.append('postedBy', user._id);
        image && hotelData.append('image', image);
        hotelData.append('from', from);
        hotelData.append('to', to);
        hotelData.append('bed', bed);

        console.log([...hotelData]);
        try {
            let res = await createHotel(token, hotelData);
            console.log('HOTEL CREATE RES', res);
            toast.success('New hotel is posted');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (err) {
            console.log(err);
            toast.error(err.response.data);
        }
        
    };
    const handleImageChange = (e) => {
        // console.log(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
        setValues({...values, image: e.target.files[0] });
    };
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    return (
        <>
        <div className="container-fluid bg-secondary p-5 text-center">
            <h2>Add Hotel</h2>
        </div>
        <div className="container-fluid">
            <div className="row">
                    <div className="col-md-10">
                        <br />
                            <HotelCreateForm 
                                values={values}
                                setValues={setValues}
                                handleChange={handleChange}
                                handleImageChange={handleImageChange}
                                handleSubmit={handleSubmit}
                            />
                    </div>
                <div className="col-md-2">
                    <img src={preview} alt="preview_image" className="img img-fluid m-2" />
                    <pre>
                        {JSON.stringify(values, null, 4)}
                    </pre>
                </div>
            </div>
        </div>
        </>
    )
};

export default NewHotel;