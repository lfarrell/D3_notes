/**
 * You'll need to rebind everything that changes, but leave off the .enter() method
 */

// rebind data, Make whatever changes you want
svg.selectAll("rect")
   .data(dataset)
    .transition()// Add transition if desired.   You probably desire it
    .delay(function(d,i) {
        return i * 200; // how long to wait applies to each element.  This particular one will stagger the delay based on where the element is in the data.  This applies to very element so be careful

        // Can set a max delay like so
      //  return i / dataset.length * 1000; // This one sets max delay to 1 second
    })
    .duration(1000)// how long a transition will take (optional)  // Applies to each transition.  Be carefule with delay and duration for large data sets.  Can take forever.
    .ease("linear")// Can set an ease for the transition cubic-in-out is default (optional).  Others include circle, elastic, bounce
   .attr("y", function(d) {
        return h - yScale(d);
   })
   .attr("height", function(d) {
        return yScale(d);
   });

// This applies to text nodes too
svg.selectAll("text")
   .data(dataset)
   .text(function(d) {
        return d;
   })
   .attr("x", function(d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
   })
   .attr("y", function(d) {
        return h - yScale(d) + 14;
   });

//if need be update the domain for example
//Update scale domain
yScale.domain([0, d3.max(dataset)]);

// Update the axises if needed
//  already referencing a scale so don't need to include here

//Update x-axis assuming your axis has a class "x axis"
svg.select(".x.axis")
    .transition()
    .duration(1000)
    .call(xAxis);

//Update y-axis assuming your axis has a class "y axis"
svg.select(".y.axis")
    .transition()
    .duration(1000)
    .call(yAxis);

/**
 * Adding just one element to current selection without changing current selection
 *
 * take current selection and enter and append the new selection giving it the attributes you want.  The changes will only affect the new selection
 */
bars.enter()
    .append("rect")
    .attr("x", w)
    .attr("y", function(d) {
        return h - yScale(d);
    })
    .attr("width", xScale.rangeBand())
    .attr("height", function(d) {
        return yScale(d);
    })
    .attr("fill", function(d) {
        return "rgb(0, 0, " + (d * 10) + ")";
    });

/**
* Exiting and removing
 */
bars.exit() // bars equals your selection.
    .transition()// can leave off transition and duration, but this makes it smoother
    .duration(500)
    .attr("x", w) // slide it off to the right
    .remove(); // remove it