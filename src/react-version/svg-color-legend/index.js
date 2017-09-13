import React from 'react';
import PropTypes from 'prop-types';

import { withTheme, createComponentStyles } from 'cf-style-container';

import LinearGradient from './svg-linear-gradient';

const styles = {
  label: ({ theme }) => ({
    fontSize: '10px',
    dominantBaseline: 'central',
    fill: theme.color.night
  })
};

class ContinuousColorLegend extends React.PureComponent {
  state = {
    gradientId: `LegendGradient${Math.round(Math.random() * 10000)}`
  };

  render() {
    const {
      theme,
      styles,
      width,
      height,
      label,
      minVal,
      maxVal,
      colors,
      colorScaleBase
    } = this.props;
    const { gradientId } = this.state;

    return (
      <g>
        <LinearGradient
          id={gradientId}
          colors={colors}
          expBase={colorScaleBase}
        />
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          rx={theme.borderRadius}
          ry={theme.borderRadius}
          stroke={theme.color.night}
          strokeWidth={0.5}
          style={{ fill: `url(#${gradientId})` }}
        />
        <text
          className={styles.label}
          style={{ textAnchor: 'start' }}
          x={width * 0.02}
          y={height * 0.5}
        >
          {minVal}
        </text>

        <text
          className={styles.label}
          style={{ textAnchor: 'end' }}
          x={width * 0.98}
          y={height * 0.5}
        >
          {maxVal}
        </text>

        <text
          className={styles.label}
          style={{ textAnchor: 'middle' }}
          x={width * 0.5}
          y={height * 0.5}
        >
          {label}
        </text>
      </g>
    );
  }
}

ContinuousColorLegend.propTypes = {
  theme: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  label: PropTypes.string,
  minVal: PropTypes.number.isRequired,
  maxVal: PropTypes.number.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired, // min 2
  colorScaleBase: PropTypes.number
};

ContinuousColorLegend.defaultProps = {
  width: 100,
  height: 15,
  label: '',
  colorScaleBase: 1
};

export default createComponentStyles(styles, withTheme(ContinuousColorLegend));
