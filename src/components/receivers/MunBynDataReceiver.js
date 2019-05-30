/**
 * This exposes the native MunBynDataReceiver Module
 */
import {NativeModules} from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const MunBynDataReceiver = NativeModules.MunBynDataReceiver || {};


const allowedEvents = [
  MunBynDataReceiver.BARCODE_READ_SUCCESS,
  MunBynDataReceiver.BARCODE_READ_FAIL
];


MunBynDataReceiver.on = (eventName, handler) => {
  if (!allowedEvents.includes(eventName)) {
    throw new Error(`Event name ${eventName} is not a supported event.`);
  }
  DeviceEventEmitter.addListener(eventName, handler);
};


MunBynDataReceiver.off = (eventName, handler) => {
  if (!allowedEvents.includes(eventName)) {
    throw new Error(`Event name ${eventName} is not a supported event.`);
  }
  DeviceEventEmitter.removeListener(eventName, handler);
};

module.exports = NativeModules.MunBynDataReceiver;
