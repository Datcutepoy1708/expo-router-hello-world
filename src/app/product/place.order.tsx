import HeaderHome from "@/components/home/header.home"
import { useCurrentApp } from "@/context/app.context"
import { placeOrderAPI } from "@/utils/api"
import { APP_COLOR } from "@/utils/constant"
import { currencyFormatter } from "@/utils/currency.formater"
import { getURLBaseBackend } from "@/utils/url.backend"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { Image, Pressable, Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import Toast from "react-native-root-toast"

interface IOrderItem {
    image: string,
    title: string,
    option: string,
    price: number,
    quantity: number
}

const OrderPage = () => {
    const { restaurant, cart, setCart } = useCurrentApp()
    const [orderItems, setOrderItems] = useState<IOrderItem[]>([])
    useEffect(() => {
        if (!cart || !restaurant?._id) {
            setOrderItems([]);
            return;
        }
        const store = cart?.[restaurant._id];
        if (!store?.items) {
            setOrderItems([]);
            return;
        }

        const result: IOrderItem[] = [];
        for (const [, currentItems] of Object.entries<any>(store.items)) {
            if (currentItems?.extra) {
                for (const [key, value] of Object.entries<any>(currentItems.extra)) {
                    if (!value || value <= 0) continue;

                    const option = currentItems.data?.options?.find(
                        (item: any) => `${item.title}-${item.description}` === key
                    );
                    const addPrice = option?.additionalPrice ?? 0;

                    result.push({
                        image: currentItems.data?.image,
                        title: currentItems.data?.title,
                        option: key,
                        price: (currentItems.data?.basePrice ?? 0) + addPrice,
                        quantity: value
                    });
                }
            } else if (currentItems?.quantity && currentItems.quantity > 0) {
                result.push({
                    image: currentItems.data?.image,
                    title: currentItems.data?.title,
                    option: "",
                    price: currentItems.data?.basePrice ?? 0,
                    quantity: currentItems.quantity
                });
            }
        }
        setOrderItems(result);
    }, [cart, restaurant])

    const handlePlaceOrder = async () => {
        const data = {
            restaurant: restaurant?._id,
            totalPrice: cart?.[restaurant!._id].sum,
            totalQuantity: cart?.[restaurant!._id].quantity,
            detail: orderItems
        }

        const res = await placeOrderAPI(data);
        if (res.data) {
            // success
            Toast.show("Đặt hàng thành công", {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: APP_COLOR.GREEN,
                opacity: 1,
                position: Toast.positions.TOP
            })
            //clear data cart
            if (restaurant) {
                delete cart[restaurant._id];
                setCart((prevCart: any) => ({ ...prevCart, ...cart }))
            }
            router.navigate("/");
        } else {
            const m = Array.isArray(res.message) ? res.message[0] : res.message
            Toast.show(m, {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: APP_COLOR.ORAGE,
                opacity: 1,
                position: Toast.positions.TOP
            })
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                borderBottomColor: "#eee",
                borderBottomWidth: 1,
                padding: 10
            }}>
                <HeaderHome />
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: "600" }}>
                    {restaurant?.name}
                </Text>
            </View>
            <ScrollView style={{ flex: 1, padding: 10 }}>
                {orderItems.map((item, index) => {
                    return (
                        <View key={index} style={{
                            gap: 10,
                            flexDirection: "row",
                            borderBottomColor: "#eee",
                            borderBottomWidth: 1,
                            paddingVertical: 10
                        }}>
                            <Image source={{ uri: `${getURLBaseBackend()}/images/menu-item/${item.image}` }} style={{ height: 50, width: 50 }} />
                            <View>
                                <Text style={{ fontWeight: "600" }}>
                                    {item.quantity} x
                                </Text>
                            </View>
                            <View style={{ gap: 10 }}>
                                <Text>{item.title}</Text>
                                <Text style={{ fontSize: 12, color: APP_COLOR.GRAY }}>{item.option}</Text>
                            </View>
                        </View>
                    )
                })}
                {orderItems?.length > 0 &&
                    <View style={{ marginVertical: 15 }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Text style={{ color: APP_COLOR.GRAY }}>
                                Tổng cộng ({restaurant && cart?.[restaurant._id] && cart?.[restaurant!._id].quantity} món)
                            </Text>
                            <Text>
                                {currencyFormatter(restaurant && cart?.[restaurant._id] && cart?.[restaurant!._id].sum)}
                            </Text>
                        </View>
                    </View>
                }
            </ScrollView>
            <View style={{
                paddingTop: 10,
                paddingBottom: 20,
                paddingHorizontal: 10,
                borderTopColor: "#eee",
                borderTopWidth: 1,
                backgroundColor: "white" // ensure background is white to cover list when scrolling
            }}>
                <View style={{ flexDirection: "row", gap: 10, marginBottom: 15 }}>
                    <View style={{
                        flex: 1,
                        paddingVertical: 10,
                        borderColor: '#ccc',
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 3
                    }}>
                        <Text style={{ color: '#ccc' }}>Ví PayPal</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        paddingVertical: 10,
                        borderColor: APP_COLOR.ORAGE,
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 3
                    }}>
                        <Text style={{ color: APP_COLOR.ORAGE }}>Tiền mặt</Text>
                    </View>
                </View>

                <Pressable
                    onPress={handlePlaceOrder}
                    style={({ pressed }) => ({
                        opacity: pressed === true ? 0.5 : 1,
                        backgroundColor: APP_COLOR.ORAGE,
                        borderRadius: 3
                    })}>
                    <View style={{
                        backgroundColor: APP_COLOR.ORAGE,
                        paddingVertical: 12,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 3
                    }}>
                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>
                            Đặt đơn {cart?.[restaurant!._id]?.sum ? `- ${currencyFormatter(restaurant && cart?.[restaurant._id] && cart?.[restaurant!._id].sum)}` : ""}
                        </Text>
                    </View>
                </Pressable>
            </View>

        </View>
    )
}

export default OrderPage;