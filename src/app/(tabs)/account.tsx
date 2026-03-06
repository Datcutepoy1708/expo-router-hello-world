import ShareInput from "@/components/input/share.input";
import { useCurrentApp } from "@/context/app.context";
import { APP_COLOR } from "@/utils/constant";
import { getURLBaseBackend } from "@/utils/url.backend";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
})

const AccountPage = () => {
    const { appState } = useCurrentApp();
    const baseImage = `${getURLBaseBackend()}/images/avatar`;
    const inset = useSafeAreaInsets();

    const handleLogout =  () => {
        Alert.alert('Đăng xuất', 'Bạn chắc chắn đăng xuất người dùng?', [
            {
                text: 'Hủy'
            },
            {
                text: 'Xác nhận', onPress: async () => {
                    await AsyncStorage.removeItem("access_token");
                    router.replace("/(auth)/welcome")
                }
            }
        ])

    }


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
        <View style={{ flex: 1 }}>
            <View style={{
                padding: inset.top,
                paddingHorizontal: 20,
                paddingBottom: 20,
                backgroundColor: APP_COLOR.ORAGE,
                flexDirection: "row",
                gap: 20,
                alignItems: "center"
            }}>
                <Image source={{ uri: `${baseImage}/${appState?.user.avatar}` }} style={{ width: 60, height: 60 }} />
                <View>
                    <Text style={{ fontSize: 20 }}>{appState?.user.name}</Text>
                </View>
            </View>
            <Pressable
                onPress={() => router.navigate("/(user)/account/info")}
                style={{
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    borderBottomColor: "#eee",
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                <View style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center"
                }} >
                    <Feather name="user-check" size={20} color={APP_COLOR.GREEN} />
                    <Text>Cập nhật thông tin</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color={APP_COLOR.GRAY} />
            </Pressable>

            <Pressable style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                borderBottomColor: "#eee",
                borderBottomWidth: 1,
                justifyContent: 'space-between',
                flexDirection: "row",
                alignItems: "center"
            }}>
                <View style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center"
                }} >
                    <MaterialIcons name="password" size={24} color={APP_COLOR.GREEN} />
                    <Text>Thay đổi mật khẩu</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color={APP_COLOR.GRAY} />
            </Pressable>

            <Pressable style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                borderBottomColor: "#eee",
                borderBottomWidth: 1,
                justifyContent: 'space-between',
                flexDirection: "row",
                alignItems: "center"
            }}>
                <View style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center"
                }} >
                    <AntDesign name="global" size={24} color={APP_COLOR.GREEN} />
                    <Text>Ngôn ngữ</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color={APP_COLOR.GRAY} />
            </Pressable>

            <Pressable style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                borderBottomColor: "#eee",
                borderBottomWidth: 1,
                justifyContent: 'space-between',
                flexDirection: "row",
                alignItems: "center"
            }}>
                <View style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center"
                }} >
                    <AntDesign name="info-circle" size={24} color={APP_COLOR.GREEN} />
                    <Text>Về ứng dụng</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color={APP_COLOR.GRAY} />
            </Pressable>

            <View style={{
                flex: 1,
                gap: 10,
                paddingBottom: 15,
                justifyContent: "flex-end"
            }}>
                <Pressable
                    onPress={handleLogout}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                        padding: 10,
                        marginHorizontal: 10,
                        backgroundColor: APP_COLOR.ORAGE,
                        borderRadius: 3
                    })}
                >
                    <Text style={{ textAlign: "center", color: "white" }}>Đăng xuất</Text>
                </Pressable>
            </View>

            <Pressable>
                <Text style={{ textAlign: "center", color: APP_COLOR.GRAY }}>Datcutepoy</Text>
            </Pressable>

        </View>
    )
}

export default AccountPage;