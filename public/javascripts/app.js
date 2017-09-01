Vue.component('ga-options', {
  template: `
  <h3>{{message}}</h3>
  `,
  data: {
    message: 'Options'
  }
})

var app = new Vue({
  el: '#app',
  data: {
    radius: 10,
    numPoints: 60,
    computedFitness: null,
    points: [],
    population: 100,
    generations: 1000,
    crossover:{
      selected: 0.5,
      opts:[0.1, 0.2, 0.3, 0.4, 0.5, 0.6]
    },
    mutation: {
      selected: 0.1,
      opts: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6]
    }
  },
  methods: {
    runGA: function() {
      // POST /api
      this.$http.post('/api', {foo: 'bar'}).then(response => {
        this.computedFitness = response.body.data;
        this.toPoints(this.computedFitness.entity)

        console.log("new points", this.points);
        this.draw(this.points)
      }, response => {
        // error callback
      });
    },
    draw: function(points) {
      console.log("POINTS: ", points);
      var radius = this.radius
      var len = this.numPoints
      try {
        functionPlot({
          target: '#plot',
          yAxis: {domain: [-30, 20]},
          xAxis: {domain: [-30, 30]},
          data: [
            { fn: 'sqrt('+radius+' - x * x)', color: 'rgba(35, 43, 228, 0.31)' },
            { fn: '-sqrt('+radius+' - x * x)', color: 'rgba(35, 43, 228, 0.31)' },
            {
              points: points,
              fnType: 'points',
              color: '#f95e61',
              graphType: 'scatter'
            }
          ]
        });
      } catch (err) {
        console.log(err);
        alert(err);
      }
    },
    toPoints: function(chrom) {
      for (gen of chrom) {
        let point = [gen.x, gen.y]
        this.points.push(point)
      }
    }
  }

})
