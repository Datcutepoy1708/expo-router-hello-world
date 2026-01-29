import { FontAwesome5 } from "@expo/vector-icons";
import ShareButton from "components/button/share.button";
import { StyleSheet, Text, View } from "react-native";
import { APP_COLOR } from "utils/constant";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: "red",
        borderWidth: 5
    },
    welcomeText: {
        flex: 0.6,
        borderColor: "green",
        borderWidth: 5,
        alignItems: "flex-start",
        justifyContent: "center"

    },
    welcomeBtn: {
        flex: 0.4,
        borderColor: "grey",
        borderWidth: 5,
        gap: 20
    },
    header: {
        fontSize: 40,
        fontWeight: "600"
    },
    body: {
        fontSize: 30,
        color: APP_COLOR.ORAGE,
        marginVertical: 20
    },
    footer: {

    },
    btnContainer: {

    },
    btnContent: {
        backgroundColor: "green",
        padding: 20,
        borderRadius: 10,
        alignSelf: "flex-start"
    },
    btnText: {
        textTransform: "uppercase"
    }
})

const WelcomePage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.welcomeText}>
                <Text style={styles.header}>Welcome page</Text>
                <Text style={styles.body}>Cute Food</Text>
                <Text style={styles.footer}>Your favorite foods deliverd fast at your door</Text>
            </View>
            <View style={styles.welcomeBtn}>
                <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "red",
                    marginHorizontal: 50
                }}>
                    <Text
                        style={{
                            padding: 10,
                            textAlign: "center",
                            backgroundColor: "white",
                            alignSelf: "center",
                            position: "relative",
                            top: 20
                        }}
                    >Đăng nhập với</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 20
                    }}
                >
                    <ShareButton
                        title="facebook"
                        onPress={() => alert("click me")}
                        textStyle={{
                            textTransform: "uppercase"
                        }}
                        pressStyle={{ alignSelf: "stretch" }}
                        btnStyle={{
                            justifyContent: "center",
                            borderRadius: 30,
                            backgroundColor: "#fff"
                        }}
                        icon={<FontAwesome5 name="facebook" size={30} color="black" />}
                    />
                    {/* <View style={styles.btnContainer}>
                        <View style={styles.btnContent}>
                            <Text style={styles.btnText}>Facebook</Text>
                        </View>
                    </View> */}
                    {/* <View><Text>Google</Text></View> */}
                    <ShareButton
                        title="google"
                        onPress={() => alert("click me")}
                        textStyle={{
                            textTransform: "uppercase"
                        }}
                        pressStyle={{ alignSelf: "stretch" }}
                        btnStyle={{
                            justifyContent: "center",
                            borderRadius: 30,
                            paddingHorizontal: 20,
                            backgroundColor: "#fff"
                        }}
                        icon={<FontAwesome5 name="google" size={30} color="black" />}
                    />
                </View>
                <View>
                    <ShareButton
                        title="Đăng nhập bằng email"
                        onPress={() => alert("Đăng nhập bằng email")}
                        textStyle={{ color: "#fff", paddingVertical: 5 }}
                        btnStyle={{
                            justifyContent: "center",
                            borderRadius: 30,
                            marginHorizontal: 50,
                            paddingVertical: 10,
                            backgroundColor: "#2c2c2c"
                        }}
                        pressStyle={{ alignSelf: "stretch" }}
                    />
                </View>
                <View><Text style={{ textAlign: "center" }}>Chưa có tài khoản? Đăng kí</Text></View>
            </View>
        </View>
    )
}
export default WelcomePage;