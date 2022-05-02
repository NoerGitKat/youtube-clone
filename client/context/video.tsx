import { createContext, ReactNode, useContext } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from "react-query";
import { getVideos } from "../api";
import { IVideo, QueryKeys } from "../types";

const VideoContext = createContext<{
  videos: IVideo[];
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}>([]);

function VideoContextProvider({ children }: { children: ReactNode }) {
  const { data, refetch } = useQuery(QueryKeys.videos, getVideos);
  return (
    <VideoContext.Provider value={{ videos: data, refetch }}>
      {children}
    </VideoContext.Provider>
  );
}

const useVideos = () => useContext(VideoContext);

export { VideoContextProvider, useVideos };
