//Define clipping path
svg.append("clipPath")            //Make a new clipPath
    .attr("id", "chart-area")     //Assign an ID to reference later
    .append("rect")          //Within the clipPath, create a new shape to cover everything, usually rect
    .attr("x", padding)    // set to left and right padding
    .attr("y", padding)   // Set to top and bottom padding
    .attr("width", w - padding * 3)
    .attr("height", h - padding * 2);

// When adding elements do this
svg.append("g")                             //Create new g
   .attr("id", "circles")                   //Assign ID of 'circles'
   .attr("clip-path", "url(#chart-area)")   //Add reference to clipPath
   .selectAll("circle")                     //Continue as before…
   .data(dataset)
   .enter()
   .append("circle")

// instead of this
svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")