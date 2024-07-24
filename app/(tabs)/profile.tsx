import { View, Text } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'nativewind';
import { useTheme } from '@react-navigation/native';
import { MyLightTheme } from '../../utilities/themeOptions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {

    const [selectedIndex, setSelectedIndex] = useState<string>("light");
    const { setColorScheme, colorScheme } = useColorScheme();
    const toggleColorScheme = async (themeValue: ThemeOptions) => {
        setSelectedIndex(themeValue);
        setColorScheme(themeValue);
        await AsyncStorage.setItem("theme",themeValue);
    };

    useEffect(() => {
        const getTheme = async () => {
          try {
            const themeValue = (await AsyncStorage.getItem(
              "theme"
            )) as ThemeOptions;
            if (themeValue) {
              setSelectedIndex(themeValue);
            }
          } catch (e) {
            console.log(e);
          }
        };
        getTheme();
      }, []);

    const { colors } = useTheme();
        
    return (
        <View className = 'flex flex-1 flex-row justify-center items-center'>
            <CheckBox
                checked={selectedIndex === "light"}
                onPress={() => toggleColorScheme("light")}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title="Light"
                className="bg-background"
                checkedColor={MyLightTheme.colors.primary}
            />
            <CheckBox
                checked={selectedIndex === "dark"}
                onPress={() => toggleColorScheme("dark")}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title="Dark"
                className="bg-background"
                checkedColor={colors.primary}
            />
            <CheckBox
                checked={selectedIndex === "system"}
                onPress={() => toggleColorScheme("system")}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title="System"
                className="bg-background"
                checkedColor={colorScheme=="dark" ? colors.primary : MyLightTheme.colors.primary}
            />
                 
        </View>
    )
}