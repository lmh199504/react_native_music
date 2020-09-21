
import React from 'react'
import { View, StatusBar, Image, Text, TouchableOpacity } from 'react-native'
import { ActivityIndicator } from '@ant-design/react-native'
import Video from 'react-native-video'
import styles from './styles'
import Swiper from 'react-native-swiper'
import { connect } from 'react-redux'
import { conncatMvLists, setMvIndex } from '../../redux/actions'
class VideoPlay extends React.Component {
    state = {
        currentMvUrl: ''
    }

    componentDidMount = () => {
        // const { mvList, mvIndex } = this.props
        // if(){}
        // this._onIndexChanged(mvIndex)
    }

    _onIndexChanged = (index) => {

        const { mvList } = this.props
        this.setState({
            currentMvUrl: mvList[index].mvUrl
        })
        this.props.setMvIndex(index)
        if (index === mvList.length - 2) {
            this.props.conncatMvLists()
        }
    }

    toSingerDetails = (item) => {
        this.props.navigation.navigate('singerDetails', {
            singermid: item.singer_mid ?item.singer_mid:item[0].mid,
        })
    }
    // _onProgress = ({ currentTime }) => {
    //     console.log(currentTime)
    // }
    render() {




        const { mvList, mvIndex } = this.props
        const { currentMvUrl } = this.state
        const swiperOption = {
            showsButtons: false,
            horizontal: false,
            showsPagination: false,
            loop: false,
            index: mvIndex
        }


        return (



            <View style={styles.viewStyle}>
                <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent={true}></StatusBar>
                <Swiper {...swiperOption} onIndexChanged={index => this._onIndexChanged(index)} style={styles.swiper}>
                    {
                        mvList.map((item, index) => (
                            <View style={{ flex: 1 }} key={index}>
                                <Image source={{ uri: item.picurl ? item.picurl:item.pic }} key={index} style={styles.backgroundImg} />
                                <View style={styles.mask}></View>
                                <Video source={{ uri: mvIndex === index ? item.mvUrl : '#' }}   // Can be a URL or a local file.
                                    ref={(ref) => {
                                        this['player' + index] = ref
                                    }}                                       // Store reference
                                    resizeMode={'contain'}
                                    loop={true}
                                    rate={mvIndex === index ? 1 : 0}
                                    paused={mvIndex === index ? false : true}
                                    // controls
                                    poster={item.picurl ? item.picurl:item.pic}
                                    style={styles.mvVideo}

                                />
                                <View style={styles.bottomInfo}>
                                    <Text style={styles.bottomInfo_Title}>
                                        {item.title}
                                    </Text>
                                    <TouchableOpacity onPress={() => this.toSingerDetails(item.singers?item.singers:item)}>
                                        <Text style={styles.bottomInfo_singer}>
                                            -{item.singers ? item.singers[0].name : item.singer_name}
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        ))
                    }
                </Swiper>


            </View>
        )
    }
}

export default connect(
    state => ({
        mvList: state.mvList,
        mvIndex: state.mvIndex
    }),
    { conncatMvLists, setMvIndex }
)(VideoPlay)