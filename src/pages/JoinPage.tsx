import Header from "../components/common/Header";
import Wrapper from "../components/common/Wrapper";
import JoinForm from "../components/user/JoinForm";

function JoinPage() {
  return (
    <Wrapper>
      <Header active={0}></Header>
      <JoinForm></JoinForm>
    </Wrapper>
  );
}

export default JoinPage;
