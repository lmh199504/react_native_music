
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    ScrollView:{
        flex:1
    },
    ImageBackground:{
        width:"100%",
        height:300
    },
    topBg:{
        position:'absolute',
        zIndex:-2,
        width:'100%'
    },
    absolute:{
        position:'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1
    },
    topNav:{
        position:'absolute',
        top:60,
        left:0,
        width:'100%'
    },
    topTitle: {
        flexDirection: 'row',
        position:'absolute',
        left:0,
        width:'100%',
        zIndex:99,
        paddingLeft:20,
        paddingTop:30,
        // backgroundColor:'red'
    },
    goBack: {
        width: 20,
        height: 18
    },
    muiscInfo: {
        marginLeft: 15

    },
    songname: {
        color: "#fff",
        fontSize: 16
    },
    singerName: {
        color:'#999'
    },

    
    topMsg:{
        width:'100%',
        height:300
    },
    topInfo:{
        marginTop:60,
        padding:20,
        flexDirection:'row'
    },
    logo:{
        width:150,
        height:150,
        borderRadius:10
    }
})

export default styles;