import fbLogo from "@/assets/auth/facebook.png";
import ggLogo from "@/assets/auth/google.png";
import bg from '@/assets/auth/welcome-background.png';
import { useCurrentApp } from "@/context/app.context";
import { getAccountAPI } from "@/utils/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShareButton from "components/button/share.button";
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { APP_COLOR } from "utils/constant";
import TextBetweenLine from "./layout/text.between.line";

import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();


const RootPage = () => {
    // useEffect(() => {
    //     const test = async () => {
    //         await AsyncStorage.setItem("eric", "eric-value")
    //         await AsyncStorage.setItem("access_token", "eric access_token")
    //     }
    //     test()
    // }, [])
    const { setAppState } = useCurrentApp()

    useEffect(() => {
        async function doAsyncStuff() {
            try {
                // do something async here
                const res = await getAccountAPI();

                const apiData = res.data as any;
                // API returns nested structure: res.data.data.user
                if (apiData && apiData.data && apiData.data.user) {
                    const access_token = await AsyncStorage.getItem("access_token");
                    setAppState({
                        user: apiData.data.user,  // Correct: apiData.data.user, not apiData.user
                        access_token: access_token || ""
                    })
                    router.replace("/(tabs)")
                   
                } else {
                    // No valid user data, stay on welcome page
                    router.replace("/(auth)/welcome")
                }
            } catch (e) {
                console.warn(e);
            } finally {
                await SplashScreen.hideAsync()
            }
        }

        doAsyncStuff();
    }, []);
    // if (true) {
    //     return (
    //         <Redirect href={"/(tabs)"} />
    //     )
    // }
    // return welcome 
    return (

        <>
            {/* <View>
            <Text>Root page</Text>
        </View> */}
        </>
    )
}
export default RootPage;