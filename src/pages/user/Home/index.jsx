import { NewFootballApparel } from "../../../components/user/home/NewFootballApparel"
import { PopularFootballBrands } from "../../../components/user/home/PopularFootballBrands"
import { PopularFootballJerseys } from "../../../components/user/home/PopularFootballJerseys"
import { SlideShow } from "../../../components/user/home/SlideShow"

export const Home = () => {
    return <>
        <SlideShow />
        <NewFootballApparel />
        <PopularFootballJerseys />
        <PopularFootballBrands />
    </>
}