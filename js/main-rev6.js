



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
    let rValue = [];
    let gValue = [];
    let bValue = [];
    let sampleSize = 40;
    ctx.canvas.width = img.naturalWidth;
    ctx.canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    // get random pixels from canvas, number of pixels is based on sampleSize var
    for (let i = 0; i < sampleSize; i++) {
      let xPos = Math.floor(Math.random() * img.naturalWidth);
      let yPos = Math.floor(Math.random() * img.naturalHeight);
      let pixelData = ctx.getImageData(xPos, yPos, xPos+1, yPos+1);
      rValue.push(pixelData.data[0]);
      gValue.push(pixelData.data[1]);
      bValue.push(pixelData.data[2]);
    }

    // reduce to an average for red, blue, green
    rValue = Math.floor(rValue.reduce((acc, val) => acc + val) / rValue.length);
    gValue = Math.floor(gValue.reduce((acc, val) => acc + val) / gValue.length);
    bValue = Math.floor(bValue.reduce((acc, val) => acc + val) / bValue.length);


    let returnRGB = 'rgb(' + rValue.toString() + ', ' + gValue.toString() + ', ' + bValue.toString() + ')';
    // set text color based on the resulting RGB value
    let text = document.createElement('span');
    text.innerHTML = returnRGB;

    // now that calculation is done repaint canvas with new color
    canvas.classList.add('obj');
    ctx.beginPath();
    ctx.fillStyle = returnRGB;
    ctx.rect(0, 0, img.naturalWidth, img.naturalHeight);
    ctx.fill();

    // append result, preview, and resultText to DOM
    preview.appendChild(img);
    result.appendChild(canvas);
    resultText.appendChild(text);
  }


  // create an interval and wait for FileReader to apply src to the img element
  var checkIfImgSrcSet = setInterval(function() {
    if (img.src && img.naturalHeight != 0) {
      console.log('image source is set, continuing with rest of program');
      clearInterval(checkIfImgSrcSet);
      proceed();
    } else {
      console.log('image source not set yet');
    }
  }, 10);

}
