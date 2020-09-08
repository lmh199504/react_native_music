
import { StyleSheet,Dimensions } from 'react-native'
var {height,width} =  Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        marginBottom: 1,
        position: 'absolute',
        left: 0,
        top: height - 50,
        zIndex: 100,
        backgroundColor: '#fff',
        width: width,
        height: 50,
        borderTopColor:'rgb(240,240,240)',
        borderTopWidth:1,
        borderStyle:'solid'
    },
    container_box:{
        flexDirection:'row',
        width:"100%",
        justifyContent:"space-between"
    },
    left:{
        flexDirection:'row'
    },
    right:{
        flexDirection:'row'
    },
    coverView:{
        width:40,
        height:40,
        overflow:'hidden',
        borderRadius:20,
        marginTop:3,
        marginLeft:10,
        marginRight:5
    },
    cover:{
        width:'100%',
        height:"100%"
    },
    title:{
        fontSize:14.5,
        color:"#000"
    },
    singer:{
        color:'#9b9b9b',
        fontSize:13
    },
    menu_img:{
        width:20,
        height:20,
        marginTop:10,
        marginRight:20
    },
    playImg:{
        width:30,
        height:30,
        marginTop:5,
        marginRight:10
    },
    musicItem_left:{
        flexDirection:'row',
        minWidth:'85%',
        overflow:'hidden',
        // backgroundColor:"black"
    },
    musicItem:{
        flexDirection:"row",
        justifyContent:'space-between',
        marginBottom:15
    },
    musicItem_left_singer:{
        marginLeft:10,
        fontSize:14,
        color:"#999"
    },
    musicItem_left_title:{
        color:'#000'
    },
    closeImg:{
        width:15,
        height:15
    },
    active_color:{
        color:"#ff281d"
    },
    touchLeft:{
        minWidth:'70%'
    }
})

export default styles