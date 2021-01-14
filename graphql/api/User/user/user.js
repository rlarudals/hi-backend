import User from "../../../model/User";
import nodemailer from "nodemailer";
import smtpPool from "nodemailer-smtp-pool";

export default {
  Mutation: {
    checkSecretCode: async (_, args) => {
      const { email, code } = args;

      try {
        const tryUser = await User.findOne({ email });

        if (tryUser.secretCode === code) {
          await User.updateOne(
            { email },
            {
              $set: { secretCode: `` },
            }
          );

          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    registUser: async (_, args) => {
      const {
        name,
        email,
        nickname,
        mobile,
        zonecode,
        address,
        detailAddress,
      } = args;

      try {
        const prevResult = await User.find({ email });

        if (prevResult.length !== 0) {
          console.log("Exist User Email Yet.");
          return false;
        } else {
          const result = await User.create({
            name,
            email,
            nickName: nickname,
            mobile,
            zoneCode: zonecode,
            address,
            detailAddress,
          });

          return true;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    tryLogin: async (_, args) => {
      const { email } = args;

      try {
        const exist = await User.find({ email });

        if (exist.length > 0) {
          const randomCode = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`];

          const code =
            randomCode[Math.floor(Math.random() * 10)] +
            randomCode[Math.floor(Math.random() * 10)] +
            randomCode[Math.floor(Math.random() * 10)] +
            randomCode[Math.floor(Math.random() * 10)];

          const smtpTransport = nodemailer.createTransport(
            smtpPool({
              service: "Gmail",
              host: "localhost",
              port: "465",
              tls: {
                rejectUnauthorize: false,
              },

              auth: {
                user: "nijoyh0503@gmail.com",
                pass: "kmxvmjxujmkzbijj",
              },
              maxConnections: 5,
              maxMessages: 10,
            })
          );

          const mailOpt = {
            from: "nijoyh0503@gmail.com",
            to: email,
            subject:
              "🔐로그인 인증코드 전송 [https://rlarudals.github.io/hi-frontend]",
            html: `인증코드는 ${code} 입니다.`,
          };

          await smtpTransport.sendMail(mailOpt, function (err, info) {
            if (err) {
              console.error("Send Mail error : ", err);
              smtpTransport.close();
            } else {
              console.log("Message sent : ", info);
              smtpTransport.close();
            }
          });

          const updateResult = await User.updateOne(
            { email },
            {
              $set: {
                secretCode: code,
              },
            }
          );

          return true;
        } else {
          return false;
        }

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
