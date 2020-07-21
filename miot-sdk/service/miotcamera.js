/**
 * @export public
 * @doc_name 智能摄像机模块
 * @doc_index 7
 * @doc_directory service
 * @module miot/service/miotcamera
 * @description 摄像机 API
 *
 */
import { NativeModules, Platform } from 'react-native';
import { report } from "../decorator/ReportDecorator";
/**
 * MISS 命令
 * @namespace MISSCommand
 */
export const MISSCommand = {
  MISS_CMD_VIDEO_START: 0x102,	/** < C->S, video start */
  MISS_CMD_VIDEO_STOP: 0x103,	/** < C->S, video stop */
  MISS_CMD_AUDIO_START: 0x104,	/** < C->S, audio start */
  MISS_CMD_AUDIO_STOP: 0x105,	/** < C->S, audio stop */
  MISS_CMD_SPEAKER_START_REQ: 0x106,	/** < C->S, speaker start req */
  MISS_CMD_SPEAKER_START_RESP: 0x107,	/** < C->S, speaker start resp */
  MISS_CMD_SPEAKER_STOP: 0x108,	/** < C->S, speaker stop */
  MISS_CMD_STREAM_CTRL_REQ: 0x109,	/** < C->S, video quality req */
  MISS_CMD_STREAM_CTRL_RESP: 0x10A,	/** < S->C, video quality response */
  MISS_CMD_GET_AUDIO_FORMAT_REQ: 0x10B,	/** < C->S, get audio format */
  MISS_CMD_GET_AUDIO_FORMAT_RESP: 0x10C, /** < S->C, audio format response */
  MISS_CMD_PLAYBACK_REQ: 0x10D,	/** < C->S, playback request */
  MISS_CMD_PLAYBACK_RESP: 0x10E,	/** < S->C, playback response */
  MISS_CMD_PLAYBACK_SET_SPEED: 0x10F,	/** < C->S, playback speed */
  MISS_CMD_DEVINFO_REQ: 0x110,	/** < C->S, device info request */
  MISS_CMD_DEVINFO_RESP: 0x111,	/** < S->C, device info response */
  MISS_CMD_MOTOR_REQ: 0x112,	/** < C->S, device motor control */
  MISS_CMD_MOTOR_RESP: 0x113	/** < S->C, device motor control response */
};
Object.freeze(MISSCommand);
/**
 * MISS Error
 * @namespace MISSError
 */
export const MISSError = {
  MISS_NO_ERROR: 0, // 0
  MISS_ERR_CLOSE_BY_LOCAL: 1,
  MISS_ERR_CLOSE_BY_REMOTE: 2,
  MISS_ERR_AUTHORIZED: 3,
  MISS_ERR_CLOSE_BY_TIMEOUT: 4,
  MISS_ERR_NOT_SUPPORT_VENDOR: 5, // 5
  MISS_ERR_ALREADY_INITIALIZED: 6,
  MISS_ERR_NOT_INITIALIZED: 7,
  MISS_ERR_ABORTED: 8,
  MISS_ERR_CREATE_MUTEX: 9,
  MISS_ERR_CREATE_THREAD: 10, // 10
  MISS_ERR_NOT_ENOUGH_MEMORY: 11,
  MISS_ERR_CREATE_SOCKET: 12,
  MISS_ERR_SOCKET_OPTIONS: 13,
  MISS_ERR_SOCKET_BIND: 14,
  MISS_ERR_MAX_SESSION: 15, // 15
  MISS_ERR_SESSION_HANDLE: 16,
  MISS_ERR_TIMOUT: 17,
  MISS_ERR_RPC_SEND: 18,
  MISS_ERR_RPC_JSON_PARSE: 19,
  MISS_ERR_DISCONNECT_TIMOUT: 20, // 20
  MISS_ERR_CREATE_CHANNEL: 21,
  MISS_ERR_INVALID_ARG: 22,
  MISS_ERR_CLIENT_NO_SUPPORT: 23,
  MISS_ERR_MAX_CHANNEL: 24,
  MISS_ERR_NO_RESPONSE: 25, // 25
  MISS_ERR_NO_BUFFER: 26,
  MISS_ERR_CHANNEL_EXCEED_MAX_SIZE: 27,
  MISS_ERR_FUNCTION_ALREADY_CALLED: 28,
  MISS_ERR_FRAME_DECRYPTO: 29,
  MISS_ERR_FRAME_ENCTYPTO: 30, // 30
  MISS_ERR_FUNCTION_DISABLE: 31,
  MISS_ERR_SLEEPING: 32,
  MISS_ERR_OFFLINE: 33,
  MISS_ERR_CONNECT_SERVER: 34 // 34
};
Object.freeze(MISSError);
/**
 * MISS Connection State
 * @namespace MISSConnectState
 */
export const MISSConnectState = {
  MISS_Connection_Disconnected: 0,
  MISS_Connection_Connecting: 1,
  MISS_Connection_Connected: 2,
  MISS_Connection_ReceivedFirstFrame: 3
};
Object.freeze(MISSConnectState);
/**
 * Alarm Event Type
 * @namespace AlarmEventType
 */
export const AlarmEventType = {
  EventType_All: 1 << 0,
  EventType_AI: 1 << 1,
  EventType_Face: 1 << 2,
  EventType_KnownFace: 1 << 3,
  EventType_PeopleMotion: 1 << 4,
  EventType_ObjectMotion: 1 << 5,
  EventType_BabyCry: 1 << 6
};
Object.freeze(AlarmEventType);
/**
 * @export
 */
class IMiotCamera {
  /**
   * 连接设备
   * @param {string} callbackName 链接状态变更回调 { state: MISSConnectState, error: MISSError }
   */
  @report
  connectToDeviceWithStateChangeCallBack(callbackName, did = Device.deviceID) {
     return null
  }
  /**
   * 断开连接设备
   * @since 10033
   */
  @report
  disconnectToDevice(did = Device.deviceID) {
     return null
  }
  /**
   * 发送miss命令到设备
   * @param {MISSCommand} command miss 命令
   * @param {object} paramsJson 参数 要求是符合jsonObj形式的数据
   * @returns {Promise<number>} a promise with return code
   */
  @report
  sendP2PCommandToDevice(command, paramsJson, did = Device.deviceID) {
     return Promise.resolve(null);
  }
  /**
     * 发送miss命令到设备 主要处理部分model发送命令的参数不是json格式，也不是 byte数组编码得到的str，而是普通的字串
     * @param {MISSCommand} command miss 命令  如果是tutk，米家标准的命令号要转为用Miss的命令号，如果是自定义命令 直接发送
     * @param {string} paramStr 参数: string参数，非json 非 base64
     * @returns {Promise<number>} a promise with return code
     */
  @report
  sendP2PCommandToDeviceWithStringParam(command, paramStr, did = Device.deviceID) {
    if (Platform.OS === 'android') {
       return Promise.resolve(null);
    } else {
      return Promise.reject("ios platform currently unsupport");
    }
  }
  /**
     * 发送miss命令到设备 主要处理部分model发送命令的参数不是json格式，而是byte数组形式的命令。 byte数组请用base64编码得到string再调用这个接口。
     * @warn miss固件 android端不支持直接发送byte[]，此时调用该接口会直接返回错误。
     * @param {MISSCommand} command miss 命令  如果是tutk，米家标准的命令号要转为用Miss的命令号，如果是自定义命令 直接发送
     * @param {string} base64Param 参数:  byte[]数组base64 encode后的字串
     * @returns {Promise<number>} a promise with return code
     */
  @report
  sendP2PCommandToDeviceWithBase64Param(command, base64Param, did = Device.deviceID) {
    if (Platform.OS === 'android') {
       return Promise.resolve(null);
    } else {
      return Promise.reject("ios platform currently unsupport");
    }
  }
  /**
   * 注册接收命令回调
   * @param {string} callbackName 收到p2p command回调 { command: MISSCommand, data: Object/Base64String }
   */
  @report
  bindP2PCommandReceiveCallback(callbackName, did = Device.deviceID) {
     return null
  }
  /**
   * 发送RDT命令到设备
   * @param {object} params json data
   * @returns {Promise<number>} a promise with return code
   */
  @report
  sendRDTJSONCommandToDevice(params, did = Device.deviceID) {
     return Promise.resolve(null);
  }
  /**
   * 发送RDT命令到设备
   * @param {string} params base64 encoded data
   * @returns {Promise<number>} a promise with return code
   */
  @report
  sendRDTCommandToDevice(params, did = Device.deviceID) {
     return Promise.resolve(null);
  }
  /**
   * 注册接收RDT命令回调
   * @param {string} callbackName 收到RDT回调 { data: Object/Base64String }
   */
  @report
  bindRDTDataReceiveCallback(callbackName, did = Device.deviceID) {
     return null
  }
  /**
   * 打开报警视频页面
   * 这个接口按照现有的标准报警视频交互，报警视频列表页筛选项默认有：全部、物体移动、人性移动、AI；如果是vip用户，就再加上人脸、宝宝哭声这两个筛选项；
   * 这里添加这个localRecognizeEvents的目的是：主要处理，部分model不是vip，也会有宝宝哭声的筛选项，这个参数的作用：用户如果不是vip，但是又有默认选项之外的筛选项时，通过这个参数来添加人脸或者宝宝哭声的选项。
   *
   * 现在除创米021那几款摄像头，都只传0就行了
   * @since 10033
   * @param {number} AlarmEventType 取或
   */
  @report
  showAlarmVideos(localRecognizeEvents, did = Device.deviceID) {
     return null
  }
  /**
   * 打开云储存页面
   * @since 10033
   * @param {BOOL} supportHevc 是否支持 H265
   * @param {useV2API} 是否使用 V2 接口
   */
  @report
  showCloudStorage(supportHevc, useV2API, did = Device.deviceID) {
     return null
  }
  /**
   * 打开云储存设置页面
   * @since 10033
   */
  @report
  showCloudStorageSetting(did = Device.deviceID) {
     return null
  }
  /**
   * 打开报警视频播放页面
   * @since 10037
   * @param data  jsonobj=>str 从push点击跳转进来后，如果是smartscene 就把extra字段捞出来放到这里
   */
  @report
  openAlarmVideoPlayer(data) {
     return null
  }
  /**
   * 打开人脸识别页面
   * @since 10033
   * @param {BOOL} isVip
   */
  @report
  showFaceRecognize(isVip, did = Device.deviceID) {
     return null
  }
  /**
   * 
   * 注册收到数据速率 Bytes per second，每秒回调一次
   * @param {string} callbackName 回调名称 { rate: number }
   * @since 10036
   */
  @report
  bindBPSReceiveCallback(callbackName, did = Device.deviceID) {
     return null
  }
  /*
  * 拉取当前正在播放时间戳 js端控制拉取节奏
  */
  @report
  getCurrentFrameInfo(did = Device.deviceID) {
     return Promise.resolve(null);
  }
  /**
  * 执行FFmpeg命令
  * @param {object} command string
  * @param {String} callback string
  * @param {Block} complete (eror) =>
  */
  @report
  ffmpegCommand(command, callbackName, complete) {
     return null
  }
  /**
   * 下载m3u8视频并合成mp4
   * @since 10038
   * @param fileId
   * @param filePath
   * @param callbackName
   * @param isAlarm 是否报警视频
   * @param videoCodec 视频编码如 "H264", "H265"
   * @returns
   *    state : 1. onStart (开始下载)  2. onComplete（下载完成）  3. onError（失败）  4. onProgress（下载进度）
   *    errorInfo : 失败描述（state = onError时才有）
   *    progress : 下载进度0 - 100 (state = onProgress时才有)
   */
  @report
  downloadM3U8ToMP4(fileId, filePath, callbackName, isAlarm = false, videoCodec = 'H265', did = Device.deviceID) {
  }
  /**
   * 获取报警视频m3u8播放地址
   * @since 10037
   * @param fileId 视频fileId
   * @param isAlarm 是否报警视频
   * @param videoCodec 视频编码如 "H264", "H265"
   */
  @report
  getVideoFileUrl(fileId, isAlarm, videoCodec, did = Device.deviceID) {
     return Promise.resolve(null);
  }
  /**
   * 获取视频缩略图片接口（如报警视频列表缩略图）
   * @since 10037
   * @param {string} imgStoreId 图片id
   * @returns {Promise<String>} 文件路径
   */
  @report
  getFileIdImage(imgStoreId, did = Device.deviceID) {
     return Promise.resolve(null);
  }
  /**
   * 获取人脸图片接口
   * @since 10040
   * @param {string} faceId 人脸id
   * @returns {Promise<String>} 文件路径
   */
  @report
  getFaceImgWithDid(faceId, did = Device.deviceID) {
     return Promise.resolve(null);
  }
  /**
   * 获取通用图片接口（如云存储视频缩略图）
   * @since 10041
   * @param {string} imgId 图片唯一标识ID 如imgStoreId
   * @param {json string} hostParams 接口信息: 如获取云存储缩略图{"prefix":"business.smartcamera.", "method":"GET", "path":"/miot/camera/app/v1/img"}   注：key固定的
   * @param {json string} pathParams 请求参数: 如获取云存储缩略图{"did":"xxxx", "fileId":"xxxx", "stoId":"xxxxxxxx"}
   * @returns {Promise<String>} 文件路径
   */
  @report
  getCommonImgWithParams(imgId, hostParams, pathParams, did = Device.deviceID) {
     return Promise.resolve(null);
  }
  /**
 * 通知native端现在是不是回看时间轴模式
 * @since 10038
 * @param {boolean} isTimelinePlayback 是不是回看时间轴模式
 * @returns {null}
 */
  @report
  setTimelinePlaybackMode(isTimelinePlayback, did = Device.deviceID) {
     return null
  }
  /**
    * 绑定回调，native端 在时间轴回看的模式下，如果从点播切换成直播了，就通过这个回调告诉js端
    * @since 10038
    * @param {string} timelinePlaybackEndListenerName native端在回看时间轴模式下，从点播切换成直播了，通过DeviceEmitter发送这个时间给js端
    * @returns {null}
  */
  @report
  bindTimelinePlaybackEndListener(timelinePlaybackEndListenerName, did = Device.deviceID) {
     return null
  }
  /**
   * 获取当前语音对讲过程中的音量大小
   * @since 10038
   * return {promise}  
   */
  @report
  getCurrentSpeakerVolumn(did = Device.deviceID) {
     return Promise.resolve(null);
  }
  /**
   * 设置当前model是不是miss固件
   * @param boolean isMissFirmware  是否是miss固件，true 是； false tutk固件。
   * @since 10038
   */
  @report
  setCurrentDeviceIsMissFirmware(isMissFirmware, did = Device.deviceID) {
     return null
  }
  /**
   * 打开摄像机NAS存储设置页面。
   * 
   * @since 10038
   * 
   */
  @report
  showNASSetting(did = Device.deviceID) {
     return null
  }
  /**
   * 开启悬浮窗模式
   * @since 10039
   */
  @report
  openFloatWindow(did = Device.deviceID) {
    if (Platform.OS == "android") {
       return Promise.resolve(null);
    } else {
      return Promise.reject("unsupported operation for ios platform");
    }
  }
  /**
   * 关闭悬浮窗
   * @since 10040
   */
  @report
  closeFloatWindow(did = Device.deviceID) {
    if (Platform.OS == "android") {
       return null
    } else {
      return Promise.reject("unsupported operation for ios platform");
    }
  }
  /**
   * 绑定摄像头的报警视频到微信米家公众号里，有报警视频推送到微信公共号
   * @since 10040
   */
  @report
  tryBindAlarmNotifyWithWechatMijia(did = Device.deviceID) {
    if (Platform.OS == "android") {
       return Promise.resolve(null);
    } else {
      return Promise.reject(" ios platform did not implement this function yet.");
    }
  }
  /**
   * 查询设备的pipUid和password，提供给部分model进行固件交互
   * 仅仅允许华来部分model使用，其他model访问会得到一个错误。
   * resolve返回的值即为服务器返回的json字串。
   * @param did 设备did
   * @since 10041
   */
  @report
  queryDevicePassword(did = Device.deviceID) {
    if (Platform.OS == "android") {
       return Promise.resolve(null);
    } else {
      return Promise.reject(" ios platform did not implement this function yet.");
    }
  }
  /**
   * 使用chacha20_xor解密大文件
   * @param {string} fileData byte array encoded into string 待解密的文件体
   * @param {*} nonce byte array encoded into string chacha20_xor解密需要的nonce
   * @param {*} shareKey  byte array encoded into string chacha20_xor解密需要的sharekey
   * @since 10041
   */
  @report
  decryptBigFile(fileData, nonce, did = Device.deviceID) {
    if (Platform.OS == "android") {
       return Promise.resolve(null);
    } else {
      return Promise.reject("ios platform not support yet; to be done");
    }
  }
  /**
 * 使用chacha20_xor解密小文件
 * @param {string} fileData byte array base64 encoded into string 待解密的文件体
 * @param {string} nonce byte array base64 encoded into string chacha20_xor解密需要的nonce
 * @param {string} shareKey  byte array base64 encoded into string chacha20_xor解密需要的sharekey
 * @since 10041
 */
  @report
  decryptSmallFile(fileData, nonce, did = Device.deviceID) {
    if (Platform.OS == "android") {
       return Promise.resolve(null);
    } else {
      return Promise.reject("ios platform not support yet; to be done");
    }
  }
  /**
   * 标记当前固件是否是tutk rdt的数据被加密的
   * @param isEncrypted rdt数据是否被加密
   * @since 10041
   * 应该在发送rdt命令之前调用。
   * 
   */
  @report
  markCurrrentDeviceRdtDataEncrypted(isEncrypted, did = Device.deviceID) {
    if (Platform.OS == "android") {
       return null
    } else {
      return Promise.reject("ios platform not support yet; to be done");
    }
  }
}
const MiotCameraInstance = new IMiotCamera();
export default MiotCameraInstance;