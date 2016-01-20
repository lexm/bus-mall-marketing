'use strict';

function Product(productName, imageFile) {
  this.productName = productName;
  this.imageFile = imageFile;
  this.timesChosen = 0;
  this.timesShown = 0;
}

var prodArray = [];

prodArray.push(new Product('R2D2 suitcase', 'bag.jpg'));
prodArray.push(new Product('Banana slicer', 'banana.jpg'));
prodArray.push(new Product('Open-toed galoshes', 'boots.jpg'));
prodArray.push(new Product('Not-so-comfy chair', 'chair.jpg'));
prodArray.push(new Product('Raging Cthulhu', 'cthulhu.jpg'));
prodArray.push(new Product('Dragon meat', 'dragon.jpg'));
prodArray.push(new Product('Pen utensils', 'pen.jpg'));
prodArray.push(new Product('Pizza scissors', 'scissors.jpg'));
prodArray.push(new Product('Shark sleeping bag', 'shark.jpg'));
prodArray.push(new Product('Infant sweeper', 'sweep.png'));
prodArray.push(new Product('Unicorn meat', 'unicorn.jpg'));
prodArray.push(new Product('USB tentacle', 'usb.gif'));
prodArray.push(new Product('Self-watering can', 'water-can.jpg'));
prodArray.push(new Product('Sideways wine glass', 'wine-glass.jpg'));

// var slotInit;

var totalClicks = 0;

function DisplaySlot(slotInitNum) {
  var boxId = 'box' + (slotInitNum + 1);
  var imageId = 'image' + (slotInitNum + 1);
  var titleId = 'title' + (slotInitNum + 1);
  // this.displaySlotNum = slotInitNum;
  this.boxElement = document.getElementById(boxId);
  this.imageElement = document.getElementById(imageId);
  this.titleElement = document.getElementById(titleId);
}

var displaySlotArray = [];

for(var i = 0; i < 3; i += 1) {
  displaySlotArray[i] = new DisplaySlot(i);
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

var prodShown = [];

function checkIfNoRepeat(newProdArray) {
  var arrLength = newProdArray.length - 1;
  var newPNum = newProdArray[arrLength];
  for(var i = 0; i < arrLength; i += 1) {
    if(newProdArray[i] === newPNum)
    return false;
  }
  return true;
}

function genProdShownArray() {
  var newArray = [];
  // var match;
  for(var i = 0; i < 3; ) {
    newArray[i] = randomProductNumber();
    if(checkIfNoRepeat(newArray)) {
      i += 1;
    }
  }
  return newArray;
}

function showNewProductGroup() {
  prodShown = genProdShownArray();
  for(var i = 0; i < 3; i += 1) {
    // console.log(prodShown[i]);
    showProduct(prodShown[i], i);
  }
}

displaySlotArray[0].boxElement.addEventListener('click', handleClickSlotOne);
displaySlotArray[1].boxElement.addEventListener('click', handleClickSlotTwo);
displaySlotArray[2].boxElement.addEventListener('click', handleClickSlotThree);

function handleClickAll(clickSlot) {
    totalClicks += 1;
    prodArray[prodShown[clickSlot]].timesChosen += 1;
    for(var i = 0; i < 3; i += 1) {
      prodArray[prodShown[i]].timesShown += 1;
    }
    showNewProductGroup();
    checkButtonCount();
}

var buttonElement = document.getElementById('show-button');
var showButtonNumber = 3;

function checkButtonCount() {
  console.log('totalClicks is ' + totalClicks);
  if(totalClicks === showButtonNumber) {
    buttonElement.style.visibility = 'visible';
  }
}

function handleClickSlotOne(e) {
  handleClickAll(0);
}

function handleClickSlotTwo(e) {
  handleClickAll(1);
}

function handleClickSlotThree(e) {
  handleClickAll(2);
}

var showButtonElement = document.getElementById('show-button');
var resultsElement = document.getElementById('results');

showButtonElement.addEventListener('click', handleButtonClick);

function handleButtonClick(e) {
  showButtonElement.textContent = 'Update Results';
  var nameArray = [];
  var chosenArray = [];
  var shownArray = [];
  var percentArray = [];
  for(var i = 0; i < prodArray.length; i += 1) {
    var shortName = prodArray[i].imageFile.split('.')[0];
    nameArray.push(shortName);
    var chosen = prodArray[i].timesChosen;
    chosenArray.push(chosen);
    var shown = prodArray[i].timesShown;
    shownArray.push(shown);
    var percentage = 0;
    if (shown) {
      percentage = Math.round((chosen / shown) * 100) + "%";
    }
    percentArray.push(percentage);
  }
  produceBarGraph(nameArray, chosenArray, shownArray);
}

function produceBarGraph(nameArray, chosenArray, shownArray) {
  var graphData = {
    labels: nameArray,
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
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
  }

  var graphElement = document.getElementById('bar-graph').getContext('2d');
  var legendElement = document.getElementById('legend');
  var barChart = new Chart(graphElement).Bar(graphData);
  legendElement.innerHTML = barChart.generateLegend();
}

showNewProductGroup();
