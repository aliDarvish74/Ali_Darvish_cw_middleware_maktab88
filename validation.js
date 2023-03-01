const validationArray = (req, res, next) => {
  req.validationErrors = [];
  next();
};

const isEmpty = (key) => {
  return (req, res, next) => {
    if (req.body[key].trim() === "") {
      req.validationErrors.push(`${key} is Empty!`);
      next();
    }
    next();
  };
};

const isLength = (key, { min, max }) => {
  const lengthRegex = `^(\\w){${min},${max}}$`;
  const regex = new RegExp(lengthRegex);
  return (req, res, next) => {
    if (!regex.test(req.body[key].trim())) {
      req.validationErrors.push(
        `${key}'s length must be between ${min} and ${max}`
      );
      next();
    }
    next();
  };
};

const isEmail = (key) => {
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  return (req, res, next) => {
    if (!emailFormat.test(req.body[key].trim())) {
      req.validationErrors.push(`${key} is not valid. (hint: test@test.test)`);
      next();
    }
    next();
  };
};

const isPhoneNumber = (key) => {
  const phoneFormat = /^(0|(0098)|(\+98))9(\d){9}$/;
  return (req, res, next) => {
    if (!phoneFormat.test(req.body[key])) {
      req.validationErrors.push(
        `${key} is not valid. (hint: 0 | 0098 | +98 - 911 111 11 11)`
      );
      next();
    }
    next();
  };
};
module.exports = { validationArray, isEmpty, isLength, isEmail, isPhoneNumber };
