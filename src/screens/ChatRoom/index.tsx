import React,{useEffect,useState} from 'react';
import {Text,View,FlatList,ImageBackground,KeyboardAvoidingView} from 'react-native';

import {useRoute,useNavigation} from '@react-navigation/native'

import chatRoomData from '../../data/Chats' // dummy data
import ChatMessage from '../../components/ChatMessage';
import BG from '../../data/BG.png'
import InputBox from '../../components/InputBox';

import {API,graphqlOperation,Auth} from 'aws-amplify'

import {messageByChatRoom} from '../../graphql/queries'
import {onCreateMessage} from '../../graphql/subscriptions'


const ChatRoom = () =>{
    const route = useRoute();
    const [messages,setMessages] = useState([]);
    const [myId,setMyId] = useState(null);


    const navigation = useNavigation();

    const fetchMessages = async () =>{
        const messagesData = await API.graphql(
            graphqlOperation(
                messageByChatRoom,{
                    chatRoomID: route.params.id,
                    sortDirection:"DESC"
                }
            )
        )

        setMessages(messagesData.data.messageByChatRoom.items)
    }

    useEffect(()=>{
        fetchMessages();
    },[])

    useEffect(() => {
        const getMyId = async () =>{
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyId(userInfo.attributes.sub)
        }

        getMyId();
    }, [])

    useEffect(()=>{
        const subscription = API.graphql(
            graphqlOperation(onCreateMessage)
        ).subscribe({
            next:(data)=>{
                const newMessage = data.value.data.onCreateMessage

                if(newMessage.chatRoomID !== route.params.id){
                    return
                }

                fetchMessages();

                // setMessages([newMessage, ...messages])
                console.log(data)
            }
        })

        return ()=>subscription.unsubscribe();
    },[])

    console.log(route.params, ' route params')
    return(
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
            <ImageBackground source={BG} style={{height:'100%',width:'100%'}}>
                <FlatList
                data={messages}
                renderItem={({item})=> <ChatMessage myId={myId} message={item}/>}
                showsVerticalScrollIndicator={false}
                inverted
                />
                <InputBox chatRoomID={route.params.id}/>
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}

export default ChatRoom;
