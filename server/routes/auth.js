import express from 'express';
import {register, login} from '../controllers/auth';
// controllers
// import {  } from '../controllers/stripe';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;