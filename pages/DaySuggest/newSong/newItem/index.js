

import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import styles from './styles'
import { reqGetHomeNewSong } from '../../../../api'
import PropTypes from 'prop-types'
import MyImg from '../../../../components/Image'
import Song from '../../../../utils/Song'
import { connect } from 'react-redux'
import { setIndex, setCurrentSongs, resetPlaylist } from '../../../../redux/actions'
import { ActivityIndicator } from '@ant-design/react-native'
class NewItem extends React.Component {

    static propTypes = {
        type: PropTypes.number.isRequired
    }

    state = {
        songList: [],
        loading: false
    }
    componentDidMount = () => {
        this.getData()
    }

    getData = () => {

        this.setState({
            loading: true
        })
        const { type } = this.props
        reqGetHomeNewSong({ type }).then(res => {
            if (res.data.code === 0 && res.data.new_song.code === 0) {
                this.setState({
                    songList: res.data.new_song.data.songlist
                })
            }
            this.setState({
                loading: false
            })
        }).catch(() => {
            this.setState({
                loading: false
            })
        })
    }
    playAll = () => {
        const { songList } = this.state
        const playList = []
        songList.forEach((item, index) => {
            let song = new Song(item)
            if (index === 0) {
                console.log(song)
                this.props.setIndex(index)
                this.props.setCurrentSongs(song)
            }
            playList.push(song)
        })
        this.props.resetPlaylist(playList)

    }

    render() {
        const { songList, loading } = this.state
        return (
            <View style={styles.flex}>
                <TouchableOpacity onPress={() => this.playAll()}>
                    <View style={styles.playAll}>
                        <Text style={{ lineHeight: 30, color: '#fff', textAlign: 'center' }}>播放全部</Text>
                    </View>
                </TouchableOpacity>
                <ActivityIndicator
                    animating={loading}
                    size="large"
                    text="Loading..."
                    style={styles.loading}
                />
                <View style={{ width: "100%" }}>
                    <ScrollView >
                        <View style={styles.container}>
                            {
                                songList.map((item, index) => (
                                    <View style={styles.item} key={index}>
                                        <View style={styles.item_box}>
                                            <View>
                                                <MyImg uri={`https://y.gtimg.cn/music/photo_new/T002R90x90M000${item.album.pmid}.jpg?max_age=2592000`} style={styles.coverImg} />
                                            </View>
                                            <Text numberOfLines={1}>{item.title}</Text>
                                            <Text numberOfLines={1} style={styles.singer}>{item.singer[0].name}</Text>
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>

        )
    }
}

export default connect(
    state => ({}),
    { resetPlaylist, setIndex, setCurrentSongs }
)(NewItem) 