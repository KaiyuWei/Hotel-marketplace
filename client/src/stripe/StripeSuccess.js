import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { stripeSuccessRequest } from '../actions/stripe';
import {LoadingOutlined} from "@ant-design/icons";

// use useEffect to create an order

const StripeSuccess = ({match, history}) => {  // match is the data passed by url, e.g. ":hotelId"
    const {auth : {token},} = useSelector((state) => ({...state}));
    // const {token} = auth;  the same as the last line

    useEffect(() => {
        // console.log('send this hotel id to the backend', match.params.hotelId);
        stripeSuccessRequest(token, match.params.hotelId)
        .then(res => {
            if(res.data.success) {
                // console.log('stripe success response', res.data);
                history.pushState('/dashboard');
            } else {
                history.pushState('/stripe/cancel');
            }
        });
    }, [match.params.hotelId]);

    return (
        <div className="container">
            <div className="d-flex justify-content-center p-5">
                    <LoadingOutlined className="display-1 text-danger p-5"  />
            </div>
        </div>

    );
};

export default StripeSuccess;