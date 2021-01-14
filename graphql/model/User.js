import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const <--변하지 않는다는 의미  Schema <-- 객체는 대문자로 시작함

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
// export default를 하여 외부에서도 사용 가능하게 만들어준다.
// (`별칭`, 실제 객체 , `몽고DB안에 있는 진짜 별칭스키마는 뭔데?`)
