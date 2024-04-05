
function coordsPixels(selector) {
    var txt = d3.select(selector).append("text");
    var svg = d3.select(selector).attr("cursor", "crosshair")
        .on("mousemove", function (e) {
            var pt = d3.pointer(e);
            txt.attr("x", 18 + pt[0]).attr("y", 6 + pt[1])
                .text("" + pt[0] + "," + pt[1]);
        });
}

function makeDemo() {

    d3.tsv("examples-multiple.tsv")
        .then(function (data) {
            var pxX = 600, pxY = 300;

            // scaleLinear maps an input domain
            // to an output range
            var scX = d3.scaleLinear()
                // extent
                // takes an array of objects
                // and an accessor function
                // and return the max and min values
                .domain(d3.extent(data, d => d["x"]))
                .range([0, pxX]);
            var scY1 = d3.scaleLinear()
                .domain(d3.extent(data, d => d["y1"]))
                // Note here we are inverting the y
                .range([pxY, 0]);
            var scY2 = d3.scaleLinear()
                .domain(d3.extent(data, d => d["y2"]))
                .range([pxY, 0]);

            d3.select("svg")
                .attr("width", pxX)
                .attr("height", pxY)
                // adding a group object with a
                // certain id                    
                .append("g").attr("id", "ds1")
                .selectAll("circle")
                .data(data).enter().append("circle")
                .attr("r", 5).attr("fill", "green")
                // apply the scale here
                .attr("cx", d => scX(d["x"]))
                .attr("cy", d => scY1(d["y1"]));

            d3.select("svg")
                .append("g").attr("id", "ds2")
                // this attribute is inherited
                // to all children of the group
                .attr("fill", "blue")
                .selectAll("circle")
                .data(data).enter().append("circle")
                .attr("r", 5)
                .attr("cx", d => scX(d["x"]))
                .attr("cy", d => scY2(d["y2"]));

            // creates a function object that be given
            // to a path element
            var lineMaker = d3.line()
                // requires 2 accessor functions
                .x(d => scX(d["x"]))
                .y(d => scY1(d["y1"]));

            // here we are selecting by id
            // in this case ds1 is the id for a group
            d3.select("#ds1")
                .append("path")
                .attr("fill", "none").attr("stroke", "red")
                .attr("d", lineMaker(data));

            // just change the y accessor to
            // match the second y-col data
            lineMaker.y(d => scY2(d["y2"]));

            d3.select("#ds2")
                .append("path")
                .attr("fill", "none").attr("stroke", "cyan")
                .attr("d", lineMaker(data));

            // d3.select( "#ds2" ).attr( "fill", "red" );            

            coordsPixels("svg");

        });
}