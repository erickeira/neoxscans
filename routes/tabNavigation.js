import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Icon } from '@rneui/themed';

import HomeStack from './Stacks/homeStack';
import { defaultColors } from '../utils';
import { View } from 'react-native';
import SalvosStack from './Stacks/salvosStack';


// const Tab = createBottomTabNavigator()
const Tab = createMaterialBottomTabNavigator();

const TabNavigation = ({ navigation }) =>{
    return(
      <Tab.Navigator 
        screenOptions={{
          tabBarHideOnKeyboard: 'true',
          tabBarStyle: {
            borderTopColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0 
          },
        }} 
        activeColor={defaultColors.activeColor}
        inactiveColor='#adadad'
        barStyle={{ 
          backgroundColor: defaultColors.secundary 
        }}
        labeled={false}
        // shifting={true}
      >
        <Tab.Screen 
          name="HomeTab"  
          component={ HomeStack }   
          options={{ 
            headerTitleStyle: { opacity: 0 }, 
            headerShown: true, 
            headerTransparent: true,
            tabBarLabel: 'Início',
            tabBarBadge: false,
            tabBarIcon: ({focused, color}) => ( 
                <Icon 
                  name="globe" 
                  type="entypo" 
                  size={24}  
                  color={color}
                />
            )
          }}  
        />
        <Tab.Screen 
          name="SalvosTab"  
          component={ SalvosStack }   
          options={{ 
            headerTitleStyle: { opacity: 0 }, 
            headerShown: true, 
            headerTransparent: true,
            tabBarLabel: 'Salvos',
            tabBarShowLabel: false,
            tabBarIcon: ({size, color}) => ( <Icon name="auto-stories" type="MaterialIcons" size={24}  color={color}/>)
          }}  
        />
        {/* <Tab.Screen 
          name="ConfiguracoesTab"  
          component={ HomeStack }   
          options={{ 
            headerTitleStyle: { opacity: 0 }, 
            headerShown: true, 
            headerTransparent: true,
            tabBarLabel: 'Configurções',
            tabBarShowLabel: false,
            tabBarIcon: ({size, color}) => ( <Icon name="settings" type="ionicons" size={24}  color={color}/>)
          }}  
        /> */}
      </Tab.Navigator>  
    )
  } 

export default TabNavigation;


