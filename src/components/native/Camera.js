import Native from './native';

/**
 * 组件摄像头
 */
const camera = new Native({
  func: "openCamera",
  defaultParam: {width: 800, height: 600},
  nameCB: "cameraRetBack",
});

export default camera;