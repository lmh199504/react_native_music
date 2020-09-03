import React, {Component} from 'react';
import {Image, StyleSheet, View} from "react-native";
import PropTypes from 'prop-types';
/**
 * 自定义图片
 */
export default class CustomImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadComplete: false,
            type: 0,//0,正常加载，1加载错误，
        }
    }
    static propTypes = {
        uri: PropTypes.string.isRequired,//图片路径，必填
        errImage: PropTypes.number,// 加载错误图片，可不传
        defaultImage:PropTypes.number,//预加载图片
    }
    static  defaultProps = {
        defaultImage:require('../../assets/images/loading.gif'),
        errImage: require('../../assets/images/timg.jpg'), //默认加载错误图片，可在此统一设置
    }

    render() {
        const {uri,defaultImage,errImage, style} = this.props;
        let source = {uri};
        if (this.state.type === 1) {
            source = errImage;
        }
        return (
            <View style={[styles.imgDefault,style]}>
                <Image
                    source={source}
                    style={[styles.imgDefault,{overflow: 'hidden', position: 'absolute',}, style]}
                    onError={(error) => {
                        this.setState({
                            type: 1,
                        })
                    }}
                    onLoadEnd={() => {
                        this.setState({
                            isLoadComplete: true,
                        })
                    }}
                />
                {this.state.isLoadComplete ?null: <Image style={[styles.imgDefault,style]} source={defaultImage}/> }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    imgDefault: {
        width: 100,
        height: 100,
    },
});