import userModel from "../models/userModel.js";
import tokenModel from "../models/tokenModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDto } from "../utils/userDto.js";
import { v4 as uuidv4 } from "uuid";
import { ApiError } from "../utils/apiError.js";
import { sendMail } from "../utils/mailServise.js";
import { validationResult } from "express-validator";

export const registration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw ApiError.BadRequest("Validation error", errors.array());
    const isUserExist = await userModel.findOne({ email: req.body.email });
    if (isUserExist)
      throw ApiError.BadRequest(
        `User with email ${req.body.email} is already exists`
      );
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(req.body.password, salt);
    const activationLink = uuidv4();
    const newUser = new userModel({
      email: req.body.email,
      passwordHash: hash,
      firstName: req.body.name,
      surname: req.body.surname,
      adress: req.body.adress,
      phone: req.body.phone,
      activationLink,
    });
    const user = await newUser.save();
    const userData = UserDto(user._doc);
    await sendMail(
      user.email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );
    const accessToken = jwt.sign(
      { ...userData },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "30m",
      }
    );
    const refreshToken = jwt.sign(
      { ...userData },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "240h",
      }
    );
    const savedRefreshToken = await tokenModel.create({
      user: user._id,
      refreshToken,
    });
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.json({ ...userData, accessToken });
  } catch (err) {
    if (err instanceof ApiError) res.status(400).json({ message: err.message });
    res.status(500).json({ message: "Can not registration" });
  }
};
export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw ApiError.BadRequest("Validation error", errors.array());
    }
    const user = await userModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      throw ApiError.BadRequest(
        `User with email ${req.body.email} does not exist`
      );
    }
    const isPassEquals = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );
    if (!isPassEquals) {
      throw ApiError.BadRequest("Wrong password");
    }
    const userData = UserDto(user._doc);
    const accessToken = jwt.sign(
      { ...userData },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "30m",
      }
    );
    const refreshToken = jwt.sign(
      { ...userData },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "240h",
      }
    );
    const tokenData = await tokenModel.findOne({ user: user._id });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await tokenData.save();
    } else {
      await tokenModel.create({
        user: user._id,
        refreshToken,
      });
    }
    const NewTokenData = await tokenModel.findOne({ user: user._id });
    res.cookie("refreshToken", NewTokenData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.json({ ...userData, accessToken });
  } catch (err) {
    console.log(err.message);
    if (err instanceof ApiError) res.status(400).json({ message: err.message });
    res.status(500).json({ message: "Can not login" });
  }
};
export const update = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw ApiError.BadRequest("Validation error", errors.array());
    const isUserExist = await userModel.findOne({ _id: req.body.id });
    if (!isUserExist) throw ApiError.BadRequest(`Such user does not exists`);
    const resultUser = await userModel.updateOne(
      { _id: req.body.id },
      {
        $set: {
          email: req.body.email,
          firstName: req.body.name,
          surname: req.body.surname,
          adress: req.body.adress,
          phone: req.body.phone,
        },
      }
    );
    const user = await userModel.findOne({ _id: req.body.id });
    const userData = UserDto(user);
    const accessToken = jwt.sign(
      { ...userData },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "30m",
      }
    );
    const refreshToken = jwt.sign(
      { ...userData },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "240h",
      }
    );
    const resultRefreshToken = await tokenModel.updateOne(
      { user: req.body.id },
      {
        $set: { refreshToken: refreshToken },
      }
    );
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.json({ ...userData, accessToken });
  } catch (err) {
    if (err instanceof ApiError) res.status(400).json({ message: err.message });
    res.status(500).json({ message: "Can not Update" });
  }
};
