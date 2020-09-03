

import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import styles from './styles'
import PropTypes from 'prop-types'
import { reqGetMvByTag } from '../../../api'
import { ActivityIndicator } from '@ant-design/react-native'
import { formatNum } from '../../../utils'
import MyImg from '../../../components/Image'
class VideoItem extends React.Component {

    static propTypes = {
        lan: PropTypes.string.isRequired
    }

    state = {
        mvList: [],
        loading: false
    }

    componentDidMount = () => {
        this.getData()
    }
    getData = () => {

        this.setState({
            loading: true
        })
        const { lan } = this.props
        reqGetMvByTag({ lan }).then(res => {
            this.setState({
                mvList: res.response.data.mvlist,
                loading: false
            })
        }).catch(() => {
            this.setState({
                loading: false
            })
        })
    }


    render() {

        const { loading, mvList } = this.state
        return (
            <ScrollView style={styles.ScrollView}>
                <ActivityIndicator
                    animating={loading}
                    size="large"
                    text="Loading..."
                />
                <View style={styles.container}>
                    {
                        mvList.map((item, index) => (
                            <View style={styles.item} key={index}>
                                <View style={styles.item_box}>
                                    <View>
                                        <MyImg uri={item.picurl} style={styles.coverImg }/>
                                    </View>
                                    <Text numberOfLines={1} style={styles.mvtitle}>{item.mvtitle}</Text>
                                    <Text numberOfLines={1} style={styles.singer_name }>{item.singer_name}</Text>
                                    <Text numberOfLines={1} style={styles.listennum}>播放量：{formatNum(item.listennum)}</Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}

export default VideoItem