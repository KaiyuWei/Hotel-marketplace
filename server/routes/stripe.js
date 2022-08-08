import express from 'express';
// middleware
import { requireSignin } from '../middlewares';
// controllers
import { createConnectAccount } from '../controllers/stripe';
import { getAccountStatus } from '../controllers/stripe';


const router = express.Router();
router.post('/create-connect-account', requireSignin, createConnectAccount);
router.post('/get-account-status', requireSignin, getAccountStatus);

module.exports = router;