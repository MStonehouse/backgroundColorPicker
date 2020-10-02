console.log('connected');





// this is the js to get an image and display it to a div
function handleInputSubmit() {
  console.log('file submitted');

  // grab the file from the input
  let file = document.getElementById('image-input').files[0];

  // check if file type is an image, if not return alert
  // !!!!!! change to something more specific later (.jpg, .jpeg, .png);
  if (!file.type.startsWith('image/')) {return alert('file type is not an image')};

  // get preview image, result image, and result text elements
  let preview = document.getElementById('preview');
  let result = document.getElementById('result');
  let resultText = document.getElementById('result-text');

  // clear all elements from divs containing preview image, result image, and result text
  while (preview.hasChildNodes()) {
    preview.removeChild(preview.firstChild);
  };

  while (result.hasChildNodes()) {
    result.removeChild(result.firstChild);
  };

  while (resultText.hasChildNodes()) {
    resultText.removeChild(resultText.firstChild);
  };

  // clear result text as well
  // probably want to append a span to it instead of placing text directly in div

  // create an image element and add the
  // create a preview image and append it to the preview div
  let img = document.createElement('img');
  img.classList.add('obj'); // add a class to the image for styling


  // possible solution is to use FileReaderSync to keep the program syncronous
  let reader = new FileReader(); // THIS IS ASYNCRONOUS
  // define callback for onload
  reader.onload = function(e) {img.src = e.target.result;}
  // run file read now that callback is defined
  reader.readAsDataURL(file);



  function proceed() {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let rValue = []; // make an array and average out the color after
    let gValue = [];
    let bValue = [];
    let sampleSize = 20;
    ctx.canvas.width = img.naturalWidth;
    ctx.canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    //console.log('another way to get image height' + img.height);

    for (let i = 0; i < sampleSize; i++) {
      // get random numbers within canvas size

      let xPos = Math.floor(Math.random() * img.naturalWidth);
      let yPos = Math.floor(Math.random() * img.naturalHeight);
      let pixelData = ctx.getImageData(xPos, yPos, xPos+1, yPos+1);
      rValue.push(pixelData.data[0]);
      gValue.push(pixelData.data[1]);
      bValue.push(pixelData.data[2]);
    }

    // reduce to an average for each color
    rValue = Math.floor(rValue.reduce((acc, val) => acc + val) / rValue.length);
    gValue = Math.floor(gValue.reduce((acc, val) => acc + val) / gValue.length);
    bValue = Math.floor(bValue.reduce((acc, val) => acc + val) / bValue.length);


    //console.log('r value after loop is: ' + rValue);
    //console.log('g value after loop is: ' + gValue);
    //console.log('b value after loop is: ' + bValue);

    let returnRGB = 'rgb(' + rValue.toString() + ', ' + gValue.toString() + ', ' + bValue.toString() + ')';
    // set text color based on the resulting RGB value
    let text = document.createElement('span');
    text.innerHTML = returnRGB;
    resultText.appendChild(text)

    /*
    // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    alert(rgbToHex(0, 51, 255)); // #0033ff
    */

    // log resulting RGB value to console
    //console.log(returnRGB);

    // return a canvas with background color
    let returnCanvas = document.createElement('canvas');
    returnCanvas.classList.add('obj');
    let returnCtx = returnCanvas.getContext('2d');
    returnCtx.canvas.width = img.naturalWidth;
    returnCtx.canvas.height = img.naturalHeight;
    returnCtx.beginPath();
    returnCtx.fillStyle = returnRGB;
    returnCtx.rect(0, 0, img.naturalWidth, img.naturalHeight);
    returnCtx.fill();


    result.appendChild(returnCanvas);
    preview.appendChild(img);


  }




  //console.log('papa1' + img.naturalHeight);

  var checkIfImgSrcSet = setInterval(function() {
    // had to add img.naturalHeight != 0 to get it to work
    if (img.src && img.naturalHeight != 0) {
      console.log('image source is set, continuing with rest of program');
      clearInterval(checkIfImgSrcSet);
      proceed();
      // when used here img.naturalHeight is available
      // just have to wait for image src to be loaded
      console.log('papa2' + img.naturalHeight);
    } else {
      console.log('image source not set yet');
    }
  }, 5);













  function calculateColor() {

  }

  /*
  the process
  on file submit run function

  */


}
