import LoadingOverlay from "@/components/loading/overlay";
import { verifyCodeAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { useState } from "react";
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

const VerifyPage = async () => {
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const handleCellTextChange = async (text: string, i: number) => {
        console.log(">>> check text: ", text, " and i = ", i)
        if (i === 5 && text) {
            Keyboard.dismiss()
            setIsSubmit(true)
            const res = await verifyCodeAPI("admin1@gmail.com", "123456");
            setIsSubmit(false)
            if (res.data) {
                // success
                alert("success");
                setIsSubmit(false);
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
    }
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.heading}>Xác thực tài khoản</Text>
                <Text style={{ marginVertical: 20 }}>Vui lòng nhập mã xác nhận gồm 6 chữ số đã được gửi đến địa chỉ admin1@gmail.com</Text>
                <View style={{ marginVertical: 20 }}>
                    <OTPTextView
                        handleCellTextChange={handleCellTextChange}
                        autoFocus
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