// use this select if not using a clip path
svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")

// Use this select if setting a clip path
//Define clipping path
svg.append("clipPath")                  //Make a new clipPath
    .attr("id", "chart-area")           //Assign an ID
    .append("rect")                     //Within the clipPath, create a new rect
    .attr("x", padding)                 //Set rect's position and size…
    .attr("y", padding)
    .attr("width", w - padding * 3)
    .attr("height", h - padding * 2);


svg.append("g")                             //Create new g
    .attr("id", "circles")                   //Assign ID of 'circles'
    .attr("clip-path", "url(#chart-area)")   //Add reference to clipPath
    .selectAll("circle")                     //Continue as before…
    .data(dataset)
    .enter()
    .append("circle")

svg.attr("cx", function(d) { // set x value
    return d[0];
})
    .attr("cy", function(d) { // set y value
        return d[1];
    })
    .attr("r", 5) // set radius
    // or instead find area of circle to show by size
    .attr("r", function(d) {
        return Math.sqrt(h - d[1]);
    });

svg.selectAll("text")  // Add text elements
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) { // set actual text
        return d[0] + "," + d[1];
    })
    .attr("x", function(d) { // set x and y values for displaying text
        return d[0];
    })
    .attr("y", function(d) {
        return d[1];
    })

// See basic-barchart for setting axes and margins