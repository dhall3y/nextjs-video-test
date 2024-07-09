import React from 'react';
import VideoPlayer from './components/VideoPlayer';
import styles from './styles/Home.module.css';

const HomePage: React.FC = () => {
  const videoUrls = [
    //https://{pull_zone_url}.b-cdn.net/{video_id}/play_{resolution_height}p.mp4
    'https://vz-b8553144-3b2.b-cdn.net/98394773-31f7-40c5-8199-232417fd92d0/play_720p.mp4'
  ];

  return (
    <div>
      <div className={styles.grid}>
        {videoUrls.map((url, index) => (
          <VideoPlayer key={index} videoUrl={url} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
