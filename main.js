/* 

Before you begin, please install run-func via 
npm i -g run-func
and lodash via 
npm i lodash

run this code by simply typing:
run-func main.js startCalculations 

*/

let int_array = [];
let str_array = [];
let array_size = 100000;

let int_timing_array = [];
let str_timing_array = [];

max_int_size = 1000000000000000;

const _ = require("lodash");
const fs = require("fs");

module.exports = { startCalculations }; //very important

async function startCalculations() {
  await generateIntArray();
  await generateStrArray();
  console.log("Arrays Generated... Processing...");
  //first calculate for ints
  await calcTimingForInt();
  console.log("Int Array Processed");

  // then for strs
  await calcTimingForStr();
  console.log("Int Array Processed");

  resp = await findAverage();
  int_timing = ` 
                   Mean: ${resp[0]} 
                   Min: ${resp[1]}
                   Max: ${resp[2]}
                   Median: ${resp[3]}  `;
  console.log(int_timing);

  str_timing = ` 
                    Mean: ${resp[4]} 
                    Min: ${resp[5]}
                    Max: ${resp[6]}
                    Median: ${resp[7]}  `;

  console.log(str_timing);
  console.log("Done!");
}

async function generateIntArray() {
  int_array = [];
  for (let i = 0; i < array_size; i++) {
    int_array.push(Math.round(Math.random() * max_int_size));
  }
  console.log(int_array);
  console.log("Int Array generated");
  return 0;
}

async function generateStrArray() {
  str_array = [];
  for (let i = 0; i < array_size; i++) {
    str_array.push(Math.round(Math.random() * max_int_size).toString());
  }
  console.log(str_array);
  console.log("Str Array generated");
  return 0;
}

async function calcTimingForInt() {
  console.log("Int Timing Work Started");
  for (let i = 0; i < array_size; i++) {
    let x = Math.round(Math.random() * max_int_size);
    t1 = performance.now();
    if (_.indexOf(int_array, x) > -1) {
      t2 = performance.now();
      int_timing_array.push(Math.round((t2 - t1) * 1000)); //microseconds
    } else {
      t2 = performance.now();
      int_timing_array.push(Math.round((t2 - t1) * 1000)); //microseconds
    }
  }
  return 0;
}

async function calcTimingForStr() {
  //let's calculate for strs:
  console.log("Str Timing Work Started");
  t1x = performance.now();
  for (let i = 0; i < array_size; i++) {
    let x = Math.round(Math.random() * max_int_size);
    t1 = performance.now();
    if (_.indexOf(str_array, x) > -1) {
      t2 = performance.now();
      str_timing_array.push(Math.round((t2 - t1) * 1000)); //microseconds
      //console.log(Math.round((t2 - t1) * 1000));
    } else {
      t2 = performance.now();
      str_timing_array.push(Math.round((t2 - t1) * 1000)); //microseconds
      //console.log(Math.round((t2 - t1) * 1000));
    }
  }
  t2x = performance.now();
  //   console.log(t2x - t1x);
  return 0;
}
async function saveFile(filename, data) {
  if (typeof data != "string") {
    data = data.toString();
  }
  fs.writeFile(filename, data, (err) => {
    // In case of a error throw err.
    if (err) throw err;
  });
}
async function findAverage() {
  await saveFile("int_timings.txt", int_timing_array.toString());

  console.log("Avgs processing started");
  let int_avg = _.mean(int_timing_array);
  let int_min = _.min(int_timing_array);
  let int_max = _.max(int_timing_array);
  let int_mode = await median(int_timing_array);

  let str_avg = _.mean(str_timing_array);
  let str_min = _.min(str_timing_array);
  let str_max = _.max(str_timing_array);
  let str_mode = await median(str_timing_array);
  console.log("Avgs processing complete");
  await saveFile("str_timings.txt", str_timing_array.toString());
  return [
    int_avg,
    int_min,
    int_max,
    int_mode,
    str_avg,
    str_min,
    str_max,
    str_mode,
  ];
}

async function median(values) {
  if (values.length === 0) throw new Error("No inputs");

  values.sort(function (a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}
