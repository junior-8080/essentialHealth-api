const sendOTP = (request, response) => {
  // TODO: use joi to validate request payload (for otp only mobile number is required)
  // generate otp code
  // store otp record
  // send otp code to mobile number supplied
  // Return back token and user sign details and success message if successful else error message
  response.json({ message: "do otp" });
};

const verifyOTP = (request, response) => {
  // TODO: use joi to validate request payload
  // after successfully verifying otp code,
  // add user to otp_users
  // return token
  response.json({ message: "do verify otp" });
};

export default { sendOTP, verifyOTP };
