import { useState, useEffect } from "react";
import {
  config,
  useClient,
  useMicrophoneAudioTrack,
  channelName,
} from "./settings.js";
import Controls from "./Controls";

export default function VideoCall(props) {
  const { setInCall } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const aaa = useMicrophoneAudioTrack();
  const { ready, track } = aaa;

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

  return (
    <>
      {ready && track && (
        <Controls track={track} setStart={setStart} setInCall={setInCall} />
      )}
      <p>{users + start}</p>
    </>
  );
}
