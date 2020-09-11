


import React from 'react'
import { ScrollView, View, StatusBar, Image, ImageBackground, TouchableHighlight, Text } from 'react-native'
import { reqGetSingerDesc, reqGetSingerHotsong, reqGetSingerAblumList, reqGetSingerMV, reqGetSingerStarNum, reqAddLoveSinger, reqDelLoveSinger, reqGetSimilarSinger } from '../../api'
import { formatSongTime, formatNum, isLoveSinger } from '../../utils'
import { parseString } from 'xml2js'
import MyImg from '../../components/Image'
import styles from './styles'

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
        singerlist: []
    }
    componentDidMount = () => {
        const { singermid } = this.props.route.params
        console.log('------------')
        console.log(singermid)
        this.setState({
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
                singerlist: res.response.singers.items
            })
        })
    }

    render() {
        const { singermid, singerName, fansNum } = this.state

        return (
            <View style={styles.container}>
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
                <ScrollView>
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
                            <View style={ {...styles.flexDirection,marginTop:15} }>
                                <Image source={require('../../assets/images/V.png')} style={styles.vImg} />
                                <Text style={ styles.ruzhuName }>入驻艺人</Text>
                            </View>
                            <View style={styles.btnContainer}>
                                <View>
                                    <Image source={require('../../assets/images/putong.png')} style={styles.btn_img} />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>


            </View>
        )
    }
}

export default SingerDetail