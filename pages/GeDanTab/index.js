
import React from 'react'
import { reqGetSongListCategories } from '../../api'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'

class GeDanTab extends React.Component {


    state = {
        categories: [],
        param: {
            page: 1,
            limit: 20,
            sortId: '5',
            categoryId: 10000000
        },
        loading: false,
        songList: [],
        total: 10000
    }
    componentDidMount = async () => {
        const res = await reqGetSongListCategories()
        this.setState({
            categories: res.response.data.categories
        })
        console.log(this.state.categories)
    }


    render() {
        const { categories } = this.state

        return (
            <ScrollView style={styles.ScrollView}>

                {
                    categories.map((item, index) => (
                        <View key={index}>
                            <View>
                                <Text style={styles.categoryGroupName}>
                                    {item.categoryGroupName}
                                </Text>
                            </View>
                            <View style={styles.categoryNameCon}>
                                {
                                    item.items.map((category, i) => (
                                        <View key={i} style={styles.name_item}>
                                            <View style={styles.name_item_box}>
                                                <Text style={styles.name_item_Text}>{category.categoryName}</Text>
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    ))
                }

            </ScrollView>
        )
    }
}

export default GeDanTab