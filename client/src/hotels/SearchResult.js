import { useState, useEffect } from "react";
import queryString from "query-string";
import {Link} from "react-router-dom"
import Search from "../components/forms/Search";
import { searchListings } from "../actions/hotel";

const SearchResult = () => {
    const [searchLocation, setSearchLocation] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [searchBed, setSearchBed] = useState("");
    const [hotels, setHotels] = useState("");

    useEffect(() => {
        const {location, date, bed} = queryString.parse(window.location.search);
        // console.table({location, date, bed});
        searchListings({location, date, bed})
        .then((res) => {
            console.log('SEARCH RESULTS ===> "', res.data);
            setHotels(res.data);
        })
    }, [window.location.search]);

    return (
        <div className="container">
            <div className="row">
                {JSON.stringify(hotels, null, 4)}
            </div>
        </div>
    )
}

export default SearchResult;