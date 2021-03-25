
let hue = 0;
let n = 0;
let m;

let obj = fetch('data.json?x=' + Math.random()).then(r => r.json()).then(arr => {

 m = arr[0].subgroups.length;
 
 let key = "value";
 boxes = makeBoxes(0, 0, 100, 100, arr, key);
 
 let container = document.getElementById('container');
 let infobox = document.getElementById('infobox');
 
 let scale = 1;
 
 for (let i = 0; i < boxes.length; i++) {

  let obj = boxes[i];
  let div = document.createElement('div');
  div.classList.add('box');
  
  div.classList.add(obj.level_1);
  div.classList.add('group-' + obj.group);
  div.classList.add("level-" + obj.level);
  
  div.style.top = obj.py*scale + '%';
  div.style.left = obj.px*scale + '%';
  div.style.width = obj.sw*scale + '%';
  div.style.height = obj.sh*scale + '%'; 
  div.innerHTML = obj.group;
  div.style.backgroundColor = "hsl(" + boxes[i].hue + "," + boxes[i].sat + "%," + boxes[i].lig + "%)";

  div.id = obj.group;
   
   div.addEventListener('mouseover', function() {
     infobox.innerHTML = '<h4> Y1 to Y2 </h4>';
     infobox.innerHTML += '<p> parent : ' + obj.level_1 + '</p>';
     infobox.innerHTML += '<p> group : ' + obj.group + '</p>';
     infobox.innerHTML += '<p> value : ' + obj[key] + '</p>';
     
     let subgroups = document.getElementsByClassName(obj.level_1);
     for (let i = 0; i < subgroups.length; i++) {
       subgroups[i].style.filter = 'brightness(0.9)';
     }
     div.style.filter = 'brightness(0.8)';
     
   })
   div.addEventListener('mouseleave', function() {
     div.style.filter = 'none';
     let subgroups = document.getElementsByClassName(obj.level_1);
     for (let i = 0; i < subgroups.length; i++) {
       subgroups[i].style.filter = 'none';
     }
   })

   container.appendChild(div);

 }
 
});
