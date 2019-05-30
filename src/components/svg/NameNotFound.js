import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import PropTypes from 'prop-types';
import Colors from '../../assets/colors';

const NameNotFound = (props) => {

  const { baseColor, detailColor, width, height } = props;

  return (
    <Svg width={width} height={height} viewBox="0 0 68 59" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.5002 28C36.8515 28 42.0002 22.8513 42.0002 16.5C42.0002 10.1487 36.8515 5 30.5002 5C24.149 5 19.0002 10.1487 19.0002 16.5C19.0002 22.8513 24.149 28 30.5002 28ZM30.5002 32C39.0606 32 46.0002 25.0604 46.0002 16.5C46.0002 7.93959 39.0606 1 30.5002 1C21.9398 1 15.0002 7.93959 15.0002 16.5C15.0002 25.0604 21.9398 32 30.5002 32ZM0.91171 54.6778C1.83835 55.279 3.07689 55.0152 3.67807 54.0885C9.62319 44.9248 19.4466 39 30.5002 39C32.881 39 35.2047 39.2749 37.4449 39.7977C37.1542 40.9841 37 42.224 37 43.5C37 52.0604 43.9396 59 52.5 59C61.0604 59 68 52.0604 68 43.5C68 34.9396 61.0604 28 52.5 28C46.6455 28 41.549 31.2459 38.9121 36.0362C36.213 35.3589 33.3971 35 30.5002 35C17.954 35 6.92698 41.7313 0.322406 51.9115C-0.27877 52.8381 -0.0149296 54.0767 0.91171 54.6778Z"
        fill={baseColor}
      />
      <Circle cx="52.5" cy="43.5" r="15.5" transform="rotate(90 52.5 43.5)" fill={detailColor} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.7135 36.8851C47.9325 36.1041 46.6662 36.1041 45.8851 36.8851C45.1041 37.6662 45.1041 38.9325 45.8851 39.7135L49.6715 43.5L45.8851 47.2864C45.1041 48.0675 45.1041 49.3338 45.8851 50.1149C46.6662 50.8959 47.9325 50.8959 48.7135 50.1149L52.5 46.3284L56.2864 50.1149C57.0675 50.8959 58.3338 50.8959 59.1149 50.1149C59.8959 49.3338 59.8959 48.0675 59.1148 47.2864L55.3284 43.5L59.1148 39.7135C59.8959 38.9325 59.8959 37.6662 59.1148 36.8851C58.3338 36.1041 57.0675 36.1041 56.2864 36.8851L52.5 40.6716L48.7135 36.8851Z"
        fill={Colors.white}
      />
    </Svg>
  );
};

NameNotFound.defaultProps = {
  baseColor: Colors.lightGray,
  detailColor: Colors.pink,
  width: 68,
  height: 59
};

NameNotFound.propTypes = {
  baseColor: PropTypes.string,
  detailColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

export default NameNotFound;
