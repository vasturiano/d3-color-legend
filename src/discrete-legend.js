import * as d3 from 'd3';
import Kapsule from 'kapsule';
import tinycolor from 'tinycolor2';
import { fitToBox as TextFitToBox } from 'svg-text-fit';

export default Kapsule({
    props: {
        width: {},
        height: {},
        scale: {},
        label: {}
    },
    init(el, state) {
        state.el = d3.select(el);
    },
    update(state) {
        const colorBinWidth = state.width / state.scale.domain().length;

        let slot = state.el.selectAll('.color-slot')
            .data(state.scale.domain());

        slot.exit().remove();

        const newSlot = slot.enter()
            .append('g')
            .attr('class', 'color-slot');

        newSlot.append('rect')
            .attr('y', 0)
            .attr('rx', 0)
            .attr('ry', 0)
            .attr('stroke-width', 0);

        newSlot.append('text')
            .style('text-anchor', 'middle')
            .style('dominant-baseline', 'central');

        newSlot.append('title');

        // Update
        slot = slot.merge(newSlot);

        slot.select('rect')
            .attr('width', colorBinWidth)
            .attr('height', state.height)
            .attr('x', (d, i) => colorBinWidth*i)
            .attr('fill', d => state.scale(d));

        slot.select('text')
            .text(d => d)
            .attr('x', (d, i) => colorBinWidth*(i+.5))
            .attr('y', state.height*0.5)
            .style('fill', d => tinycolor(state.scale(d)).isLight()?'#333':'#DDD')
            .each(function(d) {
                TextFitToBox()
                    .bbox({
                        width: colorBinWidth*0.9,
                        height: state.height*0.8
                    })
                (this);
            });

        slot.select('title')
            .text(d => `${d} ${state.label}`)
    }
});