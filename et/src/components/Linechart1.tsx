import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { debug } from 'console';

const Linechart1 = ({ parentElement }) => {
    const svgRef = useRef(null);
    const [brushSelection, setBrushSelection] = useState([null, null]);
    const [d3Ref, setD3Ref] = useState(d3);

    useEffect(() => {

        const data = [
            { x: new Date(2023, 0, 1), y: 20 },
            { x: new Date(2023, 3, 1), y: 35 },
            { x: new Date(2023, 6, 1), y: 18 },
            { x: new Date(2023, 9, 1), y: 100 },
        ];
        debugger;
        const margin = { top: 100, right: 100, bottom: 100, left: 100 };
        let width = parentElement?.current.clientWidth;
        let height = parentElement?.current.clientHeight;
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
        const xScale = d3.scaleTime()
            .domain(d3.extent(data, d => d.x))
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.y)])
            .range([height, 0]); // Flips the y-axis for a more intuitive chart

        // Define zoom behavior
        // const zoom = d3.zoom()
        //     .scaleExtent([1, 10])
        //     .on("zoom", function(){
        //         const t = d3.event.transform;
        //         xScale.domain(t.rescaleX(xScale.domain()));
        //         svg.select(".line").attr("d", line);
        //         svg.select(".xAxis").call(xAxis);
        //     });

        // svg.call(zoom);
        window['xyz'] = d3;
        const zoom = d3.zoom().scaleExtent([1, 10])
            .on("zoom", (event: any) => {
                const { transform } = event;
                xScale.range([0, width * transform.k].concat(xScale.range()));
                yScale.range([height, 0 * transform.k].concat(yScale.range()));
                svg.selectAll("path").attr("d", line);
                svg.selectAll(".axis").call(xAxis.scale(xScale)).call(yAxis.scale(yScale));
            });
        debugger;
        svg.call(zoom);

        const line = d3.line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));

        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line);

        // Add axes (optional)
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        g.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        g.append("g")
            .attr("class", "y axis")
            .call(yAxis);

    }, [parentElement]);

    return (
        <svg ref={svgRef} ></svg>
    );
};

export default Linechart1;