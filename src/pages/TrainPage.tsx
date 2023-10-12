import Header from "../components/common/Header";
import Wrapper from "../components/common/Wrapper";
import Train from "../components/train/Train";

function TrainPage() {
  return (
    <>
      <Header active={3}></Header>
      <Wrapper>
        <Train />
      </Wrapper>
    </>
  );
}

export default TrainPage;
