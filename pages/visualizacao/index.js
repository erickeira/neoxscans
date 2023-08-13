import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView,ImageBackground, FlatList,Image, Dimensions, ActivityIndicator} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { SalvarLeitura, api, defaultColors, GetLeitura, defaultStyles, MarcarCapituloLido, GetLidos } from '../../utils';
import { WebView } from 'react-native-webview';

const { height, width } = Dimensions.get('screen');

export default function Visualizacao({navigation, route }){
    const [ capitulo, setCapitulo] = useState([])
    const [carregando, setCarregando] = useState(false)
    const [paginasCarregar, setPaginasCarregar] = useState([])
    
    useEffect(() => {
      navigation.setOptions({
        headerTitle: `Cap.${route.params?.capitulo}: ${route.params?.manga?.titulo}` || 'Visualização',
        headerTitleStyle: {
          fontSize: 16
        },
      })
    }, [capitulo])

    async function handleMarcacoes(){
      await SalvarLeitura(route.params?.manga, route.params?.capitulo)
      await MarcarCapituloLido(route.params?.manga, route.params?.capitulo)
    }

    useEffect(() => {
      setCarregando(true)
      // getCapitulo()
      handleMarcacoes()
    },[route.params])

    async function getCapitulo(){
      try{
        const response = await api.post(`capitulo`, {
          url : route.params?.url,
          capitulo : route.params?.capitulo
        })
        if(response.data.status == 'success'){
            setCapitulo(response.data?.resultado)
            setPaginasCarregar([response.data?.resultado.paginas[0]])
        }
        setCarregando(false)
      }catch(error){
        setCarregando(false)
      }
    }

    async function loadMore(){

    }

    // if(carregando) return <ActivityIndicator size={40} color={defaultColors.activeColor} style={{flex: 1}}/>
    return(
      <>
        <WebView 
            useWebKit={true}
            originWhitelist={['*']} 
            decelerationRate="normal"                            
            source={{ uri: 
              `https://neoxscans.vercel.app/capitulo?url=${route.params?.url}&capitulo=${route.params?.capitulo}` 
            }}   
            mixedContentMode={'compatibility'}                          
        />
      </>
     
    )
    return (
      <>
        {
          capitulo?.textos.length > 1 ? 
          <ScrollView style={{padding: 20}}>
            <Text>{capitulo?.textos.join('\n\n')}</Text>
          </ScrollView>
          :
          <FlatList
            data={capitulo?.paginas}
            onEndReached={loadMore}
            renderItem={ ({item, index}) => {
                return(
                  <WebView 
                      useWebKit={true}
                      originWhitelist={['*']} 
                      decelerationRate="normal"                            
                      source={{ uri: `${item.url}` }}   
                      mixedContentMode={'compatibility'}                          
                  />
                  // <WebView 
                  //   source={{ uri: `${item.url}` }} 
                  //   style={{width: width, flex: 1 }} 
                  // />
                )
                if(item.url) return (
                  <AutoHeightImage
                    width={width}
                    source={{uri: `${item.url}`}}
                    animated
                  />
                )
                return(
                  <Text>{item}</Text>
                )
            }}
            ListEmptyComponent={
              <View style={{ paddingVertical: 60, alignItems: 'center', justifyContent: 'center' }}>
                  <Text allowFontScaling={ false } style={{ fontSize: 14, textAlign: 'center', color: '#fff' }}>
                      Mangá não encontrado!
                  </Text>
              </View>
            } 
            keyExtractor={(item, index) => {  return `${item.pagina}-${index}` }}
          />    
        }
      </>
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