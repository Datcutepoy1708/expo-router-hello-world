import { getOrderHistoryAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { currencyFormatter } from "@/utils/currency.formater";
import { getURLBaseBackend } from "@/utils/url.backend";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const TabOrderPage = () => {
    const [orderHistory, setOrderHistory] = useState<IOrderHistory[]>([]);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            const data = await getOrderHistoryAPI(); // IOrderHistory[]
            setOrderHistory(data);
        };
        fetchOrderHistory();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                    borderBottomColor: "#eee",
                    borderBottomWidth: 1,
                    paddingHorizontal: 10,
                    paddingBottom: 5
                }}>
                    <Text style={{ color: APP_COLOR.ORAGE }}>Lịch sử đơn hàng</Text>
            </View>
            <ScrollView>
                {orderHistory.map((item, index) => {
                    return (
                        <View key={index}>
                            <View style={{ padding: 10, flexDirection: "row", gap: 10 }}>
                                <Image source={{ uri: `${getURLBaseBackend()}/images/menu-item/${item.detail[0]?.image}` }} style={{ height: 100, width: 100 }} />
                                <View style={{ gap: 10 }}>
                                    <Text>{item.restaurant.name}</Text>
                                    <Text>{item.restaurant.address}</Text>
                                    <Text>{currencyFormatter(item.totalPrice)}</Text>
                                    <Text>Trạng thái: {item.status}</Text>
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

export default TabOrderPage;