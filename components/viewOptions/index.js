import { Icon } from "@rneui/base";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { create } from "react-test-renderer";

export default function ViewOptions({ onPressBack, onPressNext, begin, last}){
    return (
        <View style={styles.view}>
            {
                !begin ?
                <TouchableOpacity onPress={onPressBack} style={styles.button} hitSlop={{ left: 10, right: 10, top: 5, bottom: 10 }}>
                    <Icon name="chevron-left" tyope="EvilIcons" size={35} color={'#fff'}/>
                </TouchableOpacity>
                : null
            }

            {
                !last ? 
                <TouchableOpacity  onPress={onPressNext} style={styles.button} hitSlop={{ left: 10, right: 10, top: 5, bottom: 10 }}>
                    <Icon name="chevron-right" tyope="EvilIcons" size={35} color={'#fff'}/>
                </TouchableOpacity>
                : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    button:{
        paddingHorizontal: 10
    }
})