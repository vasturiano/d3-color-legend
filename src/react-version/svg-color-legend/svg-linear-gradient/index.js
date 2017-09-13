import React from 'react';
import PropTypes from 'prop-types';

import { scalePow } from 'd3-scale';

const NUM_STOPS = 11; // stop interpolation sufficient to cover all noticeable color nuances

const LinearGradient = ({ id, colors, angle, expBase }) => {
  const colorScale = scalePow()
    .exponent(expBase)
    .domain([0, 100])
    .range(colors);

  const rad = Math.PI * angle / 180;
  const colorStops = [...Array(NUM_STOPS).keys()].map(
    d => d * 100 / (NUM_STOPS - 1)
  );

  return (
    <linearGradient
      id={id}
      y1={Math.round(100 * Math.max(0, Math.sin(rad))) + '%'}
      y2={Math.round(100 * Math.max(0, -Math.sin(rad))) + '%'}
      x1={Math.round(100 * Math.max(0, -Math.cos(rad))) + '%'}
      x2={Math.round(100 * Math.max(0, Math.cos(rad))) + '%'}
    >
      {colorStops.map(stop => (
        <stop key={stop} offset={`${stop}%`} stopColor={colorScale(stop)} />
      ))}
    </linearGradient>
  );
};

LinearGradient.propTypes = {
  id: PropTypes.string.isRequired, // Use with style={{ fill: 'url(#<id>)' }}
  colors: PropTypes.array,
  angle: PropTypes.number, // 0 (left-right), 90 (down-up))
  expBase: PropTypes.number
};

LinearGradient.defaultProps = {
  colors: ['green', 'yellow', 'red'],
  angle: 0,
  expBase: 1
};

export default LinearGradient;
