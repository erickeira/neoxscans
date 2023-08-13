import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import CardMangaList from '../../components/cardMangaList';
import { defaultStyles } from '../../utils';
import CardMangaContinue from '../../components/cardMangaContinue';
import CardMangaListSkeleton from '../../components/carMangaListSkeleton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function Salvos(){
    const [salvos, setSalvos] = useState([])
    const [carregando, setCarregando] = useState(true)
    const isFocused = useIsFocused()

    useEffect(() =>{
      getSalvos()
    },[isFocused])

    async function getSalvos(){
      setCarregando(true)
      let salvos = await AsyncStorage.getItem('salvos')
      salvos = JSON.parse(salvos) ? JSON.parse(salvos) : [];
      setSalvos(salvos)
      setCarregando(false)
    }

    async function removerItem(item){
      let salvosAux = salvos.filter(salvo => salvo.url != item.url);
      setSalvos(salvosAux)
    }

    return (
        <SafeAreaView style={styles.view}>
          <FlatList
            data={salvos}
            ListHeaderComponent={(
              <View >
                <Text style={defaultStyles.tituloCategoria}>
                  ({salvos.length}) Scans salvas
                </Text>
              </View>
            )}
            renderItem={({item, index}) => (
              <CardMangaList 
                isFavoritado={true} 
                carregando={carregando} 
                manga={item}
                callbackremove={() => removerItem(item)}
              />
            )  }
            ListEmptyComponent={
              carregando ? 
              <>
                <CardMangaListSkeleton/>
                <CardMangaListSkeleton/>
                <CardMangaListSkeleton/>
              </>

              :
              <View style={{ paddingVertical: 60, alignItems: 'center', justifyContent: 'center' }}>
                  <Text allowFontScaling={ false } style={{ fontSize: 14, textAlign: 'center', color: '#fff' }}>
                      Nenhuma scan salva até o momento!
                  </Text>
              </View>
            }
            keyExtractor={(item, index) => {  return `${item.numero}-${index}` }}
          />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    view: {
      margin: 10,
    },
});