
import { StyleSheet } from 'react-native'

var styles = StyleSheet.create({
    backgroundImg: {
        width: "100%",
        height: "100%",
        position:"absolute",
        left:0,
        top:0,
        zIndex:1
    },
    mask:{
        width: "100%",
        height: "100%",
        position:"absolute",
        left:0,
        top:0,
        zIndex:1,
        backgroundColor:"#000",
        opacity:0.5
    },
    viewStyle: {
        backgroundColor: "black",
        flex: 1
    },
    swiper:{
        zIndex:2,
        position:'absolute'
    },
    mvVideo:{
        position:"absolute",
        zIndex:2,
        width: "100%",
        height: "100%",
        left:0,
        top:0,
    },
    bottomInfo:{
        position:"absolute",
        zIndex:3,
        bottom:10,
        flexDirection:"row",
        padding:20
    },
    bottomInfo_Title:{
        color:"#fff",
        fontSize:14
    },
    bottomInfo_singer:{
        color:"#999",
        fontSize:13
    }
})

export default styles