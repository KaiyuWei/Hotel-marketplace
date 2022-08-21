import axios from 'axios';

export const createConnectAccount = async (token) =>
    await axios.post(
        `${process.env.REACT_APP_API}/create-connect-account`,
        {}, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },  // send token for stipe validation
        }
);

export const getAccountStatus = async (token) => 
    axios.post(`${process.env.REACT_APP_API}/get-account-status`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    export const getAccountBalance = async (token) => 
    axios.post(`${process.env.REACT_APP_API}/get-account-balance`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    export const currencyFormatter = data => {
        return (data.amount / 100).toLocaleString(data.currency, {  // data.amount in cents, so should be divided by 100
            style: 'currency',
            currency: data.currency,
        })
    }

export const payoutSetting = async (token) => 
        await axios.post(`${process.env.REACT_APP_API}/payout-setting`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

export const getSessionId = async (token, hotelId) => 
        await axios.post(`${process.env.REACT_APP_API}/stripe-sesion-id`,
            {hotelId}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

export const stripeSuccessRequest = async (token, hotelId) =>
            await axios.post(`${process.env.REACT_APP_API}/stripe-success`, {hotelId}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );