import {StyleSheet} from 'react-native'
import Colors from '../../constants/color'

const styles = StyleSheet.create({
    container:{
        padding:10
    },
    messageBox:{
        borderRadius:5,
        padding:10
    },
    name:{
        color:Colors.light.tint,
        fontWeight:'bold',
        marginBottom:5
    },
    message:{
        
    },
    time:{
        // width:'100%',
        // textAlign:'right',
        marginTop:5,
        color:'grey',
        fontSize:13,
        alignSelf:'flex-end'
    }
})

export default styles;