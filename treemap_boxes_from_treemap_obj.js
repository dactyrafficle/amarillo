

// look at box, is it greater in height than width?

// i wonder if i can make it relative
function returnArrayOfTreeMapBoxesFromTreemapObject(x, y, w, h, obj) {

 let boxes = [];

 let count = obj.x_count;
 let value = obj.x_value;
 
 // TURN THE GROUPS INTO AN ARRAY OF OBJECTS, WITH DATA FROM THE PARENTS
 let arr = [];
 Object.keys(obj.groups).forEach(function(a,b,c) {
   obj.groups[a].x_count_parent = count;
   obj.groups[a].x_value_parent = value;
   arr.push(obj.groups[a]);
 });
 //console.log(arr);
 
 // SORT ON THE BASIS OF x_value
 arr.sort(function(a,b) {
   if (a.x_value > b.x_value) {return -1;};
   if (a.x_value < b.x_value) {return 1;};
   if (a.x_value === b.x_value) {return 0;};
 });

 
 makeBoxes(0, 0, 500, 500, arr);

 return boxes;

function makeBoxes(x, y, w, h, arr) {
  
  //console.log("NEW INSTANCE & arr.length : " + arr.length);

  if (arr.length > 1) {

   let arr1 = splitArr(arr, "x_value", 0.35)[0];
   let arr2 = splitArr(arr, "x_value", 0.35)[1];

   let sum = getSum(arr, "x_value");
   let sum1 = getSum(arr1, "x_value");
   let sum2 = getSum(arr2, "x_value");
   //console.log(arr1);
   //console.log(arr2);
    
    
    // need to fix the dimensions, and check width x height
 
    let x1, x2, y1, y2;
    let w1, w2, h1, h2;
    
    if (w > h) {
      // DRAW THE BOXES HORIZONTALLY
      x1 = x;      
      x2 = x1 + (sum1/sum)*w;
      y1 = y;
      y2 = y;
      w1 = (sum1/sum)*w;
      w2 = w-w1;
      h1 = h;
      h2 = h;
      
    } else { // HEIGHT AND WIDTH ARE EQUAL OR HEIGHT IS GREATER
      // DRAW THE BOXES VERTICALLY
      x1 = x;      
      x2 = x;
      y1 = y;
      y2 = y1+(sum1/sum)*h;
      w1 = w;
      w2 = w;
      h1 = (sum1/sum)*h;
      h2 = h-h1;  
      
    }

    makeBoxes(x1, y1, w1, h1, arr1);
    makeBoxes(x2, y2, w2, h2, arr2);
    
  } else {
    // IF ARR.LENGTH IS 1 OR 2, THEN WE CAN ACTUALLY MAKE THE BOXES
    
    let obj = arr[0];
    
    obj.px = x;
    obj.py = y;
    obj.sw = w;
    obj.sh = h;
    
    console.log(obj);
    boxes.push(obj);
    return obj;
    
  }

  
} // closing makeBoxes



};  // closing the big function





// CALCULATE SUM ON THE BASIS OF KEY
function getSum(arr, key) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i][key];
  }
  return sum;
}


// SPLIT THE ARRAY INTO 2 ARRAYS ON THE BASIS OF THE SUM OF KEY
// ARR IS AN ARRAY OF OBJECTS
function splitArr(arr, key, thresh_pct) {
  
  // IF THE ARRAY HAS 1 ELEMENT, RETURN THE ARRAY
  if (arr.length < 2) {
    return arr;
  }
  
  // SORT THE ARRAY, BIGGEST TO SMALLEST
  arr.sort(function(a,b) {
    if (a[key] > b[key]) {return -1;};
    if (a[key] < b[key]) {return 1;};
    if (a[key] === b[key]) {return 0;};
  });
    
  let temp = [[],[]];
  
  let sum = getSum(arr, key);  
  let sum0 = 0;

 // THE FIRST VALUE GOES IN THE FIRST ARRAY BY DEFAULT
 temp[0].push(arr[0]);
 sum0 = arr[0][key];
 sum0_pct = sum0 / sum;

 for (let i = 1; i < arr.length; i++) {
  
  // THE LAST ELEMENT OF ARR ALWAYS GOES TO THE SECOND ARRAY
  if (sum0_pct < thresh_pct && i !== (arr.length-1)) {
   temp[0].push(arr[i]);
   sum0 += arr[i][key];
   sum0_pct = sum0 / sum;
  } else {
   temp[1].push(arr[i]);
  } 
 }

 return temp;
}

let test_arr = [
{'value':50},
{'value':50}
]

