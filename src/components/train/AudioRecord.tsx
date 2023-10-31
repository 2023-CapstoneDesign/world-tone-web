import React, { ReactNode, useEffect, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import styled from "styled-components";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"; // react-speech-recognition 라이브러리 추가
import { scripts } from "../../data/scripts";
import { train_voice } from "../../lib/api";

const StyledAudio = styled.div`
  position: relative;
  height: 300px;
  .record-detail {
    display: none;
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translateX(-50%);
  }
  .record {
    .mic-img {
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translateX(-50%) translateY(-50%);
      width: 90px;
      height: 90px;
    }
    .record-detail {
      position: absolute;
      left: 50%;
      top: 60%;
      transform: translateX(-50%);
    }
  }

  .stage {
    position: absolute;
    left: 50%;
    bottom: 0%;
    transform: translateX(-50%);
    img {
      width: 223.68px;
      height: 55.6px;
    }
    img:active {
      transform: scale(0.9);
    }
  }
`;
const AudioRecord = ({
  stage,
  setStage,
}: {
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [recordedAudios, setRecordedAudios] = useState<File[]>([]);
  const recorderControls = useAudioRecorder();
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [audioFile, setAudioFile] = useState<File>();

  const recordAudio = (blob: Blob | undefined) => {
    const fileName = "recorded_audio" + stage + ".wav";

    if (blob) {
      console.log("create file");
      setAudioFile(blobToFile({ blob, fileName }));
    }
  };

  const blobToFile = ({
    blob,
    fileName,
  }: {
    blob: Blob;
    fileName: string;
  }): File => {
    const file = new File([blob], fileName, {
      type: blob.type,
      lastModified: Date.now(),
    });
    return file;
  };

  const startChecking = (): void => {
    // 녹음 시작
    recorderControls.startRecording();

    // STT 시작
    resetTranscript(); // 이전 텍스트 초기화
    SpeechRecognition.startListening(); // 음성 인식 시작
  };

  const stopChecking = (): void => {
    // STT 끝
    SpeechRecognition.stopListening();
    // 녹음 끝
    recorderControls.stopRecording();
    console.log("transcript : ", transcript);
    if (!compareTexts(transcript)) {
      alert(
        "정확한 발음으로 따라해주세요. 사용자의 음성 추출을 위해 중요한 과정이랍니다~"
      );
      alert("추출 결과 : " + transcript);
    }
  };

  // 두 문자열을 전처리하여 띄어쓰기와 문장 부호를 제거한 후 비교
  function compareTexts(transcript: string) {
    // 띄어쓰기와 문장 부호를 제거하고 모든 문자를 소문자로 변환
    const cleanSttText = transcript.replace(/[\s.,!?]/g, "").toLowerCase();
    const actualText = scripts[stage - 1];
    const cleanActualText = actualText.replace(/[\s.,!?]/g, "").toLowerCase();
    console.log("stt : ", cleanSttText);
    console.log("actual : ", cleanActualText);
    // 전처리한 문자열을 비교
    return cleanSttText === cleanActualText;
  }

  const handleNextClick = async () => {
    console.log("stage : " + stage);
    if (compareTexts(transcript)) {
      await addAudio();
      setStage(stage + 1);
      setAudioFile(undefined);
    }
    console.log("recorded audios : ", recordedAudios);
  };
  const submitFiles = async () => {
    const formData = new FormData();
    console.log("recordedAudios len : " + recordedAudios.length);
    recordedAudios.forEach((file) => {
      // 파일 데이터 저장
      formData.append("voiceFiles", file);
    });

    train_voice(formData);
  };

  const addAudio = async () => {
    console.log("add audio");
    if (audioFile) {
      await setRecordedAudios((prevAudios) => [...prevAudios, audioFile]);
    }
    console.log("recordidAudios in addAudio : ", recordedAudios);
  };

  return (
    <StyledAudio>
      <div className="record-detail">
        <AudioRecorder
          onRecordingComplete={(blob) => recordAudio(blob)}
          recorderControls={recorderControls}
        />
      </div>

      {/* <div>{transcript}</div>
      {recordedAudios.length} */}
      {stage < 11 ? (
        <>
          {recorderControls.isRecording ? (
            <div className="record" onClick={() => stopChecking()}>
              <img className="mic-img" src="/icon/stop.png" alt="stop"></img>
            </div>
          ) : (
            <div className="record" onClick={() => startChecking()}>
              <img className="mic-img" src="/icon/mic.png" alt="mic"></img>
            </div>
          )}
          <div className="stage" onClick={() => handleNextClick()}>
            <img src="/icon/next.png" alt="next"></img>
          </div>
        </>
      ) : (
        <div className="stage" onClick={() => submitFiles()}>
          <img src="/icon/submit.png" alt="next"></img>
        </div>
      )}
    </StyledAudio>
  );
};

export default AudioRecord;
