


import React from 'react'
import { ScrollView, View, StatusBar, Image, ImageBackground, TouchableHighlight, Text, TouchableOpacity } from 'react-native'
import { reqGetSingerDesc, reqGetSingerHotsong, reqGetSingerAblumList, reqGetSingerMV, reqGetSingerStarNum, reqAddLoveSinger, reqDelLoveSinger, reqGetSimilarSinger } from '../../api'
import { formatSongTime, formatNum, isLoveSinger } from '../../utils'
import { Tabs, ActivityIndicator } from '@ant-design/react-native'
import { parseString } from 'xml2js'
import { connect } from 'react-redux'
import { setCurrentSongs, setIndex, addSongToPlay, resetPlaylist, setLoveSingers } from '../../redux/actions'
import MyImg from '../../components/Image'
import styles from './styles'
import Song from '../../utils/Song'

class SingerDetail extends React.Component {


    state = {
        basic: {},
        desc: '',
        singermid: '',
        totalSongs: 0,
        totalMv: 0,
        fanMvNum: 0,
        singerMvNum: 0,
        totalAblum: 0,
        hotSong: [],
        albumlist: [],
        cSong: {},
        singerName: '',
        mvList: [],
        fanMvList: [],
        fansNum: 0,
        singerlist: [],
        animating: false
    }
    componentDidMount = () => {
        const { singermid } = this.props.route.params

        this.setState({
            singermid,
        })

        this.fetchData(singermid)

    }

    toThisSinger = (item) => {
        this.setState({
            singermid: item.mid
        })

        this.fetchData(item.mid)
    }

    fetchData = (singermid) => {

        this.setState({
            animating: true,
            singermid
        })

        reqGetSingerDesc({ singermid }).then(res => {

            parseString(res.response, { explicitArray: false }, (err, result) => {
                this.setState({
                    basic: result.result.data.info.basic,
                    desc: result.result.data.info.desc
                })
            })
        })

        reqGetSingerHotsong({ singermid }).then(res => {
            this.setState({
                totalSongs: res.data.singerSongList.data.totalNum,
                hotSong: res.data.singerSongList.data.songList
            })

            const { hotSong } = this.state
            const singerName = hotSong[0].songInfo.singer[0].name
            this.setState({
                singerName
            })

        })

        reqGetSingerAblumList({ singermid }).then(res => {
            this.setState({
                albumlist: res.data.getAlbumList.data.albumList,
                totalAblum: res.data.getAlbumList.data.total
            })
        })

        reqGetSingerMV({ singermid }).then(res => {
            this.setState({
                mvList: res.response.data.list,
                singerMvNum: res.response.data.total
            })
        })

        reqGetSingerMV({ singermid, order: 'time' }).then(res => {
            this.setState({
                fanMvList: res.response.data.list,
                fanMvNum: res.response.data.total
            })
        })
        reqGetSingerStarNum({ singermid }).then(res => {
            this.setState({
                fansNum: res.response.num
            })
        })

        reqGetSimilarSinger({ singermid }).then(res => {
            this.setState({
                singerlist: res.response.singers.items,
                animating: false
            })
        }).catch(() => {
            this.setState({
                animating: false
            })
        })
    }


    playThis = (item, index) => {
        const song = new Song(item.songInfo)
        const { playList } = this.props
        const { currentIndex } = this.props
        console.log(playList)
        const i = playList.findIndex(item => {
            return item.songmid === song.songmid
        })
        console.log(i)
        if (i === -1) {
            this.props.setCurrentSongs(song)
            if (currentIndex === -1) {
                this.props.addSongToPlay({ index: 0, song })
                this.props.setIndex(0)
            } else {

                this.props.addSongToPlay({ index: currentIndex + 1, song })
                this.props.setIndex(currentIndex + 1)
            }
        } else {
            message.info("歌曲已在播放列表中.")
            this.props.setCurrentSongs(song)
            this.props.setIndex(i)
        }




    }



    playAll = () => {
        const { hotSong } = this.state
        let playList = []
        hotSong.forEach((item, index) => {
            let song = new Song(item.songInfo)
            playList.push(song)
            if (index === 0) {
                this.props.setIndex(0)
                this.props.setCurrentSongs(song)
            }
        })

        this.props.resetPlaylist(playList)
    }


    render() {

        const { fanMvNum, singerMvNum, singermid, singerName, fansNum, hotSong, albumlist, mvList, fanMvList, desc,
            totalSongs, animating, singerlist } = this.state

        const tabs = [
            { "title": "歌曲" + totalSongs },
            { "title": "专辑" },
            { "title": "视频" + (fanMvNum + singerMvNum) },
            { "title": "关于" }
        ]

        return (
            <View style={styles.container}>
                <ActivityIndicator
                    toast
                    size="large"
                    text="正在加载"
                    animating={animating}
                />
                <View style={styles.topTitle}>
                    <View>
                        <TouchableHighlight onPress={() => { this.props.navigation.goBack() }}>
                            <Image source={require('../../assets/images/goback_white.png')} style={styles.goBack} />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.muiscInfo}>
                        <Text style={styles.songname}>{singerName}</Text>
                    </View>
                </View>
                <View>
                    <View>
                        <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent={true}></StatusBar>
                    </View>
                    <View style={styles.imgContainer}>
                        <ImageBackground source={{ uri: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${singermid}.jpg?max_age=2592000` }} style={styles.backgroundImage}>

                        </ImageBackground >
                        <View style={styles.mask}>

                        </View>
                        <View style={styles.infoContainer}>
                            <View>
                                <Text style={styles.bigSingerName}> {singerName}</Text>
                            </View>

                            <View style={styles.flexDirection}>
                                <Text style={styles.fanNum}>
                                    0关注
                                    </Text>
                                <Text style={styles.fanNum}>
                                    {formatNum(fansNum)}粉丝
                                    </Text>
                            </View>
                            <View style={{ ...styles.flexDirection, marginTop: 15 }}>
                                <Image source={require('../../assets/images/V.png')} style={styles.vImg} />
                                <Text style={styles.ruzhuName}>入驻艺人</Text>
                            </View>
                            <View style={styles.btnContainer}>
                                <View style={styles.mybtn}>
                                    <Image source={require('../../assets/images/putong.png')} style={styles.btn_img} />
                                    <Text style={styles.white_btn_text}>扑通小组</Text>
                                </View>

                                <View style={styles.rightBtn}>
                                    <View style={[styles.mybtn, styles.attention]}>
                                        <Image source={require('./images/jia.png')} style={styles.attentionImg} />
                                        <Text style={styles.attentionText}>关注</Text>
                                    </View>

                                    {/* <View style={ [styles.mybtn,styles.attention] }>
                                        <Image source={ require('./images/gou.png') } style={styles.attentionImg}/>
                                        <Text style={ styles.attentionText }>已关注</Text>
                                    </View> */}


                                    <View style={styles.mybtn}>
                                        <Image source={require('./images/xiaoxi.png')} style={styles.xiaoxiImg} />
                                        <Text style={styles.xiaoxiText}>私信</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <Tabs tabs={tabs}>
                    <ScrollView style={styles.tabsItem}>
                        <View style={styles.playBtn}>
                            <View></View>
                            <TouchableOpacity onPress={() => this.playAll()}>
                                <View style={styles.playBtnCon}>
                                    <Image style={styles.playAllImg} source={require('./images/bofang.png')} />
                                    <Text style={styles.playAllText}>播放全部</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                        {
                            hotSong.map((item, index) => (
                                <View key={index} style={styles.songItem}>
                                    <View style={styles.songItem_left}>
                                        <View style={styles.songIndex}>
                                            <Text style={styles.songIndex_Text}>{index + 1}</Text>
                                        </View>
                                        <View>
                                            <Text>{item.songInfo.title}</Text>
                                            <Text style={styles.songsItem_singer}>{item.songInfo.singer[0].name + '-' + item.songInfo.album.title}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.songItem_right}>
                                        <TouchableOpacity onPress={() => this.playThis(item, index)}>
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
                    </ScrollView>

                    <ScrollView style={styles.tabsItem}>
                        <View style={styles.albumList}>
                            {
                                albumlist.map((item, index) => (
                                    <View style={styles.albumlist_item} key={index}>
                                        <View style={styles.albumlist_itemBox}>
                                            <MyImg style={styles.albumList_img} uri={`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albumMid}.jpg?max_age=2592000`} />
                                            <Text style={styles.albumName} numberOfLines={1}>{item.albumName}</Text>
                                            <Text style={styles.publishDate} numberOfLines={1}>{item.publishDate}</Text>
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                    </ScrollView>
                    <ScrollView style={styles.tabsItem}>
                        <View style={styles.albumList}>
                            {
                                mvList.map((item, index) => (
                                    <View style={styles.albumlist_item} key={index}>
                                        <View style={styles.albumlist_itemBox}>
                                            <MyImg style={styles.albumList_img} uri={item.pic} />
                                            <Text style={styles.albumName} numberOfLines={1}>{item.title}</Text>
                                            <Text style={styles.publishDate} numberOfLines={1}>{item.singer_name}</Text>
                                        </View>
                                    </View>
                                ))
                            }

                            {
                                fanMvList.map((item, index) => (
                                    <View style={styles.albumlist_item} key={index}>
                                        <View style={styles.albumlist_itemBox}>
                                            <MyImg style={styles.albumList_img} uri={item.pic} />
                                            <Text style={styles.albumName} numberOfLines={1}>{item.title}</Text>
                                            <Text style={styles.publishDate} numberOfLines={1}>{item.singer_name}</Text>
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                    </ScrollView>

                    <ScrollView style={styles.tabsItem}>
                        <Text style={styles.JIANJIE}>
                            简介
                        </Text>
                        <Text style={styles.destText}>
                            {desc}
                        </Text>
                        <Text style={styles.JIANJIE}>
                            相似歌手
                        </Text>
                        <View style={styles.similarSinger}>
                            {
                                singerlist.map((item, index) => (
                                    <TouchableOpacity key={index} style={styles.similarSingerItem} onPress={() => this.toThisSinger(item)}>
                                        <View >
                                            <View style={styles.similarBox}>
                                                <MyImg uri={item.pic} style={styles.similarBox_Img} />
                                                <Text style={styles.similarBox_text}>
                                                    {item.name}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }

                        </View>
                    </ScrollView>

                </Tabs>
            </View>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
        playList: state.playList,
        currentIndex: state.currentIndex,
        loveSinger: state.loveSinger
    }),
    { setCurrentSongs, setIndex, addSongToPlay, resetPlaylist, setLoveSingers }
)(SingerDetail) 