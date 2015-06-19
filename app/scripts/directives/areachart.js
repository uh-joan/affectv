'use strict';

/**
 * @ngdoc directive
 * @name finalApp.directive:areaChart
 * @description
 * # areaChart
 */
angular.module('finalApp')
  .directive('areaChart', ['lodash', function (lodash) {
    return {
      scope: {
        chartData: '='
      },
      link: function (scope, elem, attr) {

        scope.createBarChart = function(el, data) {
          var margin = {top: 20, right: 20, bottom: 100, left: 40},
            width = 600 - margin.left - margin.right,
            height = 350 - margin.top - margin.bottom;

          // Parse the date / time
          var	parseDate = d3.time.format('%d/%m/%Y').parse;

          var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

          var y = d3.scale.linear().range([height, 0]);

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .tickFormat(d3.time.format('%d/%m/%Y'));

          var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')
            .ticks(10);

          var svg = d3.select(el).append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform',
            'translate(' + margin.left + ',' + margin.top + ')');

          var data_copy= data;

          data = [];
          angular.forEach(data_copy, function(d) {
              this.push({'date': parseDate(d.date),'value':+d.fires});
            }, data);

          x.domain(data.map(function(d) { return d.date; }));
          y.domain([0, d3.max(data, function(d) { return d.value; })]);

          svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis)
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '-.55em')
            .attr('transform', 'rotate(-90)' );

            svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .append('text')
            //.attr('transform', 'rotate(-90)')
            .attr('y', -6)
            //.attr('dy', '.99em')
            .style('text-anchor', 'end')
            .text('Fires');

            svg.selectAll('bar')
              .data(data)
              .enter().append('rect')
              .style('fill', 'rgba(52, 22, 83, 0.15)')
              .attr('x', function(d) { return x(d.date); })
              .attr('width', x.rangeBand())
              .attr('y', function(d) { return y(d.value); })
              .attr('height', function(d) { return height - y(d.value); });
        };

        scope.$watch('chartData', function(newVal, oldVal){
          if (newVal) {
            scope.createBarChart(elem[0], newVal)
          }
        });

      }
    };
  }]);

