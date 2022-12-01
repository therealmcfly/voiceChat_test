import { useState } from "react";
import {
  config,
  useClient,
  useMicrophoneAudioTrack,
  channelName,
} from "./AgoraSettings.js";

const isPresenter = true; //true면 마이크 활성 버튼 보임

export default function VoiceChat() {
  const client = useClient();
  const { ready, track } = useMicrophoneAudioTrack();
  const [inVoiceChannel, setInVoiceChannel] = useState(false); //음성체팅 참가 상태 bool
  const [micState, setMicState] = useState(true); //마이크 활성화 상태 bool

  const init = async (name) => {
    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === "audio") {
        user.audioTrack.play();
      }
    });

    client.on("user-unpublished", (user, mediaType) => {
      if (mediaType === "audio") {
        if (user.audioTrack) user.audioTrack.stop();
      }
    });

    try {
      await client.join(config.appId, name, config.token, null);
    } catch (error) {
      console.log("error");
    }

    if (track) await client.publish([track]);

    disableMic();
  };

  //보이스쳇 입장 함수
  const enterVoiceChannel = async () => {
    if (ready && track) {
      try {
        await init(channelName);
        setInVoiceChannel(true);
        console.log("currently in voice channel : " + inVoiceChannel);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //음소거 toggle
  const mute = async () => {
    await track.setEnabled(!track.enabled);
    await setMicState(track.enabled);
    await console.log("Mic enable : " + track.enabled);
  };

  const disableMic = async () => {
    await track.setEnabled(false);
    setMicState(false);
  };

  //보이스쳇 퇴장 함수
  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    track.close();
    setInVoiceChannel(false);
    console.log("currently in voice channel : " + inVoiceChannel);
  };

  return (
    <>
      {inVoiceChannel ? (
        <button onClick={leaveChannel}>Leave</button>
      ) : (
        <button onClick={enterVoiceChannel}>Enter Voice Channel</button>
      )}
      {isPresenter && (
        <button onClick={mute}>
          {micState ? "Disable Mic" : "Enable Mic"}
        </button>
      )}
    </>
  );
}
