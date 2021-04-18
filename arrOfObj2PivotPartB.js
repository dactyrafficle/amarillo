function arrOfObj2PivotPartB(arr) {
 
 // FOR EACH LEVEL
 let root_value = 0;
 
 let root_children = [];
 
 for (let i = 0; i < (arr.length-1); i++) {
  // REMEMBER, EACH ELEMENT IS AN OBJECT

   Object.keys(arr[i]).forEach(function(a, b, c) {
     
     let obj_name = a;
     let obj = arr[i][a];

     let parent_obj_name = obj.parent;
     let parent_obj = arr[i+1][parent_obj_name];
     
     if (!arr[i+1][parent_obj_name].children) {
      //arr[i+1][parent_obj_name].children = {}; //lets make this an array instead
      arr[i+1][parent_obj_name].children = [];
     }
     //arr[i+1][parent_obj_name].children[obj_name] = obj;
     arr[i+1][parent_obj_name].children.push(obj);
   
   });
 }
 
 Object.keys(arr[arr.length-1]).forEach(function(a, b, c) {
  root_children.push(arr[arr.length-1][a]);
  root_value += arr[arr.length-1][a].value;

 });
 
 
 
 return {
   "name": "ROOT",

   "parent": null,
   "children": root_children,
   "value": root_value 
 };
 
}

// EXCELLENT WORK!
function addAncestors(y) {
  
  if (y.children) {
    
    //console.log(y.children);
     
    for (let i = 0; i < y.children.length; i++) {
      y.children[i].ancestors = [];
      
      if (y.ancestors) {
        for (let j = 0; j < y.ancestors.length; j++) {
         y.children[i].ancestors.push(y.ancestors[j]);
        }
      }
      
      y.children[i].ancestors.push(y.name);

      addAncestors(y.children[i]);
      
    }
    
  }
  return y;
}