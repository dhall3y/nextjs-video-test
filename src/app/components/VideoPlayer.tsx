'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const HLSPlayer = dynamic(() => import('./HLSPlayer'), { suspense: true });

interface VideoPlayerProps {
  videoUrl: string;
  videoSubtitle?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, videoSubtitle }) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <HLSPlayer
        className="rounded-lg w-full aspect-video object-contain relative z-10 video"
        playsInline
        controls
        manifest={videoUrl}
        subtitles={videoSubtitle}
        loop
      />
    </React.Suspense>
  );
};

export default VideoPlayer;
