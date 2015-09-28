// Google Theme color 
function colores_google(n) {
  var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
  return colores_g[n % colores_g.length];
}
var width = 1024,
    height = 768;
// create the canvas 
var svg = d3.select("#canvas").append("svg")
    .attr("width", width)
    .attr("height", height)
	.style("border", "1px solid black");
// data globel var
var data_g;	

// load data from local disk
d3.json("data/publication.csv", function(error, data) {
  if (error) return console.error(error.status);

 /* Define the data for the circles , cerate a group */
var elem = svg.selectAll("g authorGroup")
        .data(data.authorList)
 /*Create and place the "blocks" containing the circle and the text */  
var elemEnter = elem.enter()
	    .append("g")

var radius = 100;		
var author = elemEnter
      .append("circle")
      .attr("class", "author")
      .attr("r", 30)
	  .attr("cx", function(d,i) { return radius*(i+1); })
	  .attr("cy", radius)//="25" cy="25"
      .style("stroke", function(d,i) { return colores_google(i); })
	  .style("fill", function(d,i) { var img = "url(#image"+i; return img; });
/* Create the text for each block */
var nameTag = elemEnter.append("text")
		.attr("class", "name")
	    .attr("dx", function(d,i){return radius*(i+1)-25;})
		.attr("dy", function(d){return radius+50})
	    .text(function(d){return d.name})
		.style("fill", function(d,i) { return colores_google(i); })
		
var paper = svg.selectAll(".paper")
      .data(data.paperList)
      .enter().append("circle")
      .attr("class", "paper")
	  .attr("id", function(d,i) { return "paper"+i; })
      .attr("r", 10)
	  .attr("cx", function(d,i) { return radius*(i+1)*0.6; })
	  .attr("cy", radius*2)//="25" cy="25"
	  //Paper Type: 0-->"article", 1--> "conference"  
      .style("fill", function(d,i) { return colores_google(d.type); })
	  
var link = elemEnter
	  .append("line")
      .attr("class", "link")
	  .attr("x1", function(d,i) { return radius*(i+1); })
	  .attr("y1", function(d) { return radius; })
	  .attr("x2", function(d,i) { return radius*(i+1)+140; })
	  .attr("y2", function(d) { return radius+140; })
	 
    
 
 
	
      
});

