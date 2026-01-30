import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { APP_COLOR } from "@/utils/constant";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        marginHorizontal: 20,
        gap: 10
    },
    // inputGroup: {
    //     padding: 5,
    //     gap: 10
    // },
    // text: {
    //     fontSize: 18,
    // },
    // input: {
    //     borderColor: "#d0d0d0",
    //     borderWidth: 1,
    //     paddingHorizontal: 7,
    //     paddingVertical: 10,
    //     borderRadius: 5
    // }
})

const SignUpPage = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View>
                    <Text style={{ fontSize: 25, fontWeight: 600, marginVertical: 30 }}>Đăng kí tài khoản</Text>
                </View>
                <ShareInput label="Họ tên" />
                <ShareInput label="Email" keyboardType="email-address" />
                <ShareInput label="Mật khẩu" />
                {/* <View style={styles.inputGroup}>
                    <Text style={styles.text}>Họ tên</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.text}>Email:</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.text}>Mật khẩu:</Text>
                    <TextInput keyboardType="email-address" style={styles.input} />
                </View> */}
                <View style={{ marginVertical: 10 }}></View>
                <ShareButton
                    title="Đăng ký"
                    onPress={() => alert("Đăng nhập bằng email")}
                    textStyle={{ color: "#fff", paddingVertical: 5, textTransform: "uppercase" }}
                    btnStyle={{
                        justifyContent: "center",
                        borderRadius: 30,
                        marginHorizontal: 50,
                        paddingVertical: 10,
                        backgroundColor: APP_COLOR.ORAGE,
                    }}
                    pressStyle={{ alignSelf: "stretch" }}
                />
                <View
                    style={{
                        marginTop:20,
                        flexDirection: "row",
                        gap: 10,
                        justifyContent: "center"
                    }}
                >
                    <Text style={{ color: "black" }}>Đã có tài khoản?</Text>
                    <Link href={"/(auth)/signup"}>
                        <Text style={{ color: "black", textDecorationLine: "underline" }}>
                            Đăng nhập
                        </Text>
                    </Link>
                </View>
                <SocialButton />
            </View>
        </SafeAreaView>
    )
}

export default SignUpPage;