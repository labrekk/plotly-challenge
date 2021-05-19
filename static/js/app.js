// // Fetching data w/ d3.
// // Incoming data is internally referred to as incomingData
function init() {
  d3.json("samples.json").then(function(incomingData) {

  // d3 selector
  var selector = d3.select("#selDataset");
  // console.log(incomingData)
  
  // For loop for incoming data. Appending all.
  incomingData.names.forEach(function(name) {
      selector.append("option").text(name);
  });
  
  // variables for charts
  var sampleValues = incomingData.samples[0].sample_values.slice(0,10).reverse();
  var otuIDs = incomingData.samples[0].otu_ids.slice(0,10).reverse().map(id => "OTU " + id)
  var otuLabels = incomingData.samples[0].otu_labels.slice(0, 10).reverse();

  // first trace
  var trace = {
      x: sampleValues,
      y: otuIDs,
      type: "bar",
      orientation: "h",
      text: otuLabels
      }
  
  var bar_layout = {
      title: 'Top OTUs'
      }
  });

  // Plot the iniital bar chart rendering
  Plotly.newPlot("bar", [trace], bar_layout);




  // bubble chart
  var samplevaluesBubble = incomingData.samples[0].sample_values
  var otuidsBubble = incomingData.samples[0].otu_ids
  var otulabelsBubble = incomingData.samples[0].otu_labels

  // Create the bubble trace
  var trace2 = {
      x: otuidsBubble,
      y: samplevaluesBubble,
      text: otulabelsBubble,
      mode: 'markers',
      marker: {
          size: samplevaluesBubble,
          color: otuidsBubble,
          }
      };

  var bubble_layout = {
      title: 'OTU Bubbles',
  };
  
  Plotly.newPlot("bubble", [trace2], bubble_layout)

  // Metadata for Bubble chart
  var sampleMetadata = incomingData.metadata[0]
  var demographics = d3.select("#sample-metadata")

  // Append keys to demos
  Object.entries(sampleMetadata).forEach(([key, value]) => {
      demographics.append("p")
      .text(`${key}: ${value}`);
  })

};

init();



// 

// Call optionChanged() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged() {

  d3.json("samples.json").then(function(incomingData) {

  // d3 dropdown
  var dropdown = d3.select("#selDataset");

  // Var dropdown items when a new value is selected.
  var newValue = dropdown.property("value");

  var filteredSample = incomingData.samples.filter(sample => sample.id === newValue)[0];
  var newSamples = filteredSample.sample_values.slice(0,10).reverse();
  var new_otuIDs = filteredSample.otu_ids.slice(0,10).reverse().map(id => "OTU " + id)

  // Create a new trace using new selections on change. 
  var bartrace = {
      x: [newSamples],
      y: [new_otuIDs],
      type: "bar",
      orientation: "h"
      }

  var barLayout = {
    title: 'Top OTUs',
    margin: {
        l: 100,
        r: 100,
        t: 30,
        b: 20
      }
  };
  Plotly.restyle("bar", bartrace, barLayout);

  // Same process as above but for the bubble chart.
  var bubbleSamples = filteredSample.sample_values
  var bubble_otuIDs = filteredSample.otu_ids
  var bubble_otuLabels = filteredSample.otu_labels

  // Create a new trace using new selections on change. 
  var bubTrace = {
      x: [bubble_otuIDs],
      y: [bubbleSamples],
      text: [bubble_otuLabels],
      mode: 'markers',
      marker: {
          size: bubbleSamples,
          color: bubble_otuIDs,
          }
      };

  var bubLayout = {
      title: 'Bubble Chart',
      showlegend: false,
      height: 600,
      width: 1200
      };
  Plotly.restyle("bubble", bubTrace, bubLayout);

})};
