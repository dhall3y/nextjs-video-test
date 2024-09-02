// components/HLSPlayer.tsx
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import Hls from "hls.js/dist/hls.light"; // Use light build of hls.
import styles from "../styles/Media.module.css";



interface Props extends React.HTMLProps<HTMLVideoElement> {
  manifest: string;
  subtitles?: string;
  subtitleLabel?: string;
}

const HLSPlayer = forwardRef<HTMLVideoElement, Props>(({ manifest, subtitles, subtitleLabel = "English", ...props }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useImperativeHandle(ref, () => videoRef.current!);

  useEffect(() => {
    const src = manifest;
    const { current: video } = videoRef;
    if (!video) return;

    let hls: Hls | null;
    if (video.canPlayType("application/vnd.apple.mpegurl")) { // Safari
      video.src = src;
    } else if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    }

    return () => hls?.destroy();
  }, [manifest]);

  return (
    <video {...props} className={styles.media} ref={videoRef} controls>
      {subtitles && (
        <track
          kind="subtitles"
          src={subtitles}
          srcLang="en"
          label={subtitleLabel}
          default
        />
      )}
    </video>
  );
});

HLSPlayer.displayName = "HLSPlayer";

export default HLSPlayer;
