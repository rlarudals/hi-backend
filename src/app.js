import express from "express"; // express framework를 사용하기 위해 import함
import morgan from "morgan"; // debugging을 위해 morgan을 import함
import dotenv from "dotenv"; // dotenv를 쓰기 위해 import함
dotenv.config(); // dotenv.config() 함수 실행
import { graphqlHTTP } from "express-graphql"; // graphqlHTTP를 실행하기 위해 express-graphql에서 import함
import cors from "cors"; // cors를 쓰기 위해 import함
import bodyParser from "body-parser"; // express middleware body-parser 모듈을 쓰기 위해 import함
import schema from "../graphql/schemas"; // schema를 사용하기 위해 graphql폴더 안에서 import함
import connect from "../db/mongo"; // connect를 사용하기 위해 db폴더 안 mongo에서 import함

const app = express();

app.set(`PORT`, process.env.PORT);
app.use(morgan(`dev`));

connect();

// app에게 사용자가 "/graphql" 일 때 미들웨어로 cors() 실행하고, bodyPaser 실행하고 그다음 graphqlHTTP를 실행할건데 graphql폴더 안에 있는 schema를 가지고 실행할거야.
app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.listen(app.get(`PORT`), () => {
  console.log(
    ` [HI SERVER START] :: ${process.env.PORT}, WITH GraphQL - MongoDB`
  );
});
