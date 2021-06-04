import React,{useEffect,useState} from 'react'
import {View,Text,SafeAreaView,StatusBar,StyleSheet,FlatList} from 'react-native'
import ContactListitem from '../../components/ContactListitem'
import NewMessageButton from '../../components/NewMessageButton'
import Colors from '../../constants/color'
// import Users from '../../data/Users' dummy data

import chatRooms from '../../data/ChatRooms'

import {API,graphqlOperation} from 'aws-amplify'
import { listUsers } from '../../graphql/queries'
import {onCreateChatRoom} from '../../graphql/subscriptions'


const Contacts = () =>{

    const [users,setUsers] = useState([])

    useEffect(()=>{
        const fetchUser = async () =>{
            try{
                const userData = await API.graphql(
                    graphqlOperation(
                        listUsers
                    )
                )
                
                setUsers(userData.data.listUsers.items)
                console.log(userData)
            }
            catch(error){
                console.log(error)
            }
        }

        fetchUser();
    },[])


    // useEffect(()=>{
    //     const subscription = API.graphql(
    //         graphqlOperation(onCreateChatRoom)
    //     ).subscribe({
    //         next:(data)=>{
    //             const newMessage = data.value.data.onCreateMessage

    //             // if(newMessage.chatRoomID !== route.params.id){
    //             //     return
    //             // }

    //             // fetchMessages();

    //             // setMessages([newMessage, ...messages])
    //             console.log(newMessage,"chatroom data")
    //         }
    //     })

    //     return ()=>subscription.unsubscribe();
    // },[])

    return(
        
        // <StatusBar barStyle='light' backgroundColor={Colors.light.tint}/>
            <View style={styles.container}>
                <FlatList
                data={users}
                renderItem={({item})=>(
                    <ContactListitem user={item}/>
                )}
                keyExtractor={(item)=> item.id}
                showsVerticalScrollIndicator={false}
                />
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

export default Contacts;

