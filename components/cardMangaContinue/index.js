import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Icon, ListItem,  Chip } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import AutoHeightImage from 'react-native-auto-height-image';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { RemoverLeitura, defaultColors } from '../../utils';
import ModalOptions from '../modalOptions';

export default function CardMangaContinue({ manga, callbackrefresh }){
    const [ favoritado, setFavoritado ] = useState(false)
    const [ options, setOptions ] = useState(false)
    const navigation = useNavigation()
    
    const  progressoCapitulo = (atual, ultimo_capitulo) => {
      if( ultimo_capitulo.numero == 'up') return 0.5
      let progresso = ((atual * 100 ) / ultimo_capitulo.numero.replace('Cap. ', '').replace('Cap. ', '') ) / 100
      return parseFloat(progresso.toFixed(1) || 0)
    }
    return (
        <>
        <TouchableOpacity
           onPress={() => {
            navigation.navigate(`Detalhes`, { capitulo : manga?.capitulo, url : manga?.url, manga: manga})
            navigation.navigate(`Visualizacao`, { capitulo : manga?.capitulo, url : manga?.url, manga: manga})
          }} 
          onLongPress={() => setOptions(true)}
          style={styles.view}
        >
            <View style={styles.image}>
                {
                  manga?.image ?
                  <AutoHeightImage
                    width={100}
                    source={{uri: manga?.image}}
                  />
                  :
                  <View style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name='image' size={40} />
                    <Text style={{color: '#666'}}>Sem imagem</Text>
                  </View>
                }

                <ProgressBar progress={progressoCapitulo(manga?.capitulo, manga?.capitulos[0])} color={defaultColors.activeColor} style={{height: 2}}/>
            </View>
            <View style={styles.containerDetalhes}>
                <Text style={styles.titulo}>{manga?.titulo}</Text>
                <Text style={styles.cap}>Cap. { manga?.capitulo?.length == 1 ? `0${manga?.capitulo}` : manga?.capitulo }</Text>
            </View>
        </TouchableOpacity>
        <ModalOptions
          visible={options}
          callbackclose={() => setOptions(false)}
        >
          <TouchableWithoutFeedback 
            onPress={async () => {
              await RemoverLeitura(manga)
              setOptions(false)
              callbackrefresh()
            }}
          >
              <View style={ styles.modalItemContainer }>
                <Text style={[styles.textoItem ]}>Remover</Text>
              </View>
          </TouchableWithoutFeedback>  
        </ModalOptions>
        </>
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
          color: '#adadad',
          fontWeight: '700',
          textAlign: 'center',
          fontSize: 10
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
        fontSize: 8,
        fontWeight: '600',
        color: '#fff'
      },
      modalItemContainer: {
        width: '100%',
        flexDirection: 'row',
        position: 'relative',
        paddingVertical: 15,
        paddingHorizontal: 20,
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0,
        borderBottomColor: '#666'
    },
    textoItem:{
      fontWeight: '600',
      marginLeft: 5,
      color: defaultColors.activeColor,
      textAlign: 'center'
  },

});