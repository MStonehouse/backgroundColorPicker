function handleImageSubmit(event) {
  let file = event.target.files[0];

  if (!file.type.startsWith('image/')) {return alert('file type is not an image')};

  var img = document.createElement('img');
  var reader = new FileReader();
  reader.onload = function(e) {img.src = e.target.result;}
  reader.readAsDataURL(file);

  function proceed(width, height) {
    var preview = document.getElementById('preview'); // get node for preview image
    var result = document.getElementById('result'); // get node for result canvas
    var resultText = document.getElementById('result-text'); // get node for result text
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var rgb; // object for rgb values
    var rgbString; // rgb return string
    var hexString; // hex return string
    let sampleSize = 50; // number of pixels to sample

    function clearNodes(...params) {
      params.map((val) => { while (val.hasChildNodes()) { val.removeChild(val.firstChild) }})
    }

    function getColorValues(sampleSize) {
      let r = [], g = [], b = [];

      for (let i = 0; i < sampleSize; i++) {
        let xPos = Math.floor(Math.random() * width);
        let yPos = Math.floor(Math.random() * height);
        let pixelData = ctx.getImageData(xPos, yPos, xPos+1, yPos+1);
        r.push(pixelData.data[0]);
        g.push(pixelData.data[1]);
        b.push(pixelData.data[2]);
      }

      r = Math.floor(r.reduce((acc, val) => acc + val) / r.length);
      g = Math.floor(g.reduce((acc, val) => acc + val) / g.length);
      b = Math.floor(b.reduce((acc, val) => acc + val) / b.length);

      return {r: r, g: g, b: b};
    }

    function rgbToHex(value) {
      var hex = value.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    function drawNewColorToCanvas() {
      ctx.beginPath();
      ctx.fillStyle = rgbString;
      ctx.rect(0, 0, width, height);
      ctx.fill();
    }

    function drawImageToCanvas() {
      ctx.canvas.width = width;
      ctx.canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
    }

    // set selected image to canvas so pixels can be selected off of it
    drawImageToCanvas();

    // get color values from the image we just attached to canvas
    rgb = getColorValues(sampleSize);

    // make strings for rgb and hex to attach to DOM
    rgbString = 'rgb(' + rgb.r.toString() + ', ' + rgb.g.toString() + ', ' + rgb.b.toString() + ')';
    hexString = '#' + rgbToHex(rgb.r) + rgbToHex(rgb.g) + rgbToHex(rgb.b);

    // recycle canvas, now that we have the color assign it to the same canvas we used to get the color
    drawNewColorToCanvas();

    // clear preview, result, and resultText divs
    clearNodes(preview, result, resultText);

    // make <p> elements to attach to resultText div
    var rgbText = document.createElement('p');
    var hexText = document.createElement('p');
    rgbText.innerHTML = rgbString;
    hexText.innerHTML = hexString;

    // append all elements to their containers
    preview.appendChild(img);
    result.appendChild(canvas);
    resultText.appendChild(rgbText);
    resultText.appendChild(hexText);
  }



  // set interval to check if file source has been attached to img variable yet
  var checkIfImgSrcSet = setInterval(function() {
    if (img.src && img.naturalHeight) {
      console.log('image source is set, continuing with rest of program');
      clearInterval(checkIfImgSrcSet);
      proceed(img.naturalWidth, img.naturalHeight);
    } else {
      console.log('image source not set yet');
    }
  }, 10);

}
