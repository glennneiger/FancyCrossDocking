import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Colors from '../../assets/colors';

const Cancel = (props) => {

  const { color, width, height } = props;

  return (
    <Svg width={width} height={height} viewBox="0 0 13 13" fill="none">
      <Path
        d="M11.8108 2.7066C12.2297 2.28762 12.2297 1.60821 11.8108 1.18923C11.3918 0.770255 10.7124 0.770255 10.2934 1.18923L6.5 4.98264L2.7066 1.18923C2.28762 0.770255 1.60821 0.770255 1.18923 1.18923C0.770255 1.60821 0.770255 2.28762 1.18923 2.7066L4.98264 6.5L1.18923 10.2934C0.770255 10.7124 0.770255 11.3918 1.18923 11.8108C1.60821 12.2297 2.28762 12.2297 2.7066 11.8108L6.5 8.01736L10.2934 11.8108C10.7124 12.2297 11.3918 12.2297 11.8108 11.8108C12.2297 11.3918 12.2297 10.7124 11.8108 10.2934L8.01736 6.5L11.8108 2.7066Z"
        fill={color}
      />
    </Svg>
  );
};

Cancel.defaultProps = {
  color: Colors.darkGray,
  width: 13,
  height: 13
};

Cancel.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

export default Cancel;
