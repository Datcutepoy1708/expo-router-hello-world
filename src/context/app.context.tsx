import React, { createContext, useContext, useState } from "react";

interface AppContextType {
    theme: string,
    setTheme: (v: string) => void,
    appState: IUserLogin | null,
    setAppState: (v: any) => void
    cart: ICart | Record<string, never>;
    setCart: (v: any) => void;
    restaurant: IRestaurant | null,
    setRestaurant: (v:any)=> void
}

const AppContext = createContext<AppContextType | null>(null);

interface IProps {
    children: React.ReactNode
}

export const useCurrentApp = () => {
    const currentTheme = useContext(AppContext);

    if (!currentTheme) {
        throw new Error(
            "useCurrentApp has to be used within <AppContext.Provider>"
        );
    }

    return currentTheme;
};

const AppProvider = (props: IProps) => {

    const [theme, setTheme] = useState<string>("");
    const [appState, setAppState] = useState<IUserLogin | null>(null);

    const [cart, setCart] = useState<ICart | Record<string, never>>({});
    const [restaurant,setRestaurant]=useState<IRestaurant| null>(null);

    // Debug logging
    const setAppStateWithLog = (value: any) => {
        setAppState(value);
    };


    return (
        <AppContext.Provider value={{ theme, setTheme, appState, setAppState: setAppStateWithLog, cart, setCart,restaurant,setRestaurant }} >
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider;