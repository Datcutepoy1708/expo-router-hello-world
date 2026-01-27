import { Link } from "expo-router";
import { Text, View } from "react-native";
const HomePage = () => {
    // const handleLogin = ()=> {
    //     alert("login");
    //     router.navigate("/(auth)/login")
    // }

    return (
        <View>
            {/* <Text>Hello world with expo router with datcutepoy</Text>
            <Link href={"/datcutepoy"}>Go to datcutepoy</Link>
            <Link href={"/like.tsx/like.detail"} asChild>
                <Button title="Go to detail" />
            </Link>
            <View style={{margin:20}}>
               <Button title="Login" onPress={handleLogin} />
            </View> */}
            <Text>Welcome my home page</Text>
            <Link href={"/product/product"}>Go to the product</Link>
            <Link href={"/(auth)/login"}>go to the login</Link>
        </View>
    )
}
export default HomePage;