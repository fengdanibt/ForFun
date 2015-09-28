var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
var width = 800,
    height = 600;
	// create canvas

// init color 
//var color = d3.scale.category20();
/*	
svg.append("circle")
         .attr("class", "node")
         .attr("cx", 225)
         .attr("cy", 225)
         .attr("r", 30)
         .style("fill", "url(#image)")  
		 .style("stroke", function(d) { return color(0); })
         .style("stroke-width", 5)
         .on("mouseover", function(){ 
               d3.select(this)
                   .style("opacity", .5) 
         })
          .on("mouseout", function(){ 
               d3.select(this)
                   .style("opacity", 1) 
         });	
svg.append("circle")
         .attr("class", "node")
         .attr("cx", 500)
         .attr("cy", 225)
         .attr("r", 30)
         .style("fill", "url(#image2)")  
		 .style("stroke", function(d) { return color(0); })
         .style("stroke-width", 5)
         .on("mouseover", function(){ 
               d3.select(this)
			   .style("opacity", .5) 
                   //.style("fill", "url(#image)");
         })
          .on("mouseout", function(){ 
               d3.select(this)
                   .style("opacity", 1) 
         });	
svg.append("circle")
         .attr("class", "node")
         .attr("cx", 375)
         .attr("cy", 300)
         .attr("r", 30)
         .style("fill", "url(#image3)")  
		 .style("stroke", colores_g[3])		 
         .style("stroke-width", 5)
         .on("mouseover", function(){ 
               d3.select(this)
			   .style("opacity", .5) 
                   //.style("fill", "url(#image)");
         })
          .on("mouseout", function(){ 
               d3.select(this)
                   .style("opacity", 1) 
         });
		 
	*/
var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-200)
    .linkDistance(80)
    .size([width, height]);

var svg = d3.select("#canvas").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("data/miserables.json", function(error, graph) {
  if (error) throw error;

  force
      .nodes(graph.nodes)
      .links(graph.links)
   

  var link = svg.selectAll(".link")
      .data(graph.links)
	  .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll(".node")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("class", function(d) { if(d.group<10){ return "node";} else {return "paper";}  })
      .attr("r", function(d) { if(d.group<10){ return 30;} else {return 5;}  })
      .style("stroke", function(d) { return color(d.group); })
	  .style("fill", function(d) { var img = "url(#image"+d.group; return img; })//"url(#"+"image"+d.group+")")  
      .call(force.drag);

  //node.append("title")
  //    .text(function(d) { return d.name; });
// draw the node text as well
	/* Draw the node labels first
   var texts = svg.selectAll(".paper")
                    .append("text")
                    .attr("fill", "black")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "5px")
					.attr("x", d.cx)
					.attr("y", d.cy)
                    .text(function(d) { return d.name; });      */
					
  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
  force.start();
});
