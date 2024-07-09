import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      <video width="100%" height="auto" controls>
        <source src={videoUrl} type="application/x-mpegURL" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
