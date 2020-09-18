
import React from 'react'
import { View, StatusBar } from 'react-native'
import Video from 'react-native-video'
import styles from './styles'
import Swiper from 'react-native-swiper'
import { connect } from 'react-redux'
import { conncatMvLists } from '../../redux/actions'
class VideoPlay extends React.Component {

    onBuffer = () => {
        console.log("11111")
    }

    videoError = () => {
        console.log('error')
    }
    onLoad = () => {
        console.log('load')
    }
    componentDidMount = () => {
        console.log("componentDidMount")
    }
    render() {


        const swiperOption = {
            showsButtons:false,
            horizontal:false,
            showsPagination:false
        }
        return (



            <View style={styles.viewStyle}>
                <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent={true}></StatusBar>
                <Swiper {...swiperOption}>
                    <Video source={{ uri: "http://120.41.44.19/mv.music.tc.qq.com/ANiLCbd9bAZzNCF1VKUCq8xqH8tkRJh1t5OOlxUtX9wQ/7F60A52578602DE7B69C8DC52F4A35223FAA0A0D6FE736280ECE2BDAE12D3FA931441F76BDEC984BF456353BC0D65573ZZqqmusic_default/1049_M0101016002FmBiq1utabP1001764994.f9844.mp4?fname=1049_M0101016002FmBiq1utabP1001764994.f9844.mp4" }}   // Can be a URL or a local file.
                        ref={(ref) => {
                            this.player = ref
                        }}                                      // Store reference
                        onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        onError={this.videoError}               // Callback when video cannot be loaded
                        resizeMode={'contain'}
                        onLoad={this.onLoad}
                        // controls
                        poster="https://baconmockup.com/300/200/"
                        style={styles.backgroundVideo} />

                    <Video source={{ uri: "http://120.41.44.19/mv.music.tc.qq.com/ANiLCbd9bAZzNCF1VKUCq8xqH8tkRJh1t5OOlxUtX9wQ/7F60A52578602DE7B69C8DC52F4A35223FAA0A0D6FE736280ECE2BDAE12D3FA931441F76BDEC984BF456353BC0D65573ZZqqmusic_default/1049_M0101016002FmBiq1utabP1001764994.f9844.mp4?fname=1049_M0101016002FmBiq1utabP1001764994.f9844.mp4" }}   // Can be a URL or a local file.
                        ref={(ref) => {
                            this.player = ref
                        }}                                      // Store reference
                        onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        onError={this.videoError}               // Callback when video cannot be loaded
                        resizeMode={'contain'}
                        onLoad={this.onLoad}
                        // controls
                        poster="https://baconmockup.com/300/200/"
                        style={styles.backgroundVideo} />

                    <Video source={{ uri: "http://120.41.44.19/mv.music.tc.qq.com/ANiLCbd9bAZzNCF1VKUCq8xqH8tkRJh1t5OOlxUtX9wQ/7F60A52578602DE7B69C8DC52F4A35223FAA0A0D6FE736280ECE2BDAE12D3FA931441F76BDEC984BF456353BC0D65573ZZqqmusic_default/1049_M0101016002FmBiq1utabP1001764994.f9844.mp4?fname=1049_M0101016002FmBiq1utabP1001764994.f9844.mp4" }}   // Can be a URL or a local file.
                        ref={(ref) => {
                            this.player = ref
                        }}                                      // Store reference
                        onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        onError={this.videoError}               // Callback when video cannot be loaded
                        resizeMode={'contain'}
                        onLoad={this.onLoad}
                        // controls
                        poster="https://baconmockup.com/300/200/"
                        style={styles.backgroundVideo} />
                </Swiper>


            </View>
        )
    }
}

export default connect(
    state=>({
        mvList:state.mvList
    }),
    { conncatMvLists }
)(VideoPlay)