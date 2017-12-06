var upperChartHeight = 840
var upperChartWidth = 1300
var lowerChartHeight = 400 
var lowerChartWidth = 650

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


cXPCA = d3.scaleLinear()
		.domain(d3.extent(pca_data,function(d){return d.pc1;}))
		.range([40,(lowerChartWidth-40)]);
cYPCA = d3.scaleLinear()
		.domain(d3.extent(pca_data,function(d){return d.pc2;}))
		.range([(lowerChartHeight-40),30]);
cXTIME = d3.scaleLinear()
    .domain(d3.extent(loss_data,function(d){return d.time_step;}))
    .range([30,(2*upperChartWidth/3)]);
cYGEN = d3.scaleLinear()
    .domain(d3.extent(loss_data,function(d){return d.gen_loss;}))
    .range([upperChartHeight-30,(upperChartHeight/2)+30]);
cYDISC = d3.scaleLinear()
    .domain(d3.extent(loss_data,function(d){return d.disc_loss;}))
    .range([(upperChartHeight/2)-30,30]);

var bAxis = d3.axisBottom(cXPCA)
var lAxis = d3.axisLeft(cYPCA)
var bAxis2 = d3.axisBottom(cXTIME)
var lAxis2 = d3.axisLeft(cYGEN)
var lAxis3 = d3.axisLeft(cYDISC)

//LOWER CHART
var chart4 = d3.select("#scatterplot_1")
var svg4 = chart4.append("svg")
var brush = svg4.append("g")
      .attr("class", "brush")
      .call(d3.brush()
        .extent([[0, 0], [lowerChartWidth, lowerChartHeight]])
        .on("start brush end", brushed));
svg4.attr("width", lowerChartWidth).attr("height", lowerChartHeight).attr("class","chart2")
svg4.append("g")
	.attr("transform","translate(0," + (lowerChartHeight-40) + ")")
	.attr("id","x-axis")
	.call(bAxis)
svg4.append("g")
	.attr("id","y-axis")
	.attr("transform","translate(40,0)")
	.call(lAxis)
circle = svg4.selectAll("circle")
	.data(pca_data)
	.enter()
	.append("circle")
    .attr("class", "node")
	.attr("cx", function(d) { return cXPCA(d.pc1);})
	.attr("cy", function(d) { return cYPCA(d.pc2); })
    .attr("r", function(d) { return 4; })
    .attr("stroke", function() { return "black" })
    .attr("stroke-width", function() { return 0.5  })
    .style("fill", function(d) { return colorCat(d.data_category)} )
    .on("click",function(d){
        tabulate([d],['time_step','data_category','lat_category','pc1', 'pc2'])
    });

//UPPER CHARTS
var chart5 = d3.select("#chart1")
var svg5 = chart5.append("svg")
/*var brush2 = svg5.append("g")
      .attr("class", "brush")
      .call(d3.brush()
        .extent([[0, 0], [450, 400]])
        .on("start brush end", brushed2));*/
svg5.attr("width", upperChartWidth).attr("height", upperChartHeight).attr("class","chart2")
svg5.append("g")
    .attr("class", "circle")
    .attr("transform","translate(0," + (upperChartHeight-20) + ")")
    .attr("id","x-axis")
    .call(bAxis2)
svg5.append("g")
    .attr("id","y-axis")
    .attr("transform","translate(30,0)")
    .call(lAxis2)
circle2 = svg5.selectAll("circle")
    .data(loss_data)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return cXTIME(d.time_step);})
    .attr("cy", function(d) { return cYGEN(d.gen_loss);})
    .attr("r", function(d) { return 8; })
    .attr("stroke", function() { return "black"; })
    .attr("stroke-width", function() { return 1;  })
    .style("fill", function(d) { return colorCat(d.data_category)} )
    .on("click",function(d) {
      chart5.selectAll("image").remove()
      showImage(d.image0, 900, 0)
      showImage(d.image1, 900, 280)
      showImage(d.image2, 900, 560)
    });



svg5.append("g")
    .attr("class", "circle")
    .attr("transform","translate(0," + (upperChartHeight/2-20) + ")")
    .attr("id","x-axis")
    .call(bAxis2)
svg5.append("g")
    .attr("id","y-axis")
    .attr("transform","translate(30,0)")
    .call(lAxis3)
circle3 = svg5.selectAll("circle2")
    .data(loss_data)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return cXTIME(d.time_step);})
    .attr("cy", function(d) { return cYDISC(d.disc_loss);})
    .attr("r", function(d) { return 8; })
    .attr("stroke", function() { return "black"; })
    .attr("stroke-width", function() { return 1;  })
    .style("fill", function(d) { return colorCat(d.data_category)} )
    .on("click",function(d) {
      chart5.selectAll("image").remove()
      showImage(d.image0, 900, 0)
      showImage(d.image1, 900, 280)
      showImage(d.image2, 900, 560)
    });


svg4.append("text")
        .attr("x", (lowerChartWidth / 2) + 70)             
        .attr("y", 30)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("The First 2 Principal Components");

/*svg5.append("text")
        .attr("x", (upperChartWidth / 2))             
        .attr("y", 30)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Generator Loss vs Training Updates");

svg5.append("text")
        .attr("x", (upperChartWidth / 2))             
        .attr("y", (upperChartHeight / 2) + 30)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Discriminator Loss vs Training Updates");**/



function brushed() {
    /*if (brushCell !== this) {
      d3.select(brushCell).call(brush.move,null);
      brushCell = this;
    }*/
    var selection = d3.event.selection;
    circle.classed("selected", selection && function(d) {
      return cXPCA.invert(selection[0][0]) <= d.pc1 && d.pc1 < cXPCA.invert(selection[1][0])
          && cYPCA.invert(selection[0][1]) >= d.pc2 && d.pc2 > cYPCA.invert(selection[1][1]);    });
    d3.selectAll("circle")
      .filter(".selected")
}

function classed(data) {
  crircle = d3.selectAll("circle")
    circle.classed("selected", circle && function(d){
      return data.time_step == d.time_step && data.data_category == d.data_category;
    })
}

function showImage(image, x, y) {
  console.log(image)
  svg5.append("svg:image")
    .attr("xlink:href", "file:images/" + image)
    .attr("x", x)
    .attr("y", y)
    .attr("width", 280)
    .attr("height", 280);
}

/*function brushed2() {
    /*if (brushCell !== this) {
      d3.select(brushCell).call(brush.move,null);
      brushCell = this;
    }
    var selection = d3.event.selection;
    circle.classed("selected", selection && function(d) {
      return cXACT.invert(selection[0][0]) <= d.ACT && d.ACT < cXACT.invert(selection[1][0])
          && cYGPA.invert(selection[0][1]) >= d.GPA && d.GPA > cYGPA.invert(selection[1][1]);    });
    circle2.classed("selected", selection && function(d) {
      return cXACT.invert(selection[0][0]) <= d.ACT && d.ACT < cXACT.invert(selection[1][0])
          && cYGPA.invert(selection[0][1]) >= d.GPA && d.GPA > cYGPA.invert(selection[1][1]);    });
}*/