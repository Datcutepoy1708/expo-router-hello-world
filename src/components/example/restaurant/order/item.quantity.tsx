import { useCurrentApp } from "@/context/app.context";
import { APP_COLOR } from "@/utils/constant";
import { currencyFormatter } from "@/utils/currency.formater";
import { getURLBaseBackend } from "@/utils/url.backend";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import ItemSingle from "./item.single";

interface IProps {
    menuItem: IMenuItem,
    restaurant: IRestaurant | null,
    isModal: boolean
}

const ItemQuantity = (props: IProps) => {
    const { menuItem, restaurant, isModal } = props;
    const { cart, setCart } = useCurrentApp();
    const handPressItem = (item: IMenuItem, action: "MINUS" | "PLUS") => {
        if (item.options.length && isModal === false) {
            router.navigate({
                pathname: (action === "PLUS" ? "/product/create.modal" : "/product/update.modal") as any,
                params: { menuItemId: menuItem._id }
            })
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

                // merge đúng state cart (không nest dưới key "cart")
                setCart((prevState: any) => ({ ...prevState, ...cart }))
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
        <ItemSingle menuItem={menuItem} handlePressItem={handPressItem} showMinus={showMinus} quantity={quantity} />
    )
}

export default ItemQuantity;