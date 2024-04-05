function makeDemo1() {
    const data = {
        x: [1, 2, 3, 4],
        y1: [1, 3, 5, 7],
        y2: [3, 5, 7, 6]
    };

    const data_transform = data.x.map((v, i) => {
        return { x: data.x[i], y1: data.y1[i], y2: data.y2[i] }
    });

    const line = d3.line()
        .x(d => d['x'])
        .y(d => d['y']);

    d3.select("svg")
        .append("g")
        .attrib("id", "an_id");

    const someid = d3.select('#an_id').join(
        enter => {
            
        } 
    );

        .selectAll('.inner')
         someid = d3.select('#someid').data(data_transform)
        .append("g")
        .append("path")
        .attrib("d", line( 
            d => [
            { x: d.x, y: d.y1 },
            { x: d.x, y: d.y2 }]));
}