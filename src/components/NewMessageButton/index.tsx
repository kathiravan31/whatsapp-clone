import React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../../constants/color'
import styles from './style'
import {useNavigation} from '@react-navigation/native'

const NewMessageButton = () =>{

    const navigation = useNavigation();
    const onPress = () =>{
        navigation.navigate('Contacts')
    }
    return(
        
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <MaterialCommunityIcons name="message-reply-text" size={24} color='white'/>
            </TouchableOpacity>
        </View>
        
        
    )
}

export default NewMessageButton;