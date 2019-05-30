import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Colors from '../../assets/colors';

const CaretLeft = (props) => {

  const { color, width, height } = props;

  return (
    <Svg width={width} height={height} viewBox="0 0 23 39" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.9983 1.57953C20.772 0.353283 18.7839 0.353283 17.5577 1.57953L1.85764 17.2795C1.26878 17.8684 0.937956 18.6671 0.937956 19.4999C0.937958 20.3326 1.26878 21.1313 1.85764 21.7202L17.5577 37.4202C18.7839 38.6464 20.772 38.6464 21.9983 37.4202C23.2245 36.1939 23.2245 34.2058 21.9983 32.9795L8.51859 19.4999L21.9983 6.02016C23.2245 4.79391 23.2245 2.80577 21.9983 1.57953Z"
        fill={color}
      />
    </Svg>
  );
};

CaretLeft.defaultProps = {
  width: 15, // ~23px,
  height: 26, // ~39px,
  color: Colors.lightGray
};

CaretLeft.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string
};

export default CaretLeft;
