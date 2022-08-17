import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { HomeOutlined } from '@ant-design/icons'
import {createConnectAccount} from '../actions/stripe'
import {toast} from 'react-toastify';
import { sellerHotels } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCards";
import { deleteHotel } from "../actions/hotel";


const DashboardSeller = () => {
    const {auth} = useSelector((state) => ({...state}));
    const [loading, setLoading] = useState(false);
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        loadSellersHotels();
    }, [])

    const loadSellersHotels = async () => {
        let {data} = await sellerHotels(auth.token);
        setHotels(data);
    }

    const handleClick = async () => {
        setLoading(true);
        try{
            let res = await createConnectAccount(auth.token)    // send token for stipe validation
            // console.log('DashboardSeller response => ', res);  // get login link
            window.location.href = res.data;
        } catch (err) {
            console.log(err);
            toast.error('Stripe connect failed. Try again.');
            setLoading(false);
        }
    }

    const handleHotelDelete = async (hotelId) => {
        if (!window.confirm('Delete the hotel?')) return;
        try{
            const res = await deleteHotel(auth.token, hotelId);
            toast.success("Hotel Deleted");
            loadSellersHotels();
        } catch (err) {
            console.log("delete request faile, ", err);
        }
        
    };

    const notConnected = () => (
        <div className="container-fuid">
                <div className="row">
                    <div className="col-md-6 offset-md-3 text-center">
                        <div className="p5-pointer">
                            <HomeOutlined className="h1" />
                            <h4>Setup payouts to post hotel rooms</h4>
                            <p className="lead">MERN partners with stripe to transfer 
                            earnings to your bank account
                            </p>
                            <button disabled={loading} onClick={handleClick} className="btn btn-primary mb-3">
                                {loading ? "Processing..." : "Setup Payouts"}
                            </button>
                            <p className="textmuted"><small>You'll be redirected to Stripe 
                                to complete the onboarding process</small>
                            </p>
                        </div>                   
                    </div>
                </div>
            </div>
    )

    const connected = () => (
        <div className="container-fuid">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Your Hotels</h2>
                    </div>
                    <div className="col-md-2">
                        <Link to="/hotels/new" className="btn btn-primary">
                            + Add New
                        </Link>
                    </div>
                </div>
                <div className="row">
                    {hotels.map((h) => 
                        <SmallCard key={h._id} h={h} 
                            showViewMoreButton={false}
                            owner={true}
                            handleHotelDelete={handleHotelDelete}
                         />
                    )}
                </div>
            </div>
    )

    return (
        <> 
            <div className="container-fluid bg-secondary p-5">
                <ConnectNav />
            </div>
            <div className="container-fluid p-4">
                <DashboardNav />
            </div>

            {auth && 
            auth.user && 
            auth.user.stripe_seller && 
            auth.user.stripe_seller.charges_enabled ? 
            connected() : notConnected()};

            {/* <pre>{JSON.stringify(auth, null, 2)}</pre> */}
        </>
    );
};

export default DashboardSeller;