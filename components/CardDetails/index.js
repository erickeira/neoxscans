import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Icon, ListItem,  Chip } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';


export default function CardDetails({ manga }){
    const [ favoritado, setFavoritado ] = useState(false)
    const navigation = useNavigation()
    return (
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
                    <Text style={{marginLeft: 5, fontSize: 12}}>{manga?.rating}</Text>
                </View>
                <Text style={styles.descricao}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
            </View>

        </View>
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
        fontWeight: '600 '
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