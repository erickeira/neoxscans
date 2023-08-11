import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView,  FlatList, Dimensions} from 'react-native';
import { Image } from '@rneui/themed';
import AutoHeightImage from 'react-native-auto-height-image';

const { height, width } = Dimensions.get('screen');

export default function Visualizacao({navigation, manga }){
    const imagens = [
        { id: 1 }
    ]


    useEffect(() => {
        navigation.setOptions({
            headerTitle: manga?.titulo
        })
    }, [])

    return (
        <FlatList
            data={imagens}
            renderItem={ ({item, index}) => {
                return (
                    <AutoHeightImage
                        width={width}
                        source={{uri: 'https://cdn.neoxscans.net/data/manga_63584b0867ae0/cap-120/01.jpg'}}
                    />
                )
            }}
            ListEmptyComponent={(
              <View style={{ paddingVertical: 60, alignItems: 'center', justifyContent: 'center' }}>
                  <Text allowFontScaling={ false } style={{ fontSize: 14, textAlign: 'center', color: '#fff' }}>
                      Mangá não encontrado!
                  </Text>
              </View>
            )}
            keyExtractor={(item, index) => {  return `${item.id}-${index}` }}
        />        
    );
}

const styles = StyleSheet.create({
    list: {
      width: '100%',
      backgroundColor: '#000',
    },
    image: {
      aspectRatio: 1,
      width: '100%',
      height: '100%',
    //   flex: 1,
      resizeMode: 'contain'
    },
});