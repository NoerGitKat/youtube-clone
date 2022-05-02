import { Card, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { IVideo } from "../../types";

const VideoTeaser = ({ video }: { video: IVideo }) => {
  return (
    <Link href={`/watch/${video.videoId}`} passHref>
      <Card shadow="sm" p="xl" component="a" href={`/watch/${video.videoId}`}>
        <Text weight={500} size="lg">
          {video.title}
        </Text>
        <Text size="sm">{video.description}</Text>
      </Card>
    </Link>
  );
};

export default VideoTeaser;
