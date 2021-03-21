


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
 
 //console.log("this is probably the right format"); // an array of objects
 //console.log(arr); // this is the right form for me right now i think
 
 
 makeBoxes(0, 0, 500, 500, arr);

 return boxes;



function makeBoxes(x, y, w, h, arr) {
  
  //console.log("NEW INSTANCE & arr.length : " + arr.length);

  if (arr.length > 1) {
    // SPLIT ARRAY INTO 2 PIECES
    let sum = getSum(arr,"x_value");
    let arr1 = [];
    let sum1 = 0;
    let arr2 = [];
    
    // THE FIRST VALUE GOES IN THE FIRST ARRAY BY DEFAULT
    arr1.push(arr[0]);
    sum1 = arr[0].x_value;
    sum1_pct = sum1 / sum;
    
    for (let i = 1; i < arr.length; i++) {
      if (sum1_pct < 0.35) { // THIS WORKS AS LONG AS THE ARRAY IS SORTED
        arr1.push(arr[i]);
        sum1 += arr[i].x_value;
        sum1_pct = sum1 / sum;
      } else {
        arr2.push(arr[i]);
      } 
    }
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
    
    //console.log(obj);
    boxes.push(obj);
    return obj;

    
  }
  

  
} // closing makeBoxes

};  // closing the big function

function getSum(arr, key) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
     sum += arr[i][key];
  }
  return sum;
}


// maybe i need an array of objects
/*

let group = [
 {
  "name": Asia,
  "x_count": 50,
  "x_value":2500,
  "x_count_parent":4000,
  "x_value_parent":500000  
  "subgroups":[
   
  
  ]
  
 }
]

// that wya i can:
 sort group
 push into 2 arrays, recursively, then once you're down to 1 group, 

 if arr.length > 1 then keep splitting, if arr.length = 1 then make a box

*/