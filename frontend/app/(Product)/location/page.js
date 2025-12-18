
import {axiosGet} from "@/utils/dataFetch";
import {StoreLocation} from "@/components/location/StoreLocation";

const getStore = async () => {
    const url = '/location';
    const data = await axiosGet(url);
    return data
}

export default async function LocationPage(){
    const storeData = await getStore();
    return(
        <StoreLocation data={storeData}/>
    )
}