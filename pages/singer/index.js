import React from 'react'
import { ScrollView, View, Text, TouchableHighlight, Image } from 'react-native'
import styles from './styles'
import { reqGetSingerList } from '../../api'
import {
    ActivityIndicator
} from '@ant-design/react-native';
import MyImg from '../../components/Image'
class SingerTab extends React.Component {

    state = {
        param: {
            "area": -100,
            "sex": -100,
            "genre": -100,
            "index": -100,
            "sin": 0,
            "page": 1
        },
        tags: {},
        total: 0,
        singerlist: [],
        loading: false
    }

    getData = () => {
        const { param } = this.state
        console.log(param)
        this.setState({
            loading: true
        })
        reqGetSingerList(param).then(res => {
            const { singerlist } = this.state

            this.setState({
                tags: res.response.singerList.data.tags,
                total: res.response.singerList.data.total,
                singerlist: singerlist.concat(res.response.singerList.data.singerlist),
                loading: false
            })
        }).catch(() => {
            this.setState({
                loading: false
            })
        })
    }

    setParam = (name, value) => {
        const { param } = this.state
        
        if(name != 'page'){
            param.page = 1
            this.setState({
                singerlist:[]
            })
        }
        param[name] = value
        this.setState({
            param
        })
        this.getData()
    }

    componentDidMount = () => {
        this.getData()
    }

    toSingerDetail = (item) => {
        this.props.navigation.navigate('singerDetails', {
            singermid: item.singer_mid,
        })
    }


    _contentViewScroll = (e) => {
        const { total, singerlist } = this.state
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        console.log(offsetY, contentSizeHeight, oriageScrollHeight)
        if (offsetY + oriageScrollHeight >= contentSizeHeight - 5) {
            console.log('上传滑动到底部事件')
            if (singerlist.length !== total - 1) {
                const { page } = this.state.param
                this.setParam('page', page + 1)
            }

        }
    }

    render() {

        const { tags, param, total, singerlist, loading } = this.state
        if (!tags.area) {
            return null
        }
        return (

            <View>
                <ActivityIndicator
                    animating={loading}
                    size="large"
                    toast
                    text="Loading..."
                />
                <ScrollView style={styles.ScrollView}
                    onMomentumScrollEnd={this._contentViewScroll}
                >

                    <ScrollView horizontal={true} indicatorStyle="white" style={styles.tabScrollView}>
                        {
                            tags.index.map(item => (
                                <TouchableHighlight underlayColor='#f73c40' key={item.id} onPress={() => this.setParam('index', item.id)} style={[styles.tabItem, item.id === param.index ? styles.tabItemActive : '']}>
                                    <View>
                                        <Text style={[styles.tabName, item.id === param.index ? styles.tabNameActive : '']}>
                                            {item.name}
                                        </Text>
                                    </View>
                                </TouchableHighlight>

                            ))
                        }
                    </ScrollView>
                    <ScrollView horizontal={true} indicatorStyle="white" style={styles.tabScrollView}>
                        {
                            tags.area.map(item => (
                                <TouchableHighlight key={item.id} onPress={() => this.setParam('area', item.id)} style={[styles.tabItem, item.id === param.area ? styles.tabItemActive : '']}>
                                    <View>
                                        <Text style={[styles.tabName, item.id === param.area ? styles.tabNameActive : '']}>
                                            {item.name}
                                        </Text>
                                    </View>
                                </TouchableHighlight>

                            ))
                        }
                    </ScrollView>
                    <ScrollView horizontal={true} indicatorStyle="white" style={styles.tabScrollView}>
                        {
                            tags.sex.map(item => (
                                <TouchableHighlight key={item.id} onPress={() => this.setParam('sex', item.id)} style={[styles.tabItem, item.id === param.sex ? styles.tabItemActive : '']}>
                                    <View>
                                        <Text style={[styles.tabName, item.id === param.sex ? styles.tabNameActive : '']}>
                                            {item.name}
                                        </Text>
                                    </View>
                                </TouchableHighlight>

                            ))
                        }
                    </ScrollView>

                    <ScrollView horizontal={true} indicatorStyle="white" style={styles.tabScrollView}>
                        {
                            tags.genre.map(item => (
                                <TouchableHighlight key={item.id} onPress={() => this.setParam('genre', item.id)} style={[styles.tabItem, item.id === param.genre ? styles.tabItemActive : '']}>
                                    <View>
                                        <Text style={[styles.tabName, item.id === param.genre ? styles.tabNameActive : '']}>
                                            {item.name}
                                        </Text>
                                    </View>
                                </TouchableHighlight>

                            ))
                        }
                    </ScrollView>

                    <View style={styles.singerCon}>
                        {
                            singerlist.map((item, index) => (
                                <TouchableHighlight onPress={() => this.toSingerDetail(item)} key={index} style={styles.singerItem} underlayColor="transparent">
                                    <View>
                                        <View style={styles.singerItem_ImgCon}>
                                            <MyImg style={styles.singerItem_Img} source={{ uri: item.singer_pic }} uri={item.singer_pic} />
                                        </View>
                                        <Text style={styles.singerItem_name}>{item.singer_name}</Text>
                                    </View>
                                </TouchableHighlight>
                            ))
                        }
                    </View>

                </ScrollView>

            </View>

        )
    }
}

export default SingerTab