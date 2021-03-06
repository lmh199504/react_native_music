
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    ScrollView:{
        // width:'100%',
        flex:1,
        padding:15,
        marginBottom:10 
    },
    container:{
        flexDirection:"row",
        flexWrap:"wrap",
        width:'100%',
        // justifyContent:''
    },
    genDan_item:{
        width:'30%',
        marginBottom:15,
        marginRight:'3.3%'
    },
    coverImg:{
        width:'100%',
        borderRadius:10
    },
    genDanTitle:{
        marginTop:10
    },
    listen_num:{
        color:"#999",
        fontSize:12
    },
    noMoreData:{
        textAlign:'center'
    }
})

export default styles