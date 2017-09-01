//
// //chromosome with random (y,x) gens
// function getRandomChromosome(len, min, max){
//   var chromosome = new Array(len)
//   for (let i = 0; i < chromosome.length; i++) {
//     var gen = {
//       x: math.randomInt(min, max),
//       y: math.randomInt(-3, 3)
//     }
//     chromosome[i] = gen
//   }
//   return chromosome
// }
//
// function population(len) {
//   var population = []
//   for (var i = 0; i < len; i++) {
//     var randomChromosome = getRandomChromosome(10, -20, 20)
//     population.push(randomChromosome)
//   }
//   return population
// }
//
// function evalFunctionObjetive(chromosome, center, radio) {
//   var distances = []
//   var totalDistances=0
//   for (var i = 0; i < chromosome.length; i++) {
//     var gen = chromosome[i]
//     var sqrt = Math.sqrt( Math.pow(gen.x - center.x, 2) + Math.pow(gen.y - center.y, 2) )
//     var genDistance = Math.abs(sqrt - radio)
//     distances.push(genDistance.toFixed(4))
//     totalDistances += genDistance
//   }
//   // console.log("distances: "+distances.toString());
//   return totalDistances
// }
//
// function getHighestFitness(chromosomes) {
//   var highestChromosome
//
//   f_obj = []
//   for (chromosome of chromosomes) {
//     var objetiveValue = evalFunctionObjetive(chromosome, {x:0, y:0}, 10)
//     f_obj.push(objetiveValue.toFixed(4))
//   }
//   console.log("f_obj: "+f_obj);
//
//   var fitness = []
//   var totalFitness = 0
//   for (f_obj_i of f_obj) {
//     var fitness_i = 1/(1+f_obj_i);
//     fitness.push(fitness_i.toFixed(4))
//     totalFitness += fitness_i
//   }
//   console.log("fitness: "+fitness);
//   console.log("totalFitness: "+totalFitness);
//
//   var probabilities = []
//   for (fitness_i of fitness) {
//     probabilities.push( (fitness_i/totalFitness) )
//   }
//   console.log("probabilities: ", probabilities);
//   var highestValue = math.max(probabilities)
//   var highestChromosomeIndex = probabilities.indexOf(highestValue)
//
//   console.log("highestValue: "+highestValue);
//   console.log("highestChromosome: "+highestChromosomeIndex);
//
//   var fitness = {
//     chromosome: chromosomes[highestChromosomeIndex],
//     index: highestChromosomeIndex,
//     probabilities: probabilities
//   }
//
//   return fitness
// }
//
// function printChromosomes(chromosomes, numFitness) {
//
//   var strPoints = ''
//   $("#chromosomes").html('')
//   var i = 0
//   for (chromosome of chromosomes) {
//     strGen = 'chr['+ i++ +'] = '
//     for (gen of chromosome) {
//       strGen += ' ['+gen.x+', '+gen.y+']'
//       strPoints += strGen
//     }
//     var distance = evalFunctionObjetive(chromosome, {x:0, y:0}, 10)
//     var $h4 = $("<h5/>").text(strGen + ' = '+distance.toFixed(2))
//     if (numFitness == i-1) {
//       $h4.css('font-weight', 'bold'); //print fitness individual
//       $("#chromosomes").append($h4, $("<br>")) //print other individuals
//     }
//
//   }
//   $("#chromosomes").append('<hr>')
// }
//
// function getRandomIndex(probabilities) {
//   var num = Math.random(),
//     s = 0,
//     lastIndex = probabilities.length - 1;
//   for (var i = 0; i < lastIndex; ++i) {
//       s += probabilities[i];
//       if (num < s) {
//         return i;
//       }
//   }
//   return lastIndex;
// }
//
// function crossover(chrom1, chrom2, position){
//   console.log(chrom1, chrom2, "position: "+position);
//   var newChrom = []
//   for (var i = 0; i < chrom1.length; i++) {
//     i<position ? newChrom.push(chrom1[i]): newChrom.push(chrom2[i])
//   }
//   console.log("NewChrome", newChrom);
//   return newChrom
// }
//
// function crossoverPopulation(chromosomes, pc) {
//   var len = chromosomes.length
//   var arrR = Array.from({length: len}, ()=>Math.random())
//   console.log("Random to Parents R: ", arrR);
//   var indexParents = []
//   for (var i = 0; i < arrR.length; i++) {
//     if (arrR[i]<pc) indexParents.push(i)
//   }
//   console.log("indexParents: "+indexParents.toString());
//   for (var i = 0; i < indexParents.length; i++) {
//     if (i == indexParents.length-1){
//       chromosomes[indexParents[i]] = crossover(chromosomes[indexParents[i]], chromosomes[indexParents[0]], math.randomInt(0, chromosomes[0].length))
//     }
//     else{
//       chromosomes[indexParents[i]] = crossover(chromosomes[indexParents[i]], chromosomes[indexParents[i+1]], math.randomInt(0, chromosomes[0].length))
//     }
//   }
//   return chromosomes
// }
//
// function mudateChromosome(chromosomes, pm) {
//   var totalGen = chromosomes.length*chromosomes[0].length
//   var numMutations = pm*totalGen //0.1*60
//   console.log("numMutations: ", numMutations);
//   numMutations = Math.round(numMutations)
//   var mutations = []
//
//   //hay que reescribir porque se genera un arr con indexes que tocara por cada uno recorrer la poblacion
//   for (var i = 0; i < numMutations; i++) {
//     let newGen = {x: math.randomInt(-5, 5), y: math.randomInt(-5, 5)}
//     console.log("New Gen: ", newGen);
//     let mutationIndex = math.randomInt(0, totalGen)
//     mutations.push({newGen: newGen, index: mutationIndex})
//   }
//
//
//   console.log();
// }


function draw(points) {
  console.log("POINTS: ", points);
  var radius = document.getElementById('radius').value * document.getElementById('radius').value
  var len = document.getElementById('psize').value;

  try {
    functionPlot({
      target: '#plot',
      yAxis: {domain: [-30, 30]},
      xAxis: {domain: [-30, 30]},
      data: [
        { fn: 'sqrt('+radius+' - x * x)', color: 'rgba(35, 228, 199, 0.2)' },
        { fn: '-sqrt('+radius+' - x * x)', color: 'rgba(35, 228, 199, 0.2)' },
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
}

// const
var chromosomes = []

// document.getElementById('form').onsubmit = function(event) {
//   event.preventDefault();
//   draw(points);
// };
//
// chromosomes = population(50)
// console.log("population: ", chromosomes);
//
// var fitness = getHighestFitness(chromosomes)
// var fChromosome = fitness.chromosome
// var probabilities = fitness.probabilities
// var fIndex = fitness.index
//
// var points = []
// for (gen of fChromosome) {
//   points.push([gen.x, gen.y])
// }

draw([])
// printChromosomes(chromosomes, fIndex)
