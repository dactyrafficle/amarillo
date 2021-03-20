
function returnTreeMapObjectFromArrayOfObjects(arrayOfObjects) {

 // THE OBJECT TO RETURN
 let obj = {};
 obj.x_count = 0;
 obj.x_value = 0;
 obj.groups = {};
 

 let big_group_desc = arguments[1];
 let small_group_desc = null;
 
 if (arguments.length > 2) {
   small_group_desc = arguments[2];
 }
 
 for (let i = 0; i < arrayOfObjects.length; i++) {
   
   // big_group_desc WILL BE STHING LIKE "COLOR"
   // big_goup WILL BE STHING LIKE "BLUE"
   
   let big_group = arrayOfObjects[i][big_group_desc];
   let small_group = null;
   
   if (arguments.length > 2) {
    small_group = arrayOfObjects[i][small_group_desc];
   }
   
   let x_value = parseInt(arrayOfObjects[i].value); // ALWAYS A NUMBER
   
   // IF THE CURRENT INSTANCE OF big_group DOES NOT EXIST, MAKE IT
   if (!obj.groups[big_group]) {
    obj.groups[big_group] = {};
    obj.groups[big_group].x_count = 0;
    obj.groups[big_group].x_value = 0;
    
    // IF THERE IS A SECOND GROUPING, THEN ADD AN OBJECT TO STORE ITS DATA
    if (arguments.length > 2) {
     obj.groups[big_group].groups = {};
    }
   }
   
   // IF THERE IS A SECOND GROUPING, SEE IF THE CURRENT INSTANCE EXISTS, IF NOT, MAKE IT
   if (arguments.length > 2) {
    
    // MAKE EXIST THE SMALL GROUP 
    if (!obj.groups[big_group].groups[small_group]) {
     obj.groups[big_group].groups[small_group] = {};
     obj.groups[big_group].groups[small_group].x_count = 0;
     obj.groups[big_group].groups[small_group].x_value = 0;
    }
   }
   
   // TOTAL TOTAL
   obj.x_count = (obj.x_count + 1 || 1);
   obj.x_value = (obj.x_value + x_value || x_value);

   // BY BIG GROUP
   obj.groups[big_group].x_count = (obj.groups[big_group].x_count + 1 || 1);
   obj.groups[big_group].x_value = (obj.groups[big_group].x_value + x_value || x_value);
   
   // BY SMALL GROUP
   if (arguments.length > 2) {
    obj.groups[big_group].groups[small_group].x_count = (obj.groups[big_group].groups[small_group].x_count + 1 || 1);
    obj.groups[big_group].groups[small_group].x_value = (obj.groups[big_group].groups[small_group].x_value + x_value || x_value);
   }
 }
 
 return obj;
}