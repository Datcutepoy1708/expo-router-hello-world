import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = () => {
    return (
        // <View style={{ padding: 50 }}>
        //     <Text>Header</Text>
        //     <Slot />
        //     <Text>Footer</Text>
        // </View>
        <GestureHandlerRootView>
            <RootSiblingParent>
                <SafeAreaView style={{ flex: 1 }}>
                    <Stack
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: '#f4511e'
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold'
                            }
                        }}
                    >
                        <Stack.Screen name="index" options={{ headerShown: false }} />
                        <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
                        <Stack.Screen name="(auth)/verify" options={{ headerShown: false }} />
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="product/product" options={{ headerTitle: "Sản phẩm" }} />
                        {/* <Stack.Screen name="(auth)/login" options={{ headerTitle: "Đăng nhập" }} /> */}
                        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
                    </Stack>
                </SafeAreaView>
            </RootSiblingParent>
        </GestureHandlerRootView>

    )
}

export default RootLayout