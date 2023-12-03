import styled from "styled-components";
import Wrapper from "../common/Wrapper";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../lib/api";
const StyledAuth = styled.div`
  position: relative;
  height: 600px;
  .logo {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translateX(-50%);
    flex: 1;
    font-size: 2rem;
    font-weight: bold;
    align-items: center;
    img {
      width: 313.52px;
      height: 58.98px;
    }
  }
  .login {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translateX(-50%);
    padding-bottom: 10px;
    .input {
      padding: 5px;
      .field {
        width: 280px;
        height: 40px;
        font-size: 18px;
      }
    }
  }
  .submit {
    position: absolute;
    left: 50%;
    top: 65%;
    transform: translateX(-50%);

    .btn {
      img {
        width: 260.75px;
        height: 63px;
      }
    }
  }
`;

const AuthForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const loginBtn = () => {
    login(username, password)
      .then((res) => {
        console.log(res.data);
        alert("로그인에 성공했습니다.");
        localStorage.setItem("memberId", res.data);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error:", err.response.data.message);
        alert(err.response.data.message);
      });
  };
  return (
    <>
      <Wrapper>
        <StyledAuth>
          <div className="logo">
            <Link to={"/"}>
              <img src="/icon/WorldTone.png" alt="logo"></img>
            </Link>
          </div>
          <div className="login">
            <div className="input">
              <input
                className="field"
                type="text"
                placeholder="id"
                onChange={handleUsernameChange}
                value={username}
              ></input>
            </div>
            <div className="input">
              <input
                className="field"
                type="password"
                placeholder="password"
                onChange={handlePasswordChange}
                value={password}
              ></input>
            </div>
          </div>
          <div className="submit">
            <div className="btn" onClick={loginBtn}>
              <img src="/icon/login.png" alt="login"></img>
            </div>
            {/* <div className="btn">
              <img src="/icon/kakao.png" alt="login"></img>
            </div> */}
          </div>
        </StyledAuth>
      </Wrapper>
    </>
  );
};

export default AuthForm;
