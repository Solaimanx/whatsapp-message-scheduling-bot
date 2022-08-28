const User = require("../model/user");

const LoginUser = async (email, password) => {
  const isUser = await User.findOne({ email });

  if (!isUser) {
    return "Email Not Found";
  }

  const isValidPassword = isUser.password == password;

  if (isValidPassword) {
    return isUser;
  } else {
    return "invalid password";
  }
};

const updateUser = async (id, body) => {
  const updatedUser = await User.findOneAndUpdate(
    id,
    { ...body },
    { new: true }
  );

  console.log(updateUser);

  return updatedUser;
};

module.exports = {
  LoginUser,
  updateUser,
};
