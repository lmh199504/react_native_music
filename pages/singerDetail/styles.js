
import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        height:'100%',
        width:'100%',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        overflow:"hidden",
        position:"absolute",
        zIndex:1
    },
    mask:{
        position:"absolute",
        zIndex:1,
        width:'100%',
        height:'100%',
        backgroundColor:"#000",
        opacity:0.2
    },
    imgContainer:{
        height:320,
        width:"100%",
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
        overflow:"hidden",
        position:'relative',
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
    infoContainer:{
        position:"absolute",
        bottom:0,
        padding:15,
        zIndex:3
    },
    bigSingerName:{
        color:"#fff",
        fontWeight:'bold',
        fontSize:25
    },
    fanNum:{
        fontSize:14,
        color:'#f5f5f5',
        marginRight:15,
        marginTop:15
    },
    flexDirection:{
        flexDirection:'row'
    },
    vImg:{
        width:25,
        height:25
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    btn_img:{
        width:30,
        height:30
    },
    ruzhuName:{
        color:"#fff"
    }
})

export default styles
