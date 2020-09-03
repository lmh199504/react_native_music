

import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import HomeScreen from '../../pages/Home/home';
import MineScreen from '../../pages/mine/mine';



const Tab = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '首页',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('./imgs/dashen.png')}
            selectedImage={require('./imgs/dashen-selected.png')}
          />
        )
      }),
    },

    Mine: {
      screen: MineScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '我',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('./imgs/laoban.png')}
            selectedImage={require('./imgs/laoban-selected.png')}
          />
        )
      }),
    },
  },

  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#06c1ae',
      inactiveTintColor: '#979797',
      style: { backgroundColor: '#ffffff', },
      labelStyle: {
        fontSize: 20, // 文字大小  
      },
    }

  }

);

//   TabBarItem为封装的组件：**[html]** [view plain](http://blog.csdn.net/u013718120/article/details/72357698#) [copy](http://blog.csdn.net/u013718120/article/details/72357698#)

import React, { Component } from 'react';
import { Image } from 'react-native';

export default class TabBarItem extends Component {

  render() {
    return (
      <Image source={this.props.focused ? this.props.selectedImage : this.props.normalImage}
        style={{ tintColor: this.props.tintColor, width: 25, height: 25 }}
      />
    )
  }
} 