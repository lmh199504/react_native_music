
import { StyleSheet,Dimensions } from 'react-native'
var {height,width} =  Dimensions.get('window');
const styles =  StyleSheet.create({
    ScrollView:{
        width:'100%',
        padding:15,
        marginBottom:50
    },
    main_title:{
        flexDirection:"row",
        marginBottom:10,
        justifyContent:"space-between"
    },
    main_title_text:{
        fontSize:18
    },
    more_con:{
        flexDirection:'row',
        marginTop:2
    },
    more:{
        fontSize:14,
        color:'#b3b3b3'
    },
    more_img:{
        width:20,
        height:20,
        marginTop:-1
    },
    rankCon:{
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:'space-between'
    },
    songItem:{
        width:'25%',
        marginBottom:15
    },
    coverImg:{
        width:width/4 - 20,
        height:width/4 - 20,
        borderRadius:10
    },
    title:{
        marginTop:5
    },
    singerName:{
        color:'#999',
        fontSize:12
    }
})

export default styles