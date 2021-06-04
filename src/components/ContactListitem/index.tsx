
import React from 'react'
import {View,Text,Image,StyleSheet,TouchableWithoutFeedback} from 'react-native'
import { User } from '../../../types'
import styles from './style.js'
import moment from 'moment'
import {useNavigation} from '@react-navigation/native'
import {API,graphqlOperation,Auth} from 'aws-amplify'
import {createChatRoom, createChatRoomUser} from '../../graphql/mutations'

export type ContactListitemProps = {
    user:User
}

const ContactListitem = (props:ContactListitemProps) =>{
    const navigation = useNavigation();
    const {user} = props;


    const onClick = async () =>{

        console.warn('clicked')

        try{
            // create chatRoom
            const newChatRoomData =  await API.graphql(
                graphqlOperation(
                    createChatRoom,{
                        input:{
                            // lastMessageId:
                        }
                    }
                )
            )

            if(!newChatRoomData.data){
                console.log("Failed to create chatRoom")
                return;
            }

            const newChatRoom = newChatRoomData.data.createChatRoom;

            console.log(newChatRoomData)
            // add user to chatroom

            await API.graphql(
                graphqlOperation(
                    createChatRoomUser,{
                        input:{
                            userID:user.id,
                            chatRoomID:newChatRoom.id,
                        }
                        
                    }
                )
            )

            // add authenticated user in chatroom

            const userInfo = await Auth.currentAuthenticatedUser();

            await API.graphql(
                graphqlOperation(
                    createChatRoomUser,{
                        input:{
                            userID:userInfo.attributes.sub,
                            chatRoomID:newChatRoom.id,
                        }
                        
                    }
                )
            )

            navigation.navigate('ChatRoom',{id:newChatRoom.id,name:user.name,image:user.imageUri})

        }
        catch(e){
            console.log(e)
        }
        
    }

    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.leftContainer}>
                <Image source={{uri:user.imageUri}} style={styles.Avatar}/>

                <View style={styles.midContainer}>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text numberOfLines={1} style={styles.status}>{user.status}</Text>
                </View>
            </View>
            </TouchableWithoutFeedback>
            
        </View>
    )
}


export default ContactListitem;