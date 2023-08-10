import React, {useContext, useEffect} from 'react';
import {  TouchableOpacity, Dimensions, StatusBar, Platform } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { 
  createDrawerNavigator,  
  DrawerContentScrollView,
  DrawerItemList, 
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
// import DrawerContent from './drawer';

import TabNavigation from './tabNavigation';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function MyDrawer() {
  
    return (
        <Drawer.Navigator
        //   drawerContent={
        //     props => <DrawerContent {...props}/>
        //   }
        //   screenOptions={{
        //     drawerStyle: {
        //       backgroundColor: styles.base.primaryColor
        //     },
        //   }}
        >   
            <Drawer.Screen 
              name="Global" 
              component={GlobalStack} 
              options={{  
                headerShown: false,
                drawerItemStyle: { display: 'none' } 
              }}
            />
        </Drawer.Navigator>
    );
}
const GlobalStack = () => (
    <Stack.Navigator screenOptions={{tabBarActiveTintColor: 'blue',labelStyle: {fontSize: 12}}} >
      <Stack.Screen name="Bottom" component={TabNavigation} options={{  headerShown: false }}/>
    </Stack.Navigator>
)
