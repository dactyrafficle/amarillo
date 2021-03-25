
let hue = 0;
let n = 0;
let m;

let big_groups = [];

let obj = fetch('data.json?x=' + Math.random()).then(r => r.json()).then(arr => {

 m = arr[0].subgroups.length;
 
 boxes = makeBoxes(0, 0, 100, 100, arr, "value");
 
 let container = document.getElementById('container');
 let infobox = document.getElementById('infobox');
 
 let scale = 1;
 
 for (let i = 0; i < boxes.length; i++) {

  let obj = boxes[i];
  let div = document.createElement('div');
  div.classList.add('box');
  div.classList.add(obj.parent);
  div.classList.add(obj.group);
  
  div.style.top = obj.py*scale + '%';
  div.style.left = obj.px*scale + '%';
  div.style.width = obj.sw*scale + '%';
  div.style.height = obj.sh*scale + '%'; 
  div.innerHTML = obj.group;
  div.style.backgroundColor = "hsl(" + boxes[i].hue + "," + boxes[i].sat + "%," + boxes[i].lig + "%)";

   if (obj.isParent)  {
    div.classList.add("parent");
    div.id = boxes[i].group;
    big_groups.push(boxes[i].group);
   }
   
   div.addEventListener('mouseover', function() {
     console.log(boxes[i]);
     infobox.innerHTML = '<h4> Y1 to Y2 </h4>';
     infobox.innerHTML += '<p> parent : ' + boxes[i].parent + '</p>';
     infobox.innerHTML += '<p> group : ' + boxes[i].group + '</p>';
     infobox.innerHTML += '<p> value : ' + boxes[i].value + '</p>';
   })
   

   container.appendChild(div);
   
   
   
   
   
 }
 
 // now the divs are made
 // easy to do w a bit of js i guess
 
 for (let i = 0; i < big_groups.length; i++) {
 let divs = document.getElementsByClassName(big_groups[i]);

 
 for (let j = 0; j < divs.length; j++) {
 
   divs[j].addEventListener('mouseover', function() {
   
    for (let y = 0; y < divs.length; y++) {
      divs[y].style.filter = "brightness(0.8)";
    }
    this.style.filter = "brightness(0.7)";
   });
   divs[j].addEventListener('mouseleave', function() {
    for (let y = 0; y < divs.length; y++) {
      divs[y].style.filter = "none";
    }
   });
 }
 
}
 
 
});
