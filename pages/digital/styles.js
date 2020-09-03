
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    ScrollView:{
        padding:10
    },
    swiper:{
        height:150,
        marginBottom:15
    },
    top_slider:{
        width:'100%',
        height:150
    },
    top_slider_img:{
        width:"100%",
        height:"100%",
        borderRadius:10
    },
    title:{
        marginBottom:15,
        fontSize:18
    },
    albumCon:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginBottom:15
    },
    albumItem:{
        width:'25%',
        padding:5
    },
    album_Img:{
        width:"100%",
        height:100,
        borderRadius:5
    },
    singer_name:{
        color:'#999',
        fontSize:12
    },
    bottomBtn:{
        flexDirection:'row',
        justifyContent:"space-between"
    },
    money:{
        color:"#999",
        fontSize:12
    },
    btn:{
        borderRadius:2,
        borderColor:"#c9c9c9",
        borderStyle:'solid',
        borderWidth:1,
        padding:2
    },
    btn_text:{
        fontSize:12
    }
})

export default styles