
// look at box, is it greater in height than width?


// i wonder if i can make it relative
function returnArrayOfTreeMapBoxesFromTreemapObject(x, y, w, h, obj) {

 console.log(obj);
 
 let count = obj.x_count;
 let value = obj.x_value;
 
 // TURN THE GROUPS INTO AN ARRAY OF OBJECTS, WITH DATA FROM THE PARENTS
 let arr = [];
 Object.keys(obj.groups).forEach(function(a,b,c) {
   obj.groups[a].x_count_parent = count;
   obj.groups[a].x_value_parent = value;
   arr.push(obj.groups[a]);
 });
 console.log(arr);
 
 // SORT ON THE BASIS OF x_value
 arr.sort(function(a,b) {
   if (a.x_value > b.x_value) {return -1;};
   if (a.x_value < b.x_value) {return 1;};
   if (a.x_value === b.x_value) {return 0;};
 });
 console.log(arr);

};