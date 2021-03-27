
// 2021-03-24 LETS TRY ONLY MAKING THE SUBBOXES

function makeBoxes(x, y, w, h, arr, key) {

 let thresh = 0.2;
 let output = [];

 if (arr.length > 1) {

  // SPLIT THE ARRAY INTO 2
  let arr2 = splitArr(arr, key, thresh);
  let sum = getSum(arr, key);
  let sum0 = getSum(arr2[0], key);

  // DIMENSION OF BOXES
  let dw = 0;
  let dh = 0;
  if (w > h) {dw=1; dh=0;} else {dw=0; dh=1;}

  let x1 = x;
  let x2 = x1 + dw*(sum0/sum)*w;
  let y1 = y;
  let y2 = y1 + dh*(sum0/sum)*h;
  let w1 = dw*(sum0/sum)*w + dh*w;
  let w2 = dw*(w-w1) + dh*w;
  let h1 = dw*h + dh*(sum0/sum)*h;
  let h2 = dw*h + dh*(h-h1);

  // THIS WAS NOT THAT EASY TO FIGURE OUT
  return output.concat(makeBoxes(x1, y1, w1, h1, arr2[0], key), makeBoxes(x2, y2, w2, h2, arr2[1], key));
    
 } else {
 // IF ARR.LENGTH IS 1 OR 2, THEN WE CAN ACTUALLY MAKE THE BOXES
    
  let obj = arr[0];
  obj.px = x;
  obj.py = y;
  obj.sw = w;
  obj.sh = h;
  
  if (obj.level === 1) {
   obj.level_1 = obj.group;
   obj.hue = 215; //Math.random()*360;;
   obj.sat = Math.random()*5 + 50;
   obj.lig = Math.random()*20 + 50;
  }

  // IF THE OBJECT HAS SUBGROUPS
  if (obj.subgroups) {
    
   obj.isParent = true;

   for (let i = 0; i < obj.subgroups.length; i++) {
    obj.subgroups[i].level_1 = obj.level_1;
    obj.subgroups[i].hue = obj.hue;
    obj.subgroups[i].sat = obj.sat;
    obj.subgroups[i].lig = obj.lig; //(Math.random()-Math.random())*10+42;
    obj.subgroups[i].parent = obj.group;
    obj.isChild = true;
   }
   
   // IF THE OBJECT HAS CHILDREN, ADD THE BOX AND ITS CHILDREN
   //return output.concat(obj, makeBoxes(x, y, w, h, obj.subgroups, key));
   return output.concat(makeBoxes(x, y, w, h, obj.subgroups, key));
  } else {
  
   return output.concat(obj);     
  }
 }
}

// CALCULATE SUM ON THE BASIS OF KEY
function getSum(arr, key) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += parseInt(arr[i][key]);
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
    if (parseInt(a[key]) > parseInt(b[key])) {return -1;};
    if (parseInt(a[key]) < parseInt(b[key])) {return 1;};
    if (parseInt(a[key]) === parseInt(b[key])) {return 0;};
  });
    
  let temp = [[],[]];
  
  let sum = getSum(arr, key);
  let sum0 = 0;

 // THE FIRST VALUE GOES IN THE FIRST ARRAY BY DEFAULT
 temp[0].push(arr[0]);
 sum0 = parseInt(arr[0][key]);
 sum0_pct = sum0 / sum;

 for (let i = 1; i < arr.length; i++) {
  
  // THE LAST ELEMENT OF ARR ALWAYS GOES TO THE SECOND ARRAY
  if (sum0_pct < thresh_pct && i !== (arr.length-1)) {
   temp[0].push(arr[i]);
   sum0 += parseInt(arr[i][key]);
   sum0_pct = sum0 / sum;
  } else {
   temp[1].push(arr[i]);
  } 
 }

 return temp;
}