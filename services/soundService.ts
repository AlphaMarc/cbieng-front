const Sound = require('react-native-sound')

export class SoundService {

    static cBieng = new Sound('cbieng.mp3', Sound.MAIN_BUNDLE, (error : any) => {
        if (error) {
            console.warn(error)
        }
    })

    static playSong = function (song :any ) { song.play((success : any) => {
        if (!success) {
        console.warn('Sound did not play')
        } else {
            console.warn('sound did play')
        }
    })}

}