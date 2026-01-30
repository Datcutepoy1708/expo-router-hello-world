import { APP_COLOR } from "@/utils/constant";
import { useState } from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native";

const styles = StyleSheet.create({
    inputGroup: {
        padding: 5,
        gap: 10
    },
    text: {
        fontSize: 18,
    },
    input: {
        borderColor: APP_COLOR.GRAY,
        borderWidth: 1,
        paddingHorizontal: 7,
        paddingVertical: 10,
        borderRadius: 10
    }
})

interface IProps {
    label?: string;
    keyboardType?: KeyboardTypeOptions
}

const ShareInput = (props: IProps) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const { label, keyboardType } = props;
    return (
        <View style={styles.inputGroup}>
            {label && <Text style={styles.text}>{label}</Text>}
            <TextInput
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                keyboardType={keyboardType}
                style={[styles.input, { borderColor: isFocus ? APP_COLOR.ORAGE : APP_COLOR.GRAY }]} />
        </View>
    )
}

export default ShareInput;