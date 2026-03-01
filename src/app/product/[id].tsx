import RMain from "@/components/example/restaurant/main";
import SectionListBasic from "@/components/example/section.list.basic";
import SectionListLibrary from "@/components/example/section.list.library";
import SectionListScroll from "@/components/example/section.list.scroll";
import { getRestaurantByIdAPI } from "@/utils/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductPage = () => {
    const { id } = useLocalSearchParams();
    const [restaurant,setRestaurant]=useState<IRestaurant | null>(null);
    useEffect(() => {
    const fetchRestaurant = async () => {
        const data=await getRestaurantByIdAPI(id as string);
        if(data){
            setRestaurant(data as any);
        }
    }  
    
    fetchRestaurant();  
}, [id])
    return (
        <View style={{ flex: 1 }}>
            <RMain restaurant={restaurant} />
            {/* <SectionListBasic/> */}
            {/* <SectionListScroll/> */}
            {/* <SafeAreaView style={{flex:1}}>
                <SectionListLibrary />
            </SafeAreaView> */}
        </View>
    )
}
export default ProductPage;