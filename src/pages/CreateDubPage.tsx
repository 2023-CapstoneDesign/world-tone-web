import Header from "../components/common/Header";
import Wrapper from "../components/common/Wrapper";
import Dub from "../components/dub/Dub";

const CreateDubPage = () => {
  return (
    <>
      <Header active={2}></Header>
      <Wrapper>
        <Dub />
      </Wrapper>
    </>
  );
};
export default CreateDubPage;
