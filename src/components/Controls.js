import { useState } from "react";
import { useClient } from "./settings";

export default function Controls(props) {
  const client = useClient();
  const { track, setStart, setInCall } = props;
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

  return (
    <>
      <button onClick={() => mute("audio")}>
        {trackState.audio ? "Audio On" : "Audio Off"}
      </button>

      <button onClick={() => leaveChannel()}>Leave</button>
    </>
  );
}
