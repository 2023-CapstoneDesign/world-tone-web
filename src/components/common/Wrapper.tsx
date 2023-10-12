import styled from "styled-components";

const WrapperBlock = styled.div`
  width: 1280px;
  margin: 0 auto;
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Wrapper = ({ children, ...rest }: any) => {
  return <WrapperBlock {...rest}>{children}</WrapperBlock>;
};

export default Wrapper;
