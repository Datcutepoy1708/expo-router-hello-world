import { Link } from "expo-router";
import { Text, View } from "react-native";
const AppRoot= ()=> {
    return (
        <View>
            <Text>Hello world with expo router with datcutepoy</Text>
            <Link href={"/datcutepoy"}>Go to datcutepoy</Link>
            <Link href={"/like.tsx/like"}>Go to like</Link>
        </View>
    )
}
export default AppRoot;