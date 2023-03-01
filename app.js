const express = require("express");
const app = express();
const {
  validationArray,
  isEmpty,
  isLength,
  isEmail,
  isPhoneNumber,
} = require("./validation");

app.use(express.json());

app.post(
  "/",
  validationArray,
  isEmpty("userName"),
  isEmpty("email"),
  isEmpty("phoneNumber"),
  isLength("userName", { min: 3, max: 10 }),
  isEmail("email"),
  isPhoneNumber("phoneNumber"),
  (req, res) => {
    if (req.validationErrors.length !== 0) {
      console.log(req.validationErrors);
      return res.status(400).json(req.validationErrors);
    }
    res.send("ok");
  }
);

app.listen(8000, () => console.log("Listening on :8000"));
