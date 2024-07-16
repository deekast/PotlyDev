import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

import "../global.css";

export default function Layout() {
  return (
    <GestureHandlerRootView className= 'flex-1'>
      <Drawer>
      <Drawer.Screen
          name="(tabs)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Main',
            title: 'Home',
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
  );
}
