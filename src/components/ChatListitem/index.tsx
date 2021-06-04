
import React,{useState,useEffect} from 'react'
import {View,Text,Image,StyleSheet,TouchableWithoutFeedback} from 'react-native'
import { ChatRoom } from '../../../types'
import styles from './style'
import moment from 'moment'
import {useNavigation} from '@react-navigation/native'
import {Auth} from 'aws-amplify'

export type ChatListItemProps = {
    chatRoom:ChatRoom
}

const ChatListitem = (props:ChatListItemProps) =>{
    const navigation = useNavigation();
    const {chatRoom} = props;

    const [otherUser,setOtherUser] = useState(null)

    // const user = chatRoom.chatRoomUsers.items[1].user

    useEffect(()=>{
        const getOtherUser = async () =>{
            const userInfo = await Auth.currentAuthenticatedUser();

            if(chatRoom.chatRoomUsers.items[1].user.id === userInfo.attributes.sub){
                setOtherUser(chatRoom.chatRoomUsers.items[0].user);
            }else{
                setOtherUser(chatRoom.chatRoomUsers.items[1].user);
            }
        }

        getOtherUser();
    },[])
    

    const onClick = () =>{
        console.warn(`Clicked on ${otherUser.name}`)
        navigation.navigate('ChatRoom',{id:chatRoom.id,name:otherUser.name,image:otherUser.imageUri})
    }

    if(!otherUser){
        return null;
    }

    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.leftContainer}>
                <Image source={{uri:otherUser.imageUri}} style={styles.Avatar}/>

                <View style={styles.midContainer}>
                    <Text style={styles.username}>{otherUser.name}</Text>
                    <Text numberOfLines={1} style={styles.lastMessage}>
                    {chatRoom.lastMessage
                    ? `${chatRoom.lastMessage.user.name}: ${chatRoom.lastMessage.content}`
                    : ""}
                    </Text>
                    
                    <Text style={styles.time}>
                        {chatRoom.lastMessage && moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}
                    </Text>

                </View>
            </View>
            </TouchableWithoutFeedback>
            
            
            {/* <Text style={styles.time}>{chatRoom.lastMessage.createdAt}</Text> */}
            {/* <Text style={styles.time}>Yesterday</Text> */}
        </View>
    )
}


export default ChatListitem;