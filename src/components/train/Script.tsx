import styled from "styled-components";
import { scripts } from "../../data/scripts";

const StyledScript = styled.div`
  position: relative;
  height: 200px;
  .info {
    position: absolute;
    left: 5%;
    span {
      font-size: 25px;
      font-weight: bold;
      font-family: "Dongle", sans-serif;
    }
  }
  .script {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translateX(-50%);
    width: 1000px;
    height: 150px;
    border: 2px solid #03008a;
    border-radius: 20px;
    span {
      position: absolute;
      left: 5%;
      top: 40%;
      font-size: 23px;
      font-family: "Dongle", sans-serif;
    }
  }
`;

const Script = ({ stage }: { stage: number }) => {
  return (
    <StyledScript>
      <div className="info">
        <span> 아래의 문장을 읽어주세요.</span>
      </div>
      <div className="script">
        <span>{scripts[stage]}</span>
      </div>
    </StyledScript>
  );
};
export default Script;
