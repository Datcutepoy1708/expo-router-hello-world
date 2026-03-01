import { Dimensions, FlatList, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native"
import demo from '@/assets/demo.jpg';
import { APP_COLOR } from "@/utils/constant";
import { useEffect, useState } from "react";
import { getTopRestaurant } from "@/utils/api";
import { router } from "expo-router";
import ContentLoader, { Rect } from "react-content-loader/native";
interface IProps {
    name: string,
    description: string;
    refAPI: string;
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
    const [loading, setLoading] = useState<boolean>(true);
    const { height: sHeight, width: sWidth } = Dimensions.get('window');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getTopRestaurant(refAPI);
            // data: ITopRestaurant[]
            setRestaurants(data);
            setLoading(false);
        };
        fetchData();
    }, [refAPI]);

    const backend = Platform.OS === "android"
        ? process.env.EXPO_PUBLIC_ANDROID_API_URL : process.env.EXPO_PUBLIC_IOS_API_URL;
    const baseImage = `${backend}/images/restaurant`;
    return (
        <>
            <View style={{ height: 10, backgroundColor: "#e9e9e9" }}></View>
            {loading === false ? <View style={styles.container}>
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
                            <Pressable onPress={() => router.navigate({
                                pathname: "/product/[id]",
                                params: { id: item._id }
                            })}>
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
                :
                <ContentLoader
                    speed={2}
                    width={sWidth}
                    height={230}
                    // viewBox="0 0 700 150"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    style={{ width: '100%' }}
                >
                    <Rect x="10" y="10" rx="5" ry="5" width={150} height="200" />
                    <Rect x="170" y="10" rx="5" ry="5" width={150} height="200" />
                    <Rect x="330" y="10" rx="5" ry="5" width={150} height="200" />
                </ContentLoader>
            }
        </>
    )
}

export default CollectionHome;