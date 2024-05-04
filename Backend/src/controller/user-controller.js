const {authenticateUser, newUser} = require("../service/user-service");

const registerUser = async (req, res) => {
  try {
    const data = {
      password: req.body.password,
      email: req.body.email,
      name: req.body.name,
      username: req.body.username,
    };
    if (!data.name) {
      return res.status().json({
        message: "Please enter your name",
      });
    }
    if (!data.email) {
      return res.status().json({
        message: "Please enter email",
      });
    }
    if (!data.password) {
      return res.status().json({
        message: "Please enter password",
      });
    }
    if (!data.username) {
      return res.status().json({
        message: "Please enter username",
      });
    }

    if (data.password.length < 6) {
      return res.status().json({
        message: "Password should be of length 6",
      });
    }

    await newUser(data);

    return res.status(501).json({
      message: `Welcome back!`,
      success: true,
    });
  } catch (error) {
    return res.status(501).json({
      message: "User not able to register",
      success: false,
      error: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const data = {
      password: req.body.password,
      email: req.body.email,
    };

    if (!data.email) {
      return res.status().json({
        message: "Please enter email",
      });
    }
    if (!data.password) {
      return res.status().json({
        message: "Please enter password",
      });
    }

    await authenticateUser(data);
    return res.status(501).json({
        message: `Welcome ${data.name}`,
        success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      message: "User login failed",
      success: false,
      error: error,
    });
  }
};

module.exports = {
  registerUser: registerUser,
  login: login,
};
