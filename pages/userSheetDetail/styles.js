
import { StyleSheet,Dimensions } from 'react-native'
const { width } =  Dimensions.get('window')

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    ScrollView:{
        flex:1,
        // backgroundColor:"black"
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
        paddingTop:40,
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
        height:350
    },
    topInfo:{
        marginTop:60,
        padding:20,
        flexDirection:'row',
        overflow:'hidden'
    },
    logo:{
        width:150,
        height:150,
        borderRadius:10
    },
    leftLogo:{
        marginRight:20
    },
    dissname:{
        color:"#fff",
        fontSize:18,
        fontWeight:'bold',
        overflow:"hidden"
    },
    top_mask:{
        backgroundColor:'rgba(0,0,0,0.5)',
        position:'absolute',
        top:0,
        left:0,
        zIndex:-2,
        width:'100%',
        height:"100%"
    },
    right_Info:{
        width:width - 30 - 150 - 15
    },
    headurl:{
        width:20,
        height:20,
        borderRadius:10
    },
    userInfo:{
        marginTop:15,
        flexDirection:'row'
    },
    nickname:{
        color:"#dde5d9",
        marginLeft:10
    },
    desc:{
        color:"#dde5d9",
        marginTop:15
    },
    playIcon:{
        width:30,
        height:30, 
        marginRight:10
    },
    playMenuCon:{
        width:'100%',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor:"#fff",
        overflow:"hidden",
        height:50,
        marginTop:-50,
        padding:10,
        flexDirection:"row",
        justifyContent:"space-between"
       
    },
    left_play:{
        flexDirection:'row'
    },
    playAll_Text:{
        lineHeight:30
    },
    songNum:{
        color:"#999",
        fontSize:12,
        lineHeight:31
    },
    addImage:{
        width:14,
        height:14,
        marginTop:6,
        marginRight:5
    },
    right_add:{
        flexDirection:'row',
        backgroundColor:"red",
        height:30,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:15
    },
    right_add_Text:{
        fontSize:12,
        color:"#fff",
        lineHeight:30
    }
})

export default styles;