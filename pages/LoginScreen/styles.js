

import { StyleSheet,Dimensions } from 'react-native'



const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
    },
    bgImg:{
        width:"100%",
        height:"100%",
        position:"absolute"
    },
    login_box:{
        marginTop:'40%',
        padding:60
    },
    TextInput:{
        color:"#fff",
        marginBottom:10,
        // backgroundColor:"#f4f4f8",
        borderRadius:50,
        borderWidth:1,
        borderStyle:"solid",
        paddingLeft:30,
        borderColor:"#f4f4f8"
    },
    loginBtn:{
        backgroundColor:'#2ec17d',
        height:40,
        borderRadius:20,
        marginBottom:15
    },
    loginText:{
        textAlign:"center",
        lineHeight:40,
        color:"#fff",
        letterSpacing:20,
        fontSize:18
    },
    registerBtn:{
        backgroundColor:'#fff',
        height:40,
        borderRadius:20,
        marginBottom:15
    },
    registerText:{
        textAlign:"center",
        lineHeight:40,
        // color:"#fff",
        letterSpacing:20,
        fontSize:18
    }
    
})

export default styles