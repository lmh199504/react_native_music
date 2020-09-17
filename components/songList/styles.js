
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container:{
        padding:15,
    },
    songItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:15
    },
    songIndex:{
        color:"#b3b3b3",
        // marginRight:30,
        width:40
    },
    songIndex_Text:{
        color:"#b3b3b3",
        marginTop:10
    },
    songItem_left:{
        flexDirection:'row'
    },
    songItem_right:{
        flexDirection:'row'
    },
    right_playImg:{
        width:20,
        height:20
    },
    moreImg:{
        marginRight:5,
        height:20,
        width:20,
        marginLeft:20
    },
    songsItem_singer:{
        fontSize:12,
        color:"#b3b3b3",
    },
})

export default styles