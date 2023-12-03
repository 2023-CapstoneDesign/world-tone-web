import { useState } from "react";
import styled from "styled-components";
import { join } from "../../lib/api";
import { error } from "console";
import { useNavigate } from "react-router-dom";

const StyledDub = styled.div`
  position: relative;
  height: 550px;
  .create {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    .input {
      padding: 20px;
      img {
        width: 100px;
        height: 100px;
      }
      .field {
        width: 500px;
        height: 25px;
      }
      .file {
        display: none;
      }
    }
    span {
      width: 100px;
      height: 25px;
      padding: 10px;
      font-size: 20px;
      font-family: "Dongle", sans-serif;
      display: inline-block; /* span이 block 요소로 적용되지 않도록 변경 */
    }
  }
  .submit {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0%;
    img {
      width: 223.68px;
      height: 55.6px;
    }
    img:active {
      transform: scale(0.9); /* 버튼을 작게 축소하는 효과를 줍니다. */
    }
  }
`;

const JoinForm = () => {
  const [name, setName] = useState<string>();
  const [id, setId] = useState<string>();
  const [pass, setPass] = useState<string>();
  const [gender, setGender] = useState<string>();
  const navigate = useNavigate();

  const uploadHandler = async () => {
    if (
      name !== undefined &&
      id !== undefined &&
      pass !== undefined &&
      gender !== undefined
    ) {
      join(name, id, pass, gender)
        .then((res) => {
          console.log("res : ", res);
          alert("회원가입에 성공했습니다.");
          navigate("/auth/login");
        })
        .catch((error) => {
          console.error("Error : ", error);
        });
    }
  };

  return (
    <StyledDub>
      <div className="create">
        <div className="input">
          <span>NAME</span>
          <input
            className="field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          ></input>
        </div>
        <div className="input">
          <span>ID</span>
          <input
            className="field"
            value={id}
            onChange={(e) => setId(e.target.value)}
            type="text"
          ></input>
        </div>
        <div className="input">
          <span>PASSWORD</span>
          <input
            className="field"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
          ></input>
        </div>
        <div className="input">
          <span>GENDER</span>
          <select
            className="field"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">성별</option>
            <option value="m">남</option>
            <option value="f">여</option>
          </select>
        </div>
      </div>
      <div className="submit">
        <img src="/icon/create.png" onClick={uploadHandler} alt="create"></img>
      </div>
    </StyledDub>
  );
};

export default JoinForm;
