import { Icon } from "@rneui/base";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { create } from "react-test-renderer";

export default function ViewOptions({ onPressBack, onPressNext, begin, last, show, scrollinfinito, changeModo}){



    if(!show) return
    return (
        <View style={styles.view}>
            {
                !begin && !scrollinfinito ?
                <TouchableOpacity onPress={onPressBack} style={styles.button} hitSlop={{ left: 10, right: 10, top: 5, bottom: 10 }}>
                    <Icon type="MaterialIcons" name="arrow-back" size={30} color={'#fff'}/>
                </TouchableOpacity>
                : <View  style={styles.button}/>
            }
            
            <TouchableOpacity onPress={changeModo} style={styles.buttonText}>
                <Text style={{color: '#fff'}}>
                    { scrollinfinito ?  `Scroll Infinito` : `Modo Paginado`}
                </Text>
            </TouchableOpacity>
            

            {
                !last && !scrollinfinito ? 
                <TouchableOpacity  onPress={onPressNext} style={styles.button} hitSlop={{ left: 10, right: 10, top: 5, bottom: 10 }}>
                    <Icon type="MaterialIcons" name="arrow-forward" size={30} color={'#fff'}/>
                </TouchableOpacity>
                : <View  style={styles.button}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        bottom: 0,
        width: '90%',
        marginHorizontal: '5%',
        borderRadius: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10
    },
    button:{
        paddingHorizontal: 10
    },
    buttonText:{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    }
})