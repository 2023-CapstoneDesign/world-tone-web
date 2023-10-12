import { useEffect, useState } from "react";
import { initialData } from "../../data/initial-data";
import VoiceList from "./VoiceList";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const StyledMain = styled.div`
  position: relative;
  .search-bar {
    position: absolute;
    right: 0%;
    display: flex;
  }
  .list {
    padding-top: 10px;
  }
`;

export type Voice = {
  id: number;
  title: string;
  lang: string;
  createdDate: string;
};
const Main = () => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getVoiceList = () => {
    // 음성 파일 목록 가져오는 코드
    setVoices(initialData);
  };

  useEffect(() => {
    getVoiceList();
  }, []);

  // 검색
  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  return (
    <StyledMain>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          placeholder="제목을 입력해주세요."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div>
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>
      <div className="list">
        <VoiceList
          voices={voices?.filter(
            (voices) => voices.title.indexOf(searchQuery) !== -1
          )}
        ></VoiceList>
      </div>
    </StyledMain>
  );
};

export default Main;
