import path from "path"; // path-> 경로 경로를 추적할 수 있는 것을 impoert함
import { makeExecutableSchema } from "graphql-tools"; // graphql-tools에서 makeExecutableSchema를 가져온다. 스키마를 실행시키는 코드
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
// merge-graphql-schemas에서 fileLoader, mergeResolvers, mergeTypes가 필요하다.
// mergeResolvers는 resolver를 합치고 mergeTypes 타입디페니스들을 합친 다음에 fileLoader로 읽어낸 다음에 express로 보내준다.

// /api/**/*.  <---  api안에  * *가 있는데 얘는 폴더가 있든 없든 상관이 없다는 의미 어떤 폴더든 전부 다 인지하고 그 안에 있는 *.graphql graphql로 되어있는 모든 파일을 allTypes에 담는다는 의미
// /api/**/*.  <---  api안에  * *가 있는데 얘는 폴더가 있든 없든 상관이 없다는 의미 어떤 폴더든 전부 다 인지하고 그 안에 있는 *.js js로 되어있는 모든 파일을 다 allResolvers에 담는다는 의미
// fileLoader가 다 파일들을 읽어서 담아줄 것 이다.
const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

// 다 담았으니까 schema에다가 makeExecutableSchema typeDefs,resolvers 담아주고 이 안에다가 mergeTypes(allTypes),mergeResolvers(allResolvers)를 넣는다.
// 지금불러온 녀석들을 전부 다 makeExecutableSchema를 통해서 schema라는 변수에 싹 다 담았다.
const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers),
});

// schema라는 변수애 담은 애들을 export default 해준 것 이다.
export default schema;

// schemas.js 라는 파일은 graphql안에 있는 모든 녀석들을 전부다 파일로 수집해서 express에게 전달할 것 이다.
// graphql 두가지 타입으로 구성된다. 첫번째 .graphql .js 이녀석들을 우리는 얘네를 resolver라고 부른다.
