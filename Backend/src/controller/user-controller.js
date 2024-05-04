const User = require("../models/user");

const {
  authenticateUser,
  newUser,
  userDetail,
} = require("../service/user-service");

const registerUser = async (req, res) => {
  try {
    const data = {
      password: req.body.password,
      email: req.body.email,
      name: req.body.name,
      username: req.body.username,
    };
    console.log("data ", data);
    if (!data.name) {
      return res.status(501).json({
        message: "Please enter your name",
      });
    }
    if (!data.email) {
      return res.status(501).json({
        message: "Please enter email",
      });
    }
    if (!data.password) {
      return res.status(501).json({
        message: "Please enter password",
      });
    }
    if (!data.username) {
      return res.status(501).json({
        message: "Please enter username",
      });
    }

    if (data.password.length < 6) {
      return res.status(501).json({
        message: "Password should be of length 6",
      });
    }

    const response = await newUser(data);
    console.log("response", response);

    return res.status(200).json({
      message: `Welcome back!`,
      success: true,
      data: response,
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

    console.log("data", data);

    if (!data.email) {
      return res.status(501).json({
        message: "Please enter email",
      });
    }
    if (!data.password) {
      return res.status(501).json({
        message: "Please enter password",
      });
    }

    const response = await authenticateUser(data);
    return res.status(200).json({
      message: "User Login Successfully",
      success: true,
      token: response,
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

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    return res.status(200).json({
      message: "User found successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      message: "User not found",
      success: false,
      error: error,
    });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, username, email } = req.body;
    console.log(id);
    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorHandler("Invalid user id", 404));
    }
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (username) {
      user.username = username;
    }
    await user.save();
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    return "Error in updating a user", 500;
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return "user not found", 404;
    }
    await user.deleteOne();
    return res.status(201).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return "Error in deletion of User ", 500;
  }
};

module.exports = {
  registerUser: registerUser,
  login: login,
  getUser: getUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
};
