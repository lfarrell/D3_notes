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