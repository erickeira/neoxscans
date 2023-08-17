import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Icon, ListItem,  Chip } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { SalvarScan, defaultColors } from '../../utils';


export default function CardBuscaList({ manga, isFavoritado, callbackremove }){
    const [ favoritado, setFavoritado ] = useState(isFavoritado)
    const navigation = useNavigation()

    async function handleFavoritar(){
      const salvo = await SalvarScan(manga)
      setFavoritado(salvo)
      if(callbackremove) callbackremove()
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { manga, isFavoritado })} style={styles.view}>
            <View style={styles.image}>
                {
                  manga?.categoria ?
                  <Text style={styles.tagCategoria}>
                      {manga?.categoria?.toUpperCase()}
                  </Text>
                  : null
                }

                {
                  manga?.image ?
                  <Image  
                      source={ {
                          uri : manga?.image
                      }} 
                      width={120} 
                      height={170}
                  />
                  :
                  <View style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name='image' size={40} />
                    <Text style={{color: '#666'}}>Sem imagem</Text>
                  </View>
                }
            </View>
            
            <View style={styles.containerDetalhes}>
                <View style={styles.containerTituloFavorite}>
                    <Text style={styles.titulo}>{manga?.titulo}</Text>
                    <TouchableOpacity hitSlop={{ left: 20, bottom: 20}} onPress={() => handleFavoritar()} style={styles.containerFavorite}>
                        {
                            favoritado ?
                            <Icon name="bookmark" type="Ionicons" color={defaultColors.activeColor} size={30}/> 
                            :
                            <Icon name="bookmark-outline" type="Ionicons" color="#fff" size={30}/>
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.containerRating}>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 1 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 2 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 3 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 4 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 5 ? "#B6A404" : "grey"} size={18}/>
                    <Text style={{marginLeft: 5, fontSize: 12,color: '#fff'}}>{manga?.rating}</Text>
                </View>
                <View style={{marginTop: 10}}>
                    <ListItem containerStyle={styles.itemList}>
                          <ListItem.Content>
                              <ListItem.Title style={styles.itemListTitulo}>Gênero(s)</ListItem.Title>
                              <ListItem.Subtitle style={styles.itemListSubtitulo} >
                                {manga?.generos.join(', ')}
                            </ListItem.Subtitle>
                          </ListItem.Content>

                    </ListItem>
                    <ListItem containerStyle={styles.itemList}>
                          <ListItem.Content>
                              <ListItem.Title style={styles.itemListTitulo}>Lançamento</ListItem.Title>
                          </ListItem.Content>
                          <ListItem.Subtitle style={styles.itemListSubtitulo} >
                            {manga?.lancamento}
                          </ListItem.Subtitle>
                    </ListItem>
                    <ListItem containerStyle={styles.itemList}>
                          <ListItem.Content>
                              <ListItem.Title style={styles.itemListTitulo}>Status</ListItem.Title>
                          </ListItem.Content>
                          <ListItem.Subtitle style={styles.itemListSubtitulo} >
                            {manga?.status}
                          </ListItem.Subtitle>
                    </ListItem>
                </View>
                  {
                    manga?.capitulos?.map((cap, index) => (
                      <ListItem key={index} containerStyle={styles.itemList}>
                        <ListItem.Content>
                            <ListItem.Title style={styles.itemListTitulo}>{cap.numero}</ListItem.Title>
                        </ListItem.Content>
                        {
                          cap.data == 'up'? 
                          <Image 
                            source={{ uri: 'https://neoxscans.net/wp-content/uploads/2022/08/Botao-copiaa.png'}} 
                            width={18}
                            height={18}
                          />
                          :
                          <ListItem.Subtitle 
                            right={true} 
                            style={styles.itemListData}
                          >
                            {cap.data}
                          </ListItem.Subtitle>
                        }
      
                    </ListItem>
                    
                    ))
                  }
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    view: {
        marginVertical: 5,
        display: 'flex',
        flexDirection: 'row',
        // width: '100%'
      },
      containerDetalhes:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: '#fff',
        width: '68%', 
      },
      titulo: {
          color: '#fff',
          fontWeight: '700',
          flexWrap: 'wrap',
          fontSize: 18,
          width: '85%'
      },
      itemList: {
        backgroundColor: 'transparent',
        paddingVertical: 3,
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
        fontSize: 13,
        fontWeight: '700'
      },
      itemListSubtitulo: {
        color: '#adadad',
        padding: 0,
        margin: 0,
        fontSize: 13,
        fontWeight: '500'
      },
      itemListData: {
        color: '#d1d1d1',
        fontSize: 12,
      },
      image :{
        height: 170,
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
      }

});