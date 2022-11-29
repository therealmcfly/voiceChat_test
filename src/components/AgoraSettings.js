import { createClient, createMicrophoneAudioTrack } from "agora-rtc-react";

const appId = "aa82696e8d3345d1a0fae3906bd60c12";
const token =
  "007eJxTYFgz++zuWQ9mVSyPVJu8SzBeIePFcWkVlZqQupwj4VwbZn5WYEhMtDAyszRLtUgxNjYxTTFMNEhLTDW2NDBLSjEzSDY02jGpNbkhkJFh6tfpLIwMEAjiCzKkZealZJboJufnpaUWpeYlpzIwAABifSW+";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAudioTrack = createMicrophoneAudioTrack();
export const channelName = "findit-conference";
