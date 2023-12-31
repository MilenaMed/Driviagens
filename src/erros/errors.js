function conflict() {
  return {
    type: "conflictCity",
    message: `This city has already been added!`
  }
}
function wrongData(){
  return {
    type: "wrongData",
    message: `Enter the data correctly`
  }
 }

 function notFountData(){
  return {
    type: "notFoundData",
    message: `Data ​​not found`
  }

 }
function notFoundCities(){
  return {
    type: "notFoundCity",
    message: `City ​​not found`
  }
}
function sameCities(){
  return {
    type: "sameCities",
    message: `Origin and destination cannot be the same`
  }
}
function tooMany(){
  return {
    type: "tooMany",
    message: `Too many results`
  }
}
function invalidDate() {
  return {
    type: "invalidDate",
    message: `It's not possible to register flights for past dates.`,
  };
}

function errorSmallerBiggerDate(){
  return {
    type: "errorSmallerBiggerDate",
    message: `The date smaller-date cannot be larger than the date bigger-date.`,
  };
}

export const errors = {
  conflict,
  notFountData,
  wrongData,
  tooMany,
  errorSmallerBiggerDate,
  notFoundCities,
  sameCities,
  invalidDate
}