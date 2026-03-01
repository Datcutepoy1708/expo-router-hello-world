import { Platform } from "react-native"

export const getURLBaseBackend=()=> {
    const backend= Platform.OS === "android" ? process.env.EXPO_PUBLIC_ANDROID_API_URL : process.env.EXPO_PUBLIC_IOS_API_URL;
    return backend;
}