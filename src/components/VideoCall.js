import { useState, useEffect } from "react";
import {
  config,
  useClient,
  useMicrophoneAudioTrack,
  channelName,
} from "./settings.js";

export default function VideoCall(props) {
  const { setInCall } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, track } = useMicrophoneAudioTrack();
  const [trackState, setTrackState] = useState({ audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await track.setEnabled(!trackState.audio);
      console.log("audio is : " + track.enabled);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    track.close();
    setStart(false);
    setInCall(false);
  };

  useEffect(() => {
    let init = async (name) => {
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

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });
      try {
        await client.join(config.appId, name, config.token, null);
      } catch (error) {
        console.log("error");
      }

      if (track) await client.publish([track]);
      setStart(true);
    };

    if (ready && track) {
      try {
        init(channelName);
      } catch (error) {
        console.log(error);
      }
    }
  }, [client, ready, track]);

  console.log("user : " + users);
  console.log("connection status : " + start);
  return (
    <>
      <button onClick={() => mute("audio")}>
        {trackState.audio ? "Audio On" : "Audio Off"}
      </button>

      <button onClick={() => leaveChannel()}>Leave</button>
    </>
  );
}
