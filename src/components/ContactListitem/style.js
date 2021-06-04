import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        padding:10
    },
    leftContainer:{
        flexDirection:'row',
        width:'100%',
        // backgroundColor:'red'
        
    },
    Avatar:{
        height:60,
        width:60,
        borderRadius:50,
        marginRight:10
    },
    midContainer:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'center'
    },
    username:{
        fontWeight:'bold',
        fontSize:16
    },
    status:{
        fontSize:16,
        color:'grey',
        width:200
    },
    time:{
        fontSize:13,
        color:'grey',
        position:'absolute',right:0,

    }

})

export default styles;