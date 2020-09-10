
import { StyleSheet, Dimensions } from 'react-native'
const { height, width } = Dimensions.get("window")


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#292a2b",
        height:null,
        width:null
    },
    mian_content: {
        flex: 1,
        padding: 15
    },
    player_bg: {
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: -2
    },
    player_bg_Img: {
        position: 'absolute',
        width: "100%",
        height: '100%',
        zIndex: -2,
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1
    },
    player_mask: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: ' 100%',
        height: '100%',
        zIndex: 0,
        backgroundColor: "#000",
        opacity: 0.3
    },
    rorateImgView:{
        width:200,
        height:200,
        position:'relative',
        left:'50%',
        top:"20%",
        marginLeft:-100
    },
    rorateImg: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    topTitle: {
        height: 60,
    },
    center_content: {
        marginTop: 40,
        height: height - 250,
        // backgroundColor: "red"
    },
    foot_content: {
        height: 60
    },
    topTitle: {
        flexDirection: 'row'
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
    Swiper:{
        // backgroundColor:"black"
    },
    swiperImg:{
        position:"relative",
        height:"100%"
    },
    menu_btn:{
        height:25,
        width:"100%",
        // backgroundColor:"red",
        position:"absolute",
        bottom:20,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:40,
        paddingRight:40
    },
    lyricText:{
        padding:10,
        textAlign:'center',
        color:"#CDC5BF"
    },
    lyricText_active:{
        color:"#fff",
        fontSize:18
    },
    lyricText_first:{
        marginTop:15,
    },
    none:{
        height:160
    },
    menu_btn_Image:{
        width:25,
        height:25
    },
    progress:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    currentTime:{
        width:50,
        textAlign:'center',
        color:"#fff"
    },
    duration:{
        width:50,
        color:"#fff",
        textAlign:'center',
    },
    progressBar:{
        marginTop:8
    },
    playMenu:{
        flexDirection:"row",
        justifyContent:'space-between',
        paddingLeft:40,
        paddingRight:40,
        position:'absolute',
        bottom:-20,
        width:'100%'
    },
    playMenu_item:{
        width:25,
        height:25,
        marginTop:8
    },
    playMenu_item_play:{
        width:40,
        height:40,
    }
})

export default styles
