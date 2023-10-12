import styled from "styled-components";

import { Voice } from "./Main";

const StyledVoiceList = styled.div`
  padding-top: 10px;
  th {
    border-bottom: 2px solid black;
    padding-bottom: 15px;
  }
  td {
    padding: 15px 0;
    border-bottom: 1px solid black;
  }
  table {
    margin-top: 1rem;
    width: 100%;
  }
  td {
    text-align: center;
  }
  button {
    background-color: white;
    border: none;
  }
`;

const VoiceList = ({ voices }: { voices: Voice[] }) => {
  return (
    <StyledVoiceList>
      <table>
        <tr>
          <th>번호</th>
          <th>작성날짜</th>
          <th>제목</th>
          <th>언어</th>
          <th>다운로드</th>
        </tr>

        {voices.map((voice: Voice) => (
          <tr>
            <td>{voice.id}</td>
            <td>{voice.createdDate}</td>
            <td>{voice.title}</td>
            <td>{voice.lang}</td>
            <td>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
              </svg>
            </td>
            <br />
          </tr>
        ))}
      </table>
    </StyledVoiceList>
  );
};
export default VoiceList;
