import TextBetweenLine from '@/app/layout/text.between.line';
import fbLogo from '@/assets/auth/facebook.png';
import ggLogo from '@/assets/auth/google.png';
import { Image, StyleSheet, View } from "react-native";
import ShareButton from "./share.button";

const styles = StyleSheet.create({
    welcomeBtn: {
        flex: 0.4,
        gap: 30
    }
})

const SocialButton = () => {

    return (
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
            </View>
        </View>
    )
}

export default SocialButton;