import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import CardMangaList from '../../components/cardMangaList';
import { defaultStyles } from '../../utils';
import CardDetails from '../../components/CardDetails';
import { Icon, ListItem } from '@rneui/base';

export default function Detalhes({ navigation,  route }){
    const [ favoritado, setFavoritado ] = useState(false)
    const { params } = route
    const manga = params?.manga
    useEffect(() => {
        navigation.setOptions({
            headerTitle: manga?.titulo,
            headerRight: () => (
                <TouchableOpacity hitSlop={{ left: 20, bottom: 20}}  onPress={() => setFavoritado(!favoritado)} style={styles.containerFavorite}>
                    {
                        favoritado ?
                        <Icon name="bookmark" type="Ionicons" color="red" size={30}/> 
                        :
                        <Icon name="bookmark-outline" type="Ionicons" color="#fff" size={30}/>
                    }
                </TouchableOpacity>
            )
        })
    },[])
    return (
        <SafeAreaView style={styles.view}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CardDetails
              manga={manga}
            />
            <Text style={defaultStyles.tituloCategoria}>
              Capitulos
            </Text>
            {
                manga?.ultimos_capitulos?.map(cap => (
                    <ListItem containerStyle={styles.itemList}>
                    <ListItem.Content>
                        <ListItem.Title style={styles.itemListTitulo}>Cap. {cap.numero}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Subtitle 
                        right={true} 
                        style={styles.itemListData}
                    >
                        {cap.data}
                    </ListItem.Subtitle>
                </ListItem>
                
                ))
                }
          </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    view: {
      margin: 10,
    },
    containerFavorite:{
        marginRight: 20
    },
    itemList: {
        backgroundColor: 'transparent',
        paddingVertical: 8,
        paddingHorizontal: 0
      },
      itemListContent:{
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        alignItems: 'center', 
        gap: 10,
     },
      itemListTitulo: {
        color: '#fff',
        padding: 0,
        margin: 0,
        fontSize: 13
      },
      itemListData: {
        color: '#d1d1d1',
        fontSize: 12,
      },
});