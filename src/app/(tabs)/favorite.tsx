import { getFavoriteRestaurantAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { getURLBaseBackend } from "@/utils/url.backend";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, RefreshControl, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const FavoritePage = () => {
    const [favoriteRestaurant, setFavoriteRestaurant] = useState<IRestaurant[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const fetchRestaurants = async () => {
        const res = await getFavoriteRestaurantAPI();
        const apiData = res.data as any;
        // Backend trả về dạng phân trang: { data: { result: [...] } }
        // hoặc dạng trực tiếp: { data: [...] }
        const restaurants = apiData?.data?.result ?? apiData?.data ?? [];
        setFavoriteRestaurant(restaurants);
    }
    useEffect(() => {
        fetchRestaurants()
    }, [])

    const onRefresh = async () => {
        setRefreshing(true)
        await fetchRestaurants();
        setRefreshing(false)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                borderBottomColor: "#eee",
                borderBottomWidth: 1,
                paddingHorizontal: 10,
                paddingBottom: 5
            }}>
                <Text style={{ color: APP_COLOR.ORAGE }}>Quán ăn yêu thích</Text>
            </View>
            <ScrollView
                style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {favoriteRestaurant.map((item, index) => {
                    return (
                        <View key={index}>
                            <View style={{ padding: 10, flexDirection: "row", gap: 10 }}>
                                <Image source={{ uri: `${getURLBaseBackend()}/images/restaurant/${item.image}` }} style={{ height: 100, width: 100 }} />
                                <View style={{ gap: 10 }}>
                                    <Pressable
                                        onPress={() => router.navigate({
                                            pathname: "/product/[id]",
                                            params: { id: item._id }
                                        })}
                                    >
                                        <Text>{item.name}</Text>
                                        <Text>{item.address}</Text>
                                        <Text>{item.phone}</Text>
                                    </Pressable>
                                </View>
                            </View>
                            <View style={{ height: 10, backgroundColor: "#eee" }}></View>
                        </View>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

export default FavoritePage;