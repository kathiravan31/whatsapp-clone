import React,{useState,useEffect} from 'react'
import {View,Text,SafeAreaView,StatusBar,StyleSheet,FlatList} from 'react-native'
import ChatListitem from '../../components/ChatListitem'
import NewMessageButton from '../../components/NewMessageButton'
import Colors from '../../constants/color'

import {API,graphqlOperation,Auth} from 'aws-amplify'
// import {getUser} from '../../graphql/queries'
import {getUser} from './quries'

import chatRooms from '../../data/ChatRooms'
import {onCreateChatRoom} from '../../graphql/subscriptions'
import {useRoute,useNavigation} from '@react-navigation/native'



const ChatScreen = () =>{
    const [chatRooms,setChatRooms] = useState([])

    const navigation = useNavigation();

    const fetchChatRooms = async () =>{
        try{
            const userInfo = await Auth.currentAuthenticatedUser();

            const userData = await API.graphql(
                graphqlOperation(
                    getUser,{
                        id:userInfo.attributes.sub
                    }
                )
            )

            setChatRooms(userData.data.getUser.chatRoomUser.items)

        }
        catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        fetchChatRooms();
    },[])

    useEffect(()=>{
        navigation.addListener('focus',()=>{
            fetchChatRooms();
        })
    })

    
    return(
        
            <View style={styles.container}>
                <FlatList
                data={chatRooms}
                renderItem={({item})=>(
                    <ChatListitem chatRoom={item.chatRoom}/>
                )}
                keyExtractor={(item)=> item.id}
                showsVerticalScrollIndicator={false}
                />
                <NewMessageButton/>
            </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})

export default ChatScreen;

