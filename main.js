var upperChartHeight = 600
var upperChartWidth = 1200
var lowerChartHeight = 400 
var lowerChartWidth = 1500

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

var disc_line = d3.line()
    .x(function(d) { return cXTIME(d.time_step); }) // set the x values for the line generator
    .y(function(d) { return cYDISC(d.disc_loss); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX)

var gen_line = d3.line()
    .x(function(d) { return cXTIME(d.time_step); }) // set the x values for the line generator
    .y(function(d) { return cYGEN(d.gen_loss); }); // set the y values for the line generator 


//var vMax = d3.max(pca_data,function(d){return d.SATV;})
//var vMin = d3.min(pca_data,function(d){return d.SATV;})
//var vAvg = d3.mean(pca_data,function(d){return d.SATV;})

var selectedCat = "mnist"

var selectedLossData = []
var selectedPCAData = []

for (thing in loss_data){
  //console.log(loss_data[thing]["data_category"])
  if (loss_data[thing]["data_category"] == selectedCat) {
    selectedLossData.push(loss_data[thing])
  }
}

for (thing in pca_data){
  //console.log(loss_data[thing]["data_category"])
  if (pca_data[thing]["data_category"] == selectedCat) {
    selectedPCAData.push(pca_data[thing])
  }
}

var colorCat = d3.scaleOrdinal()
						.domain(["fashion","mnist","inf"])
						.range(['red','yellow','orange'])

function createCharts() {
  cXPCA = d3.scaleLinear()
  		.domain(d3.extent(selectedPCAData,function(d){return d.pc1;}))
  		.range([40,(2*lowerChartWidth/5-40)]);
  cYPCA = d3.scaleLinear()
  		.domain(d3.extent(selectedPCAData,function(d){return d.pc2;}))
  		.range([(lowerChartHeight-40),30]);
  cXTIME = d3.scaleLinear()
      .domain(d3.extent(selectedLossData,function(d){return d.time_step;}))
      .range([30,(2*upperChartWidth/3)]);
  cYGEN = d3.scaleLinear()
      .domain(d3.extent(selectedLossData,function(d){return d.gen_loss;}))
      .range([upperChartHeight-30,(upperChartHeight/2)+30]);
  cYDISC = d3.scaleLinear()
      .domain(d3.extent(selectedLossData,function(d){return d.disc_loss;}))
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
  	.data(selectedPCAData)
  	.enter()
  	.append("circle")
      .attr("class", "pca-circle")
      .attr("cx", function(d) { return cXPCA(d.pc1);})
      .attr("cy", function(d) { return cYPCA(d.pc2); })
      .attr("r", function(d) { return 4; })
      .attr("stroke", function() { return "black" })
      .attr("stroke-width", function() { return 0.5  })
      .style("fill", function(d) { return colorCat(d.data_category)} );

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
      .attr("id","x-axis-epoch")
      .call(bAxis2)
  svg5.append("g")
      .attr("id","y-axis")
      .attr("transform","translate(30,0)")
      .call(lAxis2)
  circle2 = svg5.selectAll("circle")
      .data(selectedLossData)
      .enter()
      .append("circle")
      .attr("class", "gen-loss-circle")
      .attr("cx", function(d) { return cXTIME(d.time_step);})
      .attr("cy", function(d) { return cYGEN(d.gen_loss);})
      .attr("r", function(d) { return 8; })
      .attr("stroke", function() { return "black"; })
      .attr("stroke-width", function() { return 1;  })
      .style("fill", function(d) { return colorCat(d.data_category)} )
      .on("click",function(d) {
        chart5.selectAll("image").remove()
        showImage(d.image0, 1200, 0)
        showImage(d.image1, 1200, 280)
        showImage(d.image2, 1200, 560)
      });

  /*  circle2.append("path")
      .attr("class","line")
      .attr("d", line);*/





  svg5.append("g")
      .attr("class", "circle")
      .attr("transform","translate(0," + (upperChartHeight/2-20) + ")")
      .attr("id","x-axis-epoch")
      .call(bAxis2)
  svg5.append("g")
      .attr("id","y-axis")
      .attr("transform","translate(30,0)")
      .call(lAxis3)
  circle3 = svg5.selectAll("circle2")
      .data(selectedLossData)
      .enter()
      .append("circle")
      .attr("class", "disc-loss-circle")
      .attr("cx", function(d) { return cXTIME(d.time_step);})
      .attr("cy", function(d) { return cYDISC(d.disc_loss);})
      .attr("r", function(d) { return 8; })
      .attr("stroke", function() { return "black"; })
      .attr("stroke-width", function() { return 1;  })
      .style("fill", function(d) { return colorCat(d.data_category)} )
      .on("click",function(d) {
        chart5.selectAll("image").remove()
        showImage(d.image0, 1200, 0)
        showImage(d.image1, 1200, 280)
        showImage(d.image2, 1200, 560)
      });

  mini_rects = svg5.selectAll("rect")
      .data(selectedPCAData)
      .enter()
      .append("rect")
      .attr("class","tiny-box")
      .attr("x", 1200)
      .attr("y", 0)
      .attr("width", 28)
      .attr("height", 28)
      .attr("stroke-width", 0.5)
      .attr("stroke", "black")
      .attr("fill","none")
      .attr("transform",function(d){
        //console.log(d.row)
        return "translate(" + d.row*28*.7 + "," + (d.column * 28 + d.lat_category * 280)*.7 + ") scale(0.7)"
      });


  svg4.append("text")
          .attr("x", 180)             
          .attr("y", 30)
          .attr("text-anchor", "middle")  
          .style("font-size", "16px") 
          .style("text-decoration", "underline")  
          .text("First 2 Principal Components");
  svg5.append("text")
          .attr("x", 180)             
          .attr("y", 530)
          .attr("text-anchor", "middle")  
          .style("font-size", "16px") 
          .style("text-decoration", "underline")  
          .text("Generator Loss vs Training Updates");
  svg5.append("text")
          .attr("x", 180)             
          .attr("y", 30)
          .attr("text-anchor", "middle")  
          .style("font-size", "16px") 
          .style("text-decoration", "underline")  
          .text("Discriminator Loss vs Training Updates");

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
      var selectThesePoints = {}
      var selection = d3.event.selection;
      circleSelect = circle.filter(function(d) {return cXPCA.invert(selection[0][0]) <= d.pc1 && d.pc1 < cXPCA.invert(selection[1][0])
            && cYPCA.invert(selection[0][1]) >= d.pc2 && d.pc2 > cYPCA.invert(selection[1][1]);})
      //console.log(circleSelect.data())
      for (thing in circleSelect.data()){
        //console.log(circleSelect.data()[thing])
        theDict = circleSelect.data()[thing]
        if (theDict["data_category"] in selectThesePoints){
          data_c = theDict["data_category"]
          if (theDict["time_step"] in selectThesePoints[data_c]){
            t_step = theDict["time_step"]
            // add print line here to make sure you selectThesePoints[theDict["data_category"]] has time_step in it
            if ("count" in selectThesePoints[data_c][t_step]){
              selectThesePoints[data_c][t_step]["count"] += 1
            } else {
              // þis else shouldn't be needed
              selectThesePoints[data_c][t_step]["count"] = 1 
            }
          } else {
            selectThesePoints[theDict["data_category"]][theDict["time_step"]] = {}
            selectThesePoints[theDict["data_category"]][theDict["time_step"]]["count"] = 1
          }
        } else {
          selectThesePoints[theDict["data_category"]] = {}
          selectThesePoints[theDict["data_category"]][theDict["time_step"]] = {}
          selectThesePoints[theDict["data_category"]][theDict["time_step"]]["count"] = 1
        }
      }
      console.log(selectThesePoints)
      createHistogram(selectThesePoints)
      circle.classed("selected", selection && function(d) {
        return cXPCA.invert(selection[0][0]) <= d.pc1 && d.pc1 < cXPCA.invert(selection[1][0])
            && cYPCA.invert(selection[0][1]) >= d.pc2 && d.pc2 > cYPCA.invert(selection[1][1]);    });
      mini_rects.classed("selected", selection && function(d) {
        return cXPCA.invert(selection[0][0]) <= d.pc1 && d.pc1 < cXPCA.invert(selection[1][0])
            && cYPCA.invert(selection[0][1]) >= d.pc2 && d.pc2 > cYPCA.invert(selection[1][1]);    });
      mini_rects.moveToFront()
      
  }



  function showImage(image, x, y) {
    svg5.append("svg:image")
      .attr("xlink:href", "file:images/" + image)
      .attr("x", x)
      .attr("y", y)
      .attr("width", 280)
      .attr("height", 280)
      .attr("transform","scale(0.7)");
  }
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




//d3.selectAll("circle")
//  .filter(function(d){return d.data_category != selectedCat})
//  .remove()


// Here is a list with objects that specify some buttons.
var buttonList = [
    {
        name: "button1",
        text: "MNIST Classic Dataset",
        click: function() { 
          selectedCat = "mnist"
          selectedLossData = []
          selectedPCAData = []
          for (thing in loss_data){
            //console.log(loss_data[thing]["data_category"])
            if (loss_data[thing]["data_category"] == selectedCat) {
              selectedLossData.push(loss_data[thing])
            }
          }
          for (thing in pca_data){
            //console.log(loss_data[thing]["data_category"])
            if (pca_data[thing]["data_category"] == selectedCat) {
              selectedPCAData.push(pca_data[thing])
            }
          }
          //I'm very sorry for this hack
          d3.selectAll("svg").remove()
          createCharts()
        }
        
    },
    {
        name: "button2",
        text: "MNIST Deformed/Translated Dataset",
        click: function() { 
          selectedCat = "inf"
          selectedLossData = []
          selectedPCAData = []
          for (thing in loss_data){
            //console.log(loss_data[thing]["data_category"])
            if (loss_data[thing]["data_category"] == selectedCat) {
              selectedLossData.push(loss_data[thing])
            }
          }
          for (thing in pca_data){
            //console.log(loss_data[thing]["data_category"])
            if (pca_data[thing]["data_category"] == selectedCat) {
              selectedPCAData.push(pca_data[thing])
            }
          }
          //I'm very sorry for this hack
          d3.selectAll("svg").remove()
          createCharts()
        }
    }
    ,
    {
        name: "button3",
        text: "MNIST Fashion Dataset",
        click: function() { 
          selectedCat = "fashion"
          selectedLossData = []
          selectedPCAData = []
          for (thing in loss_data){
            //console.log(loss_data[thing]["data_category"])
            if (loss_data[thing]["data_category"] == selectedCat) {
              selectedLossData.push(loss_data[thing])
            }
          }
          for (thing in pca_data){
            //console.log(loss_data[thing]["data_category"])
            if (pca_data[thing]["data_category"] == selectedCat) {
              selectedPCAData.push(pca_data[thing])
            }
          }
          //I'm very sorry for this hack
          d3.selectAll("svg").remove()
          createCharts()
        }
    }
];

d3.select("#buttons_1")
    .selectAll("button")
    .data(buttonList)
    .enter()
    .append("button")
    .attr("id", function(d) { return d.name; })
    .text(function(d) { return d.text; })
    .on("click", function(d) {
        // Since the button is bound to the objects from buttonList,
        // the expression below calls the click function from either
        // of the two button specifications in the list.
        return d.click();
    });

createCharts()

function createHistogram(theDict){
  var xHist = d3.scaleLinear()
            .domain([200,2000])
            .range([2*lowerChartWidth/5 + 40,lowerChartWidth])
  var yHist = d3.scaleLinear()
            .domain(d3.extent(theDict,function(d){return d.count}))
            .range([0,lowerChartHeight])
  var bins = d3.histogram()
                .domain(xHist.domain())
                .thresholds(xHist .ticks(200))
                (theDict)


}
