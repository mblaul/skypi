import React, { Component } from 'react'

export default class Timegraph extends Component {
  render() {
    return (
      <div>
        <div>
            <canvas id="lineChart">
            </canvas>
                {/*} var ctxL = document.getElementById("lineChart").getContext('2d');
                var myLineChart = new Chart(ctxL, {
                    type: 'line',
                    data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [{
                            label: "Dataset",
                            data: [65, 59, 80, 81, 56, 55, 40],
                            backgroundColor: [
                                'rgba(105, 0, 132, .2)',
                            ],
                            borderColor: [
                                'rgba(200, 99, 132, .7)',
                            ],
                            borderWidth: 2
                            }]
                        },
                        options: {
                        responsive: true
                        }
                    });  Chart Data */}
        </div>
      </div>
    )
  }
}
