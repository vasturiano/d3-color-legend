import * as d3 from 'd3';
import Kapsule from 'kapsule';

export default Kapsule({
    props: {
        width: {},
        height: {},
        scale: {},
        label: {}
    },
    init(el, state) {
        state.legend = d3.select(el).append('g')
            .attr('class', 'legend');
    },
    update(state) {
        if (!state.scale) return;

        // Check if ordinal or continuous scale
        const ordinal = state.scale.hasOwnProperty('unknown'); // Only ordinal scales have the unknown method (for auto-assigning new categories)

        state.legend.html(''); // Wipe it

        (ordinal?OrdinalColorLegend:LinearColorLegend)()
            .width(state.width)
            .height(state.height)
            .scale(state.scale)
            .label(state.label)
        (state.legend.node());
    }
});