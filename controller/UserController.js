const UserModel = require("../Model/User");
const bcrypt = require("bcrypt");
const generateJsonWebToken = require("../utils/generateToken");

const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User Already Exist...",
        error: true,
        success: false
      })
    }
    // ḤashingPassword :)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // saving User into DB :)
    const newUser = new UserModel({
      fullName,
      email,
      password: hashedPassword
    });
    await newUser.save();
    const userWithoutPassword = await UserModel
      .findOne({ email })
      .select("-password");
    return res.status(200).json({
      data: userWithoutPassword,
      message: "User Register successfully..",
      success: true,
      error: false
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Faild to signUp",
    });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email",
        error: true,
        success: false
      })
    }
    // Comparing password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid Password..",
        success: false,
        error: true
      });
    }

    const userWithoutPassword = await UserModel
      .findOne({ email })
      .select("-password");

    // generating JsonWebToken
    generateJsonWebToken(res, user);

    return res.status(200).json({
      message: `Welcome back ${user.fullName}..`,
      success: true,
      error: false,
      data: userWithoutPassword,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Faild to Login",
    });
  }
}

const LogOut = async (req, res) => {
  try {
    res.clearCookie("myToken", {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
    });
    return res.status(200).json({
      success: true,
      error: false,
      message: "Logged out successfully..",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to Logout",
    });
  }
};

const CheckAuth = async (req, res) => {
  try {
    const userId = req.id;
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.json({
        success: false,
        error: true,
        message: "Please Login..",
      });
    }
    return res.status(200).json({
      success: true,
      error: false,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error..",
    });
  }
};

// Only Super admin :)
const MakeAdminOrSuperAdmin = async (req, res) => {
  try {
    const { email, role } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid User..",
      });
    }

    if (!["ADMIN", "SUPERADMIN", "USER"].includes(role)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid role provided.",
      });
    }
    existingUser.role = role;
    await existingUser.save();

    return res.status(200).json({
      success: true,
      error: false,
      message: `${existingUser.fullName} changed into ${role}..`,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error..",
    });
  }
}

const getAllUser = async (req, res) => {
  try {
    const allUser = await UserModel.find().select("-password");
    return res.status(200).json({
      message: "All User fetched sucessfully...",
      data: allUser,
      success: true,
      error: false
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error..",
    });
  }
}

const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found"
      });
    }

    // Delete the user
    await UserModel.findByIdAndDelete(user._id);

    return res.status(200).json({
      success: true,
      error: false,
      message: `${user.fullName} deleted successfully`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error..",
    });
  }
}

module.exports = {
  signUp,
  login,
  LogOut,
  CheckAuth,
  MakeAdminOrSuperAdmin,
  getAllUser,
  deleteUser
};