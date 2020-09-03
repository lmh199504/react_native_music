

/* 
	包含多个reducer函数：根据老的state和指定的action返回一个新的state
 */
import { combineReducers } from 'redux'
import { AUTH_SUCCESS,AUTH_FAIL,RESET_AUTH,GET_HOME,RESET_PLAYLIST,SET_CURRENT_SONG,SHOW_BIGPLAYER,HIDE_BIGPLAYER,PLAYING,SET_INDEX,STOP_PLAY,ADD_SONG_TO_PLAY ,
	SHOW_MV_PLAYER,HIDE_MV_PLAYER,SET_CURRENT_MV,SET_LOVE_LIST,SET_LOVE_SINGER,SET_LOVE_SHEET,SET_USER_SHEET
} from './action-types.js'


const initUser = {
	username:"", //用户名
	msg:''  ,//错误信息
}
function user(state=initUser,action){
	switch(action.type){
		case AUTH_SUCCESS:
			return action.data
		case AUTH_FAIL:
			return {...state,msg:action.data }
		case RESET_AUTH:
			return {...initUser,msg:action.data}
		default:
			return state
	}
}


const initHome = {}

function homeData(state=initHome,action){
	switch(action.type){
		case GET_HOME:
			return action.data
		default:
			return state
	}
}
const initPlayList = []
function playList(state = initPlayList,action){
	switch (action.type){
		case RESET_PLAYLIST:
			return action.data
		case ADD_SONG_TO_PLAY:
			let arr = [...state]
			arr.splice(action.data.index,0,action.data.song)
			return arr
		default:
			return state
	}
}
const initCurrentSong = {}
function currentSong(state = initCurrentSong,action){
	switch (action.type){
		case SET_CURRENT_SONG:
			if(action.data.songmid){
				return {...state,...action.data}	
			}else{
				return action.data
			}
			
		default:
			return state
	}
}

//显示隐藏播放器
const initPlayer = false 
function bigPlayer(state = initPlayer,action){
	switch (action.type){
		case SHOW_BIGPLAYER:
			return true
		case HIDE_BIGPLAYER:
			return false
		default:
			return state
	}
}
const initIsPlay = false
function isPlay(state=initIsPlay,action){
	switch (action.type){
		case PLAYING:
			return true
		case STOP_PLAY:
			return false
		default:
			return state
	}
}
function currentIndex(state=-1,action){
	switch (action.type){
		case SET_INDEX:
			return action.data
			
		default:
			return state
	}
}

function isShowMv(state=false,action){
	switch (action.type){
		case SHOW_MV_PLAYER:
			return true
		case HIDE_MV_PLAYER:
			return false
		default:
			return state
	}
}
function currentMv(state={},action){
	switch (action.type){
		case SET_CURRENT_MV:
			return action.data
		default :
			return state	
	}
}

function loveList(state=[],action){
	switch (action.type){
		case SET_LOVE_LIST:
			return action.data
		default:
			return state
	}
}

function loveSinger(state=[],action){
	switch (action.type){
		case SET_LOVE_SINGER:
			return action.data
		default:
			return state	
	}
}

function loveSheet(state=[],action){
	switch (action.type){
		case SET_LOVE_SHEET:
			return action.data
		default:
			return state	
	}
}

function userSheet(state=[],action){
	switch (action.type){
		case SET_USER_SHEET:
			return action.data
		default:
			return state	
	}
}


export default combineReducers({
	user,
	homeData,
	playList,
	currentSong,
	bigPlayer,
	isPlay,
	currentIndex,
	isShowMv,
	currentMv,
	loveList,
	loveSinger,
	loveSheet,
	userSheet
})