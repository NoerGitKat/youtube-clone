import { ReactElement } from "react";
import HomePageLayout from "../layout/Home";

const Home = () => {
  return <main>Home</main>;
};

Home.getLayout = (page: ReactElement) => (
  <HomePageLayout>{page} </HomePageLayout>
);

export default Home;
