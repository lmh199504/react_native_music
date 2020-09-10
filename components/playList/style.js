
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
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