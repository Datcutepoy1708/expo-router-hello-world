import { APP_COLOR } from "@/utils/constant";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TabLayout = () => {

  const getIcons = (routeName: string, focused: boolean, size: number) => {
    if (routeName === "index") {
      return (
        <MaterialCommunityIcons
          name="food-fork-drink"
          size={size}
          color={focused ? APP_COLOR.ORAGE : APP_COLOR.GRAY}
        />
      )
    }
    if (routeName === "order") {
      return (
        <MaterialCommunityIcons
          name="box"
          size={size}
          color={focused ? APP_COLOR.ORAGE : APP_COLOR.GRAY}
        />
      )
    }
    if (routeName === "favorite") {
      return (
        <MaterialCommunityIcons
          name="heart"
          size={size}
          color={focused ? APP_COLOR.ORAGE : APP_COLOR.GRAY}
        />
      )
    }
    if (routeName === "notification") {
      return (
        <MaterialCommunityIcons
          name="bell"
          size={size}
          color={focused ? APP_COLOR.ORAGE : APP_COLOR.GRAY}
        />
      )
    }
    if (routeName === "account") {
      return (
        <MaterialCommunityIcons
          name="account-circle"
          size={size}
          color={focused ? APP_COLOR.ORAGE : APP_COLOR.GRAY}
        />
      )
    }
  }

  return (

    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: { paddingBottom: 3 },
        tabBarActiveTintColor: APP_COLOR.ORAGE,
        tabBarIcon: ({ focused, color, size }) => {
          return getIcons(route.name, focused, size)
        }
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="order" options={{ title: "Đơn hàng" }} />
      <Tabs.Screen name="favorite" options={{ title: "Yêu thích" }} />
      <Tabs.Screen name="notification" options={{ title: "Thông báo" }} />
      <Tabs.Screen name="account" options={{ title: "Tôi" }} />
    </Tabs>
  )
}

export default TabLayout;