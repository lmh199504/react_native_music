

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    ScrollView: {
        width: '100%',
        padding:10,
        flex:1
    },

    areaCon:{
        flexDirection:'row',
        marginBottom:10
    },
    area_title:{
        width:40
    },

    areaItem:{
        width:40,
        borderRadius:5,
        marginRight:10        
    },
    areaItem_active:{
        backgroundColor:"#f73c40",
    },

    areaItem_Text:{
        color:'#000',
        textAlign:"center"
    },
    areaItem_Text_active:{
        color:"#fff"
    },
    container: {
        flexDirection: "row",
        flexWrap: 'wrap'
    },
    item: {
        width: "25%",
        padding: 5
    },
    mvtitle: {
        marginTop: 5
    },
    singer_name: {
        color: "#999",
        fontSize: 12
    },
    listennum: {
        color: "#999",
        fontSize: 12
    },
    coverImg: {
        borderRadius: 5,
        width:"100%"
    },
    
})

export default styles