
import moment from 'moment'
import { reqGetMusicVKey } from '../api'
//格式化数字
export const formatNum = (num) => {
	if(num>10000){
		return (num / 10000).toFixed(1) + '万' 
	}else{
		return num
	}
}


//格式化歌曲时间

export const formatSongTime = (time) => {
	let min = parseInt( time / 60)
	let sec = time%60
	min = min > 9 ? min : '0' + min
	sec = sec > 9 ? sec : '0' + sec
	return min + ':' + sec
}

//检查图片是否存在
export const CheckImgExists = (imgurl) => {
    var ImgObj = new Image(); //判断图片是否存在
    ImgObj.src = imgurl;
    //加了一个onload事件，赋值成功后进行加载之后获取宽高，
    ImgObj.onload = () => {
		
        //没有图片，则返回-1
        if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
			console.log('图片存在')
            return imgurl      
         } else {
			 console.log('tupbc')
            return 'https://y.gtimg.cn/music/photo_new/T001R150x150M0000025NhlN2yWrP4.jpg?max_age=2592000'
        }
    }
}

//格式化发布时间

export const formatPubTime = (time) => {
	var date = new Date(time*1000)
	let y = date.getFullYear()
	let m = date.getMonth()
	let d = date.getDay()
	return y+'-'+ (m+1>9?m+1 : '0' + (m+1)) +'-'+  (d>9?d:'0'+d)
}

export class SongFromNewDisc{
	constructor(item){
		this.songmid = item.songmid
		this.singer = item.singer
		this.title = item.songname
		this.interval = item.interval
		this.cover = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`
				  // `https://y.gtimg.cn/music/photo_new/T002R90x90M000${item.album.mid}.jpg?max_age=2592000`
		this.src = item.src || ''
		this.checked = false
		// this.album = item.album
		this.albumName = item.albumname
	}
}



export const isLoveSong = (song,list) => {
	
	if(!song.songmid){
		return false
	}
	const index = list.findIndex(item => song.songmid === item.songmid)
	return (index === -1 ? false:true )
}

export const isLoveSinger = (singer,list) => {
    if(!singer.singermid){
        return false
    }
    const index = list.findIndex(item => item.singermid === singer.singermid)
    return (index === -1 ? false:true )
}

export const isLoveSheet = (sheet,list) => {
    if(!sheet.disstid){
        return false
    }
    const index = list.findIndex(item => item.disstid === sheet.disstid)
    return (index === -1 ? false:true )
}

export const downFile = (url,filename) => {
    
    return new Promise((resolve,reject) => {
        var downUrl = url.replace('http://ws.stream.qqmusic.qq.com','/apc')
        // window.open(downUrl)
        var xhr = new XMLHttpRequest();
        xhr.open('GET', downUrl);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.responseType = "blob";
        xhr.onprogress = function (event) {
            if (event.lengthComputable) {
                // var load_process = ((event.loaded/event.total)*100).toFixed(1)
                // console.log(load_process)
            }
        };
        xhr.onloadstartchange = function(){
            console.log('onloadstartchange')
        }
        xhr.onloadedmetadata = function(){
            console.log('onloadedmetadata')
        }
        xhr.onload = async function (oEvent) {


            if (xhr.readyState === 4 && xhr.status === 200) {

                

                var blob = new Blob([xhr.response], {type: 'audio/mp3'});
                var csvUrl = URL.createObjectURL(blob);
                var link = document.createElement('a');
                link.href = csvUrl;
                link.download = filename;
                var event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                link.dispatchEvent(event);
                URL.revokeObjectURL(csvUrl);  
                // await sleep(3000)
                resolve('success')
            }else{
                reject('error')
            }
        }
        xhr.onerror = function(){
            // console.log("下载失败")
            reject("down fail")
        }
        xhr.send();
    })



    
}


export const formatMoment = (timestamp, pattern = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(timestamp).format(pattern)
}


export const dwonFromSongMid = async (item) => {
    const res = await reqGetMusicVKey({songmid:item.songmid})
    if(res.response.req.data.vkey !== ""){
        const result = await downFile(res.response.playLists[0],item.title)
        console.log(result)
    }else{

    }
}

export const sleep = async (time) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve()
        },time)
    })
}



//请求安卓系统相应权限
export function requestPermission(androidPermissionName, callBack, iosCallBack) {
    if (!IS_IOS) {
        PermissionsAndroid.request(androidPermissionName).then((response) => {
            if (response === PermissionsAndroid.RESULTS.GRANTED) {
                callBack && callBack();
            }
        })
    } else {
        iosCallBack && iosCallBack();
    }
}