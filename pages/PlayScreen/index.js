

import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import styles from './style'
import { reqGetLyric } from '../../api'
import Lyric from 'lyric-parser'
class PlayScreen extends React.Component {

    state = {
        cSong: {},
        currentLyric: null,
        currentLineNum: 0
    }

    componentDidMount = () => {
        // console.log
    }

    componentDidUpdate = () => {
        const { currentSong, isPlay,musictime } = this.props
        const { cSong } = this.state

        if (currentSong.songmid && currentSong && currentSong.songmid !== cSong.songmid) {  //新歌
            this.setState({
                cSong: currentSong
            })
            reqGetLyric({ songmid: currentSong.songmid }).then(res => {
                if (res.response.code === 0) {
                    const lyric = new Lyric(res.response.lyric, this.handleLyric)

                    this.setState({
                        currentLyric: lyric
                    })

                    let { currentLyric } = this.state
                    currentLyric.play()
                    if (isPlay) {
                        // 这个时候有可能用户已经播放了歌曲，要切到对应位置
                        currentLyric.seek(musictime.currentTime * 1000)
                    }
                } else {
                    console.log('获取歌词失败')
                }
            })
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
        const { currentLineNum,currentLyric } = this.state
        return (
            <View style={styles.container}>
                <View>
                    <View>
                        <Text>{currentSong.title ? currentSong.title : ''}</Text>
                        <Text>{currentSong.singer ? currentSong.singer[0].name : ''}</Text>
                    </View>
                    <View>
                        <ScrollView style={{ height: 500 }} ref="lyricList">
                            {
                                currentLyric && currentLyric.lines ? currentLyric.lines.map((line, index) => (
                                    <Text ref="lyricLine" key={index} style={ { color:currentLineNum === index ? 'red' :'#000' } }>{line.txt}</Text>
                                )) : null
                            }
                        </ScrollView>
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