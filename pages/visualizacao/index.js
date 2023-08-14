import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView,ImageBackground, FlatList,Image, Dimensions, ActivityIndicator} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { SalvarLeitura, api, defaultColors, GetLeitura, defaultStyles, MarcarCapituloLido, GetLidos } from '../../utils';
import { WebView } from 'react-native-webview';
import ViewOptions from '../../components/viewOptions';

const { height, width } = Dimensions.get('screen');

export default function Visualizacao({navigation, route }){
    const [ capitulo, setCapitulo] = useState([])
    const [ numeroCapitulo, setNumeroCapitulo] = useState(route.params?.capitulo)
    const [carregando, setCarregando] = useState(false)
    const [paginasCarregar, setPaginasCarregar] = useState([])
    const [ showTabOptions, setShowTabOptions ] = useState(false)

    useEffect(() => {
      navigation.setOptions({
        headerTitle: `Cap.${numeroCapitulo}: ${route.params?.manga?.titulo}` || 'Visualização',
        headerTitleStyle: {
          fontSize: 16
        },
      })
    }, [capitulo, numeroCapitulo])

    async function handleMarcacoes(){
      await SalvarLeitura(route.params?.manga, numeroCapitulo)
      await MarcarCapituloLido(route.params?.manga, numeroCapitulo)
    }

    useEffect(() => {
      setCarregando(true)
      // getCapitulo()
      handleMarcacoes()
    },[numeroCapitulo])

    async function getCapitulo(){
      try{
        const response = await api.post(`capitulo`, {
          url : route.params?.url,
          capitulo : numeroCapitulo
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



    // if(carregando) return <ActivityIndicator size={40} color={defaultColors.activeColor} style={{flex: 1}}/>
    return(
      <>
        <WebView 
            // onScroll={(e) = onScroll(e)}      
            originWhitelist={['*']}                 
            source={{ uri: 
              `https://neoxscans.vercel.app/capitulo?url=${route.params?.url}&capitulo=${numeroCapitulo}` 
            }}                   
        />
        <ViewOptions
          begin={numeroCapitulo == 1 || numeroCapitulo == 0}
          last={ numeroCapitulo == route.params?.manga.capitulos[0].numero.replace('Cap. ', '') }
          onPressBack={() => setNumeroCapitulo(numeroCapitulo - 1)}
          onPressNext={() => setNumeroCapitulo(numeroCapitulo + 1)}
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