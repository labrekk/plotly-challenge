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
    var sampleValues = incomingData.samples[0].sample_values.slice(0,10).reverse();
    var otu_ids = incomingData.samples[0].otu_ids.slice(0,10).reverse().map(id => "OTU " + id)
    var otuLabels = incomingData.samples[0].otu_labels.slice(0, 10).reverse();

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
    });
  
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

    // adding metadata
    var sampleMetadata = incomingData.metadata[0]
    var demographics = d3.select("#sample-metadata")

    // Append each key and value to the demographic info
    Object.entries(sampleMetadata).forEach(([key, value]) => {
        demographics.append("p")
        .text(`${key}: ${value}`);

    });
  };

init();

  // handling changes

function optionChanged(patientID) {
    console.log(patientID);
    init(patientID);
    demographics(patientID);
}

function initDashboard() {
    d3.json("samples.json").then(data => {
        var patientIDs = data.names;
        patientIDs.forEach(patientID => {
            selector.append("option").text(patientID).property("value", patientID)
        })
        init(patientIDs[0]);
        demographics(patientIDs[0]);
    });
};

initDashboard();
