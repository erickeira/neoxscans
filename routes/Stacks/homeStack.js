import React, { useEffect } from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainerRefContext, useIsFocused, useNavigationState, useRoute } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';

import Home from '../../pages/home'; 
import Busca from '../../pages/busca';

const Stack = createStackNavigator();

import { navigationRef  } from '../../App'
import { defaultStyles } from '../../utils';
import { Icon } from '@rneui/themed';


const HomeStack = ({ navigation }) => {
  const currentRouteName = navigationRef?.current?.getCurrentRoute().name;
  const route = useRoute()
  const fullScreens = ["Busca"]
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: fullScreens.includes(currentRouteName) ? 'none' : 'block' }
    })
  },[ route ])
  
  return ( 
  <Stack.Navigator >
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{
          headerTitle: 'NeoxScans',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Avatar
              size={32}
              rounded
              source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
              containerStyle={{marginLeft: 12}}
            />
          ),
          headerRight: ()  => (
            <TouchableOpacity onPress={() => navigation.navigate('Busca')} hitSlop={{left: 20, bottom: 20}} style={{marginRight: 12}}>
              <Icon name="search" size={24}  color={"#fff"}/>
            </TouchableOpacity>
          ),
          headerShown: true, 
          // headerTransparent: true,
          headerStyle: defaultStyles.defaultHeaderStyles,
          headerTintColor: '#fff'      
        }}
      />
      <Stack.Screen 
        name="Busca" 
        component={Busca} 
        options={{
          headerTitle: 'Faça uma busca',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Avatar
              size={32}
              rounded
              source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
              containerStyle={{marginLeft: 12}}
            />
          ),
          headerRight: ()  => (
            <TouchableOpacity style={{marginRight: 12}}>
              <Icon name="search" size={24}  color={"#fff"}/>
            </TouchableOpacity>
          ),
          headerShown: true, 
          // headerTransparent: true,
          headerStyle: defaultStyles.defaultHeaderStyles,
          headerTintColor: '#fff' ,
          animationEnabled: true,
        }}
      />
     
    </Stack.Navigator>
  )
}


export default HomeStack;
