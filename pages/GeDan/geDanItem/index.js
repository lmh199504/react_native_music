


import React from 'react'

import { View,ScrollView,Text } from 'react-native'
import PropTypes from 'prop-types'
import {
    ActivityIndicator
} from '@ant-design/react-native';

import { reqGetHomeClass } from '../../../api'
import styles from './styles'
import MyImg from '../../../components/Image'
import { formatNum } from '../../../utils/index'
class GenDanItem extends React.Component{

    static propTypes = {
        titleid: PropTypes.number.isRequired
    }

    state = {
		classList:[],
		loading:false
	}

    componentDidMount = () => {
        this.getData()
    }

    getData = () => {
        const { titleid } = this.props

		this.setState({
			loading:true
		})
		
		reqGetHomeClass({titleid}).then(res => {
			if(titleid === -1){
				if(res.data.code === 0 &&res.data.recomPlaylist.code === 0){
					this.setState({
						classList:res.data.recomPlaylist.data.v_hot
					})
				}
			}else{
				if(res.data.code === 0 &&res.data.playlist.code === 0){
					this.setState({
						classList:res.data.playlist.data.v_playlist
					})
				}
			}
            
			this.setState({
				loading:false
			})
			
		}).catch(() => {
			this.setState({
				loading:false
			})
		})
	}

    render(){

        const { classList,loading } = this.state
        return(
            <ScrollView style={ styles.ScrollView }>
                <ActivityIndicator
                    animating={loading}
                    size="large"
                    text="Loading..."
                    style={ styles.loading }
                />
                <View style={ styles.container }>
                    {
                        classList.map((item,index) => (
                            <View key={index} style={ styles.genDan_item }>
                                <View>
                                    <MyImg uri={ item.cover_url_big || item.cover } style={ styles.coverImg }/>
                                </View>
                                <Text numberOfLines={1} style={ styles.genDanTitle }>{item.title}</Text>
                                <Text style={ styles.listen_num } numberOfLines={1}>播放量：{ formatNum(item.listen_num || item.access_num) }</Text>
                            </View>
                        ))
                    }
                    
                </View>
            </ScrollView>
        )
    }
}

export default GenDanItem