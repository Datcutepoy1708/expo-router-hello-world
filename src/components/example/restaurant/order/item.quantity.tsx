import { useCurrentApp } from "@/context/app.context";
import { APP_COLOR } from "@/utils/constant";
import { currencyFormatter } from "@/utils/currency.formater";
import { getURLBaseBackend } from "@/utils/url.backend";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

interface IProps {
    menuItem: IMenuItem,
    restaurant: IRestaurant | null,
    isModal:boolean
}

const ItemQuantity = (props: IProps) => {
    const { menuItem, restaurant,isModal } = props;
    const { cart, setCart } = useCurrentApp();
    const handPressItem = (item: IMenuItem, action: "MINUS" | "PLUS") => {
        if (item.options.length && isModal===false) {
            router.navigate("/product/create.modal")
        } else {
            if (restaurant?._id) {
                const total = action === "MINUS" ? -1 : 1;
                if (!cart[restaurant?._id]) {
                    // chưa tồn tại cửa hàng
                    cart[restaurant._id] = {
                        sum: 0,
                        quantity: 0,
                        items: {}
                    }
                }
                // xử lý sản phẩm
                cart[restaurant._id].sum = cart[restaurant._id].sum + total * item.basePrice;
                cart[restaurant._id].quantity = cart[restaurant._id].quantity + total;

                // check sản phẩm đã từng thêm vào chưa
                if (!cart[restaurant._id].items[item._id]) {
                    cart[restaurant._id].items[item._id] = {
                        data: menuItem,
                        quantity: 0
                    }
                }

                const currentQuantity = cart[restaurant._id].items[item._id].quantity + total
                cart[restaurant._id].items[item._id] = {
                    data: menuItem,
                    quantity: currentQuantity
                }
                if (currentQuantity <= 0) {
                    delete cart[restaurant._id].items[item._id];
                }

                setCart((prevState: any) => ({ ...prevState, cart }))
            }
        }
    }

    let showMinus = false;
    let quantity = 0;
    if (restaurant?._id) {
        const store = cart[restaurant?._id!];
        if (store?.items && store?.items[menuItem._id]) {
            showMinus = true;
            quantity = store?.items[menuItem._id].quantity
        }
    }
    return (
        <>
            <View style={{
                backgroundColor: "white",
                gap: 10,
                flexDirection: "row",
                padding: 10
            }}>
                <View style={{ height: 100, width: 100 }}>
                    <Image
                        source={{ uri: `${getURLBaseBackend()}/images/menu-item/${menuItem.image}` }}
                        style={{ height: 100, width: 100, resizeMode: 'cover' }}
                    />
                </View>
                <View style={{ flex: 1, gap: 10 }}>
                    <View><Text>{menuItem.title}</Text></View>
                    <View><Text>{menuItem.description}</Text></View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: APP_COLOR.ORAGE }}>{currencyFormatter(menuItem.basePrice)} </Text>
                        <View style={{
                            alignItems: "center",
                            gap: 3,
                            flexDirection: "row"
                        }}>
                            {showMinus &&
                                <>
                                    <Pressable
                                        style={({ pressed }) => ({
                                            opacity: pressed === true ? 0.5 : 1,
                                            alignSelf: "flex-start"
                                        })}
                                        onPress={() => handPressItem(menuItem, "MINUS")}
                                    >
                                        <AntDesign name="minus-square" size={24} color={APP_COLOR.ORAGE} />
                                    </Pressable>
                                    <Text style={{ minWidth: 25, textAlign: "center" }}>
                                        {quantity}
                                    </Text>
                                </>
                            }
                            <Pressable
                                style={({ pressed }) => ({
                                    opacity: pressed === true ? 0.5 : 1,
                                    alignSelf: "flex-start"
                                })}
                                onPress={() => handPressItem(menuItem, "PLUS")}
                            >
                                <AntDesign name="plus-square" size={24} color={APP_COLOR.ORAGE} />
                            </Pressable>
                        </View>
                    </View>

                </View>
            </View>
        </>
    )
}

export default ItemQuantity;