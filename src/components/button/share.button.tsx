import { APP_COLOR } from "@/utils/constant";
import { ReactNode } from "react";
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
const styles = StyleSheet.create({
    text: {
        textTransform: "uppercase",


    },
    btnContainer: {
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        alignSelf: "stretch",
        backgroundColor: APP_COLOR.ORAGE
    }
})
interface IProps {
    title: string,
    onPress: () => void;
    textStyle?: StyleProp<TextStyle>;
    pressStyle?: StyleProp<ViewStyle>;
    btnStyle?: StyleProp<ViewStyle>;
    icon?: ReactNode
}
const ShareButton = (props: IProps) => {
    const { title, onPress, textStyle, pressStyle, btnStyle, icon } = props
    return (
        <Pressable
            style={({ pressed }) => ([{ opacity: pressed === true ? 0.5 : 1, alignSelf: "flex-start" }, pressStyle])}
            onPress={onPress}
        >
            <View style={[styles.btnContainer, btnStyle]}>
                {icon}
                {/* <AntDesign name="plus" size={24} color="black" /> */}
                <Text style={textStyle}>{title}</Text>
            </View>
        </Pressable>
    )
}
export default ShareButton;