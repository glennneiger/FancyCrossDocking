import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Colors from '../../assets/colors';

const Info = (props) => {

  const { color, width, height } = props;

  return (
    <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 26C21.5228 26 26 21.5229 26 16C26 10.4772 21.5228 6 16 6C10.4772 6 6 10.4772 6 16C6 21.5229 10.4772 26 16 26ZM17.5 11.5C17.5 12.3284 16.8284 13 16 13C15.1716 13 14.5 12.3284 14.5 11.5C14.5 10.6716 15.1716 10 16 10C16.8284 10 17.5 10.6716 17.5 11.5ZM16.9214 14.6108C16.7696 14.2518 16.4142 14 16 14H15C14.4477 14 14 14.4477 14 15C14 15.5523 14.4477 16 15 16V20C14.4477 20 14 20.4477 14 21C14 21.5523 14.4477 22 15 22H16H17C17.5523 22 18 21.5523 18 21C18 20.4477 17.5523 20 17 20L17 15.0028V15C17 14.8619 16.972 14.7304 16.9214 14.6108Z"
        fill={color}
      />
    </Svg>
  );
};

Info.defaultProps = {
  color: Colors.lightGray,
  width: 32,
  height: 32
};

Info.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

export default Info;
