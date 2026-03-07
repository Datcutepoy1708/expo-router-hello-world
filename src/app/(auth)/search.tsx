import { getRestaurantByName } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { getURLBaseBackend } from "@/utils/url.backend";
import { MaterialIcons } from "@expo/vector-icons";
import debounce from "debounce";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const data1 = [
    { key: 1, name: "Hot Deal", source: require("@/assets/icons/flash-deals.png") },
    { key: 2, name: "Quán Ngon", source: require("@/assets/icons/nice-shop.png") },
    { key: 3, name: "Tích Điểm", source: require("@/assets/icons/points.png") },
    { key: 4, name: "Ngọt Xỉu", source: require("@/assets/icons/rice.png") },
    { key: 5, name: "Quán Tiền Bối", source: require("@/assets/icons/noodles.png") },
    { key: 6, name: "Bún, Mì, Phở", source: require("@/assets/icons/bun-pho.png") },
    { key: 7, name: "BBQ", source: require("@/assets/icons/bbq.png") },
    { key: 8, name: "Fast Food", source: require("@/assets/icons/fastfood.png") },
    { key: 9, name: "Pizza", source: require("@/assets/icons/Pizza.png") },
    { key: 10, name: "Burger", source: require("@/assets/icons/burger.png") },
    { key: 11, name: "Sống Khỏe", source: require("@/assets/icons/egg-cucmber.png") },
    { key: 12, name: "Giảm 50k", source: require("@/assets/icons/moi-moi.png") },
    { key: 13, name: "99k Off", source: require("@/assets/icons/fried-chicken.png") },
    { key: 14, name: "No Bụng", source: require("@/assets/icons/korean-food.png") },
    { key: 15, name: "Freeship", source: require("@/assets/icons/Steak.png") },
    { key: 16, name: "Deal 0Đ", source: require("@/assets/icons/tomato.png") },
    { key: 17, name: "Món 1Đ", source: require("@/assets/icons/elipse.png") },
    { key: 18, name: "Ăn chiều", source: require("@/assets/icons/chowmein.png") },
    { key: 19, name: "Combo 199k", source: require("@/assets/icons/Notif.png") },
    { key: 20, name: "Milk Tea", source: require("@/assets/icons/salad.png") },
]

const SearchPage = () => {
    const [restaurants, setRestaurant] = useState<IRestaurant[]>([]);
    const [searchTerm, setSearchTerms] = useState<string>("");
    const handleSearch = debounce(async (text: string) => {
        setSearchTerms(text);
        if (!text) return;
        const res = await getRestaurantByName(text) as any;
        if (res.data && res.data.data) {
            setRestaurant(res.data.data.results)
        }
    }, 300)
    const DefaultResult = () => {
        return (
            <View style={{
                backgroundColor: "white",
                padding: 10, gap: 10
            }}>
                <Text>Phổ biến</Text>
                <FlatList
                    data={data1}
                    numColumns={2}
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: 10,
                                    flex: 1,
                                    borderColor: "#eee",
                                    borderBottomWidth: 1,
                                    borderLeftWidth: 1,
                                    borderRightWidth: index % 2 === 1 ? 1 : 0,
                                    borderTopWidth: (index === 0 || index === 1) ? 1 : 0
                                }}>
                                <Text>{item.name}</Text>
                                <Image
                                    source={item.source}
                                    style={{
                                        width: 30, height: 30
                                    }}
                                />
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                padding: 10
            }}>
                <MaterialIcons onPress={() => router.back()} color={APP_COLOR.ORAGE} name="arrow-back" size={15} />
                <TextInput
                    placeholder="Tìm kiếm cửa hàng...."
                    autoFocus
                    onChangeText={(text: string) => handleSearch(text)}
                    style={{
                        flex: 1,
                        backgroundColor: "#eee",
                        paddingVertical: 3,
                        paddingHorizontal: 10,
                        borderRadius: 3
                    }}
                />
            </View>
            <View style={{ backgroundColor: "#eee", flex: 1 }}>
                {searchTerm.length === 0 ?
                    <DefaultResult />
                    :
                    <View style={{ backgroundColor: "white", gap: 10 }}>
                        {restaurants?.map((item, index) => {
                            return (
                                <Pressable
                                    key={index}
                                    onPress={() => router.navigate({
                                        pathname: "/product/[id]",
                                        params: { id: item._id }
                                    })}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        padding: 10,
                                        gap: 10,
                                        borderBottomColor: "#eee",
                                        borderBottomWidth: 1,
                                    }}
                                >
                                    <Image source={{ uri: `${getURLBaseBackend()}/images/restaurant/${item.image}` }} style={{ width: 50, height: 50 }} />
                                    <Text>{item.name}</Text>
                                </Pressable>
                            )
                        })}
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}
export default SearchPage;