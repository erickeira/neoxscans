import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { defaultColors } from '../../utils';

export default function Chip({ titulo, onPress}){

    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={styles.view}
        >
            <Text style={styles.titulo}>{titulo}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    view: {
      borderColor: '#fff',
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