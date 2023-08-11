import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import CardMangaList from '../../components/cardMangaList';
import { defaultStyles } from '../../utils';
import CardDetails from '../../components/cardDetails';
import { Avatar, Icon, ListItem } from '@rneui/base';

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
          <FlatList
            data={manga?.ultimos_capitulos}
            ListHeaderComponent={(
              <View >
               <CardDetails
                  manga={manga}
                />
                <Text style={[defaultStyles.tituloCategoria]}>
                  Capitulos
                </Text>
              </View>
            )}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate(`Visualizacao`)}>
                  <ListItem containerStyle={styles.itemList}>
                      <Avatar 
                        size={45}
                        rounded
                        source={{ uri: "https://neoxscans.net/wp-content/uploads/2022/05/Logo_Site_PSD_Branco_copiar_copy-2.png" }}
                      />
                      <ListItem.Content>
                          <ListItem.Title style={styles.itemListTitulo}>Cap. {item.numero}</ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Subtitle 
                          right={true} 
                          style={styles.itemListData}
                      >
                          {item.data}
                      </ListItem.Subtitle>
                      <ListItem.Chevron />
                  </ListItem>
                </TouchableOpacity>
               
              )
            }}
            ListEmptyComponent={(
              <View style={{ paddingVertical: 60, alignItems: 'center', justifyContent: 'center' }}>
                  <Text allowFontScaling={ false } style={{ fontSize: 14, textAlign: 'center', color: '#fff' }}>
                      Mangá não encontrado!
                  </Text>
              </View>
            )}
            keyExtractor={(item, index) => {  return `${item.numero}-${index}` }}
          />
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
        paddingVertical: 15,
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
        fontSize: 18
      },
      itemListData: {
        color: '#d1d1d1',
        fontSize: 14,
      },
});