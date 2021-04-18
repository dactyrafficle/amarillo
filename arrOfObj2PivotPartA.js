// USAGE: 
// CONVERT ARR OF OBJS INTO AN N-LEVEL PIVOT STRUCTURE
// let x = arrOfObj2PivotPartA(data, 'val', 'cat1', 'cat2', ...., 'catn');

// *** ISSUE: WHAT IF A GIVEN CATN MAPS TO MORE THAN ONE CAT(N-1)? THIS ALGO WILL NOT CAPTURE THAT

// categories is an array ie. categories = ['cat1', 'cat2', ... , 'catn']
function arrOfObj2PivotPartA(arr, val, categories) {
  
  let temp = [];
  
  // ARGUMENTS 2, 3, ..., N ARE THE CATEGORIES WE WANT TO AGGREGATE BY
  //for (let i = arguments.length-1; i>=2; i--) {
  for (let i = categories.length-1; i>=0; i--) {
    
    // FOR EACH OF THESE CATEGORIES, LET US GET THE CATEGORY NAME, AND ITS PARENTS NAME
    let x_aggro = categories[i];
    let x_parent;
     
    // THE FIRST CATEGORY HAS NO PARENT, SO ITS PARENT IS ROOT
    if (i === 0) {
      x_parent = 'ROOT';
    } else {
      x_parent = categories[i-1];
    }
  
    // MAKE AN OBJECT TO STORE THE RESULTS FOR EACH LAYER
    let obj = {};
    
    for (let y = 0; y < arr.length; y++) {
      
      let cat = arr[y][x_aggro];
      
      if (!obj[cat]) {
        obj[cat] = {};
        obj[cat].name = cat;
        obj[cat].parent = (arr[y][x_parent] || x_parent); // POSSIBLE ISSUE: ASSUMES 1-1 MAPPING OF CHILD-PARENT *** [year-cycle]
        obj[cat].value = 0;
      }
      
      obj[cat].value += parseFloat(arr[y][val]);  
      
    }
    temp.push(obj);
  }
  return temp; // this is 1/2 way there
}