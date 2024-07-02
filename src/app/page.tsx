import ROUTES from "@/config/routes";
import { redirect } from "next/navigation";

const Home = () => {
  redirect(ROUTES.EXPLORER.ROOT(43114));
};

export default Home;
