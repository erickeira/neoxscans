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
import DrawerContent from './drawer';

import TabNavigation from './tabNavigation';
import Detalhes from '../pages/detalhes';
import HeaderLeft from '../components/headerLeft';
import { defaultColors, defaultStyles } from '../utils';
import Visualizacao from '../pages/visualizacao';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function MyDrawer() {
  
    return (
        <Drawer.Navigator
          drawerContent={
            props => <DrawerContent {...props}/>
          }
          screenOptions={{
            drawerStyle: {
              backgroundColor: defaultColors.secundary
            },
          }}
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
      <Stack.Screen 
        name="Detalhes" 
        component={Detalhes} 
        options={{  
          headerShown: true,
          headerStyle: { ...defaultStyles.defaultHeaderStyles },
          headerTintColor: '#fff',
          headerLeft: () => <HeaderLeft voltar color={'#fff'}/>
        }}
      />
      <Stack.Screen 
        name="Visualizacao" 
        component={Visualizacao} 
        options={{  
          headerShown: true,
          headerTitle: 'Visualização',
          headerStyle: { ...defaultStyles.defaultHeaderStyles },
          headerTintColor: '#fff',
          headerLeft: () => <HeaderLeft voltar color={'#fff'}/>
        }}
      />
    </Stack.Navigator>
)
