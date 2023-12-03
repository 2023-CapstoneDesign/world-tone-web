import styled from "styled-components";
import Wrapper from "./Wrapper";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMemberIdFromLocal } from "../../lib/auth";
const StyledHeader = styled.header<{ active: number }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 50px 0;

  .logo {
    flex: 1;
    font-size: 2rem;
    font-weight: bold;
    align-items: center;
  }
  .logo img {
    width: 163.65px;
    height: 30.79px;
  }
  .nav-list {
    align-items: center;
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 20px;
    font-family: "Dongle", sans-serif;
    .nav:nth-child(${(props) => props.active}) {
      border-bottom: 4px solid #03008a;
    }
    .nav {
      //font-weight: bold;
      color: black;
      cursor: pointer;
      padding-bottom: 0.75rem;
      border-bottom: 4px solid transparent;
      text-decoration: none;
    }
  }

  .account {
    font-size: 20px;
    font-family: "Dongle", sans-serif;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
    padding-bottom: 0.75rem;
    .nav {
      text-decoration: none;
      color: black;
    }
    span {
      cursor: pointer;
    }

    a + a {
      margin-left: 1rem;
    }
  }
`;

type HeaderProps = {
  children?: React.ReactElement;
  active: number;
};

function Header(props: HeaderProps) {
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);

  const handleLogout = () => {
    localStorage.removeItem("memberId");
    setIsLoggedOut(true);
  };

  useEffect(() => {
    setIsLoggedOut(false);
  }, []);

  return (
    <Wrapper>
      <StyledHeader active={props.active}>
        <div className="logo">
          <Link to={"/"}>
            <img src="/icon/WorldTone.png" alt="logo"></img>
          </Link>
        </div>
        <div className="nav-list">
          <Link to={"/"} className="nav">
            LIST
          </Link>
          <Link to={"/create"} className="nav">
            CREATE
          </Link>
          <Link to={"/train"} className="nav">
            TRAIN
          </Link>
        </div>
        {getMemberIdFromLocal() === null ? (
          <div className="account">
            <Link to="/auth/login" className="nav">
              <span>Login</span>
            </Link>
            <Link to="/auth/join" className="nav">
              <span>Join</span>
            </Link>
          </div>
        ) : (
          <div className="account">
            <Link to="/" className="nav" onClick={handleLogout}>
              <span>Logout</span>
            </Link>
          </div>
        )}
      </StyledHeader>
    </Wrapper>
  );
}
export default Header;
