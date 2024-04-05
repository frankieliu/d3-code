function makeDemo1() {
    d3.tsv("examples-simple.tsv")
        .then(function (data) {
            // selectAll creates an empty placeholder
            d3.select("svg")
                .selectAll("circle")
                // data associates data with a DOM element
                // data returns a collection of elements
                // associated with EACH of the selected
                // elements (using selectAll) 
                // this means there is a single x,y
                // for each "circle" element
                // But since it is empty, .data returns
                // an empty collection                             
                .data(data)
                // enter associates any surplus data
                // elements with DOM elements in the
                // surplus collection - those defined
                // after .enter
                .enter()
                // appending to collection of circle
                // elements -- invokes the following
                // _for each_ surplus data element
                // appends a circle element into the
                // svg from .select("svg")
                .append("circle")
                // fixed attribute and style
                .attr("r", 5).attr("fill", "red")
                // take data from the associated data
                // point for each circle element
                // argument is called an accessor
                // function applied to each data element    
                .attr("cx", function (d) { return d["x"] })
                .attr("cy", function (d) { return d["y"] });
        });
}