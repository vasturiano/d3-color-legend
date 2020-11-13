import { select as d3Select } from 'd3-selection';
import Kapsule from 'kapsule';
import ContinuousLegend from './continuous-legend.js'
import DiscreteLegend from './discrete-legend.js'

export default Kapsule({
    props: {
        width: {},
        height: {},
        scale: {},
        label: {}
    },
    init(el, state) {
        state.legend = d3Select(el).append('g')
            .attr('class', 'legend');
    },
    update(state) {
        if (!state.scale) return;

        // Check if ordinal or continuous scale
        const isOrdinal = !state.scale.hasOwnProperty('invert'); // Only continuous scales can be inverted

        state.legend.html(''); // Wipe it

        (isOrdinal?DiscreteLegend:ContinuousLegend)()
            .width(state.width)
            .height(state.height)
            .scale(state.scale)
            .label(state.label)
        (state.legend.node());
    }
});