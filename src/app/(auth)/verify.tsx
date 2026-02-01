import LoadingOverlay from "@/components/loading/overlay";
import { verifyCodeAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import OTPTextView from 'react-native-otp-textinput';
import Toast from "react-native-root-toast";

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    heading: {
        fontSize: 20,
        fontWeight: "600",
        marginVertical: 20
    }
})

const VerifyPage = () => {
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const otpRef = useRef<OTPTextView>(null);
    const [code, setCode] = useState<string>("");
    const { email } = useLocalSearchParams();

    const verifyCode = async () => {

        Keyboard.dismiss()
        setIsSubmit(true)
        const res = await verifyCodeAPI(email as string, code);
        setIsSubmit(false)
        //clear input
        if (res.data) {
            // success
            otpRef?.current?.clear()
            Toast.show("Đăng ký tài khoản thành công", {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: APP_COLOR.GREEN,
                opacity: 1,
                position: Toast.positions.TOP
            })
            router.navigate("/(auth)/login")
        } else {
            Toast.show(res.message as string, {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: APP_COLOR.ORAGE,
                opacity: 1,
                position: Toast.positions.TOP
            })
        }
    }
    useEffect(() => {
        if (code && code.length === 6) {
            verifyCode()
        }
    }, [code])

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.heading}>Xác thực tài khoản</Text>
                <Text style={{ marginVertical: 20 }}>Vui lòng nhập mã xác nhận gồm 6 chữ số đã được gửi đến địa chỉ </Text>
                <View style={{ marginVertical: 20 }}>
                    <OTPTextView
                        ref={otpRef}
                        autoFocus
                        handleTextChange={setCode}
                        inputCount={6}
                        inputCellLength={1}
                        tintColor={APP_COLOR.ORAGE}
                        textInputStyle={{
                            borderWidth: 1,
                            borderColor: APP_COLOR.GRAY,
                            borderBottomWidth: 1,
                            borderRadius: 5,
                            // @ts-ignore:next-line
                            color: APP_COLOR.ORAGE
                        }}
                    />
                </View>
                <View style={{ flexDirection: "row", marginVertical: 10, marginHorizontal: 10 }}>
                    <Text>Không nhận được mã xác thực?</Text>
                    <View>
                        <Text style={{ textDecorationLine: "underline" }}> Gửi lại</Text>
                    </View>
                </View>
            </View>
            {isSubmit && <LoadingOverlay />}
        </>
    )
}

export default VerifyPage;