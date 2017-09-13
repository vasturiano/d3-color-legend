import { select as d3Select } from 'd3-selection';
import Kapsule from 'kapsule';
import tinycolor from 'tinycolor2';
import { fitToBox as TextFitToBox } from 'svg-text-fit';
import { gradient as Gradient } from 'svg-utils';

export default Kapsule({
    props: {
        width: {},
        height: {},
        scale: {},
        label: {}
    },
    init(el, state) {
        state.gradient = Gradient()(el);

        state.el = d3Select(el);

        // Build dom
        state.box = state.el.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('rx', 3)
            .attr('ry', 3)
            .attr('stroke', 'black')
            .attr('stroke-width', 0.5);

        state.unitLabel = state.el.append('text')
            .attr('class', 'legendText')
            .style('text-anchor', 'middle')
            .style('dominant-baseline', 'central');

        state.labelFitText = TextFitToBox()(state.unitLabel.node());

        state.startLabel = state.el.append('text')
            .style('text-anchor', 'start')
            .style('dominant-baseline', 'central');

        state.startLabelFitText = TextFitToBox()(state.startLabel.node());

        state.endLabel = state.el.append('text')
            .style('text-anchor', 'end')
            .style('dominant-baseline', 'central');

        state.endLabelFitText = TextFitToBox()(state.endLabel.node());
    },
    update(state) {
        state.gradient.colorScale(state.scale);

        state.box
            .attr('width', state.width)
            .attr('height', state.height)
            .style('fill', `url(#${state.gradient.id()})`);

        state.unitLabel
            .text(state.label)
            .attr('x', state.width*0.5)
            .attr('y', state.height*0.5)
            .style('text-anchor', 'middle')
            .style('dominant-baseline', 'central')
            .style('fill', tinycolor(state.scale((state.scale.domain()[state.scale.domain().length-1] - state.scale.domain()[0])/2)).isLight()?'#444':'#CCC');

        state.labelFitText.bbox({
            width: state.width * 0.8,
            height: state.height * 0.9
        });

        state.startLabel
            .text(state.scale.domain()[0])
            .attr('x', state.width*0.02)
            .attr('y', state.height*0.5)
            .style('fill', tinycolor(state.scale(state.scale.domain()[0])).isLight()?'#444':'#CCC' );

        state.startLabelFitText.bbox({
            width: state.width * 0.3,
            height: state.height * 0.7
        });

        state.endLabel
            .text(state.scale.domain()[state.scale.domain().length-1])
            .attr('x', state.width*0.98)
            .attr('y', state.height*0.5)
            .style('fill', tinycolor(state.scale(state.scale.domain()[state.scale.domain().length-1])).isLight()?'#444':'#CCC' );

        state.endLabelFitText.bbox({
            width: state.width * 0.3,
            height: state.height * 0.7
        });
    }
});