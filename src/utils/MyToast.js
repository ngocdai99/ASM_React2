import { ToastAndroid } from 'react-native'
const MyToast = {
    show(message){
        ToastAndroid.show(message, ToastAndroid.SHORT)
    }
}

export default MyToast