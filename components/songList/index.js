
import React from 'react'
import { View,Text,Image,TouchableOpacity } from 'react-native'
import styles from './styles'
import  PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setIndex,addSongToPlay,setCurrentSongs } from '../../redux/actions'

class SongList extends React.Component{
    static propTypes = {
        songList:PropTypes.array.isRequired
    }


    playThisOne = (song) => {
		const { currentIndex,playList } = this.props
		const i = playList.findIndex(listItem => {
			return listItem.songmid === song.songmid
		})
		if(i === -1){
			if(currentIndex === -1){
				this.props.setIndex(0)
				this.props.addSongToPlay({index:0,song})
				this.props.setCurrentSongs(song)
			}else{
				this.props.setIndex(currentIndex+1)
				this.props.addSongToPlay({index:currentIndex+1,song})
				this.props.setCurrentSongs(song)
			}
		}else{

			// message.info('歌曲已在播放列表中.')
			this.props.setCurrentSongs(song)
			this.props.setIndex(i)
		}
	}

    render(){
        const { songList } = this.props
        return (
            <View style={ styles.container }> 
            {
                songList.map((item, index) => (
                    <View key={index} style={styles.songItem}>
                        <View style={styles.songItem_left}>
                            <View style={styles.songIndex}>
                                <Text style={styles.songIndex_Text}>{index + 1}</Text>
                            </View>
                            <View>
                                <Text>{item.title}</Text>
                                <Text style={styles.songsItem_singer}>{item.singer[0].name + '-' + item.album.title}</Text>
                            </View>
                        </View>
                        <View style={styles.songItem_right}>
                            <TouchableOpacity onPress={() => this.playThisOne(item, index)}>
                                <View>
                                    <Image style={styles.right_playImg} source={require('./images/play.png')} />
                                </View>
                            </TouchableOpacity>

                            <View>
                                <Image style={styles.moreImg} source={require('./images/more.png')} />
                            </View>
                        </View>
                    </View>
                ))
            }
        </View>
        )
    }
}

export default connect(
    state=>({
        currentIndex:state.currentIndex,
        playList:state.playList
    }),
    { setIndex,addSongToPlay,setCurrentSongs }
)(SongList)