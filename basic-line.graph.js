/**
 * Basic CSS to draw a nice line

 path {
    stroke: steelblue;
    stroke-width: 2;
    fill: none;
}
.axis path, .axis line {
    fill: none;
    stroke: grey;
    stroke-width: 1;
    shape-rendering: crispEdges; // great for cleaning up straight lines not so aswesome with irregular path
}
 */



var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;
var parseDate = d3.time.format("%d-%b-%y").parse;

// create x axis scale
var x = d3.time.scale().range([0, width]);
// create x axis scale
var y = d3.scale.linear().range([height, 0]);

// create actual x axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(5);

// Create actual y axis
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5);

// create the line for the data
var valueline = d3.svg.line() // uses path generator
    // Can be used to change the shape of the line from jagged to smooth and other ways.  See https://github.com/mbostock/d3/wiki/SVG- Shapes#wiki- line_interpolate
    // closed interpolation styles will draw a slope for your  data.
    // .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

// Append the svg element as a group and move the whole thing down
var svg = d3.select("body") .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/data.tsv", function(error, data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close; // convert to integer
    });
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; })); //The .extent function that finds the maximum and minimum values in the array.  Most useful for non-linear data like the timescale used here.
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    // add the graph line
    svg.append("path")
     //   .style("stroke-dasharray", ("3, 3"))// can add stroke dash.  This is 3 pixels on 3 pixels off.
        .attr("d", valueline(data)); // Add the valueline path. "d" stands for ‘path data’ in an svg path segment.  Really the points needed to create the line

    // in each data value as a point if desired.  Better to place after line generation as putting it first cause the line to display on top of the dots
    svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.close); });


    // Add the actual x axis as an svg g element
    svg.append("g") // Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add label for x axis if so desired
    svg.append("text") // text label for the x axis
        .attr("x", width / 2)
        .attr("y",  height + margin.bottom)
        /* Or instead of x and y you could use a transform
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")") */
        .style("text-anchor", "middle")
        .text("Your text here");

    // Add the actual y axis as an svg g element
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // Add label for y axis if desire
    svg.append("text")
        .attr("transform", "rotate(-90)")// rotates text 90 degrees moves pointer to the lower left corner of your canvas and flips x,y to y,x which is the new value of 0
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em") // dy moves the text over 1em for fine tuning text placement
        .style("text-anchor", "middle")
        .text("Your text here");

    // Add graph title if desired
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .text("Your Text");
});