import { Link, router } from "expo-router";
import { Button, Text, View } from "react-native";
const AppRoot = () => {
    const handleLogin = ()=> {
        alert("login");
        router.navigate("/(auth)/login")
    }

    return (
        <View>
            <Text>Hello world with expo router with datcutepoy</Text>
            <Link href={"/datcutepoy"}>Go to datcutepoy</Link>
            <Link href={"/like.tsx/like.detail"} asChild>
                <Button title="Go to detail" />
            </Link>
            <View style={{margin:20}}>
               <Button title="Login" onPress={handleLogin} />
            </View>
        </View>
    )
}
export default AppRoot;