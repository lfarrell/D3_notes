/**
 * Set SVG canvas and margins
 *
 */
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var data = [
    {x: 2, y: 2},
    {x: 32, y: 15},
    {x: 43, y: 99}
]

// Create grouping for path line and move down 100 px and to the right 100 px
var group = svg.append("g")
    .attr("transform", "translate(100, 100)")

// Create the path line generator and set required accessor functions for line(the x and y coords for each bit of the line)
var line = d3.svg.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return y.x; });

group.selectAll("path")
    .data([data])
    .enter()
    .append("path")
    .attr("d", line) // create draw attribute by passing values to the line var
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 2);