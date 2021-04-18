

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

function addEventListnersAndCreateInfoBox(b) {
  let div = document.createElement('div');
  div.id = 'hank';
  
  for (let i = 0; i < b.boxes.length; i++) {
    console.log(b.boxes[i].obj);
    let el = b.boxes[i].el;
    el.addEventListener('click', function() {
      console.log(this);
      div.innerHTML = '';
      
      for (let y = 0; y < b.boxes[i].obj.ancestors.length; y++) {
        div.innerHTML += '<p> LEVEL ' + y + ': ' + b.boxes[i].obj.ancestors[y] + '</p>';
      }
      div.innerHTML += '<p> LEVEL ' + b.boxes[i].obj.ancestors.length + ': ' + b.boxes[i].obj.name + '</p>';
      div.innerHTML += '<p> VALUE: ' + b.boxes[i].obj.value + '</p>';
    });
    
  }
  
  
  return div;
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