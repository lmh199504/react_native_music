
import { StyleSheet, Dimensions } from 'react-native'
const { height, width } = Dimensions.get("window")


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#292a2b"
    },
    mian_content: {
        flex: 1,
        padding: 15
    },
    player_bg: {
        width: "100%",
        height: "100%",
        // backgroundColor: "red",
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
    rorateImg: {
        width: 200,
        height: 200,
        borderRadius: 100
    },
    topTitle: {
        height: 60,
    },
    center_content: {
        marginTop: 30,
        height: height - 200,
        backgroundColor: "red"
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
        color:'#868b8d'
    }
})

export default styles

//#868b8d