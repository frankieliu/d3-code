function makeDemo() {
    var n = 50, w = 300 / n, dt = 3000, svg = d3.select("#demo");
    var data = d3.range(n * n)
        .map(d => {
            // d/n | 0 keep only the integer part   
            return {
                x: d % n, y: d / n | 0,
                val: Math.random()
            }
        });
    var sc = d3.scaleQuantize()
        .range(["white", "red", "black"]);
    svg.selectAll("rect").data(data).enter().append("rect")
        .attr("x", d => w * d.x).attr("y", d => w * d.y)
        .attr("width", w - 1).attr("height", w - 1)
        .attr("fill", d => sc(d.val));
    function update() {
        var nbs = [[0, 1], [0, -1], [1, 0], [-1, 0],
        [1, 1], [1, -1], [-1, 1], [-1, -1]];
        // visits elements in the array in random order
        return d3.shuffle(d3.range(n * n)).map(i => {
            var nb = nbs[nbs.length * Math.random() | 0];
            var x = (data[i].x + nb[0] + n) % n;
            var y = (data[i].y + nb[1] + n) % n;
            data[i].val = data[y * n + x].val;
        });
    }
    d3.interval(function () {
        update();
        svg.selectAll("rect")
            .data(data)
            .transition()
            .duration(dt)
            .delay((d, i) => i * 0.25 * dt / (n * n))
            .attr("fill", d => sc(d.val))}, dt);
}