import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Colors from '../../assets/colors';

const Hamburger = (props) => {

  const { color, width, height } = props;

  return (
    <Svg width={width} height={height} viewBox="0 0 21 15" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.832031 1.33403C0.832031 0.597265 1.4293 0 2.16606 0H19.498C20.2348 0 20.832 0.597265 20.832 1.33403V1.39324C20.832 2.13001 20.2348 2.72727 19.498 2.72727H2.16606C1.4293 2.72727 0.832031 2.13001 0.832031 1.39324V1.33403ZM0.832031 7.47044C0.832031 6.73368 1.4293 6.13641 2.16606 6.13641H19.498C20.2348 6.13641 20.832 6.73368 20.832 7.47044V7.52965C20.832 8.26642 20.2348 8.86368 19.498 8.86368H2.16606C1.4293 8.86368 0.832031 8.26642 0.832031 7.52965V7.47044ZM2.16606 12.2728C1.4293 12.2728 0.832031 12.8701 0.832031 13.6068V13.6661C0.832031 14.4028 1.4293 15.0001 2.16606 15.0001H19.498C20.2348 15.0001 20.832 14.4028 20.832 13.6661V13.6068C20.832 12.8701 20.2348 12.2728 19.498 12.2728H2.16606Z"
        fill={color}
      />
    </Svg>
  );
};

Hamburger.defaultProps = {
  color: Colors.lightLightTiffany,
  width: 21,
  height: 15
};

Hamburger.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

export default Hamburger;
