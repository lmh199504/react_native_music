

import React from 'react'
import { ScrollView, TouchableOpacity, Image, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { resetPlaylist, setCurrentSongs, setIndex, setCurrentSong } from '../../redux/actions'
import styles from './style'
import { Modal } from '@ant-design/react-native'
import PropTypes from 'prop-types'
class PlayList extends React.Component {

    static propTypes = {
        visible: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired
    }

    state = {
        click: 0
    }

    delThisSong = (item, index) => {
        const { currentIndex, playList } = this.props
        const { click } = this.state
        if (this.clickTime) {
            clearTimeout(this.clickTime)
        }
        this.setState({
            click: click + 1
        })
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


    render() {
        const { playList, currentSong } = this.props
        return (
            <Modal
                title="播放列表"
                transparent
                onClose={this.props.onClose}
                maskClosable
                visible={this.props.visible}
            >
                <ScrollView style={{ height: 350, }}>
                    {
                        playList.map((item, index) => (
                            <View key={index} style={styles.musicItem}>
                                <View style={styles.musicItem_left}>
                                    <Text style={currentSong.songmid === item.songmid ? styles.active_color : styles.musicItem_left_title}>{item.title}</Text>

                                    <Text style={[styles.musicItem_left_singer, currentSong.songmid === item.songmid ? styles.active_color : '']}>{item.singer[0].name}</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.delThisSong(item, index)}>
                                    <Image source={require('./images/close.png')} style={styles.closeImg} />
                                </TouchableOpacity>
                            </View>
                        ))
                    }

                </ScrollView>
            </Modal>

        )
    }
}

export default connect(
    state => ({
        currentSong: state.currentSong,
        playList: state.playList,
        currentIndex: state.currentIndex
    }),
    { setIndex, setCurrentSongs, resetPlaylist, setCurrentSong }
)(PlayList) 
