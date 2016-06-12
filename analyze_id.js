var region_code = require('./region_code.js').region_code()
//var option = {
//  alias: 'id',
//  demand: true,
//  default: '62042219920606375X',
//  describe: 'input your id number',
//  type: 'string'
//}
//var argv = require('yargs')
//  .option('i', option)
//  .argv
//
//var id = argv.i
var id = process.argv[2]

if (!checkId(id)) {
  console.log('please input a valid id number')
} else {
  console.log('this is an valid id number')
  var region = id.slice(0,6)
  var birth = id.slice(6, 14)
  var serial_gender = id.slice(14,17)
  
  var region_str = region_code[region]
  var gender = ''
  if (serial_gender % 2 == 1) {
    gender = 'male'
  } else {
    gender = 'female'
  }
  console.log('this person is ' + gender + ', from ' + region_str + ', birthday is: ' + birth)
}
function checkId(id) {
  if (id.length <18) {
    return false
  } else {
    var first_17 = id.slice(0,-1)
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    var mask = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
    var sum = 0
    factor.forEach(function(item, index) {
      sum += item * first_17[index]
    })
    var verify_code = mask[sum % mask.length].toString()
    console.log(verify_code)
    if (verify_code != id[17]) {
      return false
    }  
    else {
      return true
    }
  }
}

