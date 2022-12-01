import { createClient, createMicrophoneAudioTrack } from "agora-rtc-react";

const appId = "b240b172a68a486496d8262bcc38d89c";
const token =
  "007eJxTYBDMLz725cfTZfNzlp6rCwzN2Va2ptZEIDPg/z6vqcE3+g8qMCQZmRgkGZobJZpZJJpYmJlYmqVYGJkZJSUnG1ukWFgmJwV3JDcEMjKseBHFxMgAgSA+G0NaZl5KZgkDAwAp2CIK";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAudioTrack = createMicrophoneAudioTrack();
export const channelName = "findit";
