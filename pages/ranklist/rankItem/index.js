

import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import styles from '../styles'
import MyImg from '../../../components/Image'
import { reqGetRanks } from '../../../api'
import  Song  from '../../../utils/Song'
import {
    ActivityIndicator,
    Toast 
} from '@ant-design/react-native';
import { connect } from 'react-redux'
import { setIndex,setCurrentSongs,resetPlaylist } from '../../../redux/actions'
class RankItem extends React.Component {
    static propTypes = {
        topId: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }

    state = {
        data: [],
        loading: false
    }

    componentDidMount = () => {
        this.getData()
    }

    getData = () => {
        const { topId } = this.props
        this.setState({
            loading: true
        })
        reqGetRanks({ topId }).then(res => {

            const songList = res.response.detail.data.songInfoList
            const dataList = res.response.detail.data.data.song
            for (let i = 0; i < songList.length; i++) {
                songList[i] = { ...songList[i], ...dataList[i] }

            }
            this.setState({
                data: res.response.detail.data.songInfoList,
                loading: false
            })
        }).catch(() => {
            this.setState({
                loading: false
            })
        })
    }

    playAll = () => {
		const { data } = this.state
		let playList = []
		data.forEach((item,index) => {
			let song = new Song(item)
			playList.push(song)
			if(index === 0){
				this.props.setIndex(0)
				this.props.setCurrentSongs(song)
			}
		})
		this.props.resetPlaylist(playList)

        Toast.info('播放歌曲')
	}


    render() {

        const { name, topId } = this.props
        const { data, loading } = this.state
        return (
            <View>
                <ActivityIndicator
                    animating={loading}
                    toast
                    size="large"
                    text="Loading..."
                />
                {
                    data.length !== 0 ?
                        <View>
                            <View style={styles.main_title}>
                                <Text style={styles.main_title_text}>{name}</Text>
                                <TouchableOpacity onPress={ () => this.playAll() }>
                                    <View style={styles.more_con}>
                                        <Text style={styles.more}>播放全部</Text>
                                        <Image style={styles.more_img} source={require('../images/right.png')} />
                                    </View>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.rankCon}>
                                {
                                    data.map((item, index) => (
                                        <View key={index} style={styles.songItem}>
                                            <View>
                                                <MyImg uri={`https://y.gtimg.cn/music/photo_new/T002R90x90M000${item.album.mid}.jpg?max_age=2592000`} style={styles.coverImg} />
                                            </View>
                                            <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                                            <Text numberOfLines={1} style={styles.singerName}>{item.singerName}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View> : null
                }

            </View>
        )
    }

}

export default connect(
    state=>({}),
    {  setIndex,setCurrentSongs,resetPlaylist  }
)(RankItem)