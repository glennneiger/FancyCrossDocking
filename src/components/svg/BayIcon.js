import React from 'react';
import { Path } from 'react-native-svg';
import Svg from 'react-native-svg';

export default function BayIcon({
  color,
  width,
  height,
  viewBox,
}) {
  return (
    <Svg width={width} height={height} viewBox={viewBox} fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.4394 3.17194C15.1646 3.35797 15 3.66818 15 4V6.52297L6.37139 3.07153C6.0633 2.94829 5.71414 2.98591 5.43937 3.17194C5.1646 3.35797 5 3.66818 5 4V24C5 24.5523 5.44772 25 6 25H11C11.5523 25 12 24.5523 12 24V22H20V24C20 24.5523 20.4477 25 21 25H26C26.5523 25 27 24.5523 27 24V8C27 7.5911 26.751 7.22339 26.3714 7.07153L16.3714 3.07153C16.0633 2.94829 15.7141 2.98591 15.4394 3.17194ZM20 20H12V19H20V20ZM22 23H25V8.67704L17 5.47704V8C17 8.33183 16.8354 8.64204 16.5606 8.82807C16.2859 9.0141 15.9367 9.05172 15.6286 8.92848L7 5.47704V23H10V12C10 11.4477 10.4477 11 11 11H21C21.5523 11 22 11.4477 22 12V23ZM20 17H12V16H20V17ZM20 14H12V13H20V14Z"
        fill={color}
      />
      <Path
        d="M16.5355 30.364L18.9599 27.9396C19.3504 27.5491 19.3504 26.9159 18.9599 26.5254C18.5694 26.1349 17.9362 26.1349 17.5457 26.5254L16.8284 27.2426V24C16.8284 23.4477 16.3807 23 15.8284 23C15.2761 23 14.8284 23.4477 14.8284 24V27.2426L14.1112 26.5254C13.7206 26.1349 13.0875 26.1349 12.697 26.5254C12.3064 26.9159 12.3064 27.5491 12.697 27.9396L15.1213 30.364C15.5118 30.7545 16.145 30.7545 16.5355 30.364Z"
        fill={color}
      />
    </Svg>
  );
}