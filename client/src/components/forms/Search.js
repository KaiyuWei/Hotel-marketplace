import React, {useState} from "react";
import {DatePicker, Select, Form, Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import moment from "moment";
import {useHistory} from "react-router-dom";

const {RangePicker} = DatePicker;
const {Option} = Select;

const Search = () => {
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [bed, setBed] = useState("");
    const history = useHistory();

    const handleSubmit = () => {
        history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`);
    };

    return (
        <div className="d-flex pb-4">
            <div className="w-100">
                <Input 
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location" 
                    name="searchLoc" 
                    size="large"
                />
            </div>
                <RangePicker 
                    onChange={(value, dateStrings) => setDate(dateStrings)} 
                    disabledDate={(current) => 
                        current && current.valueOf() < moment().subtract(1, "days")} 
                    className="w-100"
                    size="middle"
                />
                <Select 
                    onChange={(value) => setBed(value)} 
                    className="w-100"
                    size="middle"
                    placeholder="Number of beds"
                >
                    <Option key={1}>{1}</Option>
                    <Option key={2}>{2}</Option>
                    <Option key={3}>{3}</Option>
                    <Option key={4}>{4}</Option>
                </Select>
                <SearchOutlined 
                    onClick={handleSubmit} 
                    className="btn btn-primary p-3 btn-square" 
                />
            
        </div>
    );
};

export default Search;
