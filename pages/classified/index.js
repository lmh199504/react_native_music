
import React from 'react'
import { View, TouchableOpacity, Text, ScrollView } from 'react-native'
import MyImg from '../../components/Image'
// import GenDanItem from '../GeDan/geDanItem'
import { reqGetSongLists } from '../../api'
import { ActivityIndicator } from '@ant-design/react-native'
import styles from './styles'
import { formatNum } from '../../utils'
class Classified extends React.Component {

    state = {
        categories: [],
        param: {
            page: 1,
            limit: 20,
            sortId: '5',
            categoryId: 10000000
        },
        loading: false,
        songList: [],
        total: 10000
    }
    setParm = (name, value) => {
        const { param } = this.state
        if (name === "categoryId") {
            param.page = 1
        }
        param[name] = value
        this.setState({
            param
        })


        this.getData()
    }

    getData = () => {
        const { param, songList } = this.state
        this.setState({
            loading: true
        })
        reqGetSongLists(param).then(res => {
            this.setState({
                songList: songList.concat(res.response.data.list),
                total: res.response.data.sum,
                loading: false
            })
        }).catch(() => {
            this.setState({
                loading: false
            })
        })
    }

    componentDidMount = () => {
        this.getData()
    }

    toClassDetail = (item) => {
        this.props.navigation.navigate('ClassDetail', {
            disstid: item.dissid
        })
    }

    _contentViewScroll = (e) => {
        const { total, songList } = this.state
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        console.log(offsetY,contentSizeHeight,oriageScrollHeight)
        if (offsetY + oriageScrollHeight >= contentSizeHeight - 5) {
            console.log('上传滑动到底部事件')
            if (songList.length !== total - 1) {
                const { page } = this.state.param
                this.setParm('page', page + 1)
                this.getData()
            }

        }
    }

    render() {

        const { songList, loading } = this.state
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.ScrollView}
                    onMomentumScrollEnd={this._contentViewScroll}

                >
                    <View style={styles.container}>
                        {
                            songList.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => this.toClassDetail(item)} style={styles.genDan_item}>
                                    <View >
                                        <View>
                                            <MyImg uri={item.imgurl || item.cover} style={styles.coverImg} />
                                        </View>
                                        <Text numberOfLines={1} style={styles.genDanTitle}>{item.dissname}</Text>
                                        <Text style={styles.listen_num} numberOfLines={1}>播放量：{formatNum(item.listennum || item.access_num)}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                    {/* <Text style={ styles.noMoreData }>--  我真的什么都没有了 --</Text> */}
                    
                </ScrollView>
                <ActivityIndicator
                    toast
                    text="加载中..."
                    animating={loading}
                />
            </View>

        )
    }
}

export default Classified