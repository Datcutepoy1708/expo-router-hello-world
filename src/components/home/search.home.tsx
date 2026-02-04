import { APP_COLOR } from "@/utils/constant";
import { EvilIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native"

const styles=StyleSheet.create({
    container: {
        gap:5,
        backgroundColor:APP_COLOR.GRAY,
        flexDirection:"row",
        margin:5,
        paddingHorizontal:1,
        paddingVertical:7,
        borderRadius:3
    }
})

const SearchHome= ()=> {
    return (
        <View style={styles.container}>
            <EvilIcons name="search" size={20} color={"black"}/>
            <Text style={{color: "#707070"}}>Deal hot khô gà từ hôm nay giá chỉ 0đ ...</Text>
        </View>
    )
}

export default SearchHome;