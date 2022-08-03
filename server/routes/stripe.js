import express from 'express';
// middleware
import { requireSignin } from '../middlewares';
// controllers
import { createConnectAccount } from '../controllers/stripe';



const router = express.Router();

router.post('/create-connect-account', requireSignin, createConnectAccount);

module.exports = router;