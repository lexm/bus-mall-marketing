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

// var boxElementArray = [];
// boxElementArray.push(document.getElementById('box1'));
// boxElementArray.push(document.getElementById('box2'));
// boxElementArray.push(document.getElementById('box3'));

// var imageElementArray = [];
// imageElementArray.push(document.getElementById('image1'));
// imageElementArray.push(document.getElementById('image2'));
// imageElementArray.push(document.getElementById('image3'));
//
// var titleElementArray = [];
// titleElementArray.push(document.getElementById('title1'));
// titleElementArray.push(document.getElementById('title2'));
// titleElementArray.push(document.getElementById('title3'));
var slotInit;

var totalClicks = 0;

function DisplaySlot(slotInitNum) {
  var boxId = 'box' + (slotInitNum + 1);
  var imageId = 'image' + (slotInitNum + 1);
  var titleId = 'title' + (slotInitNum + 1);
  this.displaySlotNum = slotInitNum;
  this.boxElement = document.getElementById(boxId);
  this.imageElement = document.getElementById(imageId);
  this.titleElement = document.getElementById(titleId);
  // this.handleClick = function() {
  //   totalClicks += 1;
  //   for(var i = 0; i < 3; i += 1) {
  //     prodArray[prodShown[i]].timesShown += 1;
  //   }
  //   console.log(this.displaySlotNum);
  //   // prodArray[prodShown[this.displaySlotNum]].timesChosen += 1;
  //   // prodArray[this.displaySlotNum].timesChosen += 1;
  //   showNewProductGroup();
  // }
  // this.createBoxEventListener = function() {
  //   this.boxElement.addEventListener('click', function(), slotInit);
  // }
  // this.createBoxEventListener();
}

// DisplaySlot.prototype.handleClick = function(event) {
//   console.log(event);
//   totalClicks += 1;
//   for(var i = 0; i < 3; i += 1) {
//     prodArray[prodShown[i]].timesShown += 1;
//   }
//   prodArray[this.displaySlotNum] += 1;
//   showNewProductGroup();
// }


var displaySlotArray = [];

for(var i = 0; i < 3; i += 1) {
  // slotInit = i;
  displaySlotArray[i] = new DisplaySlot(i);
}


function showProduct(prodNum, slotNum) {
  var slotImageElement = displaySlotArray[slotNum].imageElement;
  var slotTitleElement = displaySlotArray[slotNum].titleElement;
  slotImageElement.setAttribute('src', 'img\/' + prodArray[prodNum].imageFile);
  slotTitleElement.textContent = prodArray[prodNum].productName;
}

function randomProductNumber() {
  return Math.floor(Math.random() * prodArray.length);
}

var prodShown = [];

function genProdShownArray() {
  var newArray = [];
  var match;
  for(var i = 0; i < 3; ) {
    var newProdNum = randomProductNumber();
    match = false;
    for(var j = i - 1; j >= 0; j -= 1) {
      if(newArray[j] === newProdNum) {
        match = true;
      }
    }
    if(!match) {
      newArray[i] = newProdNum;
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
  var displayList = document.createElement('ul');
  for(var i = 0; i < prodArray.length; i += 1) {
    var prodResults = document.createElement('li');
    var pName = prodArray[i].productName;
    var chosen = prodArray[i].timesChosen;
    var shown = prodArray[i].timesShown;
    var percentage = "(not shown)"
    if (shown) {
      percentage = Math.round((chosen / shown) * 100) + "%";
    }
    console.log(chosen + " " + shown + " " + percentage);
    prodResults.textContent = pName + " received " + chosen + " votes out \
    of " + shown + " times shown. " + percentage;
    displayList.appendChild(prodResults);
  }
  resultsElement.appendChild(displayList);
}



showNewProductGroup();
