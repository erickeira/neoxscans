import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { defaultColors } from '../../utils';

export default function Chip({ titulo, onPress, style, textStyle, icon}){

    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[styles.view, style]}
        >
            {icon}
            <Text style={[styles.titulo, textStyle]}>{titulo}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    view: {
      borderColor: '#fff',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
      borderWidth: 0.3,
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 5,
      marginVertical: 10,
      marginRight: 8
    },
    titulo:{
        color: '#fff'
    }
});