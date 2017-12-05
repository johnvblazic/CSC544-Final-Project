/*
Found at http://bl.ocks.org/jfreels/6734025
*/
function tabulate(data, columns) {
    d3.selectAll("table").remove()
    var table = d3.select('body').append('table')
    var thead = table.append('thead')
    var tbody = table.append('tbody');

    // append the header d
    thead.append('tr')
      .selectAll('th')
      .data(columns).enter()
      .append('th')
        .text(function (column) { return column; });

    // create a d for each object in the data
    var ds = tbody.selectAll('tr')
      .data(data)
      .enter()
      .append('tr');

    // create a cell in each d for each column
    var cells = ds.selectAll('td')
      .data(function (d) {
        return columns.map(function (column) {
          return {column: column, value: d[column]};
        });
      })
      .enter()
      .append('td')
        .text(function (d) { return d.value; });

  return table;
}

//var vMax = d3.max(pca_data,function(d){return d.SATV;})
//var vMin = d3.min(pca_data,function(d){return d.SATV;})
//var vAvg = d3.mean(pca_data,function(d){return d.SATV;})

var colorCat = d3.scaleOrdinal()
						.domain(["fashion","mnist","inf"])
						.range(['#66c2a5','#fc8d62','#8da0cb'])


cX = d3.scaleLinear()
		.domain(d3.extent(pca_data,function(d){return d.pc1;}))
		.range([30,420]);
cY = d3.scaleLinear()
		.domain(d3.extent(pca_data,function(d){return d.pc2;}))
		.range([370,30]);
var bAxis = d3.axisBottom(cX)
var lAxis = d3.axisLeft(cY)


var chart4 = d3.select("#scatterplot_1")
var svg4 = chart4.append("svg")
/*var brush = svg4.append("g")
      .attr("class", "brush")
      .call(d3.brush()
        .extent([[0, 0], [450, 400]])
        .on("start brush end", brushed));*/
svg4.attr("width", 450).attr("height", 400).attr("class","chart2")
svg4.append("g")
	.attr("transform","translate(0,380)")
	.attr("id","x-axis")
	.call(bAxis)
svg4.append("g")
	.attr("id","y-axis")
	.attr("transform","translate(30,10)")
	.call(lAxis)
circle = svg4.selectAll("circle")
	.data(pca_data)
	.enter()
	.append("circle")
    .attr("class", "node")
	.attr("cx", function(d) { return cX(d.pc1);})
	.attr("cy", function(d) { return cY(d.pc2); })
    .attr("r", function(d) { return 4; })
    .attr("stroke", function() { return "black" })
    .attr("stroke-width", function() { return 0.5  })
    .style("fill", function(d) { return colorCat(d.data_category)} )
    .on("click",function(d){
        tabulate([d],['time_step','data_category','lat_category','pc1', 'pc2'])
    });

