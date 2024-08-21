import Blogs from "../../components/Blogs/Blogs";
import Compare from "../../components/Compare/Compare";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import MostPopuler from "../../components/MostPopuler/MostPopuler";
import Nav from "../../components/Nav/Nav";
import NewRelease from "../../components/NewRelease/NewRelease";
import UsedBike from "../../components/UsedBike/UsedBike";
import WhatsYouWant from "../../components/WhatsYouWant/WhatsYouWant";

const HomePage = () => {
    return (
        <div>
            <HomeSlider />
            <WhatsYouWant />
            <MostPopuler />
            <NewRelease />
            <UsedBike />
            <Blogs />
            {/* <Compare /> */}
        </div>
    );
};

export default HomePage;