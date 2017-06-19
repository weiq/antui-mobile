import camera from './camera';              // 摄像头
import gpsLocation from './gpslocation';    // GPS定位
import ScanQRCode from './scanqrcode';      // 扫二维码

// 例: Native.openCamera().then(resp => {});
export const openCamera = camera.activate;                // 打开摄像头

// 例: Native.getCurrentPosition().then(resp => {});
export const getCurrentPosition = gpsLocation.activate;   // GPS定位获取

// 例: Native.scanQRCode().then(resp => {});
export const scanQRCode = ScanQRCode.activate;            // 扫二维码