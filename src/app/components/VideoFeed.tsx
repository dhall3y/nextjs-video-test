'use client';
import React, { useState, useEffect, useRef, useCallback } from "react";
import VideoPlayer from "./VideoPlayer"; // Import your VideoPlayer component
import styles from "../styles/VideoFeed.module.css";

interface VideoType {
  id: string;
  url: string;
  title: string;
  subtitle?: string;
}

const VideoFeed: React.FC = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const videoCounter = useRef<number>(0);

  useEffect(() => {
    loadMoreVideos();
  }, []);

  const loadMoreVideos = () => {
    setLoading(true);
    setTimeout(() => {
      const newVideos: VideoType[] = [
        { id: `${videoCounter.current}`, url: "/video1/master.m3u8", subtitle: "/video1/input.vtt", title: `Video ${videoCounter.current + 1}` },
        { id: `${videoCounter.current + 1}`, url: "/video2/master.m3u8", subtitle: "/video2/input_2.vtt", title: `Video ${videoCounter.current + 1}` },
      ];
      videoCounter.current += newVideos.length;
      setVideos((prevVideos) => [...prevVideos, ...newVideos]);
      setLoading(false);
    }, 1000);
  };

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const videoElement = entry.target.querySelector('video') as HTMLVideoElement;
      if (entry.isIntersecting) {
        videoElement?.play().catch(error => {
          console.log("Autoplay failed: ", error);
        });
      } else {
        videoElement?.pause();
      }
    });
  }, []);

  const lastVideoElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreVideos();
      }
    });

    if (node) observerRef.current.observe(node);
  }, [loading]);

  const videoElementRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 1,
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection]);

  return (
    <div className={styles.video_container}>
      {videos.map((video, index) => {
        const isLastVideo = videos.length === index + 1;
        return (
          <div
            className={styles.video}
            ref={isLastVideo ? lastVideoElementRef : videoElementRef}
            key={video.id}
          >
            <VideoPlayer videoUrl={video.url} videoSubtitle={video.subtitle} />
          </div>
        );
      })}
      {loading}
    </div>
  );
};

export default VideoFeed;
