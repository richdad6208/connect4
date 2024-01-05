const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// 데이터베이스 연결
const mongoDBUri = process.env.DB_URI; // 여기에 MongoDB URI를 입력하세요.

mongoose.connect(mongoDBUri);

mongoose.connection.on("connected", () => {
  console.log("MongoDB에 연결되었습니다.");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB 연결 오류: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB 연결이 끊어졌습니다.");
});

// 사용자 스키마 정의
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// 스키마를 사용하여 모델 생성
const User = mongoose.model("User", UserSchema);

const user = new User({
  username: "jack",
  password: "1231",
});

user
  .save()
  .then((user) => console.log(user))
  .catch((err) => console.error(err));

// 라우트 설정
app.get("/", (req, res) => {
  res.send("Game App Backend");
});

// 게임 관련 라우트
app.post("/game/start", (req, res) => {
  // 게임 시작 로직
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
