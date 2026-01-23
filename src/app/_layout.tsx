import { Slot } from "expo-router"
import { Text, View } from "react-native"

const RootLayout =()=> {
    return (
        <View style={{padding:50}}>
         <Text>Header</Text>
         <Text>Footer</Text>
         <Slot/>
        </View>
    )
}

export default RootLayout