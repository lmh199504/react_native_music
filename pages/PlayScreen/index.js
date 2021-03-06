

import React from 'react'
import {
    View, Text, ScrollView, StatusBar, Image, Animated, Easing, TouchableHighlight, findNodeHandle,
    UIManager, Dimensions, TouchableOpacity
} from 'react-native'

import { connect } from 'react-redux'
import * as Progress from 'react-native-progress'
import styles from './style'
import { reqGetLyric, reqDelLoveSong, reqAddLoveSong } from '../../api'
import Lyric from 'lyric-parser'
import { BlurView } from "@react-native-community/blur";
import Swiper from 'react-native-swiper'
import { formatSongTime, isLoveSong, downFile } from '../../utils'
import { playing, stopPlay, setCurrentSongs, setIndex, setLoveLists } from '../../redux/actions'
import PlayList from '../../components/playList'
import { Toast } from '@ant-design/react-native'


const { width } = Dimensions.get('window')

class PlayScreen extends React.Component {

    state = {
        cSong: {},
        currentLyric: null,
        currentLineNum: 0,
        rotateValue: new Animated.Value(0),
        visible: false
    }

    componentDidMount = () => {
        this.state.rotateValue.setValue(0);
        const { currentSong, isPlay, musictime } = this.props
        if (currentSong.songmid && !isPlay) {
            reqGetLyric({ songmid: currentSong.songmid }).then(res => {
                if (res.response.code === 0) {
                    const lyric = new Lyric(res.response.lyric, this.handleLyric)
                    lyric.seek(musictime.currentTime * 1000 + 4000)
                    lyric.stop()
                } else {
                    console.log('获取歌词失败')
                }
            })
        }
    }




    componentDidUpdate = () => {
        const { currentSong, isPlay, musictime } = this.props
        const { cSong, currentLyric } = this.state
        if (currentSong.songmid && currentSong && currentSong.songmid !== cSong.songmid) {  //新歌
            this.setState({
                cSong: currentSong
            })

            if (currentLyric) {
                currentLyric.stop()
                this.setState({
                    currentLyric: null,
                    currentLineNum: 0
                })
            }


            this.loop()
            reqGetLyric({ songmid: currentSong.songmid }).then(res => {
                if (res.response.code === 0) {
                    const lyric = new Lyric(res.response.lyric, this.handleLyric)

                    this.setState({
                        currentLyric: lyric
                    })

                    // let { currentLyric } = this.state
                    lyric.play()
                    if (isPlay || musictime.currentTime) {
                        // 这个时候有可能用户已经播放了歌曲，要切到对应位置
                        lyric.seek(musictime.currentTime * 1000 + 4000)  //好像有点延迟
                    }
                } else {
                    console.log('获取歌词失败')
                }
            })
        }
    }

    AnimatedStop = () => {
        this.state.rotateValue.stopAnimation()
    }

    loop = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.loop(
            Animated.timing(this.state.rotateValue, {
                toValue: 360,
                duration: 10000,
                useNativeDriver: true,
                isInteraction: false,
                easing: Easing.linear
            })
        ).start()

    }

    toggleLyric = () => {
        const { isPlay } = this.props
        const { showLyric } = this.state
        this.setState({ showLyric: !showLyric })

        if (isPlay) {
            this.loop()
        }
    }

    handleLyric = async ({
        lineNum,
        txt
    }) => {


        if (!this.refs.lyricLine0) {
            return
        }


        this.setState({
            currentLineNum: lineNum
        })

        if (lineNum > 5) {
            var scrollY = 0
            for (let i = 0; i < lineNum - 5; i++) {

                try {
                    var height = await this.getHeight(this.refs['lyricLine' + i])
                    scrollY += height
                } catch (error) {

                }

            }
            this.refs.lyricList.scrollTo({ x: 0, y: scrollY })
        } else {

            this.refs.lyricList.scrollTo({ x: 0, y: 0 })
        }



    }
    //SWIPER 切换的时候
    _onIndexChanged = (index) => {
        const { currentLyric } = this.state
        const { musictime } = this.props
        if (index === 1 && currentLyric) {
            currentLyric.seek(musictime.currentTime * 1000)
        }
    }

    getHeight = (ref) => {
        return new Promise((resolve, reject) => {
            try {
                const handle = findNodeHandle(ref);
                UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                    resolve(height)
                })
            } catch (error) {
                reject(error)
            }
        })
    }


    togglePlay = () => {
        const { isPlay, currentSong } = this.props
        if (currentSong.songmid) {
            if (isPlay) {
                this.props.stopPlay()
                this.AnimatedStop()
            } else {

                this.props.playing()
                this.loop()
            }
        }
    }

    onPlayNext = () => {
        const { playList, currentIndex } = this.props

        if (playList.length === 0) {
            return false
        }

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            if (currentIndex < playList.length - 1) {
                this.props.setIndex(currentIndex + 1)
                this.props.setCurrentSongs(playList[currentIndex + 1])
            } else {
                this.props.setIndex(0)
                this.props.setCurrentSongs(playList[0])
            }
        }, 500)
    }

    onPlayPre = () => {
        const { playList, currentIndex } = this.props


        if (playList.length === 0) {
            return false
        }

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            if (currentIndex === 0) {
                this.props.setIndex(playList.length - 1)
                this.props.setCurrentSongs(playList[playList.length - 1])
            } else {
                this.props.setIndex(currentIndex - 1)
                this.props.setCurrentSongs(playList[currentIndex - 1])
            }
        }, 500)


    }
    onClose = () => {
        this.setState({
            visible: false
        })
    }

    toSingerDetail = () => {
        const { currentSong } = this.props

        this.props.navigation.navigate('singerDetails', {
            singermid: currentSong.singer[0].mid,
        })
    }

    //喜欢
    addLoveSong = () => {
        const { currentSong, user } = this.props
        let songList = []
        songList.push(currentSong)
        reqAddLoveSong({ userId: user._id, songList }).then(() => {
            Toast.info("收藏成功")
            this.props.setLoveLists()
        })
    }
    //删除喜欢
    delLoveSong = () => {

        const { currentSong, user } = this.props
        let songList = []
        songList.push(currentSong)
        reqDelLoveSong({ userId: user._id, delList: songList }).then(() => {
            this.props.setLoveLists()
        })
    }
    //歌曲收藏
    toggleLove = () => {
        const { currentSong, loveList } = this.props
        if (isLoveSong(currentSong, loveList)) {
            this.delLoveSong()
        } else {
            this.addLoveSong()
        }

    }


    downMusic = () => {
        const { currentSong } = this.props
		downFile(currentSong.src,currentSong.title)
    }
    render() {
        const { currentSong, musictime, isPlay, loveList } = this.props
        const { currentLineNum, currentLyric, rotateValue } = this.state
        const swiperOption = {
            loop: true,
            autoplay: false,
            showsButtons: false,
            showsPagination: true,
            activeDot: <Dot />
        }

        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent={true}></StatusBar>
                <View style={styles.absolute}>
                    <View style={styles.player_bg}>
                        <Image

                            source={{ uri: currentSong.cover }}
                            style={styles.player_bg_Img}
                        />
                    </View>
                    <View style={styles.player_mask}></View>

                    <BlurView
                        blurType="light"
                        blurAmount={20}
                        reducedTransparencyFallbackColor="#fff"
                        style={styles.absolute}
                    />
                </View>

                <View style={styles.mian_content}>
                    <View style={styles.topTitle}>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Image source={require('./images/goback.png')} style={styles.goBack} />
                                </View>
                                <View style={styles.muiscInfo}>
                                    <Text style={styles.songname}>{currentSong.title ? currentSong.title : ''}</Text>
                                    <TouchableOpacity onPress={() => this.toSingerDetail()}>
                                        <Text style={styles.singerName}>{currentSong.singer ? currentSong.singer[0].name : ''}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>


                    </View>



                    <View style={styles.center_content}>
                        <Swiper {...swiperOption} style={styles.Swiper} onIndexChanged={(index) => this._onIndexChanged(index)}>
                            <View style={styles.swiperImg}>
                                <View style={styles.rorateImgView}>
                                    <Animated.View style={[styles.rorateImg,
                                    {
                                        transform: [{
                                            rotate: rotateValue
                                                .interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] })
                                        }]
                                    }

                                    ]}>
                                        {currentSong.cover ? <Image source={{ uri: currentSong.cover }} style={[styles.rorateImg]}></Image> : null}
                                    </Animated.View>
                                </View>
                                <View style={styles.menu_btn}>
                                    <TouchableOpacity onPress={() => this.toggleLove()}>
                                        <View>
                                            <Image style={styles.menu_btn_Image} source={isLoveSong(currentSong, loveList) ? require('./images/like_active.png') : require('./images/like.png')} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={ () => this.downMusic() }>
                                        <View>
                                            <Image style={styles.menu_btn_Image} source={require('./images/down.png')} />
                                        </View>
                                    </TouchableOpacity>

                                    <View>
                                        <Image style={styles.menu_btn_Image} source={require('./images/chang.png')} />
                                    </View>
                                    <View>
                                        <Image style={styles.menu_btn_Image} source={require('./images/comment.png')} />
                                    </View>
                                    <View>
                                        <Image style={styles.menu_btn_Image} source={require('./images/more.png')} />
                                    </View>
                                </View>
                            </View>
                            <View>
                                <ScrollView style={{ height: '92%' }} ref='lyricList'>
                                    {
                                        currentLyric && currentLyric.lines ? currentLyric.lines.map((line, index) => (
                                            <Text ref={"lyricLine" + index} key={index} style={
                                                [
                                                    styles.lyricText,
                                                    currentLineNum === index ? styles.lyricText_active : '',
                                                    index === 0 ? styles.lyricText_first : ''
                                                ]
                                            }>{line.txt}</Text>
                                        )) : null
                                    }
                                    <View style={styles.none}></View>
                                </ScrollView>
                            </View>
                        </Swiper>
                    </View>


                    <View style={styles.foot_content}>
                        <View style={styles.progress}>
                            <Text style={styles.currentTime}>{formatSongTime(musictime.currentTime)}</Text>
                            <View style={styles.progressBar}>
                                <Progress.Bar style={{ marginLeft: 5 }}
                                    progress={musictime.currentTime && musictime.duration ? musictime.currentTime / musictime.duration : 0}
                                    width={width - 120} height={1}
                                    borderColor="transparent"
                                    color="#fff"
                                    unfilledColor="gray"
                                />
                            </View>
                            <Text style={styles.duration}>{formatSongTime(musictime.duration)}</Text>
                        </View>

                        <View style={styles.playMenu}>
                            <TouchableOpacity>
                                <Image style={styles.playMenu_item} source={require('./images/xindong.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onPlayPre()}>
                                <Image style={styles.playMenu_item} source={require('./images/pre_song.png')} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.togglePlay()}>
                                <Image style={styles.playMenu_item_play} source={isPlay ? require('./images/stop.png') : require('./images/play.png')} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.onPlayNext()}>
                                <Image style={styles.playMenu_item} source={require('./images/next_song.png')} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.setState({ visible: true })}>
                                <Image style={styles.playMenu_item} source={require('./images/menu.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>



                <PlayList visible={this.state.visible} onClose={this.onClose} />

            </View>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
        currentSong: state.currentSong,
        musictime: state.musictime,
        musictime: state.musictime,
        isPlay: state.isPlay,
        playList: state.playList,
        currentIndex: state.currentIndex,
        loveList: state.loveList
    }),
    { playing, stopPlay, setCurrentSongs, setIndex, setLoveLists }
)(PlayScreen)


function Dot() {
    return (
        <View style={{ width: 15, height: 8, backgroundColor: '#fff', borderRadius: 4, marginLeft: 15, marginRight: 15 }}></View>
    )
}