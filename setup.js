


let data = fetch('data.json?x=' + Math.random()).then(r => r.json()).then(arr => {
  
  let x = arrOfObj2PivotPartA(arr, 'val', 'cat1', 'cat2', 'cat3', 'cat4');
  //let x = arrOfObj2PivotPartA(arr, 'val', 'cat1', 'cat2', 'cat3');
  let y = arrOfObj2PivotPartB(x);
  let z = createBoxObjects(0, 0, 100, 100, y.children); // remove the first 4 arguments
  let b = createArrOfBoxElementObjects(z, 700, 'px'); // good


  document.getElementById('container').appendChild(drawBoxes(b));
  document.getElementById('infobox').appendChild(addEventListnersAndCreateInfoBox(b));

  
});








