import express from 'express';
// middleware
import { requireSignin } from '../middlewares';
// controllers
import { createConnectAccount } from '../controllers/stripe';
import { getAccountStatus, getAccountBalance } from '../controllers/stripe';



const router = express.Router();
router.post('/create-connect-account', requireSignin, createConnectAccount);  // router.post creates new end points
router.post('/get-account-status', requireSignin, getAccountStatus);
router.post('/get-account-balance', requireSignin, getAccountBalance)

module.exports = router;