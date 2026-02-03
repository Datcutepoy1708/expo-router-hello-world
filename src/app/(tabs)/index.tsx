import CustomFlatList from "@/components/CustomFlatList/CustomFlatList";
import HeaderHome from "@/components/home/header.home";
import SearchHome from "@/components/home/search.home";
import TopListHome from "@/components/home/top.list.home";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const data = Array(10).fill(1);


const HomeTab = () => {

    const MyComponent = () => {
        // https://stackoverflow.com/questions/45939823/react-native-horizontal-flatlist-with-multiple-rows
    }
    return (
        <SafeAreaView style={styles.container}>
            <CustomFlatList
                data={data}
                style={styles.list}
                renderItem={() => <View style={styles.item} />}
                HeaderComponent={<HeaderHome />}
                StickyElementComponent={<SearchHome />}
                // TopListElementComponent={<View style={styles.topList} />}
                TopListElementComponent={<TopListHome />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ecf0f1",
        flex: 1,
        justifyContent: "center",
        overflow: "hidden",
        padding: 8
    },
    header: {
        borderColor: "red",
        borderWidth: 5,
        height: 100,
        marginBottom: 6,
        width: "100%"
    },
    item: {
        borderColor: "green",
        borderWidth: 5,
        height: 100,
        marginBottom: 6,
        width: "100%"
    },
    list: {
        overflow: "hidden"
    },
    sticky: {
        backgroundColor: "#2555FF50",
        borderColor: "blue",
        borderWidth: 5,
        height: 100,
        marginBottom: 6,
        width: "100%"
    },
    topList: {
        borderColor: "orange",
        borderWidth: 5,
        minHeight: 100,
        marginBottom: 6,
        width: "100%"
    }
});


export default HomeTab