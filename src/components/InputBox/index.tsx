import React,{useEffect, useState} from 'react'
import {View,Text,TextInput,TouchableOpacity} from 'react-native'
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../../constants/color';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import {API,Auth, graphqlOperation} from 'aws-amplify'
import {createMessage,updateChatRoom} from '../../graphql/mutations'


const InputBox = (props) =>{

    const {chatRoomID} = props;
    const [message,setMessage] = useState('');
    const [myUserId,setMyUserId] = useState(null);

    useEffect(()=>{
        const fetchUser = async () =>{
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyUserId(userInfo.attributes.sub)

            console.log('user info id',userInfo.attributes.sub)
        }

        fetchUser()
    },[])

    const onMicrophonePress = () =>{
        console.warn('Microphone')
    }

    const updateChatRoomLastMessage = async (messageId) =>{
        try{
            await API.graphql(
                graphqlOperation(
                    updateChatRoom,{
                        input:{
                            id:chatRoomID,
                            lastMessageID:messageId
                        }
                    }
                )
            )
        }
        catch(e){
            console.log(e)
        }
    }

    const onSendPress = async () =>{
        try{
            const newMessageData = await API.graphql(
                graphqlOperation(
                    createMessage,{
                        input:{
                            content:message,
                            userID:myUserId,
                            chatRoomID:chatRoomID
                        }
                    }
                )
            )

            await updateChatRoomLastMessage(newMessageData.data.createMessage.id)
        }
        catch(e){
            console.log(e)
        }
        setMessage('');
    }

    const onPress = () =>{
        if(!message){
            onMicrophonePress();
        }else{
            onSendPress();
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <FontAwesome5 style={styles.icon} name="laugh-beam" size={24} color='grey'/>
                <TextInput 
                placeholder="Type a message" 
                style={styles.InputBox} 
                multiline
                value={message}
                onChangeText={setMessage}
                />
                <Entypo style={styles.icon} name="attachment" size={24} color='grey'/>
                {!message && <Fontisto style={styles.icon} name="camera" size={24} color='grey'/>}

            </View>

            <TouchableOpacity onPress={onPress}>
                <View style={styles.buttonContainer}>
                    {!message ? <MaterialCommunityIcons name="microphone" size={24} color={Colors.light.background}/> : 
                    <MaterialIcons name="send" size={24} color={Colors.light.background}/>
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default InputBox;