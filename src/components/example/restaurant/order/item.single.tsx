import { APP_COLOR } from "@/utils/constant";
import { currencyFormatter } from "@/utils/currency.formater";
import { getURLBaseBackend } from "@/utils/url.backend";
import { AntDesign } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

interface IProps {
    menuItem: IMenuItem | null;
    handlePressItem: any;
    showMinus:boolean;
    quantity:number
}

const ItemSingle = (props:IProps) => {
    const {menuItem,handlePressItem,showMinus,quantity}=props;
    return (
        <View style={{
            backgroundColor: "white",
            gap: 10,
            flexDirection: "row",
            padding: 10
        }}>
            <View style={{ height: 100, width: 100 }}>
                <Image
                    source={{ uri: `${getURLBaseBackend()}/images/menu-item/${menuItem?.image}` }}
                    style={{ height: 100, width: 100, resizeMode: 'cover' }}
                />
            </View>
            <View style={{ flex: 1, gap: 10 }}>
                <View><Text>{menuItem?.title}</Text></View>
                <View><Text>{menuItem?.description}</Text></View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: APP_COLOR.ORAGE }}>{currencyFormatter(menuItem?.basePrice)} </Text>
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
                                    onPress={() => handlePressItem(menuItem, "MINUS")}
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
                            onPress={() => handlePressItem(menuItem, "PLUS")}
                        >
                            <AntDesign name="plus-square" size={24} color={APP_COLOR.ORAGE} />
                        </Pressable>
                    </View>
                </View>

            </View>
        </View>
    )
}
export default ItemSingle;