var express = require('express');
var router = express.Router();

var Genetic = require("genetic-js");
var math = require("mathjs")

/* GET genetic responds list. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST genetic responds list. */
router.post('/', function(req, res) {
  console.log("api req");
  console.log(req.param.body);

  var computedResult = []

  genetic = Genetic.create();
  genetic.optimize = Genetic.Optimize.Minimize;

  genetic.select1 = Genetic.Select1.Tournament2;
  genetic.select2 = Genetic.Select2.Tournament2;

  genetic.seed = function() {
    var math = require("mathjs")
    var minLimit = this.userData["boundMin"]
    var maxLimit = this.userData["boundMax"]
    var long = this.userData["long"]

    var individual = []
    for (var i = 0; i < long; i++) {
      var gen = {
        x: math.random(minLimit, maxLimit),
        y: math.random(minLimit, maxLimit)
      }
      individual.push(gen)
    }
    return individual
  };

  genetic.mutate = function(entity) {
    // console.log("mutate Before:", entity);
    var math = require("mathjs")
    var minLimit = this.userData["boundMin"]
    var maxLimit = this.userData["boundMax"]
    var gen = {
      x: math.random(minLimit, maxLimit),
      y: math.random(minLimit, maxLimit)
    }

    // chromosomal drift
    var i = Math.floor(Math.random() * entity.length)
    entity[i] = gen
    // console.log("index mutate: ", i);
    // console.log("mutate After:", entity);
    return entity
  };

  genetic.crossover = function(mother, father) {
    var math = require("mathjs")
    // // two-point crossover
    var len = mother.length;

    var son = []
    var daughter = []
    //sigle point
    var index = math.randomInt(len)
    for (var i = 0; i < len; i++) {
      if (i <= index) {
        son.push(mother[i])
        daughter.push(father[i])
      } else {
        son.push(father[i])
        daughter.push(mother[i])
      }
    }
    return [son, daughter];
  };

  /*evalue distance betwens of each pints(genes) and future circle*/
  genetic.fitness = function(entity) {
    var math = require("mathjs")
    var dTotal = 0
    var str = "**"
    for (var i = 0; i < entity.length; i++) {
      var gen = entity[i]
      var x = gen.x
      var y = gen.y
      var d = math.sqrt(x * x + y * y) - this.userData["radius"]
      var dAbs = math.abs(d)
      str += " + " + dAbs
      dTotal += dAbs
    }
    // console.log("Fitness: "+str+" = "+dTotal);
    var fitness = dTotal
    return fitness;
  };

  genetic.generation = function(pop, generation, stats) {
    // stop running once we've reached the solution
    return pop[0].fitness > 0;
  };

  genetic.notification = function(pop, generation, stats, isFinished) {
    // console.log(pop);
    var value = pop[0].entity;
    this.last = this.last || value;

    if (pop != 0 && value == this.last)
      return;
    //
    var solution = [];
    var i;
    for (i = 0; i < value.length; ++i) {
      var point = {
        x: value[i].x.toFixed(1),
        y: value[i].y.toFixed(1)
      }
      solution.push(JSON.stringify(point));
    }

    var row = ""
    row += "| " + generation + " |";
    row += "| " + pop[0].fitness.toPrecision(5) + " |";
    // row += "| " + solution.toString() + " |";
    console.log(row);
    computedResult = pop[0]
    this.last = value;
  };

  var config = {
    "iterations": 1000,
    "size": 600,
    "crossover": 0.8,
    "mutation": 0.3,
    "skip": 100
  };

  var userData = {
    "boundMin": -30,
    "boundMax": 30,
    "radius": 10,
    "long": 60
  };

  genetic.evolve(config, userData);

  res.json({data: computedResult})

});

module.exports = router;
