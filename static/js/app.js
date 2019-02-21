
function buildCharts(region) {
console.log("Hello world")

  // Use `d3.json` to fetch the sample data for the plots
  d3.json(`/sales/${region}`).then(function(selection) {
   
    const platform = selection.platform;
    const year_release = selection.year_release;
    const genre = selection.genre;
    const publisher = selection.publisher;
    const region = selection.region;
    const critic_score = selection.critic_score;
    const user_score = selection.user_score;
    const rating = selection.rating;
    // console.log("region: ", region)
    
    //////////////////////////////////////////////////////////////
    // Build Pie Chart for genre
    var pieData = [{
      values: region,
      labels: genre,
      hoverinfo: genre,
      type: "pie"
    }];

    var pieLayout = {
      margin: {t: 0, 1: 0}
    };
  
    Plotly.plot("pie1", pieData, pieLayout);

    //////////////////////////////////////////////////////////////
    // Build a Bar Chart for genre
    var genreData = [{
      x: genre,
      y: region,
      type: "bar",
      transforms: [{
        type: 'aggregate',
        groups: genre,
        aggregations: [
          {target: 'y', func: 'sum', enabled: true},
        ]
      }]
    }];
    
    var genreLayout = {
      margin: {t: 0},
      yaxis: {
        title: "Millions of Units"
      },
      xaxis: {
        title: "Genre"
      }
    };

    Plotly.plot("bar1", genreData, genreLayout);
    
    //////////////////////////////////////////////////////////////
    // Build a Bar Chart for publisher
    var pubData = [{
      x: publisher,
      y: region,
      type: "bar",
      transforms: [{
        type: 'aggregate',
        groups: publisher,
        aggregations: [
          {target: 'y', func: 'sum', enabled: true},
        ]
      }]
    }];
    
    var pubLayout = {
      margin: {t: 0},
      xaxis: {
        range: [-.5, 10.5],
        automargin: true,
        title: "Publisher"
      },
      yaxis: {
        title: "Millions of Units"
      }
    };

    Plotly.plot("bar2", pubData, pubLayout);

    //////////////////////////////////////////////////////////////
    // Build a Bar Chart for platform
    var platformData = [{
      x: platform,
      y: region,
      type: "bar",
      transforms: [{
        type: 'aggregate',
        groups: platform,
        aggregations: [
          {target: 'y', func: 'sum', enabled: true},
        ]
      }]
    }];
    
    var platformLayout = {
      margin: {t: 0},
      yaxis: {
        title: "Millions of Units"
      },
      xaxis: {
        title: "Platform"
      }
    };

    Plotly.plot("bar3", platformData, platformLayout);


    //////////////////////////////////////////////////////////////
    // Build Pie Chart for ESRB rating
    var ratingData = [{
      values: region,
      labels: rating,
      hoverinfo: rating,
      type: "pie"
    }];

    var ratingLayout = {
      margin: {t: 0, 1: 0}
    };
  
    Plotly.plot("pie2", ratingData, ratingLayout);


  //////////////////////////////////////////////////////////////
  // Build a scatter plot for Critic Scores
    var criticData = [{
      x: critic_score,
      y: region,
      mode: "markers",    
      type: "scatter",
      transforms: [{
        type: 'aggregate',
        groups: critic_score,
        aggregations: [
          {target: 'y', func: 'sum', enabled: true},
        ]
      }]
    }];

    var criticLayout = {
      margin: {t: 0},
      yaxis: {
        title: "Millions of Units"
      },
      xaxis: {
        title: "Critic Score"
      }
    };

    Plotly.plot("plot1", criticData, criticLayout);


    //////////////////////////////////////////////////////////////
    // Build a scatter plot for User Scores
    var userData = [{
      x: user_score,
      y: region,
      mode: "markers",    
      type: "scatter",
      transforms: [{
        type: 'aggregate',
        groups: user_score,
        aggregations: [
          {target: 'y', func: 'sum', enabled: true},
        ]
      }]
    }];

    var userLayout = {
      margin: {t: 0},
      yaxis: {
        title: "Millions of Units"
      },
      xaxis: {
        title: "User Score"
      }
    };

    Plotly.plot("plot2", userData, userLayout);

    });



    //////////////////////////////////////////////////////////////
    // Using ChartJS
    // Use `d3.json` to fetch the sample data for the plots
    d3.json(`/year_sales/${region}`).then(function(year_selection) {
        console.log(year_selection);

        const year_agg = year_selection.year;
        const region_agg = year_selection.region;

        // Build Line Chart using ChartJS
        var ctx = document.getElementById('line').getContext('2d');
        var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: year_agg,
            datasets: [{
                label: 'Total Sales',
                data: region_agg,
                backgroundColor: "rgba(153,255,51,0.4)"
            }]
        },
        options: {
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Millions of Units',
                  fontSize: 16
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Year of Release',
                  fontSize: 16
                }
              }],
            }     
        }

        });
    });   


}





function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/region").then((regionName) => {
    regionName.forEach((region) => {
      selector
        .append("option")
        .text(region)
        .property("value", region);
    });
    
    // Use the first sample from the list to build the initial plots
    const firstRegion = regionName[0];
    buildCharts(firstRegion);
  });
}

function optionChanged(newRegion) {
  Plotly.purge("pie1");
  Plotly.purge("pie2");
  Plotly.purge("bar1");
  Plotly.purge("bar2");
  Plotly.purge("bar3");
  Plotly.purge("plot1");
  Plotly.purge("plot2");
  
  // Fetch new data each time a new sample is selected
  // console.log(newRegion);
  buildCharts(newRegion);
}

// Initialize the dashboard
init();
