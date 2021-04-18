



let data = fetch('data.json?x=' + Math.random()).then(r => r.json()).then(arr => {
  
  let value = 'val';
  let categories = ['cat1','cat2','cat3','cat4'];
  abc(arr, value, categories);
  
  // LIST ALL THE CATEGORIES
  Object.keys(arr[0]).forEach(function(a, b, c) {
    let p = document.createElement('p');
    p.innerHTML = a;
    document.getElementById('variable-list-all').appendChild(p);  
  });
});


function abc(arr, val, categories) {
  
  // ARR OF OBJS TO PIVOT OBJ
  let x = arrOfObj2PivotPartA(arr, val, categories);
  let y = arrOfObj2PivotPartB(x);  // i need to add levels here, the lineage
  
  // ADD ANCESTRY TO PIVOT OBJ
  let y2 = addAncestors(y, ['']);
  
  // CALCULATE THE TREEMAP
  let z = createBoxObjects(0, 0, 100, 100, y2.children); // remove the first 4 arguments
  
  // CREATE THE BOXES AND THE OBJECTS THAT DEFINE THEM
  let b = createArrOfBoxElementObjects(z, 700, 'px'); // good
  
  // CLEAR THE CONTAINERS
  document.getElementById('container').innerHTML = '';
  document.getElementById('infobox').innerHTML = '';
  
  // DRAW THE BOXES
  document.getElementById('container').appendChild(drawBoxes(b));
  document.getElementById('infobox').appendChild(addEventListnersAndCreateInfoBox(b)); 
}











