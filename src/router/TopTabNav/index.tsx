import React from 'react'
import {View,Text} from 'react-native'

import Colors from '../../constants/color'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../../screens/ChatScreen';

import Fontisto from 'react-native-vector-icons/Fontisto'

const Tab = createMaterialTopTabNavigator();

const TopTabNav = () =>{
    return(
        <Tab.Navigator
        initialRouteName='Chats'
        tabBarOptions={{
            activeTintColor:Colors.light.background,
            style:{
                backgroundColor: Colors.light.tint
            },
            indicatorStyle:{
                backgroundColor:Colors.light.background,
                height:3
            },
            labelStyle:{
                fontWeight:'bold'
            },
            showIcon:true,

        }}
        >
            <Tab.Screen
            name="Camera"
            component={HomeScreen}
            options={{
                tabBarIcon:({color})=>(
                    <Fontisto name='camera' color={color} size={20}/>
                ),
                tabBarLabel:()=> null,
                
            }}
            

            />
            <Tab.Screen name="Chats" component={HomeScreen} />
            <Tab.Screen name="Status" component={HomeScreen} />
            <Tab.Screen name="Calls" component={HomeScreen} />
        </Tab.Navigator>
    )
}

export default TopTabNav;