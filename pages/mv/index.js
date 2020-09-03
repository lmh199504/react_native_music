

import React from 'react'
import { reqGetMV } from '../../api'
import { ScrollView, Text, View, TouchableHighlight } from 'react-native'
import { ActivityIndicator } from '@ant-design/react-native'
import styles from './styles'
import { formatNum } from '../../utils'
import MyImg from '../../components/Image'
class MV extends React.Component {


    state = {
        param: {
            area_id: 15,
            version_id: 7,
            page: 1,
            order: 1
        },
        mvTag: {},
        loading: false,
        mvList: [],
        total: 0
    }

    componentDidMount = () => {
        this.getData()
    }

    setParam = (name, value) => {
        const { param } = this.state
        if (name === "area_id" || name === "version_id") {
            param.page = 1
        }
        param[name] = value
        this.setState({
            param
        })
        this.getData()
    }
    getData = () => {
        this.setState({
            loading: true
        })
        const { param } = this.state
        reqGetMV(param).then(res => {
            this.setState({
                loading: false,
                mvTag: res.response.mv_tag.data,
                mvList: res.response.mv_list.data.list,
                total: res.response.mv_list.data.total
            })
        }).catch(() => {
            this.setState({
                loading: false
            })
        })
    }
    render() {

        const { mvTag, loading, mvList, param } = this.state
        if (!mvTag.area) {
            return (<ActivityIndicator
                animating={loading}
                size="large"
                toast
                text="Loading..."
            />)
        }


        return (
            <ScrollView style={styles.ScrollView}>
                <ActivityIndicator
                    animating={loading}
                    size="large"
                    toast
                    text="Loading..."
                />
                <View style={styles.areaCon}>
                    <View style={styles.area_title}>
                        <Text>区域</Text>
                    </View>
                    <ScrollView horizontal={true}>
                        {
                            mvTag.area.map(item => (
                                <TouchableHighlight style={[styles.areaItem, item.id === param.area_id ? styles.areaItem_active : '']} key={item.id} onPress={() => this.setParam('area_id', item.id)}>
                                    <View>
                                        <Text style={[styles.areaItem_Text, item.id === param.area_id ? styles.areaItem_Text_active : '']}>{item.name}</Text>
                                    </View>
                                </TouchableHighlight>
                            ))
                        }
                    </ScrollView>
                </View>

                <View style={styles.areaCon}>
                    <View style={styles.area_title}>
                        <Text>版本</Text>
                    </View>
                    <ScrollView horizontal={true}>
                        {
                            mvTag.version.map(item => (
                                <TouchableHighlight style={[styles.areaItem, item.id === param.version_id ? styles.areaItem_active : '']} key={item.id} onPress={() => this.setParam('version_id', item.id)}>
                                    <View>
                                        <Text style={[styles.areaItem_Text, item.id === param.version_id ? styles.areaItem_Text_active : '']}>{item.name}</Text>
                                    </View>
                                </TouchableHighlight>
                            ))
                        }
                    </ScrollView>
                </View>

                <View style={styles.container}>
                    {
                        mvList.map((item, index) => (
                            <View style={styles.item} key={index}>
                                <View style={styles.item_box}>
                                    <View>
                                        <MyImg uri={item.picurl} style={styles.coverImg} />
                                    </View>
                                    <Text numberOfLines={1} style={styles.mvtitle}>{item.title}</Text>
                                    <Text numberOfLines={1} style={styles.singer_name}>{item.singers[0].name}</Text>
                                    <Text numberOfLines={1} style={styles.listennum}>播放量：{formatNum(item.playcnt)}</Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}

export default MV