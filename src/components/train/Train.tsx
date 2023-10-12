import { useState } from "react";
import AudioRecord from "./AudioRecord";
import Script from "./Script";
import styled from "styled-components";

const StyledTrain = styled.div`
  height: 700px;
`;

const Train = () => {
  const [stage, setStage] = useState(0);

  return (
    <StyledTrain>
      <Script stage={stage} />
      <AudioRecord stage={stage} setStage={setStage} />
    </StyledTrain>
  );
};

export default Train;
