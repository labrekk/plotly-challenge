// Fetching data w/ d3.
// Incoming data is internally referred to as incomingData
function init() {
  // d3 json file (samples)
  d3.json("samples.json").then((incomingData) => {
    // variables for names, metadata, samples, selector tool
    var selector = d3.selectAll("#selDataset")
    var names = incomingData.names;
    var metaData = incomingData.metadata;
    var samples = incomingData.samples;
    // for loop for adding names to selector var
    names.forEach(function(name) {
      selector.append("option").text(name);
    });
    // chart variables
    var sampleValues = data.samples[0].sample_values.slice(0,10).reverse();
    var otu_ids = data.samples[0].otu_ids.slice(0,10).reverse().map(id => "OTU " + id)
    var otuLabels = data.samples[0].otu_labels.slice(0, 10).reverse();

    // trace
    var trace1 = {
      x: sampleValues,
      y: otu_ids,
      type: 'bar',
      orientation: 'h',
      text: otuLabels
    }
    var bar_layout = {
      title: 'Top Belly Button OTUs'
    }
    };
  
    // bar chart
    Plotly.newPlot('bar', trace, bar_layout);


    // ///////////////////////////////////////

    // Bubble
    
    var trace2 = {
      x: otu_ids,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sampleValues
      }
    }
    var bub_layout = {
      title: 'BB Samples',
    }
    Plotly.newPlot('bubble', trace2, bub_layout)
    };