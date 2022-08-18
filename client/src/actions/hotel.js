import axios from "axios";

export const createHotel = async (token, data) => 
await axios.post(`${process.env.REACT_APP_API}/create-hotel`, data, {
    headers:{
        Authorization: `Bearer ${token}`,
    },
});

export const allHotels = async () => 
    await axios.get(`${process.env.REACT_APP_API}/hotels`);

export const diffDays = (from, to) => {
    // gives the number of available days of a hotel
    const day = 24 * 60 * 60 * 1000;  // time of one day in milliseconds
    const start = new Date(from);
    const end = new Date(to);
    const difference = Math.round(Math.abs((start - end) / day));
    return difference;
}

export const sellerHotels = async (token) => 
    await axios.get(`${process.env.REACT_APP_API}/seller-hotels`, 
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const deleteHotel = async (token, hotelId) => 
    await axios.delete(`${process.env.REACT_APP_API}/delete-hotel/${hotelId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const read = async (hotelId) => 
    await axios.get(`${process.env.REACT_APP_API}/hotel/${hotelId}`);
        // we don't send the header because this is not a protected route, 
        // so no need to be authorized

        