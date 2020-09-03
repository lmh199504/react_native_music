

import React from 'react'
import { Text, TouchableHighlight } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import HomeDrawer from '../HomeDrawer'
import SearchScreen from '../SearchScreen'
import PlayScreen from '../PlayScreen'
import LoginScreen from '../LoginScreen'
import GeDanScreen from '../GeDan'
import GeDanTabScreen from '../GeDanTab'
import RadioScreen from '../Radio'
import DayScreen from '../DaySuggest'
import RankScreen from '../ranklist'
import SingerScreen from '../singer'
import MVScreen from '../mv'
import DigitalScreen from '../digital'
import { connect } from "react-redux";
import Sound from 'react-native-sound';


const Stack = createStackNavigator();
class Main extends React.Component {
    state = {
        cSong: {},
        player: null
    }
    componentDidMount = () => {

    }

    playNext = () => {
        const { currentIndex,playList } = this.props
        if(currentIndex<playList.length - 1){
            this.props.setIndex(currentIndex + 1)
            this.props.setCurrentSongs(playList[currentIndex + 1])
        }else{
            this.props.setIndex(0)
            this.props.setCurrentSongs(playList[0])
        }
    }

    componentDidUpdate = () => {
        const { cSong } = this.state
        const { currentSong } = this.props
        if (currentSong.songmid && currentSong.songmid !== cSong.songmid) {
            this.setState({
                cSong: currentSong
            })

            let player = new Sound(currentSong.src, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                player.setVolume(0.5);
                this.setState({
                    player
                })
                console.log('duration in seconds: ' + player.getDuration() + 'number of channels: ' + player.getNumberOfChannels());
                player.play((success) => {
                    console.log("播放结束了")
                })
            })
        }

    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={'Home'} >
                    <Stack.Screen name="Home" component={HomeDrawer} options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        header: () => { return null }
                    }} />
                    <Stack.Screen name="Search" component={SearchScreen} options={{
                        title: "搜索",
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        header: () => (null)
                    }} />
                    <Stack.Screen name="Play" component={PlayScreen} options={{
                        title: "播放",
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                    }} />
                    <Stack.Screen name="Login" component={LoginScreen} options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        header: () => { return null }
                    }} />
                    <Stack.Screen name="GeDan" component={GeDanScreen} options={
                        ({ navigation }) => ({
                            title: "歌单",
                            headerTitleAlign: "center",
                            headerRight: () => <ToTab navigation={navigation} />,
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        })
                    } />
                    <Stack.Screen name="GeDanTab" component={GeDanTabScreen} options={{
                        title: "全部歌单",
                        headerTitleAlign: "center",
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                    }} />

                    <Stack.Screen name="Radio" component={RadioScreen} options={{
                        title: "电台",
                        headerTitleAlign: "center",
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                    }} />

                    <Stack.Screen name="Day" component={DayScreen} options={{
                        title: "每日推荐",
                        headerTitleAlign: "center",
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                    }} />

                    <Stack.Screen name="Rank" component={RankScreen} options={{
                        title: "排行榜",
                        headerTitleAlign: "center",
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                    }} />
                    <Stack.Screen name="Singer" component={SingerScreen} options={{
                        title: "歌手",
                        headerTitleAlign: "center",
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                    }} />
                    <Stack.Screen name="MV" component={MVScreen} options={
                        ({ navigation }) => ({
                            title: "MV",
                            headerTitleAlign: "center",
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                        })
                    } />
                    <Stack.Screen name="Digital" component={DigitalScreen} options={{
                        title: "数字专辑",
                        headerTitleAlign: "center",
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                    }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
export default connect(
    state => ({
        user: state.user,
        playList: state.playList,
        currentSong: state.currentSong,
        bigPlayer: state.bigPlayer,
        isPlay: state.isPlay,
        currentIndex: state.currentIndex,
        loveList: state.loveList,
        userSheet: state.userSheet
    })
)(Main)



class ToTab extends React.Component {
    render() {
        return (<TouchableHighlight onPress={() => this.props.navigation.push("GeDanTab")}>
            <Text style={{ marginRight: 20 }}>歌单分类</Text>
        </TouchableHighlight>)
    }
}