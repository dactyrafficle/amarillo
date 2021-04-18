function createBoxElementsObject(arr, s, s_unit) {

  let boxes = document.createElement('div');
  boxes.id = 'box-container';
  boxes.style.position = 'relative';
  
  let A = 0;

  for (let i = 0; i < arr.length; i++) {
    let obj = arr[i];
    let box = document.createElement('div');
    box.classList.add('box');
    box.style.top = (obj.py)/100*s + s_unit;
    box.style.left = obj.px/100*s + s_unit;
    
    let w = obj.sw/100*s;
    let h = obj.sh/100*s;
    A += w*h;
    
    box.style.width = w + s_unit;
    box.style.height = h + s_unit;
    box.style.border = '1px solid #999';
    boxes.appendChild(box);
  }
  
  //console.log(boxes);
  //console.log(Math.sqrt(A));
  
  boxes.style.width = Math.sqrt(A) + s_unit;
  boxes.style.height = Math.sqrt(A) + s_unit;
  
  return {
    'boxes': boxes,
    'width': Math.sqrt(A),
    'height': Math.sqrt(A)
  }
}