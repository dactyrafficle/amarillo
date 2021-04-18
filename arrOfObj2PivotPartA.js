// USAGE: 
// CONVERT ARR OF OBJS INTO AN N-LEVEL PIVOT STRUCTURE
// let x = arrOfObj2PivotPartA(data, 'val', 'cat1', 'cat2', ...., 'catn');

// *** ISSUE: WHAT IF A GIVEN CATN MAPS TO MORE THAN ONE CAT(N-1)? THIS ALGO WILL NOT CAPTURE THAT

function arrOfObj2PivotPartA(arr, val) {
  
  let temp = [];
  
  // ARGUMENTS 2, 3, ..., N ARE THE CATEGORIES WE WANT TO AGGREGATE BY
  for (let i = arguments.length-1; i>=2; i--) {
    
    // FOR EACH OF THESE CATEGORIES, LET US GET THE CATEGORY NAME, AND ITS PARENTS NAME
    let x_aggro = arguments[i];
    let x_parent = arguments[i-1];
    
    // THE FIRST CATEGORY HAS NO PARENT, SO ITS PARENT IS ROOT
    if (i === 2) {
      x_parent = 'ROOT';
    }
  
    // MAKE AN OBJECT TO STORE THE RESULTS FOR EACH LAYER
    let obj = {};
    
    for (let y = 0; y < arr.length; y++) {
      
      let cat = arr[y][x_aggro];
      
      if (!obj[cat]) {
        obj[cat] = {};
        obj[cat].name = cat;
        obj[cat].parent = (arr[y][x_parent] || x_parent); // POSSIBLE ISSUE: ASSUMES 1-1 MAPPING OF CHILD-PARENT ***
        obj[cat].value = 0;
      }
      
      obj[cat].value += parseFloat(arr[y][val]);  
      
    }
    temp.push(obj);
  }
  return temp; // this is 1/2 way there
}