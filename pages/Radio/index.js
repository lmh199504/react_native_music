

import React from 'react'
import { View } from 'react-native'
import { Tabs,ActivityIndicator } from '@ant-design/react-native'
import { reqGetRadioLists } from '../../api'
import RadioItem from './RadioItem'

class Radio extends React.Component {
    state = {
        groupList:[],
        tabs:[],
        loading:false
	}

    componentDidMount = () => {
        this.setState({
            loading:true
        })

        reqGetRadioLists().then(res => {
            let tabs = []
            res.response.data.data.groupList.forEach((item) => {
                tabs.push({
                    title:item.name
                })
            })
            this.setState({
                groupList:res.response.data.data.groupList,
                tabs,
                loading:false
            })
		}).catch(() => {
			this.setState({
                loading:false
            })
		})
    }

    render() {
        const style = {
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            backgroundColor: '#fff',
        };
        const { tabs,groupList,loading } = this.state

        return (
            <View style={{ flex: 1 }}>
                <ActivityIndicator
                    animating={loading}
                    size="large"
                    text="Loading..."
                    toast
                />
                <Tabs tabs={tabs} swipeable={true} tabBarActiveTextColor="#f73c40" tabBarInactiveTextColor="#000" tabBarUnderlineStyle={{ backgroundColor: "#f73c40" }}>
                    {
                        groupList.map(item => (
                            <View style={style} key={item.type}>
                                <RadioItem radioList={item.radioList}/>
                            </View>
                        ))
                    }
                </Tabs>
            </View>
        )
    }
}

export default Radio