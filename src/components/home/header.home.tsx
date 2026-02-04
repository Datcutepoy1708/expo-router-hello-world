import { APP_COLOR } from "@/utils/constant"
import { Entypo } from "@expo/vector-icons"
import { StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    gap: 3
  },
  location: {
    flexDirection: "row",
    alignItems: "flex-end"
  }
})

const HeaderHome = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ paddingLeft: 5 }}>Giao đến: </Text>
        <View style={styles.location}>
          <Entypo name="location-pin" size={20} color={APP_COLOR.ORAGE} />
          <Text>120 Yên Lãng ,Đống Đa,Hà Nội</Text>
        </View>
      </View>
    </View>
  )
}

export default HeaderHome
