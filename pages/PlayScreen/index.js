

import React from 'react'
import { View, Text, ScrollView, StatusBar, Image, Animated, Easing, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import styles from './style'
import { reqGetLyric } from '../../api'
import Lyric from 'lyric-parser'
import { BlurView } from "@react-native-community/blur";


class PlayScreen extends React.Component {

    state = {
        cSong: {},
        currentLyric: null,
        currentLineNum: 0,
        rotateValue: new Animated.Value(0),
        showLyric: false
    }

    componentDidMount = () => {

        this.state.rotateValue.setValue(0);

        // setTimeout(() => {
        //     this.AnimatedStop()
        // },5000)

        // setTimeout(() => {
        //     this.loop()
        // },6000)
    }
    componentDidUpdate = () => {
        const { currentSong, isPlay, musictime } = this.props
        const { cSong, currentLyric, showLyric } = this.state

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
                    if (isPlay) {
                        // 这个时候有可能用户已经播放了歌曲，要切到对应位置
                        lyric.seek(musictime.currentTime * 1000)
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
                toValue: -360,
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
        this.setState({showLyric:!showLyric})

        if(isPlay){
            this.loop()
        }
    }

    handleLyric = ({
        lineNum,
        txt
    }) => {


        if (!this.refs.lyricLine) {
            return
        }
        this.setState({
            currentLineNum: lineNum
        })

        if (lineNum > 2) {

            // let lineEl = document.getElementsByClassName('songLyricline')[lineNum-2 ]
            // lineEl.scrollIntoView({block:"start",behavior:'smooth'})



        } else {

            // let lineEl = document.getElementsByClassName('songLyricline')[0]
            // lineEl.scrollIntoView({behavior:'smooth'})
        }

    }



    render() {
        const { currentSong } = this.props
        const { currentLineNum, currentLyric, rotateValue, showLyric } = this.state
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor='transparent' />

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
                        <View>
                            <TouchableHighlight onPress={() => { this.props.navigation.goBack() }}>
                                <Image source={require('./images/goback.png')} style={styles.goBack} />
                            </TouchableHighlight>
                        </View>
                        <View style={styles.muiscInfo}>
                            <Text style={styles.songname}>{currentSong.title ? currentSong.title : ''}</Text>
                            <Text style={styles.singerName}>{currentSong.singer ? currentSong.singer[0].name : ''}</Text>
                        </View>
                    </View>


                    <TouchableHighlight onPress={ () => this.toggleLyric() }>
                        <View style={styles.center_content}>


                            {
                                !showLyric ? <Animated.View style={[styles.rorateImg,
                                {
                                    transform: [{
                                        rotate: rotateValue
                                            .interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] })
                                    }]
                                }

                                ]}>
                                    {currentSong.cover ? <Image source={{ uri: currentSong.cover }} style={[styles.rorateImg]}></Image> : null}
                                </Animated.View>
                                    :
                                    <ScrollView style={{ height: '100%' }} ref="lyricList">
                                        {
                                            currentLyric && currentLyric.lines ? currentLyric.lines.map((line, index) => (
                                                <Text ref="lyricLine" key={index} style={{ color: currentLineNum === index ? 'red' : '#000' }}>{line.txt}</Text>
                                            )) : null
                                        }
                                    </ScrollView>
                            }



                        </View>
                    </TouchableHighlight>

                    <View style={styles.foot_content}>

                    </View>
                </View>
            </View>
        )
    }
}

export default connect(
    state => ({
        currentSong: state.currentSong,
        musictime: state.musictime,
        musictime: state.musictime,
        isPlay: state.isPlay
    }),
    {}
)(PlayScreen) 