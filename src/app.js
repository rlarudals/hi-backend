import express from "express"; // express framework를 사용하기 위해 import함
import morgan from "morgan"; // debugging을 위해 morgan을 import함
import dotenv from "dotenv"; // dotenv를 쓰기 위해 import함
dotenv.config(); // dotenv.config() 함수 실행
import { graphqlHTTP } from "express-graphql"; // graphqlHTTP를 실행하기 위해 express-graphql에서 import함
import cors from "cors"; // cors를 쓰기 위해 import함
import bodyParser from "body-parser"; // express middleware body-parser 모듈을 쓰기 위해 import함
import schema from "../graphql/schemas"; // schema를 사용하기 위해 graphql폴더 안에서 import함
import connect from "../db/mongo"; // connect를 사용하기 위해 db폴더 안 mongo에서 import함

// express를 app에 넣는다.
const app = express();

// dotenv에 있는 PORT를 세팅하겠다.
app.set(`PORT`, process.env.PORT);

// app에게 morgan를 써야한다고 신호를 준다.
// dev <- 키워드
app.use(morgan(`dev`));

// connect(); <--- 함수
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

// 설정 끝난 후 app.get에 `PORT`를 넣고 콜백함수를 써준 뒤 console.log를 실행시킨다.
app.listen(app.get(`PORT`), () => {
  console.log(
    `[SOPY SERVER START]:: ${process.env.PORT}, WITH GraphQL - MongoDB`
  );
});

// nodemon설정을 바꿔주기위해서 nodemon.json에 "ext" :"js graphql" 적어둔다.
// resolver 파일과 graphql 파일도 nodemon이 인지를 하겠다는 의미이다.  graphql를 수정해도 서버가 재실행될 것 이다.
// 이걸 안잡으면 서버가 재실행되지 않는다. nodemon이 무용지물 되어버린다.
// ext는 확장자를 의미한다.
