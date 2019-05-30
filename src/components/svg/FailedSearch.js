import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import PropTypes from 'prop-types';
import Colors from '../../assets/colors';

const FailedSearch = (props) => {

  const { bgColor, baseColor, detailColor, width, height } = props;

  return (
    <Svg width={width} height={height} viewBox="0 0 50 50" fill="none">
      <Rect x="35.6582" y="27.4155" width="20.7032" height="6.00423" rx="3.00212" transform="rotate(45 35.6582 27.4155)" fill={baseColor} stroke={baseColor} strokeWidth="1.20085" />
      <Circle cx="22.6131" cy="18.6131" r="17.4123" fill={bgColor} stroke={baseColor} stroke-width="2.4017" />
      <Circle cx="17.2103" cy="14.4102" r="2.40169" fill={baseColor} />
      <Circle cx="26.8158" cy="14.4102" r="2.40169" fill={baseColor} />
      <Path d="M26.7694 25.0739C26.7694 22.5272 24.7049 20.4626 22.1581 20.4626C19.6114 20.4626 17.5469 22.5272 17.5469 25.0739" stroke={baseColor} strokeWidth="2.30564" strokeLinecap="round" />
      <Path d="M10.254 27.1249C11.0173 25.7589 12.9827 25.7589 13.746 27.1249L23.3279 44.2745C24.0727 45.6076 23.109 47.25 21.5819 47.25H2.41807C0.890964 47.25 -0.0727422 45.6076 0.672116 44.2745L10.254 27.1249Z" fill={detailColor} />
      <Path d="M12 33.5L12.0003 37.8073" stroke={bgColor} strokeWidth="2.66806" strokeLinecap="round" />
      <Path d="M12.0011 42L12 42.0001" stroke={bgColor} strokeWidth="2.66806" strokeLinecap="round" />
    </Svg>
  );
};

FailedSearch.defaultProps = {
  bgColor: Colors.white,
  baseColor: Colors.lightGray,
  detailColor: Colors.yellow,
  width: 50,
  height: 50
};

FailedSearch.propTypes = {
  bgColor: PropTypes.string,
  baseColor: PropTypes.string,
  detailColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

export default FailedSearch;
