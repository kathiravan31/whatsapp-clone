import React from 'react'
import {View,Text,Image} from 'react-native'

import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../../screens/ChatScreen';
import Colors from '../../constants/color'

import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import TopTabNav from '../TopTabNav';
import ChatRoom from '../../screens/ChatRoom';

import AntDesign from 'react-native-vector-icons/AntDesign'
import {IconButton} from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Contacts from '../../screens/Contacts';



const Stack =createStackNavigator();

const HomeStack = () =>{
    return(
        <Stack.Navigator
        screenOptions={{
            headerStyle:{
                backgroundColor:Colors.light.tint,
                shadowOpacity:0,
                elevation:0,
            },
            headerTintColor:Colors.light.background,
            headerTitleAlign:'left',
            headerTitleStyle:{
                fontWeight:'bold'
            }
        }}
        >
            <Stack.Screen name='Home' component={TopTabNav}
            options={{
                title:'WhatsApp',
                headerRight:() => (
                    <View style={{flexDirection:'row',width:60,justifyContent:'space-between',marginRight:10}}>
                        <Octicons name="search" size={22} color={'white'}/>
                        <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'}/>
                    </View>
                )
            }}
            />

        <Stack.Screen name='ChatRoom' component={ChatRoom}
            options={({route}) => ({
                title:'',

                headerLeft:(props)=>(
                    <View style={{flexDirection:'row',paddingLeft:10,alignItems:'center',justifyContent:'space-between'}}>
                        <AntDesign {...props} name="arrowleft" size={20} color={Colors.light.background}/>

                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image style={{height:40,width:40,borderRadius:50,marginLeft:10}} source={{uri:`${route.params.image}`}}/>

                            <Text style={{marginLeft:10,color:Colors.light.background,fontWeight:'bold'}}>{route.params.name}</Text>
                        </View>


                        
                        {/* <IconButton
                            icon="camera"
                            color={'white'}
                            size={20}
                            onPress={() => console.log('Pressed')}
                        /> */}
                    </View>

                ),
                headerRight:()=>(
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:100,alignItems:'center'}}>
                        <FontAwesome5 name="video" size={18} color={Colors.light.background}/>
                        <MaterialIcons name="call" size={20} color={Colors.light.background}/>
                        <MaterialCommunityIcons name="dots-vertical" size={22} color={Colors.light.background}/>
                        
                    </View>
                )
            })}
            />

            <Stack.Screen name="Contacts" component={Contacts}/>
        </Stack.Navigator>
    )
}

export default HomeStack;