
import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
    flex: {
        // flex:1
        width:"100%"
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        // height:200
        width:"100%"
    },
    item: {
        width: "33.3%",
        padding: 5
    },
    coverImg: {
        borderRadius: 5,
        width: "100%"
    },
    singer: {
        color: "#999",
        fontSize: 12
    },
    playAll: {
        width: 80,
        backgroundColor: "red",
        paddingLeft: 10,
        paddingRight: 10,
        height: 30,
        borderRadius: 15,
        marginTop:10,
        marginBottom:10,
        marginLeft:10
    }
})

export default styles