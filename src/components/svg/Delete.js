import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Colors from '../../assets/colors';

const Delete = (props) => {

  const { color, width, height } = props;

  return (
    <Svg width={width} height={height} viewBox="0 0 22 24" fill="none">
      <Path d="M8 6H6L6 20H8L8 6Z" fill={color} />
      <Path d="M12 6H10L10 20H12L12 6Z" fill={color} />
      <Path d="M14 6H16L16 20H14L14 6Z" fill={color} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 0L8 0V2L0 2L0 4H2L2 24H20V4H22V2L14 2V0ZM4 4L18 4V22H4L4 4Z"
        fill={color}
      />
    </Svg>
  );
};

Delete.defaultProps = {
  color: Colors.lightGray,
  width: 15, // ~22px
  height: 16, // ~24px
};

Delete.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

export default Delete;
