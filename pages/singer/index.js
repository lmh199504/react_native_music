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
        this.setState({
            loading: true
        })
        reqGetSingerList(param).then(res => {
            this.setState({
                tags: res.response.singerList.data.tags,
                total: res.response.singerList.data.total,
                singerlist: res.response.singerList.data.singerlist,
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
        param[name] = value
        this.setState({
            param
        })
        this.getData()
    }

    componentDidMount = () => {
        this.getData()
    }

    render() {

        const { tags, param, total, singerlist, loading } = this.state
        if (!tags.area) {
            return null
        }
        return (
            <ScrollView style={styles.ScrollView} >
                <ActivityIndicator
                    animating={loading}
                    size="large"
                    text="Loading..."
                />
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
                            <View key={index} style={styles.singerItem}>
                                <View style={styles.singerItem_ImgCon}>
                                    <MyImg style={styles.singerItem_Img} source={{ uri: item.singer_pic }} uri={item.singer_pic }/>
                                </View>
                                <Text style={styles.singerItem_name}>{item.singer_name}</Text>
                            </View>
                        ))
                    }
                </View>

            </ScrollView>
        )
    }
}

export default SingerTab