import { DatePicker, Select } from 'antd';
import moment from "moment";

// to-do: add location autoComplete (goole map places service)

const {Option} = Select;


const config = {
    appId: process.env.REACT_APP_ALGOLIA_APP_ID,
    apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
    language: "en",
    countries: ["nl"],
}

const HotelEditForm = (props) => {    
    const {
        values, 
        setValues, 
        handleChange, 
        handleImageChange, 
        handleSubmit} = props;
    const {title, content, price, bed, location, from, to } = values;
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="btn btn-outline-secondary btn-block m-2 text-left">
                    Image
                    <input 
                        type="file" 
                        name="image" 
                        onChange={handleImageChange} 
                        accept="image/*" 
                        hidden 
                    />
                </label>
                <input 
                    type="text" 
                    name="title" 
                    onChange={handleChange} 
                    placeholder="Title" 
                    className="form-control m-2" 
                    value={title} 
                />

                <textarea
                    name="content" 
                    onChange={handleChange} 
                    placeholder="Content" 
                    className="form-control m-2" 
                    value={content} 
                />

                <input
                    name="location"
                    className="form-control ml-2  mr-2" 
                    placeholder="Location" 
                    defaultValue={location} 
                    onChange={handleChange}  // suggestion is a prop
                    style={{height: "50px"}}
                />  

                <input 
                    type="number" 
                    name="price" 
                    onChange={handleChange} 
                    placeholder="Price" 
                    className="form-control m-2" 
                    value={price} 
                />

            <Select onChange={(value) => setValues({...values, bed:value})} 
                className="2-100 m-2" size="large" 
                placeholder="Number of beds"
                value={bed}
            >
                <Option key={1}>{1}</Option>
                <Option key={2}>{2}</Option>
                <Option key={3}>{3}</Option>
                <Option key={4}>{4}</Option>
            </Select>

            </div>
            {from && 
            <DatePicker 
                placeholder="from date" 
                className="form-control m-2" 
                defaultValue={moment(from, "YYYY-MM-DD")}
                onChange={(date, dateString, current) => setValues({...values, from: dateString})} 
                disabledDate={(current) => current && current.valueOf() < moment().subtract(1, 'days')}
            />}
            {to && 
            <DatePicker 
                placeholder="to date" 
                className="form-control m-2" 
                defaultValue={moment(to, "YYYY-MM-DD")}
                onChange={(date, dateString) => setValues({...values, to: dateString})} 
            />}
            <button className="btn m-2 btn-outline-primary">Save</button>
        </form>
    );
};

export default HotelEditForm;