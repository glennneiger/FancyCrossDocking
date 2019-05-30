/**
 * This exposes the native HoneywellDataReceiver Module
 */
import {NativeModules} from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const HoneywellDataReceiver = NativeModules.HoneywellDataReceiver || {};


const allowedEvents = [
  HoneywellDataReceiver.BARCODE_READ_SUCCESS,
  HoneywellDataReceiver.BARCODE_READ_FAIL
];


HoneywellDataReceiver.on = (eventName, handler) => {
  if (!allowedEvents.includes(eventName)) {
    throw new Error(`Event name ${eventName} is not a supported event.`);
  }
  DeviceEventEmitter.addListener(eventName, handler);
};


HoneywellDataReceiver.off = (eventName, handler) => {
  if (!allowedEvents.includes(eventName)) {
    throw new Error(`Event name ${eventName} is not a supported event.`);
  }
  DeviceEventEmitter.removeListener(eventName, handler);
};

module.exports = NativeModules.HoneywellDataReceiver;
