import { APP_COLOR } from "@/utils/constant";
import { StyleSheet, Text, View } from "react-native";
import OTPTextView from 'react-native-otp-textinput';

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
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Xác thực tài khoản</Text>
            <Text style={{ marginVertical: 20 }}>Vui lòng nhập mã xác nhận gồm 6 chữ số đã được gửi đến địa chỉ admin1@gmail.com</Text>
            <View style={{ marginVertical: 20 }}>
                <OTPTextView
                    inputCount={6}
                    inputCellLength={1}
                    tintColor={APP_COLOR.ORAGE}
                    textInputStyle={{
                        borderWidth: 1,
                        borderColor: APP_COLOR.GRAY,
                        borderBottomWidth: 1,
                        borderRadius: 5,
                        // @ts-ignore:next-line
                        color:APP_COLOR.ORAGE
                    }}
                />
            </View>
            <View style={{flexDirection: "row" , marginVertical:10, marginHorizontal:10}}>
                <Text>Không nhận được mã xác thực?</Text>
                <View>
                    <Text style={{textDecorationLine:"underline"}}> Gửi lại</Text>
                </View>
            </View>
        </View>
    )
}

export default VerifyPage;