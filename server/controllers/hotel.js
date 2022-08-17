import Hotel from "../models/hotel";
import fs from "fs";

// req is from the post request from "routes/hotel.js"
export const create = async (req, res) => {
    // console.log('req.fields', req.fields);
    // console.log('req.files', req.files);
    try {
        let fields = req.fields;
        let files = req.files;

        let hotel = new Hotel(fields);

        hotel.postedBy = fields.postedBy;
        
        // handle image
        if (files.image) {
            hotel.image.data = fs.readFileSync(files.image.path);
            hotel.image.contentType = files.image.type;
        }
        // save the hotel instance
        hotel.save((err, result) => {
            if(err) {
                console.log('saving hotel err =>', err);
                res.status(400).send('Error saving');
            }
            res.json(result);  // composed of hotel information sent from the frontend
        });
        
    } catch(err) {
        console.log(err);
        res.status(400).json({
            err: err.message,
        });
    }
};

export const hotels = async (req, res) => {
    let all = await Hotel.find({})
    .limit(24)
    .select('-image.data')
    .populate('postedBy', '_id name')
    .exec();
    // console.log(all);
    res.json(all);
};

export const image = async (req, res) => {
    let hotel = await Hotel.findById(req.params.hotelId).exec();
    if (hotel && hotel.image && hotel.image.data !== null) {
        res.set('Content-Type', hotel.image.contentType);
        return res.send(hotel.image.data);
    };
};

export const sellerHotels = async (req, res) => {
    let all = await Hotel.find({postedBy: req.auth._id})
    .select('-image.data')
    .populate('postedBy', '_id name')
    .exec();

    res.send(all);
}