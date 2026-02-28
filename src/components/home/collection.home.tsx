import { FlatList, Image, StyleSheet, Text, View } from "react-native"
import demo from '@/assets/demo.jpg';
import { APP_COLOR } from "@/utils/constant";
interface IProps {
    name: string,
    description: string
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
    const { name, description } = props;
    const data = [
        { key: 1, image: demo, name: "cua hang 1" },
        { key: 2, image: demo, name: "cua hang 2" },
        { key: 3, image: demo, name: "cua hang 3" },
        { key: 4, image: demo, name: "cua hang 4" },
        { key: 5, image: demo, name: "cua hang 5" },
    ]
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
                    data={data}
                    horizontal
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 5 }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ backgroundColor: "#efefef" }}>
                                <Image source={item.image} style={{ height: 125, width: 125 }} />
                                <View style={{ padding: 5 }}>
                                    <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                                    <View>
                                        <View style={styles.sale}>
                                            <Text style={{ color: APP_COLOR.ORAGE }}>Flash Sale</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        </>
    )
}

export default CollectionHome;