import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    nickName: {
      type: String,
      required: true,
    },
    zoneCode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    detailAddress: {
      type: String,
      required: true,
    },
    secretCode: {
      type: String,
      required: true,
      default: "-",
    },
  },
  { versionKey: false }
);

export default mongoose.model(`User`, User, `User`);
