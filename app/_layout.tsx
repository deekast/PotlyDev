import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import "../global.css";
import { MyLightTheme } from '../utilities/themeOptions';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Inter_900Black, useFonts } from '@expo-google-fonts/inter';
import { Slot } from 'expo-router';

export default function RootLayout() { 

  console.log("RootLayout");

  const {colorScheme, setColorScheme} = useColorScheme();
  useEffect(() => {
    const loadTheme = async () => {
      // await AsyncStorage.removeItem('theme');
      const stored = (await AsyncStorage.getItem("theme")) as ThemeOptions;
      if (stored) {
        setColorScheme(stored);
      } else {
        // Default to light if nothing or unexpected value is stored
        setColorScheme("light");
      }
    };

    loadTheme();
  }, [colorScheme]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : MyLightTheme}>
        <Slot />
    </ThemeProvider>
  );
}
