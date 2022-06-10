$(function(e) {

	/*-----Sales-----*/
	var options1 = {
		chart: {
			height: 300,
			type: 'area',
			zoom: {
				enabled: false
			},
			dropShadow: {
				enabled: true,
				opacity: 0.2,
			},
			toolbar: {
			  show: false
			},
			events: {
			  mounted: function(ctx, config) {
				const highest1 = ctx.getHighestValueInSeries(0);
				const highest2 = ctx.getHighestValueInSeries(1);
				ctx.addPointAnnotation({
				  x: new Date(ctx.w.globals.seriesX[0][ctx.w.globals.series[0].indexOf(highest1)]).getTime(),
				  y: highest1,
				  label: {
						style: {
						  cssClass: 'd-none'
						}
					},
					  customSVG: {
						  SVG: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#661fd6" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>',
						  cssClass: undefined,
						  offsetX: -8,
						  offsetY: 5
						}
					})
					ctx.addPointAnnotation({
					  x: new Date(ctx.w.globals.seriesX[1][ctx.w.globals.series[1].indexOf(highest2)]).getTime(),
					  y: highest2,
					  label: {
						style: {
						  cssClass: 'd-none'
						}
					  },
					  customSVG: {
						  SVG: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#f7b731" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>',
						  cssClass: undefined,
						  offsetX: -8,
						  offsetY: 5
					  }
					})
				},
			}
		},
		colors: ['#525ce5', '#fd5261'],
		dataLabels: {
		  enabled: false
		},
		stroke: {
		  show: true,
		  curve: 'smooth',
		  width: 2,
		  lineCap: 'square'
		},
		series: [{
		  name: 'Total Income',
		  data: [47, 45, 154, 38, 156, 24, 65, 31, 137, 39, 162, 51, 35, 141, 35, 27, 93, 53, 167]
		}, {
		  name: 'Total Expenses',
		  data: [61, 27, 54, 143, 119, 46, 47, 45, 54, 138, 56, 24, 165, 31, 37, 39, 62, 51, 35, 141]
		}],
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		xaxis: {
			axisBorder: {
			  show: false
			},
			axisTicks: {
			  show: false
			},
			crosshairs: {
			  show: true
			},
			labels: {
			  offsetX: 0,
			  offsetY: 5,
			}
		},
		yaxis: {
			labels: {
			  offsetX: -2,
			  offsetY: 0,
			}
		},
		grid: {
			borderColor: 'rgba(112, 131, 171, .1)',
			xaxis: {
				lines: {
					show: true
				}
			},
			yaxis: {
				lines: {
					show: false,
				}
			},
			padding: {
			  top: 0,
			  right: 0,
			  bottom: 0,
			  left: 0
			},
		},
		legend: {
			position: 'top',
		},
		tooltip: {
			theme: 'dark',
			marker: {
			  show: true,
			},
			x: {
			  show: false,
			}
		},
		fill: {
		  type:"gradient",
		  gradient: {
			  type: "vertical",
			  shadeIntensity: 1,
			  inverseColors: !1,
			  opacityFrom: .28,
			  opacityTo: .05,
			  stops: [45, 100]
		  }
		},
	}
	///var chart1 = new ApexCharts(document.querySelector("#sales"), options1);
    ///chart1.render();
	/*-----Sales-----*/

	/*-----canvasDoughnut-----*/
	if ($('#canvasDoughnut').length) {
		var ctx = document.getElementById("canvasDoughnut").getContext("2d");
		new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: ['Mens', 'Womens', 'Kids', 'Electronics', 'Home & Furniture'],
				datasets: [{
					data: [56, 20, 30, 12, 22],
					backgroundColor: ['#525ce5', '#9c52fd', '#24e4ac', "#ffa70b", "#ec5444"],
					borderColor:'transparent',
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					display: false
				},
				cutoutPercentage: 65,
			}
		});
	}
	/*-----canvasDoughnut-----*/


	

 });