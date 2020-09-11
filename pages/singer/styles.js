
import { StyleSheet,Dimensions } from 'react-native'
var {height,width} =  Dimensions.get('window');


const styles = StyleSheet.create({
    ScrollView:{
        width:'100%',
        padding:15,
        marginBottom:50
    },
    tabScrollView:{
        marginBottom:10
    },
    tabItem:{
        width:40,
        height:20,
        marginRight:15,
        borderRadius:5,
    },
    tabItemActive:{
        backgroundColor:'#f73c40'
    },
    tabName:{
        textAlign:'center',
        color:"#000"
    },
    tabNameActive:{
        color:'#fff'
    },
    singerCon:{
        flexDirection:'row',
        flexWrap:'wrap',
        width:"100%"
    },
    singerItem:{
        width:'25%',
        marginBottom:15
    },
    singerItem_ImgCon:{
        width:"100%",
        padding:20
    },
    singerItem_Img:{
        height:80,
        borderRadius:40,
        width:80
    },
    singerItem_name:{
        textAlign:"center"
    }
})

export default styles