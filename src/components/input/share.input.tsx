import { APP_COLOR } from "@/utils/constant";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
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
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10
    },
    eye: {
        position: "absolute",
        right: 10,
        top: 15
    }
})

interface IProps {
    label?: string;
    keyboardType?: KeyboardTypeOptions
    secureTextEntry?: boolean
    value: any
    setValue: (v: any) => void;
}

const ShareInput = (props: IProps) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const { label, keyboardType, secureTextEntry = false, value, setValue } = props;
    return (
        <View style={styles.inputGroup}>
            {label && <Text style={styles.text}>{label}</Text>}
            <View>
                <TextInput
                    value={value}
                    onChange={(text)=>setValue(text)}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    keyboardType={keyboardType}
                    style={[styles.input, { borderColor: isFocus ? APP_COLOR.ORAGE : APP_COLOR.GRAY }]} secureTextEntry={secureTextEntry && !isShowPassword} />
                {secureTextEntry &&
                    <FontAwesome5 style={styles.eye} name={isShowPassword ? "eye" : "eye-slash"} size={15} color="black" onPress={() => setIsShowPassword(!isShowPassword)} />
                }
            </View>
        </View>
    )
}

export default ShareInput;