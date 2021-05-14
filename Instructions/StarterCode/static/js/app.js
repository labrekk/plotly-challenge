// Fetching data w/ d3.
// Incoming data is internally referred to as incomingData
function init() {
    d3.json("samples.json").then((incomingData) => {
        console.log(incomingData);
        var names = importedData.names;
        var metaData = importedData.metadata;
        var samples = importedData.samples;
      };
    };