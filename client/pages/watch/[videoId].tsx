import { useRouter } from "next/router";
import React from "react";

const WatchVideoPage = () => {
  const { query } = useRouter();
  return (
    <main>
      <video
        id="video-player"
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/videos/${query.videoId}`}
        width={800}
        height="auto"
        controls
        autoPlay
      />
    </main>
  );
};

export default WatchVideoPage;
