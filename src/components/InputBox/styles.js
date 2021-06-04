import {StyleSheet} from 'react-native'
import Colors from '../../constants/color'

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        margin:0,
        alignItems:'center',
        width:'100%',
        justifyContent:'space-between',
        paddingRight:10
    },
    mainContainer:{
        flexDirection:'row',
        backgroundColor:'white',
        padding:0,
        paddingRight:8,
        paddingLeft:8,
        margin:10,
        marginTop:5,
        borderRadius:25,
        // height:50,
        flex:1,
        justifyContent:'space-between',
        alignItems:'center'
    },
    buttonContainer:{
        backgroundColor:Colors.light.tint,
        borderRadius:50,
        width:50,
        height:50,
        alignItems:'center',
        justifyContent:'center'
    },
    InputBox:{
        // width:150
        flex:1
    },
    icon:{
        marginHorizontal:5
    }
})

export default styles;