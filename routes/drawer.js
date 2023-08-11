import React,{useContext, useEffect, useState} from "react";
import { View, Image,Text, Dimensions,Alert, TouchableWithoutFeedback,Linking,  Platform, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
    useDrawerStatus
  } from '@react-navigation/drawer';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { Badge, Icon } from '@rneui/themed'
import { configureAPI, defaultColors, defaultStyles, existsOrError } from "../utils";
import { navigationRef } from '../App'
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowHeight = Dimensions.get('window').height; 

export default function DrawerContent(props){
    const navigation = useNavigation();
    const [appCenterVersion, setAppCenterVersion] = useState('')
    const isDrawerOpen = useDrawerStatus() === 'open';
    const currentRouteName = navigationRef?.current?.getCurrentRoute().name;

    useEffect(() => {
        StatusBar.setBarStyle( isDrawerOpen  || currentRouteName == 'Home' ? 'light-content' : 'dark-content', true);
    },[isDrawerOpen])


    return(
        <DrawerContentScrollView 
            {...props}
        >
            <DrawerItemList {...props} />
            <DrawerItem
                label="Início"
                style={styles.drawerItem}
                onPress={() => navigation.navigate('HomeTab')}
                labelStyle={styles.labelStyle}
                icon={({ focused, color, size }) => 
                    <Icon  type="feather" color={'#fff'} size={size} name={'home'} />
                }
            />
        </DrawerContentScrollView>
    )
}
export const styles = StyleSheet.create({
    drawerItem:{
        paddingVertical: 5,
        marginVertical: 0,
    },
    labelStyle: { 
        color: '#fff'
    }
})