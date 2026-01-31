import fbLogo from "@/assets/auth/facebook.png";
import ggLogo from "@/assets/auth/google.png";
import bg from '@/assets/auth/welcome-background.png';
import ShareButton from "components/button/share.button";
import { LinearGradient } from 'expo-linear-gradient';
import { Link, Redirect } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { APP_COLOR } from "utils/constant";
import TextBetweenLine from "./layout/text.between.line";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    welcomeText: {
        flex: 0.6,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: 20

    },
    welcomeBtn: {
        flex: 0.4,
        gap: 30
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
    // btnContainer: {

    // },
    // btnContent: {
    //     backgroundColor: "green",
    //     padding: 20,
    //     borderRadius: 10,
    //     alignSelf: "flex-start"
    // },
    // btnText: {
    //     textTransform: "uppercase"
    // }
})

const WelcomePage = () => {
    if (true) {
        return (
            <Redirect href={"/(auth)/verify"} />
        )
    }
    // return welcome 
    return (
        <ImageBackground style={{ flex: 1 }}
            source={bg}
        // source={required("@/assets/auth/welcome-background.png")}
        >
            <LinearGradient
                style={{ flex: 1 }}
                colors={['transparent', '#191B2F']}
                locations={[0.2, 0.8]}>
                <View style={styles.container}>
                    <View style={styles.welcomeText}>
                        <Text style={styles.header}>Welcome page</Text>
                        <Text style={styles.body}>Cute Food</Text>
                        <Text style={styles.footer}>Your favorite foods deliverd fast at your door</Text>
                    </View>
                    <View style={styles.welcomeBtn}>
                        {/* <View 
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "red",
                            marginHorizontal: 50
                        }}
                        >
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
                        </View> */}
                        <TextBetweenLine title="Đăng nhập với" />
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
                                icon={
                                    // <FontAwesome5 name="facebook" size={30} color="black" />
                                    <Image source={fbLogo} />
                                }
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
                                icon={
                                    // <FontAwesome5 name="google" size={30} color="black" />
                                    <Image source={ggLogo} />
                                }
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
                                    backgroundColor: "#2c2c2c",
                                    borderColor: "#505050",
                                    borderWidth: 1
                                }}
                                pressStyle={{ alignSelf: "stretch" }}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 10,
                                justifyContent: "center"
                            }}
                        >
                            <Text style={{ color: "white" }}>Chưa có tài khoản?</Text>
                            <Link href={"/(auth)/signup"}>
                                <Text style={{ color: "white", textDecorationLine: "underline" }}>
                                    Đăng kí
                                </Text>
                            </Link>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </ImageBackground>
    )
}
export default WelcomePage;