import Header from "../components/common/Header";
import Wrapper from "../components/common/Wrapper";
import Main from "../components/user/Main";

function MainPage() {
  return (
    <>
      <Header active={1}></Header>
      <Wrapper>
        <Main></Main>
      </Wrapper>
    </>
  );
}
export default MainPage;
