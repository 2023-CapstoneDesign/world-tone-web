import axios from "axios";
const api = axios.create({
  //baseURL: "http://localhost:8080",
  baseURL:
    "https://port-0-world-tone-spring-12fhqa2llo3s3ieq.sel5.cloudtype.app/",
});

export const train_voice = (data: FormData) => {
  api
    .post("/api/refvoice", data, {
      headers: {
        ContentType: "multipart/form-data",
      },
    })
    .then((res) => {
      alert(
        "녹음한 음성 파일을 전송을 완료했습니다. 음성 학습은 1~2분 소요될 예정입니다."
      );
      console.log("res : ", res.data);
    })
    .catch((error) => {
      console.error("Error : ", error);
    });
};
