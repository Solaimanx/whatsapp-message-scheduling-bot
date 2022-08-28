const { LoginUser, updateUser } = require("../db/user");

const UserController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const isUser = await LoginUser(email, password);

    res.send(isUser);
  },
  update: async (req, res) => {
    const { id ,...body } = req.body;

    const user = await updateUser(id, body);
    res.send(user);
  },
};

module.exports = UserController;
