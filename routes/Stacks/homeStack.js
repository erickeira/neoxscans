import React, { useEffect } from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainerRefContext, useIsFocused, useNavigationState, useRoute } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';
import AutoHeightImage from 'react-native-auto-height-image';

import Logo from '../../assets/images/logo_neox.png'
import User from '../../assets/images/user.png'

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
          headerTitle:  (props) => (                   
          <AutoHeightImage
              width={160}
              source={Logo}
          />),
          headerTitleAlign: 'center',
          // headerLeft: () => (
          //   <TouchableOpacity
          //     // onPress={() => navigation.openDrawer()}
          //     hitSlop={{ right: 20, bottom: 20}}
          //   >
          //     <Avatar
          //       size={32}
          //       rounded
          //       source={User}
          //       containerStyle={{marginLeft: 12}}
          //     />
          //   </TouchableOpacity>
          // ),
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
