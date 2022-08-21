import express from 'express';
// middleware
import { requireSignin } from '../middlewares';
// controllers
import { createConnectAccount, stripeSessionId } from '../controllers/stripe';
import { getAccountStatus, getAccountBalance, payoutSetting, stripeSuccess } from '../controllers/stripe';



const router = express.Router();
router.post('/create-connect-account', requireSignin, createConnectAccount);  // router.post creates new end points
router.post('/get-account-status', requireSignin, getAccountStatus);
router.post('/get-account-balance', requireSignin, getAccountBalance);
router.post('/payout-setting', requireSignin, payoutSetting);
router.post('/stripe-sesion-id', requireSignin, stripeSessionId);
router.post('/stripe-success', requireSignin, stripeSuccess);

module.exports = router;