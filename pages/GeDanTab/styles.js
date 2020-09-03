
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    ScrollView:{
        width:'100%',
        padding:15,
        marginBottom:50,
        backgroundColor:'#fafafa'
    },
    categoryGroupName:{
        color:"#000",
        fontSize:18,
        fontWeight:'bold',
        width:'100%',
        marginBottom:15
    },
    categoryNameCon:{
        flexWrap:'wrap',
        flexDirection:'row',
        width:'100%',
    },
    name_item:{
        paddingLeft:10,
        paddingRight:10,
        width:'25%',
        marginBottom:15
    },
    name_item_box:{
        backgroundColor:"#ffffff",
        height:30,
        borderRadius:15
    },
    name_item_Text:{
        lineHeight:30,
        textAlign:'center',
        color:"#191919"
    }
    
})

export default styles