import { FlatList, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native"
import demo from '@/assets/demo.jpg';
import { APP_COLOR } from "@/utils/constant";
import { useEffect, useState } from "react";
import { getTopRestaurant } from "@/utils/api";
import { router } from "expo-router";
interface IProps {
    name: string,
    description: string;
    refAPI: string;
}

interface ITopRestaurant {
    image: string;
    name: string;
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    sale: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: APP_COLOR.ORAGE,
        padding: 3,
        borderRadius: 3,
        alignSelf: "flex-start",
    }
})

const CollectionHome = (props: IProps) => {
    const { name, description, refAPI } = props;
    const [restaurants, setRestaurants] = useState<ITopRestaurant[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTopRestaurant(refAPI);
            // data: ITopRestaurant[]
            setRestaurants(data);
        };
        fetchData();
    }, [refAPI]);

    const backend = Platform.OS === "android"
        ? process.env.EXPO_PUBLIC_ANDROID_API_URL : process.env.EXPO_PUBLIC_IOS_API_URL;
    const baseImage = `${backend}/images/restaurant`;
    return (
        <>
            <View style={{ height: 10, backgroundColor: "#e9e9e9" }}></View>
            <View style={styles.container}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: APP_COLOR.ORAGE, fontSize: 15, fontWeight: "600" }}>{name}</Text>
                    <Text style={{ opacity: 0.5 }}>Xem tất cả</Text>
                </View>
                <View>
                    <Text style={{ opacity: 0.5, marginVertical: 5 }}>{description}</Text>
                </View>
                <FlatList
                    data={restaurants}
                    horizontal
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 5 }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <Pressable onPress={()=>router.navigate("/product/product")}>
                                <View style={{ backgroundColor: "#efefef" }}>
                                    <Image source={{ uri: `${baseImage}/${item.image}` }} style={{ height: 125, width: 125 }} />
                                    <View style={{ padding: 5 }}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontWeight: "600", maxWidth: 130 }}>{item.name}</Text>
                                        <View>
                                            <View style={styles.sale}>
                                                <Text style={{ color: APP_COLOR.ORAGE }}>Flash Sale</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Pressable>
                        )
                    }}
                />
            </View>
        </>
    )
}

export default CollectionHome;