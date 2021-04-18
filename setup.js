


let data = fetch('data.json?x=' + Math.random()).then(r => r.json()).then(arr => {
  
  let x = arrOfObj2PivotPartA(arr, 'val', 'cat1', 'cat2', 'cat3', 'cat4');
  let y = arrOfObj2PivotPartB(x);
  let z = createBoxObjects(0, 0, 100, 100, y.children); // remove the first 4 arguments
  let b = createBoxElementsObject(z, 700, 'px');
  
  console.log(b);

  let boxesContainer = document.getElementById('container');
  boxesContainer.appendChild(b.boxes);
  
});








