/**
 * Set SVG canvas and margins
 *
 */
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// format the ticks
var formatPercent = d3.format(".0%");

// create an ordinal scale for the x axis the width of the bands rounded
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);

// create a linear(numeric) scale for the y axis
var y = d3.scale.linear()
    .range([height, 0]);

// Create the actual x axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// Create the y axis
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

// Append the svg element and group everything in it and move the cursor
var svg = d3.select("#figure").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// load data
d3.tsv("../../../data/data.tsv", function(error, data) {

    // make sure each value is a number
    data.forEach(function(d) {
        d.frequency = +d.frequency;
    });

    // Set x values domain on the axis to the data letters
    x.domain(data.map(function(d) { return d.letter; }));

    // Set y values domain to the frequency
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

    // Add in the actual x axis and move i down by the height
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add in the y axis and add text moving it over by the y and dy values
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

    // Add in the actual bars.  Set the x value to each letter
    // Set each y value to the frequency
    // Se height to the svg height minus the frequency value
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.letter); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.frequency); })
        .attr("height", function(d) { return height - y(d.frequency); });
});