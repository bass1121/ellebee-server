const { hash, compare } = require("bcryptjs");

const hashPassword = async password => {
  const hashedPassword = await hash(password, 12);

  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);

  return isValid;
};

module.exports = { hashPassword, verifyPassword };
