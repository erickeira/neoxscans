import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Icon, ListItem,  Chip } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import AutoHeightImage from 'react-native-auto-height-image';
import { ProgressBar, MD3Colors } from 'react-native-paper';

export default function CardMangaContinue({ manga }){
    const [ favoritado, setFavoritado ] = useState(false)
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Visualizacao', { manga })} style={styles.view}>
            <View style={styles.image}>
                <Text style={styles.tagCategoria}>
                    {manga?.categoria}
                </Text>
                <AutoHeightImage
                    width={100}
                    source={{uri: manga?.image}}
                />
                <ProgressBar progress={0.5} color={MD3Colors.error50} style={{height: 2}}/>
            </View>
            <View style={styles.containerDetalhes}>
                {/* <Text style={styles.titulo}>{manga?.titulo}</Text> */}
                <Text style={styles.cap}>Cap. 02</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    view: {
        marginVertical: 5,
        width: 100,
        marginRight: 15
      },
      containerDetalhes:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: '#fff',
      },
      titulo: {
          color: '#fff',
          fontWeight: '700',
          textAlign: 'center',
          fontSize: 15
      },
      cap: {
        color: '#fff',
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 12
      },
      tagCategoria:{
        position: 'absolute',
        zIndex: 10,
        backgroundColor: '#0492C2',
        paddingHorizontal: 5,
        paddingVertical: 3,
        fontSize: 10,
        fontWeight: '600',
        color: '#fff'
      }

});