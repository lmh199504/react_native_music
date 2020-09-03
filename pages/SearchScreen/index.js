
import React from 'react'
import { Text, ScrollView, TextInput, View, TouchableHighlight, Image, StatusBar } from 'react-native'
import styles from './styles'
import { reqGetHotkey, reqGetSmartbox, reqGetSearchByKey } from '../../api'
import AsyncStorage from '@react-native-community/async-storage';
import { formatNum } from '../../utils'

let timer = null
class Search extends React.Component {
    state = {
        hotKeyArr: [],
        searchValue: '',
        inIput: false,
        resultSong: [],
        resultMv: [],
        resultSinger: [],
        resultAblum: [],
        searchHistory: []
    }
    componentDidMount = async () => {
        reqGetHotkey().then(res => {
            this.setState({
                hotKeyArr: res.response.data.hotkey
            })
        })
        const result = await AsyncStorage.getItem('searchkey')
        if (result) {
            const searchArr = JSON.parse(result)
            this.setState({
                searchHistory: searchArr
            })
        }
    }

    _onTextInput = (input) => {
        const searchValue = input.nativeEvent.text
        clearTimeout(timer)
        this.setState({
            searchValue
        })

        timer = setTimeout(() => {
            if (searchValue !== '') {
                this.search(searchValue)
            }
        }, 500)
    }

    _onFocus = () => {
        this.setState({
            inIput: true
        })
    }

    _onBlur = () => {
        try {
            setTimeout(() => {
                this.setState({
                    inIput: false
                })
            }, 500)
        } catch (error) {

        }
    }

    search = (value) => {
        if (value === '') {
            return
        }
        reqGetSmartbox({ key: value }).then(async (res) => {
            this.setState({
                resultAblum: res.response.data.album.itemlist,
                resultMv: res.response.data.mv.itemlist,
                resultSinger: res.response.data.singer.itemlist,
                resultSong: res.response.data.song.itemlist
            })

            let searchArr = await AsyncStorage.getItem('searchkey')

            if (searchArr) {
                searchArr = JSON.parse(searchArr)
                const index = searchArr.findIndex(key => key === value)
                if (index === -1) {
                    searchArr.unshift(value)
                } else {
                    //先去掉该元素
                    searchArr.splice(index, 1)
                    //再放入第一位
                    searchArr.unshift(value)
                }
                if (searchArr.length >= 5) {
                    searchArr.length = 5
                }
                this.setState({
                    searchHistory: searchArr
                })
                await AsyncStorage.setItem('searchkey', JSON.stringify(searchArr))
            } else {
                searchArr = []
                searchArr.unshift(value)
                if (searchArr.length >= 5) {
                    searchArr.length = 5
                }
                this.setState({
                    searchHistory: searchArr
                })
                await AsyncStorage.setItem('searchkey', JSON.stringify(searchArr))

            }

        }).catch(() => {

        })


    }
    render() {
        const { inIput, hotKeyArr, resultSong, resultSinger, resultAblum, resultMv, searchValue, searchHistory } = this.state

        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor="#999" />
                <View style={styles.header}>
                    <View style={styles.back}>
                        <TouchableHighlight onPress={() => this.props.navigation.goBack()}>
                            <Image style={styles.goBack} source={require('../../assets/images/goback.png')} />
                        </TouchableHighlight>
                    </View>


                    <View style={styles.TextInputCon}>
                        <TextInput style={styles.TextInput} placeholderTextColor="#8c8c8c" placeholder="搜索歌曲/歌手/专辑/MV"
                            onFocus={() => this._onFocus()}
                            onBlur={() => this._onBlur()}
                            onTextInput={(input) => this._onTextInput(input)} />
                    </View>
                </View>
                {
                    inIput && !!searchValue ? <View style={styles.searchResult}>
                        {/* 单曲 */}
                        {
                            resultSong.length > 0 ? <View>
                                <View>
                                    <Text style={styles.resultTitle}>单曲</Text>
                                </View>
                                <View>
                                    {
                                        resultSong.map((item, index) => (
                                            <View key={index} style={styles.resultItem}>
                                                <Text style={styles.name}>{item.name}</Text>
                                                <Text style={styles.singer}>-{item.singer}</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View> : null
                        }
                        {/* 歌手 */}
                        {
                            resultSinger.length > 0 ? < View >
                                <View>
                                    <Text style={styles.resultTitle}>歌手</Text>
                                </View>

                                <View>
                                    {
                                        resultSinger.map((item, index) => (
                                            <View key={index} style={styles.resultItem}>
                                                <Text style={styles.name}>{item.name}</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View> : null
                        }

                        {/* 专辑 */}
                        {
                            resultAblum.length > 0 ? <View>
                                <View>
                                    <Text style={styles.resultTitle}>专辑</Text>
                                </View>
                                <View>
                                    {
                                        resultAblum.map((item, index) => (
                                            <View key={index} style={styles.resultItem}>
                                                <Text style={styles.name}>{item.name}</Text>
                                                <Text style={styles.singer}>-{item.singer}</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View> : null
                        }


                        {
                            resultMv.length > 0 ? <View>
                                <View>
                                    <Text style={styles.resultTitle}>MV</Text>
                                </View>
                                <View>
                                    {
                                        resultMv.map((item, index) => (
                                            <View key={index} style={styles.resultItem}>
                                                <Text style={styles.name}>{item.name}</Text>
                                                <Text style={styles.singer}>-{item.singer}</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View> : null
                        }

                    </View> : null
                }




                <ScrollView>
                    <View style={styles.title}>
                        <Text>历史记录</Text>
                        <Image source={require('../../assets/images/del.png')} style={styles.delImg} />
                    </View>
                    <View style={styles.history}>
                        {
                            searchHistory.map((item, index) => (
                                <View style={styles.historyItem} key={index}>
                                    <Text style={styles.historyItem_Text}>{item}</Text>
                                </View>
                            ))
                        }
                    </View>

                    <View>
                        <Text>热搜榜</Text>
                    </View>
                    <View style={{}}>
                        {
                            hotKeyArr.map((item, index) => (
                                index < 10 ? <View style={styles.hotItem} key={index}>
                                    <View style={styles.hotLeft}>
                                        <View style={styles.number}>
                                            <Text style={[styles.number_Text, index < 3 ? styles.red : '']}>{index + 1}</Text>
                                        </View>
                                        <View>
                                            <Text>{item.k}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.hotRight}>
                                        <Text>{formatNum(item.n)}</Text>
                                    </View>
                                </View> : null
                            ))
                        }
                    </View>
                </ScrollView>
            </View >

        )
    }
}


export default Search