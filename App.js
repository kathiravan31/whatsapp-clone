import React,{useEffect} from 'react'
import HomeStack from './src/router/HomeStack'
import { NavigationContainer } from '@react-navigation/native';
import {StatusBar} from 'react-native'
import Colors from './src/constants/color'
import Amplify,{Auth,graphqlOperation,API} from 'aws-amplify'
import {withAuthenticator} from 'aws-amplify-react-native'
import {getUser} from './src/graphql/queries'
import {createUser} from './src/graphql/mutations'


const randomImages = [
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg',
]


const App = () =>{

  const getRandomImage = () =>{
    return randomImages[Math.floor(Math.random() * randomImages.length)]
  }

  useEffect(()=>{
    const fetchuser = async () =>{
      // get authenticated user

      const userInfo = await Auth.currentAuthenticatedUser({bypassCache:true})
      console.log(userInfo)

      if(userInfo){

      //get user from backend with the user sub from Auth
        const userData =await API.graphql(graphqlOperation(getUser,{
          id:userInfo.attributes.sub
        }))

        if(userData.data.getUser){
          console.log('User is already register')
          return;
        }

        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImage(),
          status:'Hey I am using Whatsapp.',
        }
        
        await API.graphql(
          graphqlOperation(
            createUser,{input:newUser}
          )
        )
        
      // there is no user in DB with the id, then create one
      }
    }

    fetchuser();
  },[])
  return(
    <NavigationContainer>
      <StatusBar barStyle='light' backgroundColor={Colors.light.tint}/>

      <HomeStack/>
    </NavigationContainer>
  )
}

export default withAuthenticator(App);
