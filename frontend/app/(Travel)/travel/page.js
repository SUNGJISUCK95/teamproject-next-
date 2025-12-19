import Travel from "@/components/travel/Travel.jsx";
import { axiosGet} from "@/utils/dataFetch";

const getTravelFoodList = async() => {
    const url = `/travel/food`;
    const data = await axiosGet(url);
    return data;
}

const getTravelHotelList = async() => {
    const url = `/travel/hotel`;
    const data = await axiosGet(url);
    return data;
}

const getTravelRepairList = async() => {
    const url = `/travel/repair`;
    const data = await axiosGet(url);
    return data;
}

export default async function Page() {
    
    const travelFoodList = await getTravelFoodList();
    const travelHotelList = await getTravelHotelList();
    const travelRepairList = await getTravelRepairList();

    return (
        <Travel travelFoodList={travelFoodList} travelHotelList={travelHotelList} travelRepairList={travelRepairList}/>
    );
}
