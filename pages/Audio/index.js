import Sound from 'react-native-sound';

var url = 'http://ws.stream.qqmusic.qq.com/C400002KupEu3xSlga.m4a?guid=4704963080&vkey=E8FCE62BE5164AEB957CED87B9E6ADC7F05198E855F5A2C48BFB94F3E60364FBC2271BA31A1555F4AD636A56C9C90D93CAFCC73784B51D9E&uin=0&fromtag=66'
var url2 = 'http://ws.stream.qqmusic.qq.com/C4000006kNz63gpDYW.m4a?guid=4704963080&vkey=FED3388CA937C3D4FADE25E0B2B6B6DF4FBAF1A4A086D6FBE4358911C9283D1F3EF75C867F886E0B1BC40417B8C18514494043DF4722C10A&uin=0&fromtag=66'

let player = new Sound(url,Sound.MAIN_BUNDLE,(error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      player.setVolume(0.5);
      console.log('duration in seconds: ' + player.getDuration() + 'number of channels: ' + player.getNumberOfChannels());
      player.play( (success) => {
          console.log(success)
      })
})
export default player