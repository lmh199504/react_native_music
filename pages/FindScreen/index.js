import React from 'react'
import { View, Text, Image, ScrollView, TouchableHighlight, TouchableOpacity,BackHandler,ToastAndroid } from 'react-native'
import styles from './styles'
import Swiper from 'react-native-swiper'
import { reqGetHome } from '../../api'
import { formatNum, } from '../../utils'
import Song from '../../utils/Song'
import { connect } from 'react-redux'
import { resetPlaylist, setCurrentSongs, setIndex, addSongToPlay } from '../../redux/actions'
class FindScreen extends React.Component {


    state = {
        imgList: [],
        recomPlaylist: [],
        songlist: []
    }
    componentDidMount = () => {
        reqGetHome().then(res => {

            this.setState({
                imgList: res.response.focus.data.content,
                recomPlaylist: res.response.recomPlaylist.data.v_hot,
                songlist: res.response.new_song.data.songlist
            })
        })


        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
        this.onBackButtonPressAndroid);
    }


    onBackButtonPressAndroid = () => {
        if (this.props.navigation.isFocused()) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                RNExitApp.exitApp();
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            return true;
        }
    }
    playThisOne = (record) => {
        const { currentIndex, playList } = this.props
        // console.log(record)
        let song = new Song(record)
        const i = playList.findIndex(listItem => {
            return listItem.songmid === song.songmid
        })
        if (i === -1) {
            if (currentIndex === -1) {
                this.props.setIndex(0)
                this.props.addSongToPlay({ index: 0, song })
                this.props.setCurrentSongs(song)
            } else {
                this.props.setIndex(currentIndex + 1)
                this.props.addSongToPlay({ index: currentIndex + 1, song })
                this.props.setCurrentSongs(song)
            }
        } else {
            // message.info('歌曲已在播放列表中.')
            this.props.setCurrentSongs(song)
            this.props.setIndex(i)
        }
    }

    playAllNewSong = () => {
        const { songlist } = this.state
        const playList = []
        for (let i = 0; i < songlist.length; i++) {
            let song = new Song(songlist[i])
            playList.push(song)
            if (i === 0) {
                this.props.setIndex(0)
                this.props.setCurrentSongs(song)
            }
        }
        this.props.resetPlaylist(playList)
    }

    toMoreGeDan = () => {
        this.props.navigation.navigate('GeDan')
    }

    render() {
        const sweperOptions = {
            loop: true,
            showsButtons: false,
            showsPagination: true,
            activeDot: <Dot />
        }
        const { navigation } = this.props
        const { imgList, recomPlaylist, songlist } = this.state
        const number = Math.ceil(songlist.length / 3)
        const arr = []
        for (let i = 0; i < number; i++) {
            arr.push(i)
        }

        return (
            <ScrollView style={{ marginBottom: 50 }}>
                <View style={styles.container}>
                    <Swiper style={styles.swiperCon} {...sweperOptions}>
                        {
                            imgList.map((item, index) => (
                                <View style={styles.top_slider} key={index}>
                                    <Image resizeMode="cover" style={styles.top_slider_img} source={{ uri: item.pic_info.url }} />
                                </View>
                            ))
                        }
                    </Swiper>

                    <ScrollView horizontal={true}>

                        <TouchableHighlight underlayColor="#fff" onPress={() => navigation.push('Day')} >
                            <View style={styles.red_menu}>
                                <View style={styles.menu_Icon}>
                                    <Image style={styles.mene_Icon_img} source={require('./images/rili.png')} />
                                </View>
                                <Text style={styles.menu_text}>每日推荐</Text>
                            </View>
                        </TouchableHighlight>


                        <TouchableHighlight underlayColor="#fff" onPress={() => navigation.push('Radio')} >
                            <View style={styles.red_menu}>
                                <View style={styles.menu_Icon}>
                                    <Image style={styles.mene_Icon_img} source={require('./images/rili.png')} />
                                </View>
                                <Text style={styles.menu_text}>电台</Text>
                            </View>
                        </TouchableHighlight>


                        <TouchableHighlight underlayColor="#fff" onPress={() => navigation.push('GeDan')} >
                            <View style={styles.red_menu}>
                                <View style={styles.menu_Icon}>
                                    <Image style={styles.mene_Icon_img} source={require('./images/rili.png')} />
                                </View>
                                <Text style={styles.menu_text}>歌单</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="#fff" onPress={() => navigation.push('Rank')}>
                            <View style={styles.red_menu}>
                                <View style={styles.menu_Icon}>
                                    <Image style={styles.mene_Icon_img} source={require('./images/rili.png')} />
                                </View>
                                <Text style={styles.menu_text}>排行榜</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="#fff" onPress={() => navigation.push('Singer')}>
                            <View style={styles.red_menu}>
                                <View style={styles.menu_Icon}>
                                    <Image style={styles.mene_Icon_img} source={require('./images/rili.png')} />
                                </View>
                                <Text style={styles.menu_text}>歌手</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="#fff" onPress={() => navigation.push('MV')}>
                            <View style={styles.red_menu}>
                                <View style={styles.menu_Icon}>
                                    <Image style={styles.mene_Icon_img} source={require('./images/rili.png')} />
                                </View>
                                <Text style={styles.menu_text}>MV</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="#fff" onPress={() => navigation.push('Digital')}>
                            <View style={styles.red_menu}>
                                <View style={styles.menu_Icon}>
                                    <Image style={styles.mene_Icon_img} source={require('./images/rili.png')} />
                                </View>
                                <Text style={styles.menu_text}>数字专辑</Text>
                            </View>
                        </TouchableHighlight>


                    </ScrollView>

                    <View style={styles.titelCon}>
                        <View>
                            <Text style={styles.titelCon_Text}>人气推荐歌单</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.toMoreGeDan()}>
                            <View style={styles.checkMoreView}>
                                <Text style={styles.checkMoreText}>查看更多</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <ScrollView horizontal={true} pagingEnabled={true}>
                        {
                            recomPlaylist.map((item, index) => (
                                <TouchableOpacity key={index} onPress={ () => this.props.navigation.navigate('ClassDetail',{
                                    disstid:item.content_id
                                }) }>
                                    <View style={styles.hotsItem} >
                                        <View style={styles.hotsMusic}>
                                            <Image style={styles.playBg} source={{ uri: item.cover_url_big || item.cover }} />
                                            <View style={styles.playCon}>
                                                <Image style={styles.playImg} source={require('./images/play.png')} />
                                                <Text style={styles.playNum}>{formatNum(item.listen_num)}</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.hotsMusicTitle} numberOfLines={1}>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>

                            ))
                        }

                    </ScrollView>

                    <View style={styles.titelCon}>
                        <View>
                            <Text style={styles.titelCon_Text}>歌曲推荐</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.playAllNewSong()}>
                            <View style={styles.checkMoreView}>
                                <Text style={styles.checkMoreText}>播放全部</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <Swiper horizontal={true} style={{ height: 180 }} activeDot={<Dot />}>
                        {
                            arr.map((item, index) => (
                                <View style={styles.suggest} key={index}>
                                    {
                                        songlist.map((song, i) => (
                                            i >= index * 3 && i < ((index + 1) * 3) ?
                                                <View style={styles.musicItem} key={i}>
                                                    <View style={styles.left_MusicItem}>
                                                        <View style={styles.musicItemCon}>
                                                            <Image style={styles.musicItem_bg} source={{ uri: `https://y.gtimg.cn/music/photo_new/T002R90x90M000${song.album.pmid}.jpg?max_age=2592000` }} />
                                                        </View>
                                                        <View>
                                                            <Text style={styles.songName}>{song.title}</Text>
                                                            <Text style={styles.singerName}>{song.singer[0].name}</Text>
                                                        </View>
                                                    </View>
                                                    <TouchableOpacity onPress={() => this.playThisOne(song)}>
                                                        <View style={styles.right_MusicItem}>
                                                            <Image style={styles.right_play} source={require('./images/red_play.png')} />
                                                        </View>
                                                    </TouchableOpacity>

                                                </View> : null
                                        ))
                                    }

                                </View>
                            ))
                        }
                    </Swiper>

                </View>
            </ScrollView>
        )
    }
}
export default connect(
    state => ({
        currentIndex: state.currentIndex,
        playList: state.playList
    }),
    { resetPlaylist, setCurrentSongs, setIndex, addSongToPlay }
)(FindScreen)




function Dot() {
    return (
        <View style={{ width: 8, height: 8, backgroundColor: '#f73c40', borderRadius: 4 }}></View>
    )
}