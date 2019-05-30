import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Colors from '../../assets/colors';

const CaretRight = (props) => {

  const { color, width, height } = props;

  return (
    <Svg width={width} height={height} viewBox="0 0 23 39" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.00172 1.57953C2.22796 0.353283 4.2161 0.353283 5.44235 1.57953L21.1424 17.2795C21.7312 17.8684 22.062 18.6671 22.062 19.4999C22.062 20.3326 21.7312 21.1313 21.1424 21.7202L5.44235 37.4202C4.2161 38.6464 2.22796 38.6464 1.00171 37.4202C-0.224531 36.1939 -0.224529 34.2058 1.00172 32.9795L14.4814 19.4999L1.00172 6.02016C-0.224528 4.79391 -0.224528 2.80577 1.00172 1.57953Z"
        fill={color}
      />
    </Svg>
  );
};

CaretRight.defaultProps = {
  width: 15, // ~23px,
  height: 26, // ~39px,
  color: Colors.lightGray
};

CaretRight.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string
};

export default CaretRight;
