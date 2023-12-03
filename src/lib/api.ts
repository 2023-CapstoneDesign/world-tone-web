import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080",
  // baseURL:
  //   "https://port-0-world-tone-spring-12fhqa2llo3s3ieq.sel5.cloudtype.app/",
});

export const train_voice = (memberId: number, data: FormData) => {
  api
    .post(`/api/refvoice?memberId=${memberId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
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

export const create_dubfile = (memberId: number, data: FormData) => {
  api
    .post(`/api/dub?memberId=${memberId}`, data, {
      headers: {
        "Content-Type": "multipart/form-datra",
      },
    })
    .then((res) => {
      console.log("res : ", res.data);
    })
    .catch((error) => {
      console.error("Error : ", error);
    });
};

export const dub_list = (memberId: number) =>
  api.get(`/api/dub?memberId=${memberId}`);

export const login = (username: string, password: string) =>
  api.post(`/login?username=${username}&password=${password}`);

export const join = (
  name: string,
  username: string,
  password: string,
  gender: string
) =>
  api.post(
    `/signup?name=${name}&username=${username}&password=${password}&gender=${gender}`
  );
