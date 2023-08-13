import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity,Dimensions } from 'react-native';
import { Icon, ListItem,  Chip } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/base';
import { Skeleton } from '@rneui/themed';
import { defaultColors } from '../../utils';

const { height, width }  = Dimensions.get('screen');

export default function CardDetails({ manga, carregando }){
    const [ favoritado, setFavoritado ] = useState(false)
    const navigation = useNavigation()
    if(carregando){
      return (
        <>
          <View style={styles.view}>
              <View style={styles.image}>
                  <Skeleton animation="pulse" width={120} height={170} />
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
                  <View style={{marginTop: 10}}>
                      <ListItem containerStyle={styles.itemList}>
                            <ListItem.Content>
                                <ListItem.Title style={styles.itemListTitulo}>Gênero(s)</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Subtitle style={styles.itemListSubtitulo} >
                              <Skeleton animation="pulse" width={100} height={20} />
                            </ListItem.Subtitle>
                      </ListItem>
                      <ListItem containerStyle={styles.itemList}>
                            <ListItem.Content>
                                <ListItem.Title style={styles.itemListTitulo}>Estúdio(s)</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Subtitle style={styles.itemListSubtitulo} >
                            <Skeleton animation="pulse" width={100} height={20} />
                            </ListItem.Subtitle>
                      </ListItem>
                      <ListItem containerStyle={styles.itemList}>
                            <ListItem.Content>
                                <ListItem.Title style={styles.itemListTitulo}>Lançamento</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Subtitle style={styles.itemListSubtitulo} >
                            <Skeleton animation="pulse" width={100} height={20} />
                            </ListItem.Subtitle>
                      </ListItem>
                      <ListItem containerStyle={styles.itemList}>
                            <ListItem.Content>
                                <ListItem.Title style={styles.itemListTitulo}>Status</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Subtitle style={styles.itemListSubtitulo} >
                            <Skeleton animation="pulse" width={100} height={20} />
                            </ListItem.Subtitle>
                      </ListItem>
                  </View>
              </View>
          </View>
          <Text style={styles.descricao}>
            <Skeleton animation="pulse" width={width} height={100} />
          </Text>
          <Divider/>
        </>
      );
    }
    return (
      <>
        <View style={styles.view}>
            <View style={styles.image}>
                <Text style={styles.tagCategoria}>
                    {manga?.tipo}
                </Text>
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
                <View style={styles.containerRating}>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 1 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 2 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 3 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 4 ? "#B6A404" : "grey"} size={18}/>
                    <Icon name="star" type="material-community" color={Math.round(manga?.rating) >= 5 ? "#B6A404" : "grey"} size={18}/>
                    <Text style={{marginLeft: 5, fontSize: 12, color: '#666'}}>{manga?.rating}</Text>
                </View>
                <View style={{marginTop: 10}}>
                    <ListItem containerStyle={styles.itemList}>
                          <ListItem.Content>
                              <ListItem.Title style={styles.itemListTitulo}>Gênero(s)</ListItem.Title>
                          </ListItem.Content>
                          <ListItem.Subtitle style={styles.itemListSubtitulo} >
                            {manga?.generos}
                          </ListItem.Subtitle>
                    </ListItem>
                    <ListItem containerStyle={styles.itemList}>
                          <ListItem.Content>
                              <ListItem.Title style={styles.itemListTitulo}>Estúdio(s)</ListItem.Title>
                          </ListItem.Content>
                          <ListItem.Subtitle style={styles.itemListSubtitulo} >
                            {manga?.estudio}
                          </ListItem.Subtitle>
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
            </View>
        </View>
        <Text style={styles.descricao}>
            {manga?.descricao?.join('\n\n')}
        </Text>
        <Divider/>
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
        marginVertical: 20,
        paddingHorizontal: 8
      },    
      image :{
        width: 120, 
        height: 170,
        display: 'flex',
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