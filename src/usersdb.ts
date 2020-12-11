import { deleteKeys } from "./ui/utils";

export {};
const { MongoClient, ObjectId } = require("mongodb");
//NOTE: uri and client is global in order to backward compibility
const uri = process.env["mongodb_url"];
const opts = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
const client = new MongoClient(uri, opts);
const DBNAME = "users";
const firstCollection = "users";
type MD5Type = string;
const MD5 = require("./ui/md5");
globalThis.connected = false;

async function maybe_connect() {
  console.log("maybe_connect");
  if (!globalThis.connected) {
    console.log("Real connect");
    await client.connect();
    globalThis.connected = true;
  }
}
async function appendUser(login, password, name): Promise<void> {
  await maybe_connect();
  let data = {
    login,
    password,
    token: MD5(`${login}_${password}`),
    name,
    rank: 0,
    place: "не указано",
  };
  const result = await client
    .db(DBNAME)
    .collection(firstCollection)
    .insertOne(data);
  console.log(`Append user with id: ${result.insertedId}`);
}
async function changePassword(
  token: string,
  new_password: string,
): Promise<void | string> {
  await maybe_connect();
  let user = await client
    .db(DBNAME)
    .collection(firstCollection)
    .findOne({ token: token });
  if (!user) return "INVALID";
  const login = user.login;
  const new_token = MD5(`${login}_${new_password}`);
  await client
    .db(DBNAME)
    .collection(firstCollection)
    .updateOne(
      { token: token },
      { $set: { password: new_password, token: new_token } },
    );
}
type sigInType = {
  token: MD5Type;
  id: string;
};
async function signIn(
  login: string,
  password: string,
): Promise<sigInType | string> {
  //`SELECT password from users WHERE login='${login}';
  const data = { token: "", id: "" };
  await maybe_connect();
  let data_from_db = await client
    .db(DBNAME)
    .collection(firstCollection)
    .findOne({ login: login });
  if (data_from_db === null) return "INVALID"; //invalid login
  if (data_from_db.password !== password) return "INVALID"; //correct login but incorrect password
  data.token = data_from_db.token;
  data.id = data_from_db._id;
  return data;
}
async function isLoginExists(login: string): Promise<boolean> {
  await maybe_connect();
  let ok;
  ok = await client
    .db(DBNAME)
    .collection(firstCollection)
    .findOne({ login: login });
  return ok !== null;
}
async function isTokenCorrect(token: string): Promise<boolean> {
  await maybe_connect();
  let ok;
  ok = await client
    .db(DBNAME)
    .collection(firstCollection)
    .findOne({ token: token });
  return ok === token;
}
async function getUserInfo(id: string): Promise<any> {
  //rank and place
  // `SELECT rank,place from users WHERE id='${id}';`
  //select name, content from knowledgebase where applicationId='1';
  //db.knowledgebase.find({ "applicationId": "1"}, { "name": 1,    "content": 1});
  await maybe_connect();
  let result = await client
    .db(DBNAME)
    .collection(firstCollection)
    .find({ _id: ObjectId(id) });
  result.forEach((smt) => {
    globalThis.UserInfo = smt;
  });
  deleteKeys(globalThis.UserInfo, ["_id", "login", "password", "token"]);
  return globalThis.UserInfo;
}
async function getToken(login: string): Promise<string> {
  await maybe_connect();
  let result = await client
    .db(DBNAME)
    .collection(firstCollection)
    .findOne({ login: login });
  return result.token;
}
export {
  appendUser,
  changePassword,
  signIn,
  isLoginExists,
  isTokenCorrect,
  getUserInfo,
  getToken,
};
