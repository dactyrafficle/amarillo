


let data = fetch('data.json?x=' + Math.random()).then(r => r.json()).then(arr => {
  
  let xAggro = 'value';
  let categories = ['region_name','country_name','spend_type'];
  
  // so far so good
  let x = aggro(arr, categories, xAggro);
  SUBGROUPS2ARRAY(x);
  console.log(x);
  
  // because aggro will define what the value is called, it shouldn't be a variable
  
  let y = createBoxObjects(0,0,100,100,x.subgroups);
  console.log(y);
  
  
  // CREATE THE BOXES AND THE OBJECTS THAT DEFINE THEM
  let b = createArrOfBoxElementObjects(y, 700, 'px'); // good
  
  // CLEAR THE CONTAINERS
  document.getElementById('container').innerHTML = '';
  //document.getElementById('infobox').innerHTML = '';
  
  // DRAW THE BOXES
  document.getElementById('container').appendChild(drawBoxes(b));
  //document.getElementById('infobox').appendChild(addEventListnersAndCreateInfoBox(b)); 
  
  
  // LIST ALL THE CATEGORIES
  Object.keys(arr[0]).forEach(function(a, b, c) {
    let p = document.createElement('p');
    p.innerHTML = a;
    document.getElementById('variable-list-all').appendChild(p);  
  });
});


function SUBGROUPS2ARRAY(obj) {
 
 if (obj.subgroups) {
 
  obj.subgroups = Object.values(obj.subgroups);
  
  for (let i = 0; i < obj.subgroups.length; i++) {
   SUBGROUPS2ARRAY(obj.subgroups[i]);
  }
 
 }
 
}

function aggro(arr, categories, xAggro) {

 let obj = {};
 for (let y = 0; y < arr.length; y++) {

  let arr2 = [];
  for (let i = 0; i < categories.length; i++) {
   arr2.push(arr[y][categories[i]]);
  }
  let val = parseFloat(arr[y][xAggro]);

  aggregate_constructively(obj, arr2, val, 0);
 }
 return obj;
}


// I THINK OF IT LIKE 2 WAVES DOING CONSTRUCTIVE INTERFERENCE
// ARR IS JUST AN ARRAY WHICH MAPS THE ANCESTRY
// VAL STAYS THE SAME THRU EACH NODE, GETTING ADDED ALONG THE WAY
function aggregate_constructively(obj, arr, val, level) {
 
 // IS BETTER WITH SUBGROUPS
 if (!obj.subgroups) {
  obj.subgroups = {};
  obj.level = level;
 }
 
 if (level === 0) {
  obj.val = (obj.val + val || val);
  obj.name = "ROOT";
 }

 if (!obj.subgroups[arr[0]]) {
  obj.subgroups[arr[0]] = {};
  obj.subgroups[arr[0]].val = val;
  obj.subgroups[arr[0]].name = arr[0];
 } else {
  obj.subgroups[arr[0]].val += val;
 }

 if (arr.length > 1) {
  aggregate_constructively(obj.subgroups[arr[0]], arr.slice(1), val, level + 1);
 }
}



// 2021-03-24 LETS TRY ONLY MAKING THE SUBBOXES

function createBoxObjects(x, y, w, h, arr) {

 let key = "val";

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
  return output.concat(createBoxObjects(x1, y1, w1, h1, arr2[0]), createBoxObjects(x2, y2, w2, h2, arr2[1]));
    
 } else {
    
   // IF ARR.LENGTH === 1, THEN WE MIGHT BE ABLE TO MAKE BOXES
   let obj = arr[0]; // correct
   obj.px = x;
   obj.py = y;
   obj.sw = w;
   obj.sh = h;
   
  // IF THE OBJECT HAS CHILDREN
  if (obj.subgroups) {
   return output.concat(createBoxObjects(x, y, w, h, obj.subgroups));
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

function drawBoxes(b) {
  
  // an array of object
  let boxes = document.createElement('div');
  boxes.id = 'box-container';
  boxes.style.position = 'relative';
  
  let A = 0;
  
  for (let i = 0; i < b.boxes.length; i++) {
    let box = b.boxes[i].el
    boxes.appendChild(box);   
  }
 
  boxes.style.width = b.container.w;
  boxes.style.height = b.container.h;
  return boxes;
}


function createArrOfBoxElementObjects(arr, s, s_unit) {

  let output = [];

  
  let A = 0;

  for (let i = 0; i < arr.length; i++) {
    let obj = arr[i];
    let box = document.createElement('div');
    box.classList.add('box');
    box.style.position = 'absolute';
    box.style.border = '1px solid #999';
    
    box.style.top = (obj.py)/100*s + s_unit;
    box.style.left = obj.px/100*s + s_unit;
    
    let w = obj.sw/100*s;
    let h = obj.sh/100*s;
    A += w*h;
    obj.A = A;
    
    box.style.width = w + s_unit;
    box.style.height = h + s_unit;
    
    output.push({
      'el': box,
      'obj': obj
     });
  }
  
  //console.log(boxes);
  //console.log(Math.sqrt(A));
  
  //boxes.style.width = Math.sqrt(A) + s_unit;
  //boxes.style.height = Math.sqrt(A) + s_unit;
  
  return {
    "container":{    
      "w": Math.sqrt(A) + s_unit,
      "h": Math.sqrt(A) + s_unit
     },
    "boxes": output
  };
  
  /*
  return {
    'boxes': boxes,
    'width': Math.sqrt(A),
    'height': Math.sqrt(A)
  }
  */
}