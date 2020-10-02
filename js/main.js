



function handleInputSubmit() {
  let file = document.getElementById('image-input').files[0];
  if (!file.type.startsWith('image/')) {return alert('file type is not an image')};
  let preview = document.getElementById('preview');
  let result = document.getElementById('result');
  let resultText = document.getElementById('result-text');

  while (preview.hasChildNodes()) {
    preview.removeChild(preview.firstChild);
  };

  while (result.hasChildNodes()) {
    result.removeChild(result.firstChild);
  };

  while (resultText.hasChildNodes()) {
    resultText.removeChild(resultText.firstChild);
  };

  let img = document.createElement('img');
  img.classList.add('obj');
  let reader = new FileReader();
  reader.onload = function(e) {img.src = e.target.result;}
  reader.readAsDataURL(file);

  function proceed() {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let rValue = [];
    let gValue = [];
    let bValue = [];
    let sampleSize = 50; // 50
    ctx.canvas.width = img.naturalWidth;
    ctx.canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    for (let i = 0; i < sampleSize; i++) {
      let xPos = Math.floor(Math.random() * img.naturalWidth);
      let yPos = Math.floor(Math.random() * img.naturalHeight);
      let pixelData = ctx.getImageData(xPos, yPos, xPos+1, yPos+1);
      rValue.push(pixelData.data[0]);
      gValue.push(pixelData.data[1]);
      bValue.push(pixelData.data[2]);
    }

    rValue = Math.floor(rValue.reduce((acc, val) => acc + val) / rValue.length);
    gValue = Math.floor(gValue.reduce((acc, val) => acc + val) / gValue.length);
    bValue = Math.floor(bValue.reduce((acc, val) => acc + val) / bValue.length);




    function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }


    let returnRGB = 'rgb(' + rValue.toString() + ', ' + gValue.toString() + ', ' + bValue.toString() + ')';
    let returnHex = rgbToHex(rValue, gValue, bValue);
    let rgbText = document.createElement('p');
    let hexText = document.createElement('p');
    rgbText.innerHTML = returnRGB;
    hexText.innerHTML = returnHex;
    //console.log(returnHex);

    canvas.classList.add('obj');
    ctx.beginPath();
    ctx.fillStyle = returnRGB;
    ctx.rect(0, 0, img.naturalWidth, img.naturalHeight);
    ctx.fill();

    preview.appendChild(img);
    result.appendChild(canvas);
    resultText.appendChild(rgbText);
    resultText.appendChild(hexText);
  }

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
