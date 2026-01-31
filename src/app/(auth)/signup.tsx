import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { APP_COLOR } from "@/utils/constant";
import axios from 'axios';
import { Link, router } from "expo-router";
import { useState } from "react";
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
    const URL_BACKEND = process.env.EXPO_PUBLIC_API_URL;

    const [fullname, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // useEffect(() => {
    //     const fetchAPI = async () => {
    //         try {
    //             const res = await axios.get(`${URL_BACKEND}/api/v1`);
    //             console.log(">>check response: ", res.data);
    //         } catch (error) {
    //             console.log(">> error: ", error);
    //         }
    //     }
    //     fetchAPI();
    // }, [])

    const handleSignUp = async () => {
        const url = `${URL_BACKEND}/api/v1/auth/register`;
        try {
            const res = await axios.post(url, { email, password, fullname });
            if(res.data){
                router.navigate("/(auth)/verify");
            }
            console.log(">>check response: ", res.data);
        } catch (error: any) {
            console.log("=== ERROR DEBUG ===");
            console.log("1. Has response?", !!error.response);
            console.log("2. Status:", error.response?.status);
            console.log("3. Data:", error.response?.data);
            console.log("4. Message:", error.message);
            console.log("5. Code:", error.code);
            console.log("==================");
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View>
                    <Text style={{ fontSize: 25, fontWeight: 600, marginVertical: 30 }}>Đăng kí tài khoản</Text>
                </View>
                <ShareInput label="Họ tên" value={fullname} setValue={setFullName} />
                <ShareInput label="Email" keyboardType="email-address" value={email} setValue={setEmail} />
                <ShareInput label="Mật khẩu" secureTextEntry={true} value={password} setValue={setPassword} />
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
                    onPress={handleSignUp}
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
                        marginTop: 20,
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