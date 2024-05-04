const User = require("../models/user");

const newUser = async (data) => {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    console.log("Error in service layer");
  }
};

const authenticateUser = async (data) => {
  try {
    const user = await User.findOne({
      email: data.email,
    });
    console.log(user);
    if (!user) {
      throw {
        message: "No user found",
      };
    }
    if (user.password !== data.password) {
      throw {
        message: "incorrect password",
      };
    }
    const token = user.genJWT();
    return token;
  } catch (error) {
    console.log("Error in service layer:", error);
    throw error;
  }
};

const userDetail = async (id) => {
  try {
    const user = await User.findOne({
      id
    });
    return user;
  } catch (error) {
    console.log("Error in service layer:", error);
    throw error; 
  }
}


module.exports = { newUser, authenticateUser , userDetail };
