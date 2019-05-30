import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Colors from '../../assets/colors';

const Update = (props) => {

  const { color, width, height } = props;

  return (
    <Svg width={width} height={height} viewBox="0 0 83 83" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.5 83C64.4198 83 83 64.4198 83 41.5C83 18.5802 64.4198 0 41.5 0C18.5802 0 0 18.5802 0 41.5C0 64.4198 18.5802 83 41.5 83ZM40.0003 23.6666C30.4274 23.6666 22.667 31.427 22.667 41C22.667 50.5729 30.4274 58.3333 40.0003 58.3333C49.5733 58.3333 57.3337 50.5729 57.3337 41C57.3337 39.1356 57.0399 37.3422 56.4966 35.662L52.5136 42.5608C52.0534 43.3579 51.034 43.6311 50.2369 43.1708C49.4397 42.7106 49.1666 41.6913 49.6269 40.8941L55.2837 31.0962C55.7439 30.299 56.7633 30.0259 57.5604 30.4861L67.3584 36.143C68.1555 36.6032 68.4286 37.6225 67.9684 38.4197C67.5082 39.2168 66.4889 39.49 65.6917 39.0297L59.9908 35.7383C60.4321 37.4192 60.667 39.1829 60.667 41C60.667 52.4138 51.4142 61.6666 40.0003 61.6666C28.5864 61.6666 19.3337 52.4138 19.3337 41C19.3337 29.5861 28.5864 20.3333 40.0003 20.3333C40.9208 20.3333 41.667 21.0795 41.667 22C41.667 22.9204 40.9208 23.6666 40.0003 23.6666Z"
        fill={color}
      />
    </Svg>
  );
};

Update.defaultProps = {
  color: Colors.pink,
  width: 83,
  height: 83
};

Update.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

export default Update;
