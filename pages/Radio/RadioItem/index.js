

import React from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import MyImg from '../../../components/Image'
import { formatNum } from '../../../utils'
import { reqGetRadioSong } from '../../../api'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setCurrentSongs, setIndex, resetPlaylist } from '../../../redux/actions'
import { Toast } from '@ant-design/react-native'
import Song from '../../../utils/Song'
class RadioItem extends React.Component {
    static propTypes = {
        radioList: PropTypes.array.isRequired
    }


    playThisRadio = (item) => {
        reqGetRadioSong({ radioId: item.radioId }).then(res => {
            const list = res.data.songlist.data.track_list
            let playList = []

            list.forEach((item, index) => {
                let song = new Song(item)
                if (index === 0) {
                    this.props.setCurrentSongs(song)
                    this.props.setIndex(index)
                }
                playList.push(song)
            })

            this.props.resetPlaylist(playList)

            Toast.info('电台播放成功')
        })


    }

    render() {

        const { radioList } = this.props
        return (
            <View>
                <ScrollView style={styles.ScrollView}>
                    <View style={styles.container}>
                        {
                            radioList.map((item, index) => (
                                <View style={styles.Item} key={index}>
                                    <TouchableOpacity onPress={() => this.playThisRadio(item)}>
                                        <View style={styles.Item_box}>
                                            <View>
                                                <MyImg uri={item.radioImg} style={styles.radioImg} />
                                            </View>
                                            <Text style={styles.radioName}>
                                                {item.radioName}
                                            </Text>
                                            <Text style={styles.listenNum}>
                                                播放量：{formatNum(item.listenNum)}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            ))
                        }

                    </View>

                </ScrollView>
                
            </View>
        )
    }
}

export default connect(
    state => ({

    }),
    { setCurrentSongs, setIndex, resetPlaylist }
)(RadioItem)