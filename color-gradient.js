/* css

.line {
    fill: none;
    stroke: url(#url-gradient);
    stroke-width: 2px;
}
*/

svg.append("linearGradient")
        .attr("id", "line-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0).attr("y1", y(0))
        .attr("x2", 0).attr("y2", y(1000))
    .selectAll("stop")
        .data([
            {offset: "0%", color: "red"},
            {offset: "40%", color: "red"},
            {offset: "40%", color: "black"},
            {offset: "62%", color: "black"},
            {offset: "62%", color: "lawngreen"},
            {offset: "100%", color: "lawngreen"}
        ])
    .enter().append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });