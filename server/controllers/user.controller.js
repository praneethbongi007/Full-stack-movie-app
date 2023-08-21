import userModel from "../models/userModel";
import JWT from "jsonwebtoken";
import responseHandler from "../handlerFunctions/response.handler";

const signup = async (req, res) => {
  try {
    const { username, displayName, password } = req.body;
    const checkuser = await userModel.findOne({ username: username });
    if (checkuser) {
      return responseHandler.badRequest(res, "User already exists");
    }

    const user = new userModel();
    user.username = username;
    user.displayName = displayName;
    user.setPassword(password);
    await user.save();

    const token = JWT.sign({ data: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: "24h",
    });
    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch (error) {
    return responseHandler.error(error);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkuser = await userModel
      .findOne({ username })
      .select("username password salt id displayName");
    if (!checkuser) {
      return responseHandler.badrequest(res, "User not exist");
    }
    if (!checkuser.validPassword(password)) {
      return responseHandler.badRequest(res, "Invalid password");
    }
    const token = jsonwebtoken.sign(
      { data: checkuser.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    checkuser.password = undefined;
    checkuser.salt = undefined;

    responseHandler.created(res, {
      token,
      ...user_doc,
      id: checkuser.id,
    });
  } catch (error) {
    return responseHandler.error(error);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await userModel
      .findById(req.user.id)
      .select("password id salt");

    if (!user) return responseHandler.unauthorized(res);

    if (!user.validPassword(password))
      return responseHandler.badRequest(res, "Wrong password");

    user.setPassword(newPassword);

    await user.save();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) return responseHandler.notFound(res);

    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  signup,
  signin,
  getInfo,
  updatePassword,
};
