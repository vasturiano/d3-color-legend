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
        const ordinal = state.scale.hasOwnProperty('unknown'); // Only ordinal scales have the unknown method (for auto-assigning new categories)

        state.legend.html(''); // Wipe it

        (ordinal?DiscreteLegend:ContinuousLegend)()
            .width(state.width)
            .height(state.height)
            .scale(state.scale)
            .label(state.label)
        (state.legend.node());
    }
});