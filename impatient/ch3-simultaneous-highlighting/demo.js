function makeDemo() {
    // Read the datat
    d3.csv("dense.csv").then(function (data) {
        // select two svg elements
        var svg1 = d3.select("#brush1");
        var svg2 = d3.select("#brush2");
        
        // create scale objects
        var sc1 = d3.scaleLinear().domain([0, 10, 50])
            .range(["lime", "yellow", "red"]);
        var sc2 = d3.scaleLinear().domain([0, 10, 50])
            .range(["lime", "yellow", "blue"]);
        var cs1 = drawCircles(svg1, data, d => d["A"], d => d["B"], sc1);
        var cs2 = drawCircles(svg2, data, d => d["A"], d => d["C"], sc2);
        svg1.call(installHandlers, data, cs1, cs2, sc1, sc2);
    });
}
function drawCircles(svg, data, accX, accY, sc) {
    var color = sc(Infinity);
    return svg.selectAll("circle").data(data).enter()
        .append("circle")
        .attr("r", 5).attr("cx", accX).attr("cy", accY)
        .attr("fill", color).attr("fill-opacity", 0.4);
}
function installHandlers(svg, data, cs1, cs2, sc1, sc2) {
    svg.attr("cursor", "crosshair")
        .on("mousemove", function (e) {
            var pt = d3.pointer(e);
            cs1.attr("fill", function (d, i) {
                var dx = pt[0] - d3.select(this).attr("cx");
                var dy = pt[1] - d3.select(this).attr("cy");
                var r = Math.hypot(dx, dy);
                data[i]["r"] = r;
                return sc1(r);
            });
            cs2.attr("fill", (d, i) => sc2(data[i]["r"]));
        })
        .on("mouseleave", function () {
            cs1.attr("fill", sc1(Infinity));
            cs2.attr("fill", sc2(Infinity));
        });
}