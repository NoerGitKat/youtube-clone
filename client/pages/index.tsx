import { SimpleGrid } from "@mantine/core";
import { ReactElement } from "react";
import VideoTeaser from "../components/videos/VideoTeaser";
import { useVideos } from "../context/video";
import HomePageLayout from "../layout/Home";
import { IVideo } from "../types";

const Home = () => {
  const { videos } = useVideos();
  return (
    <main>
      <SimpleGrid cols={3}>
        {(videos || []).map((video: IVideo) => (
          <VideoTeaser key={video._id} video={video} />
        ))}
      </SimpleGrid>
    </main>
  );
};

Home.getLayout = (page: ReactElement) => (
  <HomePageLayout>{page} </HomePageLayout>
);

export default Home;
