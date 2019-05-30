import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Colors from '../../assets/colors';

const ArrowLeft = (props) => {

  const { color, width, height } = props;

  return (
    <Svg width={width} height={height} viewBox="0 0 30 26" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 13H2M2 13L12.7059 2M2 13L12.7059 24"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

ArrowLeft.defaultProps = {
  width: 20, // ~30px
  height: 17, // ~26px
  color: Colors.white
};

ArrowLeft.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string
};

export default ArrowLeft;
