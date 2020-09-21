

import { AUTH_SUCCESS,AUTH_FAIL,RESET_AUTH,GET_HOME,RESET_PLAYLIST,SET_CURRENT_SONG,SHOW_BIGPLAYER,HIDE_BIGPLAYER,PLAYING,SET_INDEX,STOP_PLAY
	 ,ADD_SONG_TO_PLAY,SHOW_MV_PLAYER,HIDE_MV_PLAYER,SET_CURRENT_MV,SET_LOVE_LIST,SET_LOVE_SINGER,SET_LOVE_SHEET,SET_USER_SHEET,
	 RESET_TIME,SET_CURRENT_TIME,SET_DURATION,RESET_MV_LIST,CONNCAT_MV_LIST,SET_MV_INDEX
	
	} from './action-types.js'
// import Cookies from 'js-cookie'
import AsyncStorage from '@react-native-community/async-storage'
import { reqLogin,reqGetUserInfo,reqLogout,reqRegister,reqGetHome,reqGetSongListDetail,reqGetMusicVKey,
	reqGetLoveSong,reqGetLoveSinger,reqGetLoveSheet,reqGetUserSheet,reqGetUserInfoById,
	reqGetMV,reqGetMvPlay
 
 } from '../api/index'
import Song from '../utils/Song.js'
import { connect } from 'react-redux'
// import { message } from 'antd'

//登陆成功的同步action
const authSuccess = (data) => ({type:AUTH_SUCCESS,data})

//登陆等其他 用户 授权失败的同步action 
const authFail = (data) => ({type:AUTH_FAIL,data})

//重置用户信息的同步action
const resetAuth = (data) => ({type:RESET_AUTH,data})

//登陆成功的异步action 

export const login = (data) => {
	return async dispatch => {
		const response = await reqLogin(data)
		console.log(response)
		if(response.code === 0){
			await AsyncStorage.setItem('userId',response.data._id)
			dispatch(authSuccess(response.data))
			dispatch(setLoveLists())
			dispatch(setUserSheets())
		}else{
			dispatch(authFail(response.msg))
		}
	}
}

export const getUserInfo = (data) => {
	return async dispatch => {
		// const response = await reqGetUserInfo(data)
		const userId = await AsyncStorage.getItem('userId')
		const response = await reqGetUserInfoById({
			userId
		})
		

		if(response.code === 0){
			dispatch(authSuccess(response.data))
			dispatch(setLoveLists())
			dispatch(setUserSheets())
		}else{
			// Cookies.remove('userKey')
			await AsyncStorage.removeItem('userId')
			dispatch(resetAuth(response.msg))
		}
	}
}

export const logout = () => {
	return async dispatch => {
		const response = await reqLogout()
		// Cookies.remove('userKey')
		dispatch(resetAuth(response.msg))
	}
}

export const register = (data) => {
	return async dispatch => {
		const response = await reqRegister(data)
		if(response.code === 0){
			dispatch(authSuccess(response.data))
		}
	}
}

// 首页信息获取的同步action
export const getHome = (data) => ({type:GET_HOME,data})

// 首页信息获取的异步action 
export const getHomeData = () => {
	return async dispatch => {
		const response = await reqGetHome()
		if(response.response.code === 0){
			dispatch(getHome(response.response))
		}
	}
}

//重置播放列表的同步action
export const resetPlaylist = (data) => ({type:RESET_PLAYLIST,data})
//重置播放列表的异步action
export const resetPlaylists = (item) => {
	return async dispatch => {
		const response = await reqGetSongListDetail({disstid:item.tid || item.content_id});
		const songlist = response.response.cdlist[0].songlist
		let playList = []
		for (let cd of songlist) {
			// const re = await reqGetMusicVKey({songmid:cd.mid})
			// if(re.response.req_0.data.midurlinfo[0].vkey !== ''){
			// 	cd.src = re.response.playLists[0]
			// }
			let song = new Song(cd)
			playList.push(song)
			if(playList.length === 1){
				
				const re = await reqGetMusicVKey({songmid:cd.mid})
				if(re.response.req_0.data.midurlinfo[0].vkey !== ''){
					cd.src = re.response.playLists[0]
				}
				
				song = new Song(cd)
				dispatch(setIndex(0))
				dispatch(setCurrentSong(song))
			}
			
			
		}
		dispatch(resetPlaylist(playList))
	}
}

// 设置当前播放歌曲的同步action
export const setCurrentSong = (data) => ({type:SET_CURRENT_SONG,data})
// 设置当前播放歌曲的异步action
export const setCurrentSongs = (data) => {

	return async dispatch => {
		const re = await reqGetMusicVKey({songmid:data.songmid})
		if(re.response.req_0.data.midurlinfo[0].vkey !== ''){
			data.src = re.response.playLists[0]
			dispatch(playing())
		}else{
			data.src = 'http://www.baidu.com'
			// message.warning('vip歌曲,即将跳过。')
		}
		
		dispatch(setCurrentSong(data))
		
	}
}

//显示大播放器
export const showBigplayer = (data) => ({type:SHOW_BIGPLAYER,data})
//隐藏大播放器
export const hideBigPlayer = (data) => ({type:HIDE_BIGPLAYER,data})
//设置播放中
export const playing = (data) => ({type:PLAYING,data})
//设置暂停
export const stopPlay = (data) => ({type:STOP_PLAY,data})
//设置当前序号
export const setIndex = (data) => ({type:SET_INDEX,data})
//添加歌曲到播放列表并播放
export const addSongToPlay = (data) => ({type:ADD_SONG_TO_PLAY,data})
//显示mv播放器
export const showMvPlayer = () => ({type:SHOW_MV_PLAYER})
//隐藏mv播放器
export const hideMvPlayer = () => ({type:HIDE_MV_PLAYER})
//设置当前mv
export const setCurrentMv = (data) => ({type:SET_CURRENT_MV,data})
//设置喜欢的歌曲的同步action
export const setLoveList = (data) => ({type:SET_LOVE_LIST,data})
export const setLoveLists = (data) => {
	return async dispatch => {
		const response = await reqGetLoveSong()
		if(response.code === 0){
			dispatch(setLoveList(response.data.songList))
		}
	}
}

//获取喜欢的歌手的同步action
export const setLoveSinger = (data) => ({type:SET_LOVE_SINGER,data})
//获取喜欢歌手的异步action
export const setLoveSingers = () => {
	return async dispatch => {
		const res = await reqGetLoveSinger()
		if(res.code === 0){
			dispatch(setLoveSinger(res.data.singers))
		}
	}
}
//获取收藏的歌单的同步action
export const setLoveSheet = (data) => ({type:SET_LOVE_SHEET,data})
//获取收藏歌单的异步action
export const setLoveSheets = (data) => {
	return async dispatch => {
		const res = await reqGetLoveSheet()
		if(res.code === 0){
			dispatch(setLoveSheet(res.data.sheets))
		}
	}
}
//获取用户创建的跟单同步action
export const setUserSheet = (data) => ({type:SET_USER_SHEET,data})
//获取用户创建的跟单异步action
export const setUserSheets = () => {
	return async dispatch => {
		const res = await reqGetUserSheet()
		if(res.code === 0){
			dispatch(setUserSheet(res.data.usheets))
		}
	}
}

//RESET_TIME,SET_CURRENT_TIME,SET_DURATION

export const restTime = () => ({type:RESET_TIME})
export const setCurrentTime = (data) => ({type:SET_CURRENT_TIME,data})
export const setDuration = (data) => ({type:SET_DURATION,data})

// RESET_MV_LIST,CONNCAT_MV_LIST


export const resetMvList = (data) => ({type:RESET_MV_LIST,data})

export const conncatMvList = (data) => ({type:CONNCAT_MV_LIST,data})


export const resetMvLists = (mvlist) =>{

	return async dispatch => {
		for(let i = 0;i<mvlist.length;i++){
			const item = mvlist[i]
			const res = await reqGetMvPlay({vid:item.vid})
			const mp4Arr = res.response.getMVUrl.data[item.vid].mp4
			const mvUrl = mp4Arr[mp4Arr.length - 1].freeflow_url[mp4Arr[mp4Arr.length - 1].freeflow_url.length - 1]
			mvlist[i].mvUrl = mvUrl
		}
		dispatch(resetMvList(mvlist))
	}
	
}

const param = {
	area_id: 15,
	version_id: 7,
	page: 1,
	order: 1
}
export const conncatMvLists = () => {
	return async dispatch => {
		param.page = param.page + 1
		const res = await reqGetMV(param)
		const mvList = res.response.mv_list.data.list
		
		for(let i = 0;i<mvList.length;i++){
			const item = mvList[i]
			const res = await reqGetMvPlay({vid:item.vid})
			const mp4Arr = res.response.getMVUrl.data[item.vid].mp4
			const mvUrl = mp4Arr[mp4Arr.length - 1].freeflow_url[mp4Arr[mp4Arr.length - 1].freeflow_url.length - 1]
			mvList[i].mvUrl = mvUrl
		}
		
		dispatch(conncatMvList(mvList))
	}
}

export const setMvIndex = (data) => ({type:SET_MV_INDEX,data})