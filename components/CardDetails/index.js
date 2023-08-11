import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Icon, ListItem,  Chip } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/base';


export default function CardDetails({ manga }){
    const [ favoritado, setFavoritado ] = useState(false)
    const navigation = useNavigation()
    return (
      <>
        <View style={styles.view}>
            <View style={styles.image}>
                <Text style={styles.tagCategoria}>
                    {manga?.categoria}
                </Text>

                <Image  
                    source={ {
                        uri : manga?.image
                    }} 
                    width={120} 
                    height={170}
                />
            </View>
            
            <View style={styles.containerDetalhes}>
                <View style={styles.containerRating}>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 1 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 2 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 3 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 4 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 5 ? "#B6A404" : "grey"} size={18}/>
                    <Text style={{marginLeft: 5, fontSize: 12, color: '#666'}}>{manga?.rating}</Text>
                </View>
                <Text style={styles.descricao}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
            </View>

        </View>
        <View style={{marginBottom: 20}}>
          <ListItem containerStyle={styles.itemList}>
                  <ListItem.Content>
                      <ListItem.Title style={styles.itemListTitulo}>Avaliação</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Subtitle style={styles.itemListSubtitulo} > Média 4.9 / 5 - Votos totais : 107
                  </ListItem.Subtitle>
            </ListItem>
            <ListItem containerStyle={styles.itemList}>
                  <ListItem.Content>
                      <ListItem.Title style={styles.itemListTitulo}>Rank</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Subtitle style={styles.itemListSubtitulo} > 74th, - 1.5M Visualizações
                  </ListItem.Subtitle>
            </ListItem>
            <ListItem containerStyle={styles.itemList}>
                  <ListItem.Content>
                      <ListItem.Title style={styles.itemListTitulo}>Gênero(s)</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Subtitle style={styles.itemListSubtitulo} >
                    Artes Marciais, Isekai
                  </ListItem.Subtitle>
            </ListItem>
            <ListItem containerStyle={styles.itemList}>
                  <ListItem.Content>
                      <ListItem.Title style={styles.itemListTitulo}>Status</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Subtitle style={styles.itemListSubtitulo} >Em lançamento </ListItem.Subtitle>
            </ListItem>
        </View>
        <Divider style={{marginBottom : 20}}/>
      </>
    );
}

const styles = StyleSheet.create({
    view: {
        marginVertical: 5,
        display: 'flex',
        flexDirection: 'row',

      },
      containerDetalhes:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: '#fff',
        width: '68%', 
      },
      descricao:{
        color: '#d1d1d1',
      },    
      image :{
        backgroundColor: '#000',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10
      },
      chevronContainer:{
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
      },
      containerRating:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
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
      },
      containerTituloFavorite:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      containerFavorite:{
        paddingHorizontal: 5,
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
        fontSize: 15,
        fontWeight: '700'
      },
      itemListSubtitulo: {
        color: '#fff',
        padding: 0,
        margin: 0,
        fontSize: 13,
        fontWeight: '500'
      },

});