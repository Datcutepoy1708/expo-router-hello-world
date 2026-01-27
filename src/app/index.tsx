import { StyleSheet, Text, View } from "react-native";
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
        borderWidth: 5
    },
    header: {
        fontSize: 40,
        fontWeight: "600"
    },
    body: {
        fontSize: 30,
        color: "orange",
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
                <Text>Đăng nhập với</Text>
                <View>
                    <View style={styles.btnContainer}>
                        <View style={styles.btnContent}>
                            <Text style={styles.btnText}>Facebook</Text>
                        </View>
                    </View>
                    <View><Text>Google</Text></View>
                </View>
                <View><Text>Đăng nhập với email</Text></View>
                <View><Text>Chưa có tài khoản? Đăng kí</Text></View>
            </View>
        </View>
    )
}
export default WelcomePage;