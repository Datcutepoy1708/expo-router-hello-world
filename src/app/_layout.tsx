
import AppProvider from "@/context/app.context"
import { DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { Stack } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { RootSiblingParent } from "react-native-root-siblings"
import { SafeAreaView } from "react-native-safe-area-context"

const RootLayout = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent"
    }
  }
  return (
    // <View style={{ padding: 50 }}>
    //     <Text>Header</Text>
    //     <Slot />
    //     <Text>Footer</Text>
    // </View>
    <GestureHandlerRootView>
      <RootSiblingParent>
        <AppProvider>
          <SafeAreaView style={{ flex: 1 }} >
            <ThemeProvider value={navTheme}>
              <Stack
                screenOptions={{
                  headerStyle: {
                    backgroundColor: "#f4511e"
                  },
                  headerTintColor: "#fff",
                  headerTitleStyle: {
                    fontWeight: "bold"
                  },
                  // contentStyle:{backgroundColor: "#fff"}
                }}
              >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                  name="(auth)/signup"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(auth)/verify"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="product/product"
                  options={{ headerTitle: "Sản phẩm" }}
                />
                {/* <Stack.Screen name="(auth)/login" options={{ headerTitle: "Đăng nhập" }} /> */}
                <Stack.Screen
                  name="(auth)/login"
                  options={{ headerShown: false }}
                />
              </Stack>
            </ThemeProvider>
          </SafeAreaView>
        </AppProvider>
      </RootSiblingParent>
    </GestureHandlerRootView>
  )
}

export default RootLayout
