import React from 'react'
import {
    View, StatusBar, ScrollView,
    Image, TouchableHighlight, Text, TouchableOpacity
} from 'react-native'
import { reqGetUserSheetSong } from '../../api'
import { ActivityIndicator, Toast } from '@ant-design/react-native'
import { BlurView } from '@react-native-community/blur'
import MyImg from '../../components/Image'
import SongList from '../../components/songList'
import styles from './styles'
import Song from '../../utils/Song'
import BottomPlayer from '../../components/bottomPlayer'
import { connect } from 'react-redux'
import { setIndex, setCurrentSongs, resetPlaylist } from '../../redux/actions'
class ClassDetail extends React.Component {

    state = {
        islove: false,
        list: [],
        desc: '',
        tags: [],
        logo: 'https://reactlmh.oss-cn-beijing.aliyuncs.com/heaher/23073179092.jpg',
        headurl: 'https://reactlmh.oss-cn-beijing.aliyuncs.com/heaher/23073179092.jpg',
        visitnum: 0,
        dissname: '',
        loading: false,
        nickname: '',
        disstid: ''
    }

    componentDidMount = () => {
        const { sheetId } = this.props.route.params
        this.setState({
            loading: true,
            sheetId
        })
        reqGetUserSheetSong({ sheetId }).then(res => {
            console.log(res)
            this.setState({
                loading: false,
                desc: res.data.sheetData.desc,
                dissname: res.data.sheetData.name,
                logo: res.data.sheetData.sheetCover,
                list: res.data.songList
            })
        }).catch(() => {
            this.setState({
                loading: false
            })
        })

    }


    playAll = () => {
        const { list } = this.state
        if (list.length !== 0) {
            this.props.setIndex(0)
            this.props.setCurrentSongs(list[0])
            this.props.resetPlaylist(list)
        } else {
            Toast.info('暂无歌曲')
        }
    }



    render() {
        const { list, logo, visitnum, desc, dissname, tags, loading, nickname, disstid, headurl } = this.state
        const statusBarHeight = StatusBar.currentHeight;
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent={true} ></StatusBar>

                <View style={styles.topMsg}>
                    <View style={styles.topBg}>
                        <MyImg uri={logo} style={styles.ImageBackground} />
                    </View>
                    <View style={styles.top_mask}>

                    </View>
                    <BlurView
                        blurType="light"
                        blurAmount={60}
                        reducedTransparencyFallbackColor="#fff"
                        style={styles.absolute}
                    />

                    <View style={styles.topInfo}>
                        <View style={styles.leftLogo}>
                            <MyImg uri={logo} style={styles.logo} />
                        </View>
                        <View style={styles.right_Info}>
                            <Text style={styles.dissname} >
                                {dissname}
                            </Text>
                            <View style={styles.userInfo}>
                                <MyImg uri={headurl} style={styles.headurl} />
                                <Text style={styles.nickname} >{nickname}</Text>
                            </View>
                            <Text style={styles.desc} numberOfLines={5}>
                                {desc}
                            </Text>
                        </View>

                    </View>

                </View>

                <View style={styles.topTitle}>
                    <View>
                        <TouchableHighlight underlayColor="transparent" onPress={() => { this.props.navigation.goBack() }}>
                            <Image source={require('../../assets/images/goback_white.png')} style={styles.goBack} />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.muiscInfo}>
                        <Text style={styles.songname}>歌单</Text>
                    </View>
                </View>

                <View style={styles.playMenuCon} >
                    <TouchableOpacity onPress={() => this.playAll()}>
                        <View style={styles.left_play}>
                            <Image source={require('./images/play.png')} style={styles.playIcon} />
                            <Text style={styles.playAll_Text}>播放全部</Text>
                            <Text style={styles.songNum}>(共{list.length}首)</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.right_add}>
                            <Image source={require('./images/add.png')} style={styles.addImage} />
                            <Text style={styles.right_add_Text}>收藏</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <ScrollView style={styles.ScrollView}>
                    <View style={{ paddingBottom: 60 }}>
                        <SongList songList={list}></SongList>
                    </View>

                </ScrollView>

                <ActivityIndicator
                    animating={loading}
                    text="加载中...."
                    toast />
                <BottomPlayer {...this.props} currentHeight={statusBarHeight} />
            </View>
        )
    }
}

export default connect(
    state => ({}),
    { setIndex, setCurrentSongs, resetPlaylist }
)(ClassDetail)