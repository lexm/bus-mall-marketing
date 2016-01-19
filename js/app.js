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

var imageElementArray = [];
imageElementArray.push(document.getElementById('image1'));
imageElementArray.push(document.getElementById('image2'));
imageElementArray.push(document.getElementById('image3'));

var titleElementArray = [];
titleElementArray.push(document.getElementById('title1'));
titleElementArray.push(document.getElementById('title2'));
titleElementArray.push(document.getElementById('title3'));

function showProduct(prodNum, slotNum) {
  var slotImageElement = imageElementArray[slotNum];
  var slotTitleElement = titleElementArray[slotNum];
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

prodShown = genProdShownArray();

for(var i = 0; i < 3; i += 1) {
  showProduct(prodShown[i], i);
}
