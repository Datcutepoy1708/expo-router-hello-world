import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: "#fff" }
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="settings" />
    </Tabs>
  )
}

export default TabLayout;