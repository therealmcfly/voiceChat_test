import { useState } from "react";
import VideoCall from "./components/VideoCall";

function App() {
  const [inCall, setInCall] = useState();
  return (
    <div className="App">
      {inCall ? (
        <VideoCall setInCall={setInCall} />
      ) : (
        <button onClick={() => setInCall(true)}>Join Call</button>
      )}
    </div>
  );
}

export default App;
