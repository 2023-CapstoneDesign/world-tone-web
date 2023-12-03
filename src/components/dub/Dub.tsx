import { useState } from "react";
import styled from "styled-components";
import { create_dubfile } from "../../lib/api";
import { getMemberIdFromLocal } from "../../lib/auth";

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

// 허용가능한 확장자 목록!
const ALLOW_FILE_EXTENSION = "srt";
const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024; // 5MB

const Dub = () => {
  const [title, setTitle] = useState<string>();
  const [targetLanguage, setTargetLanguage] = useState<string>();
  const [srtFile, setSrtFile] = useState<File>();

  const fileUploadValidHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];
    if (files === undefined) {
      return;
    }

    // 파일 확장자 체크
    if (!fileExtensionValid(files)) {
      target.value = "";
      alert(
        `업로드 가능한 확장자가 아닙니다. [가능한 확장자 : ${ALLOW_FILE_EXTENSION}]`
      );
      return;
    }

    // 파일 용량 체크
    if (files.size > FILE_SIZE_MAX_LIMIT) {
      target.value = "";
      alert("업로드 가능한 최대 용량은 5MB입니다. ");
      return;
    }

    // validation을 정상적으로 통과한 File
    setSrtFile(files);
  };

  const uploadHandler = async () => {
    if (
      title !== undefined &&
      targetLanguage !== undefined &&
      srtFile !== undefined
    ) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("targetLanguage", targetLanguage);
      formData.append("srtFile", srtFile);
      const loginUser = getMemberIdFromLocal();
      if (loginUser === null) {
        alert("로그인 후 사용해주세요.");
        return;
      }
      await create_dubfile(loginUser, formData);
    }
  };

  return (
    <StyledDub>
      <div className="create">
        <div className="input">
          <span>제목</span>
          <input
            className="field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          ></input>
        </div>
        <div className="input">
          <span>언어</span>
          <select
            className="field"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="">언어를 선택하세요</option>
            <option value="ko">한국어</option>
            <option value="en">영어</option>
            <option value="ja">일본어</option>
            <option value="zh">중국어</option>
            <option value="es">스페인어</option>
          </select>
          {/* <input
            className="field"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            type="text"
          ></input> */}
        </div>
        <div className="input">
          <span>SRT</span>
          <label>
            <img src="/icon/addfile.png" alt="add" />
            <input
              className="file"
              onChange={fileUploadValidHandler}
              type="file"
            ></input>
          </label>
          <p> *srt 다운은 DownSub를 이용해주세요!</p>
        </div>
      </div>
      <div className="submit">
        <img src="/icon/create.png" onClick={uploadHandler} alt="create"></img>
      </div>
    </StyledDub>
  );
};

/**
 * 파일 확장자를 검사해주는 함수이다.
 * @param param
 * @returns true: 가능 확장자, false : 불가능 확장자
 */
const fileExtensionValid = ({ name }: { name: string }): boolean => {
  // 파일 확장자
  const extension = removeFileName(name);

  /**
   * 허용가능한 확장자가 있는지 확인하는 부분은 indexOf를 사용해도 괜찮고,
   * 새롭게 나온 includes를 사용해도 괜찮고, 그밖의 다른 방법을 사용해도 좋다.
   * 성능과 취향의 따라 사용하면 될것같다.
   *
   * indexOf의 경우
   * 허용가능한 확장자가 있을경우
   * ALLOW_FILE_EXTENSION 상수의 해당 확장자 첫 index 위치값을 반환
   */
  if (!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === "") {
    // 해당 if문이 수행되는 조건은
    // 1. 허용하지 않은 확장자일경우
    // 2. 확장자가 없는경우이다.
    return false;
  }
  return true;
};

/**
 * 해당 함수의 기능은 .을 제거한 순수 파일 확장자를 return해준다.
 * @param originalFileName 업로드할 파일명
 * @returns .을 제거한 순수 파일 확장자(png, jpg 등)
 */
const removeFileName = (originalFileName: string): string => {
  // 마지막 .의 위치를 구한다
  // 마지막 .의 위치다음이 파일 확장자를 의미한다
  const lastIndex = originalFileName.lastIndexOf(".");

  // 파일 이름에서 .이 존재하지 않는 경우이다.
  // 이경우 파일 확장자가 존재하지 않는경우(?)를 의미한다.
  if (lastIndex < 0) {
    return "";
  }

  // substring을 함수를 이용해 확장자만 잘라준다
  // lastIndex의 값은 마지막 .의 위치이기 때문에 해당 위치 다음부터 끝까지 문자열을 잘라준다.
  // 문자열을 자른 후 소문자로 변경시켜 확장자 값을 반환 해준다.
  return originalFileName.substring(lastIndex + 1).toLowerCase();
};

export default Dub;
