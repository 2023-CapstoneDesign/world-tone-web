import React, { ReactNode, useEffect, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import styled from "styled-components";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"; // react-speech-recognition 라이브러리 추가
import { scripts } from "../../data/scripts";

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
    /* .audio-recorder {
      position: absolute;
      left: 20%;
      top: 40%;
      transform: translateX(-50%) translateY(-50%);
      width: 90px;
      height: 90px;
    }
    .audio-recorder-mic {
      width: 70px;
      height: 70px;
      background-color: rgb(222, 222, 222);
      padding: 10px;
    } */
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
      transform: scale(0.9); /* 버튼을 작게 축소하는 효과를 줍니다. */
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

  const addAudio = (blob: Blob | undefined) => {
    // const url = URL.createObjectURL(blob);
    // const audio = document.createElement("audio");
    // audio.src = url;
    // audio.controls = true;
    // document.body.appendChild(audio);

    const fileName = "recorded_audio" + stage + ".wav";

    if (blob) {
      console.log("create file");
      //   const audioFile = blobToFile({ blob, fileName });
      setAudioFile(blobToFile({ blob, fileName }));
      //   setRecordedAudios((prevAudios) => [...prevAudios, audioFile]);
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

  // => 문제 : 말하다가 쉬면 그 다음 문장이 인식이 안됨...
  const startChecking = (): void => {
    // 녹음 시작
    recorderControls.startRecording();

    // STT 시작
    resetTranscript(); // 이전 텍스트 초기화
    SpeechRecognition.startListening(); // 음성 인식 시작

    // //일정 시간 후에 음성 인식 결과를 확인하고 필요한 작업 수행
    // setTimeout(() => {
    //   setSttText(transcript);
    //   console.log("음성 인식 결과:", sttText);

    //   // result에는 음성을 텍스트로 변환한 결과가 포함됩니다.
    //   // 이 결과를 필요에 따라 처리할 수 있습니다.
    // }, 5000); // 5초 후에 결과 확인 (원하는 시간으로 조절 가능)
  };

  // 두 문자열을 전처리하여 띄어쓰기와 문장 부호를 제거한 후 비교
  function compareTexts({
    transcript,
    actualText,
  }: {
    transcript: string;
    actualText: string;
  }) {
    // 띄어쓰기와 문장 부호를 제거하고 모든 문자를 소문자로 변환
    const cleanSttText = transcript.replace(/[\s.,!?]/g, "").toLowerCase();
    const cleanActualText = actualText.replace(/[\s.,!?]/g, "").toLowerCase();
    console.log("stt : ", cleanSttText);
    console.log("actual : ", cleanActualText);
    // 전처리한 문자열을 비교
    return cleanSttText === cleanActualText;
  }

  const stopChecking = (): void => {
    // STT 끝
    SpeechRecognition.stopListening();
    // 녹음 끝
    recorderControls.stopRecording();

    const actualText = scripts[stage];
    console.log("transcript : ", transcript);
    if (compareTexts({ transcript, actualText })) {
      // 파일 저장
      console.log("blob : ", recorderControls.recordingBlob);
      addAudio(recorderControls.recordingBlob);
    } else {
      alert(
        "정확한 발음으로 따라해주세요. 사용자의 음성 추출을 위해 중요한 과정이랍니다~"
      );
      console.log("original : ", actualText);
      console.log("train : ", transcript);
    }
  };

  //   useEffect(() => {
  //     if (recorderControls.isRecording) {
  //       startChecking();
  //     } else {
  //       stopChecking();
  //     }
  //   }, [recorderControls.isRecording]);

  const handleNextClick = () => {
    console.log(stage);
    if (stage < 9 && audioFile) {
      console.log("add audio");
      setRecordedAudios((prevAudios) => [...prevAudios, audioFile]);
      setStage(stage + 1);
      setAudioFile(undefined);
    } else if (stage === 9) {
      console.log("Submitting recorded audios to the server:", recordedAudios);
    }
    console.log("recorded audios : ", recordedAudios);
  };

  return (
    <StyledAudio>
      <div className="record-detail">
        <AudioRecorder
          onRecordingComplete={(blob) => addAudio(blob)}
          recorderControls={recorderControls}
        />
      </div>
      {recorderControls.isRecording ? (
        <div className="record" onClick={() => stopChecking()}>
          <img className="mic-img" src="/icon/stop.png" alt="stop"></img>
          {/* <div className="record-detail">
            <AudioRecorder
              onRecordingComplete={(blob) => addAudio(blob)}
              recorderControls={recorderControls}
            />
          </div> */}
        </div>
      ) : (
        <div className="record" onClick={() => startChecking()}>
          <img className="mic-img" src="/icon/mic.png" alt="mic"></img>
        </div>
      )}

      {transcript}
      {/* <button onClick={recorderControls.stopRecording}>Stop recording</button> */}
      {stage < 9 ? (
        <div className="stage" onClick={handleNextClick}>
          <img src="/icon/next.png" alt="next"></img>
        </div>
      ) : (
        <div className="stage">
          <img src="/icon/submit.png" alt="next"></img>
        </div>
      )}
    </StyledAudio>
  );
};

export default AudioRecord;
