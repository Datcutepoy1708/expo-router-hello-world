import ShareInput from "@/components/input/share.input";
import { useCurrentApp } from "@/context/app.context";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    container: {
       marginTop:20
    }
})

const AccountPage = () => {
    const { theme, appState } = useCurrentApp();
    const backend = Platform.OS === "android" ? process.env.EXPO_PUBLIC_ANDROID_API_URL : process.env.EXPO_PUBLIC_IOS_API_URL;
    const baseImage = `${backend}/images/avatar`

    // Check if user data exists
    if (!appState || !appState.user) {
        return (
            <View style={[styles.container, { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }]}>
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                    Vui lòng đăng nhập để xem thông tin tài khoản
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center", gap: 5 }}>
                <Image
                    style={{ width: 150, height: 150 }}
                    source={{ uri: `${baseImage}/${appState.user.avatar}` }}
                />
                <Text>{appState.user.email}</Text>
            </View>
            <View style={{ marginTop: 20, gap: 20 }}>
                <ShareInput
                    title="Họ tên"
                    label="Họ tên"
                    value={appState.user.name}
                />
                <ShareInput
                    title="Email"
                    label="Email"
                    value={appState.user.email}
                />
                <ShareInput
                    title="Số điện thoại"
                    label="Số điện thoại"
                    value={appState.user.phone}
                />
            </View>
        </View>
    )
}

export default AccountPage;