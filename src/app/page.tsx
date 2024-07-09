
import React from 'react';
import VideoPlayer from './components/VideoPlayer';
import styles from './styles/Home.module.css';
import { generateSignedUrl } from '../utils/signedUrl';

const HomePage: React.FC = () => {
  const videoPaths = [
    '98394773-31f7-40c5-8199-232417fd92d0/play_720p.mp4'
  ];

  const expiration = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

  const videoUrls = videoPaths.map(path => generateSignedUrl(path, expiration));

  return (
    <div>
      <h1>Video Platform</h1>
      <div className={styles.grid}>
        {videoUrls.map((url, index) => (
          <VideoPlayer key={index} videoUrl={url} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
