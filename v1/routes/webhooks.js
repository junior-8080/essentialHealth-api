import express from "express";
import crypto from "crypto";

const router = express.Router();

/*
 * (PAYSTACK)
 * Desc: This webhook api is registered on paystack to receive events when payments
 * are complete or fail.
 */
router.post("/paystack/payments", function (req, res) {
  const hash = crypto
    .createHmac("sha512", process.env.SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash == req.headers["x-paystack-signature"]) {
    const event = req.body;
    console.log(event);
  }

  res.send(200);
});

/*
 * (ARKESEL)
 * Desc: This webhook api is registered on arkesel to receive events when sms messages
 * are complete or fail.
 */
router.get("/arkesel/sms", function (req, res) {
  const smsID = req.query.sms_id;
  const status = req.query.status;

  if (smsID && status) {
    console.log(smsID && status);
  }

  res.send(200);
});

/*
 * (ELASTICEMAIL)
 * Desc: This webhook api is registered on elastic email to receive events when email messages
 * are sent or fail.
 */
router.get("/elasticemail/email", function (req, res) {
  const transaction = req.query.transaction;
  const status = req.query.status;
  const messageID = req.query.messageid;

  if (transaction && status && messageID) {
    console.log(messageID && status && transaction);
  }

  res.send(200);
});

export default router;
