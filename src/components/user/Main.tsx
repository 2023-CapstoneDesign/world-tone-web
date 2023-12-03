import { useEffect, useState } from "react";
import { initialData } from "../../data/initial-data";
import VoiceList from "./VoiceList";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { dub_list } from "../../lib/api";
import axios from "axios";
import { getMemberIdFromLocal } from "../../lib/auth";

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
  createdAt: string;
  url: string;
};
const Main = () => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getVoiceList = async () => {
    // 음성 파일 목록 가져오는 코드
    const loginUserId = getMemberIdFromLocal();

    // 가져온 정보가 없을 경우
    if (!loginUserId) {
      return;
    }
    await dub_list(loginUserId)
      .then((res) => {
        console.log("res : ", res);
        const voices: Voice[] = res.data.map((item: any) => ({
          id: item.id || 0, // 예외 처리: id가 없을 경우 0으로 설정
          title: item.title || "",
          lang: item.language || "",
          createdAt: item.createdAt.split("T")[0] || "",
          url: item.uploadedFileName || "",
        }));
        setVoices(voices);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
    //setVoices(initialData);
  };

  useEffect(() => {
    getVoiceList();
  }, []);

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
