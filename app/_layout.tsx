import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import "../global.css";
import { MyLightTheme } from '../utilities/themeOptions';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Layout() { 

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
      <GestureHandlerRootView className= 'flex-1'>
        <Drawer>
        <Drawer.Screen
            name="(tabs)" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: 'Home',
              title: '',
            }}
          />
          <Drawer.Screen
            name="pots" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: 'Pots',
              title: 'Pots',
            }}
          />
          <Drawer.Screen
            name="settings" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: 'Settings',
              title: 'Settings',
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
