'use strict';

var showButtonNumber = 3; // Number of choices before user sees "Show Results" button
var fullNameArray = [['R2D2 suitcase', 'bag.jpg'], ['Banana slicer', 'banana.jpg'], ['Open-toed galoshes', 'boots.jpg'],
['Not-so-comfy chair', 'chair.jpg'], ['Raging Cthulhu', 'cthulhu.jpg'], ['Dragon meat', 'dragon.jpg'],
['Pen utensils', 'pen.jpg'], ['Pizza scissors', 'scissors.jpg'], ['Shark sleeping bag', 'shark.jpg'],
['Infant sweeper', 'sweep.png'], ['Unicorn meat', 'unicorn.jpg'], ['USB tentacle', 'usb.gif'],
['Self-watering can', 'water-can.jpg'], ['Sideways wine glass', 'wine-glass.jpg']];
var prodArray = [];
var nameArray = [];
var displaySlotArray = [];
var prodShown = [];
var totalClicks = 0;
var buttonElement = document.getElementById('show-button');
var resultsElement = document.getElementById('results');
var graphElement = document.getElementById('bar-graph').getContext('2d');
var legendElement = document.getElementById('legend');

function Product(productName, imageFile) {
  this.productName = productName;
  this.imageFile = imageFile;
  this.timesChosen = 0;
  this.timesShown = 0;
}

function DisplaySlot(slotInitNum) {
  var boxId = 'box' + (slotInitNum + 1);
  var imageId = 'image' + (slotInitNum + 1);
  var titleId = 'title' + (slotInitNum + 1);
  this.boxElement = document.getElementById(boxId);
  this.imageElement = document.getElementById(imageId);
  this.titleElement = document.getElementById(titleId);
  this.addClickHandler = function () {
    this.boxElement.addEventListener('click', function (e) {
      totalClicks += 1;
      prodArray[prodShown[slotInitNum]].timesChosen += 1;
      for(var i = 0; i < 3; i += 1) {
        prodArray[prodShown[i]].timesShown += 1;
      }
      localStorage.setItem('dataPersist', JSON.stringify(prodArray));
      showNewProductGroup();
      if(totalClicks === showButtonNumber) {
        buttonElement.style.visibility = 'visible';
      }
    });
  };
  this.addClickHandler();
}

function initArrays(lsExists) {
  for(var i = 0; i < fullNameArray.length; i += 1) {
    if(!lsExists) {
      prodArray.push(new Product(fullNameArray[i][0], fullNameArray[i][1]));
    }
    nameArray.push(fullNameArray[i][1].split('.')[0]);
  }
  for(var i = 0; i < 3; i += 1) {
    displaySlotArray[i] = new DisplaySlot(i);
  }
}

function showProduct(prodNum, slotNum) {
  var slotImageElement = displaySlotArray[slotNum].imageElement;
  var slotTitleElement = displaySlotArray[slotNum].titleElement;
  slotImageElement.setAttribute('src', 'img\/' + prodArray[prodNum].imageFile);
  slotTitleElement.textContent = prodArray[prodNum].productName;
}

function randomProductNumber() {
  while (true) {
    var newRandom = Math.floor(Math.random() * prodArray.length);
    var newRandomShown = prodArray[newRandom].timesShown;
    if(newRandomShown > 6) { newRandomShown = 6; }
    if(Math.floor(Math.random() * Math.pow(2, newRandomShown)) === 0) {
      return newRandom;
    }
  }
}

function checkIfNoRepeat(newProdArray) {   // Checks if last (newest) item in
  var arrLength = newProdArray.length - 1; // array is a repeat of an earlier
  var newPNum = newProdArray[arrLength];   // item. Returns 'true' if it's not.
  for(var i = 0; i < arrLength; i += 1) {
    if(newProdArray[i] === newPNum) {
      return false;
    }
  }
  return true;
}

function showNewProductGroup() {
  var newArray = [];
  for(var i = 0; i < 3; ) {
    newArray[i] = randomProductNumber();
    if(checkIfNoRepeat(newArray)) {
      showProduct([newArray[i]], i);
      i += 1;
    }
  }
  prodShown = newArray;
}

buttonElement.addEventListener('click', handleButtonClick);

function handleButtonClick(e) {
  buttonElement.textContent = 'Update Results';
  var chosenArray = [];
  var shownArray = [];
  for(var i = 0; i < prodArray.length; i += 1) {
    var chosen = prodArray[i].timesChosen;
    chosenArray.push(chosen);
    var shown = prodArray[i].timesShown;
    shownArray.push(shown);
  }
  produceBarGraph(nameArray, chosenArray, shownArray);
}

var clearLSElement = document.getElementById('lsClear');

var handleLSClear = function() {
  console.log('clearing Local Storage');
  localStorage.clear();
};

clearLSElement.addEventListener('click', handleLSClear);



function produceBarGraph(nameArray, chosenArray, shownArray) {
  var graphData = {
    labels: nameArray,
    legendTemplate : '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (var i=0; i<datasets.length; i++){%><li><span style=\'background-color:<%=datasets[i].fillColor%>\'></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
    datasets: [
      {
        label: 'Times Item Chosen',
        fillColor: '#48A497',
        strokeColor: '#48A4D1',
        data: chosenArray
      },
      {
        label: 'Times Item Shown',
        fillColor: 'rgba(73,188,170,0.4)',
        strokeColor: 'rgba(72,174,209,0.4)',
        data: shownArray
      }
    ]
  };
  var barChart = new Chart(graphElement).Bar(graphData);
  legendElement.innerHTML = barChart.generateLegend();
}

var prodData = localStorage.getItem('dataPersist');
if (prodData) {
  prodArray = JSON.parse(prodData);
  var oldProdData = true;
} else {
  console.log('Local storage empty! Initializing!');
  localStorage.setItem('dataPersist', JSON.stringify(prodArray));
  var oldProdData = false;
}

initArrays(oldProdData);

showNewProductGroup();
