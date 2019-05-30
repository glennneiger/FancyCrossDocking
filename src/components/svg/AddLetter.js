import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Colors from '../../assets/colors';

const AddLetter = (props) => {

  const { baseColor, detailColor, width, height } = props;

  return (
    <Svg width={width} height={height} viewBox="0 0 77 75" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M47.5401 47.6397L46.448 45.1249H17.548L11.088 59.9999H2.41797L28.173 1.85986H35.823L54.0421 42.9882C51.4847 43.9505 49.2488 45.5695 47.5401 47.6397ZM31.998 11.6349L20.778 37.6449H43.218L31.998 11.6349Z"
        fill={baseColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M44 57.5C44 66.0604 50.9396 73 59.5 73C68.0604 73 75 66.0604 75 57.5C75 48.9396 68.0604 42 59.5 42C50.9396 42 44 48.9396 44 57.5ZM59.5005 48.1451C60.605 48.1451 61.5005 49.0406 61.5005 50.1451V55.5H66.8553C67.9599 55.5 68.8553 56.3954 68.8553 57.5C68.8553 58.6045 67.9599 59.5 66.8553 59.5H61.5005L61.5005 64.8548C61.5005 65.9594 60.605 66.8548 59.5005 66.8548C58.3959 66.8548 57.5005 65.9594 57.5005 64.8548L57.5005 59.5L52.1456 59.5C51.0411 59.5 50.1456 58.6045 50.1456 57.5C50.1456 56.3954 51.0411 55.5 52.1456 55.5L57.5005 55.5L57.5005 50.1451C57.5005 49.0406 58.3959 48.1451 59.5005 48.1451Z"
        fill={detailColor}
      />
    </Svg>
  );
};

AddLetter.defaultProps = {
  baseColor: Colors.lightGray,
  detailColor: Colors.tiffany,
  width: 77,
  height: 75
};

AddLetter.propTypes = {
  baseColor: PropTypes.string,
  detailColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

export default AddLetter;
