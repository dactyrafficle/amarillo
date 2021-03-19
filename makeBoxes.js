
// look at box, is it greater in height than width?

function makeBoxes(x, y, w, h, arr, key) {


  // make sure data[i][key] is a number, parseFloat

 // break up the array into 2 pieces of roughly 50-50
 // sort
 
 arr.sort(function(a,b) {
  if (parseFloat(a[key]) > parseFloat(b[key])) {
   return -1
  }
  else {return 1};
 });
 //console.log(arr);
 //console.log(arr);
 //console.log(Math.random());
 
 if (arr.length >= 2) {
 
   let sum0 = 0;
   let sum1 = 0;
   let sum = 0;
  // take big and small, splice add to arr1, then to arr2 etc
  let new_arr = [[],[]];
  
  for (let i = 0; i < arr.length; i++) {

    if (i >= (arr.length)/2) {
      sum0 += parseFloat(arr[i][key]);
      sum += parseFloat(arr[i][key]);
      new_arr[0].push(arr[i]);
     } else {
      sum1 += parseFloat(arr[i][key]);
      sum += parseFloat(arr[i][key]);
      new_arr[1].push(arr[i]);
     }

  } 
  
  if (w >= h) {
    makeBoxes(x,y,sum0/sum*w,h,new_arr[0], key);
    makeBoxes(x + sum0/sum*w,y,sum1/sum*w,h,new_arr[1], key);
  } else {
    // height is greater than width
    makeBoxes(x,y,w, sum0/sum*h,new_arr[0], key);
    makeBoxes(x,y + sum0/sum*h,w, sum1/sum*h,new_arr[1], key);
  }
 
 } else {
  // draw


   let sum = 0;
   for (let i = 0; i < arr.length; i++) {
     sum += parseFloat(arr[i][key]);
   }
   //console.log(sum);
   
 // each one gets a box of its own, but how we draw it depends on the current box dimension
   if (w >= h) {
     // draw boxes vertically
     let dw = 0;
     for (let i = 0; i < arr.length; i++) {
       stroke(51);
       fill(205);
       // create object
       boxes.push(new Box(0 + x + dw/sum*w, 0 + y, parseFloat(arr[i][key])/sum*w-0*2, h-0*2, 255, 0, 0, arr[i]));
       //rect(x + dh/sum*h, y, arr[i]*w, h);
       dw += parseFloat(arr[i][key]);
     }

  }
   if (h > w) {
     // draw boxes vertically
     let dh = 0;
     for (let i = 0; i < arr.length; i++) {
       stroke(51);
       fill(205);
       // create object
       boxes.push(new Box(0 + x, 0 + y + (dh/sum)*h, w-0*2, parseFloat(arr[i][key])/sum*h-0*2, 0, 0, 255, arr[i]));
       //rect(x, y + (dw/sum)*h, w, arr[i]*h);
       dh += parseFloat(arr[i][key]);
     }

  }
 
 }
 

 
 






}