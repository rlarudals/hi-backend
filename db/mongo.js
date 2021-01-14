const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connect = () => {
  if (process.env.NODE_ENV !== `production`) {
    mongoose.set("debug", true); // debug모드로 실행된다.
  }

  mongoose.connect(
    `mongodb://${process.env.DB_ID}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_USER}`,
    {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useCreateIndex: true,
      // `` <-- 첫번째 파라미터 연결 주소 , {} <--
    },
    (error) => {
      if (error) {
        console.log(error);
        console.log(`❌ CONNECTION FAILED TRY AGAIN`);
      } else {
        console.log(`⭕ MONGODB CONNECTION SUCCEES`);
      }
    }
  );
};

mongoose.connection.on(`error`, (error) => {
  console.log(error);
  console.log(`❌ CONNECTION FAILED TRY AGAIN`);
  connect();
});

mongoose.connection.on(`disconnect`, () => {
  console.log(`❌ CONNECTION FAILED TRY AGAIN`);
  connect();
});

module.exports = connect;
