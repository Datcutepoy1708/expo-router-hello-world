import { useCurrentApp } from "@/context/app.context";
import { APP_COLOR } from "@/utils/constant";
import { currencyFormatter } from "@/utils/currency.formater";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface IProps {
    restaurant: IRestaurant | null
}

const StickyFooter = (props: IProps) => {
    const { restaurant } = props;
    const { cart, setCart } = useCurrentApp();
    const getSum = () => {
        if (restaurant && cart[restaurant._id]) {
            return cart[restaurant._id].sum;
        }
        return 0;
    }

    return (
        <>
            {getSum() === 0 ? <></> :
                <View style={{
                    width: "100%",
                    position: "absolute",
                    flexDirection: "row",
                    zIndex: 11,
                    bottom: 0,
                    backgroundColor: "white"
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flex: 1,
                        borderWidth: 1,
                        borderColor: APP_COLOR.GRAY
                    }}>
                        <View style={{ padding: 20 }}>
                            <View style={{
                                position: "absolute",
                                left: 40,
                                top: 5,
                                width: 16,
                                height: 16,
                                borderRadius: 16 / 2,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: APP_COLOR.ORAGE
                            }}>
                                <Text style={{ color: "white", fontSize: 9 }}>{
                                    restaurant && cart && cart[restaurant?._id] && cart[restaurant?._id!]["sum"]
                                    && <>
                                        <Text>
                                            {cart[restaurant?._id!]["quantity"]}
                                        </Text>
                                    </>
                                }</Text>
                            </View>
                            <Pressable onPress={() => alert("cart")}>
                                <FontAwesome name="shopping-basket" color={APP_COLOR.ORAGE} size={20} />
                            </Pressable>
                        </View>
                        <View>

                        </View>
                        <View style={{ paddingRight: 10 }}>
                            <Text style={{
                                color: APP_COLOR.ORAGE,
                                fontSize: 15,
                                fontWeight: 600
                            }}>
                                {currencyFormatter(getSum())}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        width: 100,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: APP_COLOR.ORAGE
                    }}>
                        <Text style={{ color: "white" }} onPress={() => alert("giao hàng")}>
                            Giao hàng
                        </Text>
                    </View>
                </View>
            }
        </>
    )
}
export default StickyFooter;