import styled from "styled-components";

const StyledDub = styled.div`
  position: relative;
  height: 400px;
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
      padding: 10px;
      font-size: 25px;
      font-family: "Dongle", sans-serif;
      border-bottom: 4px solid #03008a;
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

const Dub = () => {
  return (
    <StyledDub>
      <div className="create">
        <div className="input">
          <span>제목</span>
          <input className="field" type="text"></input>
        </div>
        <div className="input">
          <span>언어</span>
          <input className="field" type="text"></input>
        </div>
        <div className="input">
          <span>SRT</span>
          <label>
            <img src="/icon/addfile.png" alt="add" />
            <input className="file" type="file"></input>
          </label>
          <p> *srt 다운은 DownSub를 이용해주세요!</p>
        </div>
      </div>
      <div className="submit">
        <img src="/icon/create.png" alt="create"></img>
      </div>
    </StyledDub>
  );
};
export default Dub;
