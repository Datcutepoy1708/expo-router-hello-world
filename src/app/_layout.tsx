
import AppProvider from "@/context/app.context"
import { APP_COLOR } from "@/utils/constant"
import { HeaderTitle } from "@react-navigation/elements"
import { DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { ErrorBoundaryProps, Stack } from "expo-router"
import { Button, Text, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { RootSiblingParent } from "react-native-root-siblings"
import { SafeAreaView } from "react-native-safe-area-context"

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 10, gap: 15 }}>
        <View style={{
          backgroundColor: "#333", padding: 10,
          borderRadius: 3, gap: 10
        }}>
          <Text style={{ color: "red", fontSize: 20 }}>
            Something went wrong
          </Text>
          <Text style={{ color: "#fff" }}>{error.message}</Text>
        </View>
        <Button title="Try Again ?" onPress={retry} />
      </View>
    </SafeAreaView>
  )
}


const RootLayout = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white"
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
          {/* <SafeAreaView style={{ flex: 1 }} > */}
          <ThemeProvider value={navTheme}>
            <Stack
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#eee"
                },
                headerTintColor: APP_COLOR.ORAGE,
                headerTitleStyle: {
                  color: "black"
                },
                // contentStyle:{backgroundColor: "#fff"}
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="(auth)/signup"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(auth)/welcome" options={{ headerShown: false }} />
              <Stack.Screen
                name="(auth)/verify"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(user)/product/[id]"
                // 
                options={{ headerShown: false }}
              />
              {/* <Stack.Screen name="(auth)/login" options={{ headerTitle: "Đăng nhập" }} /> */}
              <Stack.Screen
                name="(auth)/login"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(user)/product/create.modal" options={{ headerShown: false, presentation: "transparentModal", animation: "slide_from_bottom" }} />
              <Stack.Screen name="(user)/product/update.modal" options={{ headerShown: false, animation: "fade", presentation: "transparentModal" }} />
              <Stack.Screen name="(user)/product/place.order" options={{ headerTitle: "Xác nhận đơn hàng" }} />
              <Stack.Screen name="(user)/account/info" options={{ headerTitle: "Cập nhật thông tin" }} />
              <Stack.Screen name="(user)/account/password" options={{ headerTitle: "Thay đổi mật khẩu" }} />
              <Stack.Screen name="(auth)/request.password" options={{ headerTitle: "Quên mật khẩu" }} />
              <Stack.Screen name="(auth)/forgot.password" options={{ headerTitle: "Thay đổi mật khẩu" }} />
              <Stack.Screen name="(auth)/search" options={{ headerShown: false }} />
            </Stack>
          </ThemeProvider>
          {/* </SafeAreaView> */}
        </AppProvider>
      </RootSiblingParent>
    </GestureHandlerRootView>
  )
}

export default RootLayout
