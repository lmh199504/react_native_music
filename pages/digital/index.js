
import React from 'react'
import { ScrollView, View, Image, Text } from 'react-native'
import styles from './styles'
import Swiper from 'react-native-swiper'
import { reqGetDigitalAlbumLists } from '../../api'
class Digital extends React.Component {

    state = {
        banner: [],
        content: []
    }

    componentDidMount = () => {
        reqGetDigitalAlbumLists().then(res => {
            this.setState({
                banner: res.response.data.banner,
                content: res.response.data.content
            })
        }).catch(() => {

        })
    }
    getName = (item) => {
        switch (item.type) {
            case 'newupload':
                return '最新上架'
            case 'yinyueren':
                return '音乐人专区'
            case 'weeksalewell':
                return '本周热销'
            case 'zhuanti':
                return item.title
            default:
                return item.type
        }

    }
    render() {
        const sweperOptions = {
            loop: true,
            showsButtons: false,
            showsPagination: true,
            autoplay: true,
            activeDot: <Dot />
        }
        const { banner, content } = this.state

        return (
            <ScrollView style={styles.ScrollView}>
                <Swiper {...sweperOptions} style={styles.swiper}>
                    {
                        banner.map((item, index) => (
                            <View style={styles.top_slider} key={index}>
                                <Image resizeMode="cover" style={styles.top_slider_img} source={{ uri: item.picurl }} />
                            </View>
                        ))
                    }

                </Swiper>

                <View>
                    {
                        content.map((item, i) => (
                            <View key={item.type + Math.random()}>
                                <Text style={styles.title}>{this.getName(item)}</Text>

                                <View style={styles.albumCon}>
                                    {
                                        item.albumlist.map((ablum, index) => (
                                            <View key={index} style={styles.albumItem}>
                                                <View style={ styles.albumItem_box }>
                                                    <View>
                                                        <Image style={styles.album_Img} source={{ uri: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${ablum.album_mid}.jpg?max_age=2592000` }} />
                                                    </View>
                                                    <Text numberOfLines={1} style={ styles.album_name }>{ablum.album_name}</Text>
                                                    <Text numberOfLines={1} style={ styles.singer_name }>{ablum.singer_name}</Text>
                                                    <View style={ styles.bottomBtn }>
                                                        <Text style={  styles.money }>¥ 25</Text>
                                                        <View style={ styles.btn }>
                                                            <Text style={ styles.btn_text }>立即购买</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}

export default Digital

function Dot() {
    return (
        <View style={{ width: 8, height: 8, backgroundColor: '#f73c40', borderRadius: 4 }}></View>
    )
}