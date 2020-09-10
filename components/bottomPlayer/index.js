
import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, TouchableHighlight,TouchableOpacity, ScrollView, Dimensions, DeviceEventEmitter } from 'react-native'
import { Modal, Toast } from '@ant-design/react-native'
import styles from './styles'
import * as Progress from 'react-native-progress'
import { playing, stopPlay, resetPlaylist, setIndex, setCurrentSongs, setCurrentSong } from '../../redux/actions'
import PlayList from '../playList'
const { width } = Dimensions.get('window')
class BottomPlayer extends React.Component {

    state = {
        visible: false,
        musictime: {
            currentTime: 0,
            duration: 0
        }
    }
    onPress = () => {
        this.props.navigation.navigate("Play")
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    }
    togglePlay = () => {
        const { currentSong, isPlay } = this.props
        if (currentSong.songmid) {
            if (isPlay) { //播放中
                this.props.stopPlay()
                console.log("____________暂停")
            } else {  //暂停播放
                console.log("____________播放")
                this.props.playing()
            }
        } else {
            Toast.info("暂无播放歌曲")
        }
    }

    delThisSong = (item, index) => {
        const { currentIndex, playList } = this.props
        if (this.clickTime) {
            clearTimeout(this.clickTime)
        }

        this.clickTime = setTimeout(() => {
            if (playList.length !== 1) {
                if (currentIndex === index) {
                    console.log("正在播放的歌曲")
                    playList.splice(index, 1)
                    this.props.resetPlaylist(playList)
                    this.props.setCurrentSongs(playList[index])
                } else {
                    playList.splice(index, 1)
                    this.props.resetPlaylist(playList)
                    if (currentIndex < index) {
                        this.props.setIndex(index - 1)
                    }
                }
            } else {
                this.props.setIndex(-1)
                this.props.resetPlaylist([])
                this.props.setCurrentSong({})
            }
        }, 500)
    }

    componentDidMount = () => {
        // this.listener = DeviceEventEmitter.addListener('musicTime', (message) => {
        //     //收到监听后想做的事情
        //     console.log(message);  //监听
        //     const { currentTime,duration } = message
        //     this.setState({
        //         musictime:{
        //             currentTime,
        //             duration
        //         }
        //     })
        // })
    }
    componentWillUnmount() {
        //移除监听
        if (this.listener) {
            this.listener.remove();
        }
    }
    render() {

        const { currentSong, playList, isPlay, musictime } = this.props
        // const { musictime } = this.state
        // console.log(musictime)
        return (
            <View style={styles.container}>
                <Progress.Bar style={{ marginLeft: 5 }} progress={musictime.currentTime && musictime.duration ? musictime.currentTime / musictime.duration : 0} width={width - 10} height={1} borderColor="transparent" color="#fe4c3d" unfilledColor="gray" />
                <View style={styles.container_box}>
                    <TouchableHighlight onPress={ () => this.props.navigation.navigate("Play") } style={ styles.touchLeft } underlayColor="transparent">
                        <View style={styles.left}>
                            <View style={styles.coverView}>
                                <Image source={{ uri: currentSong.cover }} style={styles.cover} />
                            </View>
                            <View>
                                <Text style={styles.title}>{currentSong.title}</Text>
                                <Text style={styles.singer}>{currentSong.singer ? currentSong.singer[0].name : ''}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>

                    <View style={styles.right}>
                        <TouchableHighlight onPress={() => this.togglePlay()} underlayColor="transparent">
                            <Image source={isPlay ? require('./images/zanting.png') : require('./images/bofang.png')} style={styles.playImg} />
                        </TouchableHighlight>
                        <TouchableOpacity onPress={() => this.setState({ visible: true })}>
                            <Image source={require('./images/menu.png')} style={styles.menu_img} />
                        </TouchableOpacity>
                    </View>
                </View>
                


                <PlayList onClose={ this.onClose } visible={ this.state.visible }/>
                {/* <Modal
                    title="播放列表"
                    transparent
                    onClose={this.onClose}
                    maskClosable
                    visible={this.state.visible}
                >
                    
                </Modal> */}
            </View>

        )
    }
}

export default connect(
    state => ({
        currentSong: state.currentSong,
        playList: state.playList,
        isPlay: state.isPlay,
        musictime: state.musictime,
        currentIndex: state.currentIndex
    }),
    { playing, stopPlay, resetPlaylist, setIndex, setCurrentSongs, setCurrentSong }
)(BottomPlayer)