import React,{useContext, useEffect} from 'react';
import { SafeAreaView, View,Text, StyleSheet, Image, TouchableOpacity, Alert, StatusBar} from 'react-native';
import { Icon } from '@rneui/themed';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function HeaderLeft({ voltar, color, close }){

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    if(voltar) {
        return(
            <TouchableOpacity style={{paddingLeft: 15, paddingVertical: 10}} onPress={() => navigation.goBack()}  >
                <Icon type="MaterialIcons" name="arrow-back" size={25} color={color}/>
            </TouchableOpacity>
        )
    }
    return(
        <TouchableOpacity style={{paddingHorizontal: 10}} onPress={() => {/* navigation.openDrawer() */}} >
            <Icon type="material" name="menu" size={28}  color={color}/>
        </TouchableOpacity>
    )
}