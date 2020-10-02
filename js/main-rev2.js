console.log('connected');





// this is the js to get an image and display it to a div
function handleInputSubmit() {
  console.log('file submitted');

  // grab the files from the input
  var file = document.getElementById('image-input').files[0];
  // check if file type is an image

  //if (!file.type.startsWith('image/')){ continue } else {alert('this is not an image file')};

  // !!! instead of dropping in a div you will want to apply the image to a canvas


  // check if file type is an image, if not return alert
  if (!file.type.startsWith('image/')) {return alert('file type is not an image')};


  // !!! CLEAR ALL ELEMETS TO BE REPLACED WITH NEW ELEMENTS
  // grab the div you want to drop the image into
  var preview = document.getElementById('preview');
  var result = document.getElementById('result');
  // clear the div before inserting an element in case element already exists
  while (preview.hasChildNodes()) {
    preview.removeChild(preview.firstChild);
  }
  // while result has child elements, remove them
  while (result.hasChildNodes()) {
    result.removeChild(result.firstChild);
  }



  // create a preview image and append it to the preview div
  let img = document.createElement('img');
  img.classList.add('obj');
  img.file = file;
  //preview.appendChild(img);
  console.log(img);


  let reader = new FileReader();
  //reader.onload = (function(aImg) {return function(e) {aImg.src = e.target.result;};})(img);
  reader.readAsDataURL(file);
  reader.onload = function(e) {

    // first finish off the preview image
    // assign 'src' to the preview image

    //console.log(img);

    function setImageSource() {
      img.src = e.target.result;
    }

    function proceed() {


      //console.log(e);


      // !!! check out this URL for more details
      // https://stackoverflow.com/questions/2342132/waiting-for-image-to-load-in-javascript
      // !!!! NEED TO FIX THIS SO IMAGE SOURCE IS SET AND THEN REST OF FUNCTION RUNS

      console.log(img);
      console.log(img.naturalHeight); // original height of the image before modification
      console.log(img.naturalWidth); // original width of the image before modification


      // next apply image to canvas and get pixel samples from it

      // create a canvas element and add the image to it
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


      console.log('r value after loop is: ' + rValue);
      console.log('g value after loop is: ' + gValue);
      console.log('b value after loop is: ' + bValue);

      let returnRGB = 'rgb(' + rValue.toString() + ', ' + gValue.toString() + ', ' + bValue.toString() + ')';
      // set text color based on the resulting RGB value
      let returnDiv = document.getElementById('result-values');
      returnDiv.innerHTML = returnRGB

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
      console.log(returnRGB);

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







    //console.log('image source is: ' + img.src);
    /*
    setTimeout(function() {
      setImageSource();
    }, 1000);
    */

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // the setInterval below works for waiting for the src to be set
    // NOTE: this program does not work with svg
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /*
    setTimeout(function() {
      setImageSource();
    }, 1000);
    */
    setImageSource();

    console.log('papa1' + img.naturalHeight);

    var checkIfImgSrcSet = setInterval(function() {
      // had to add img.naturalHeight != 0 to get it to work
      if (img.src && img.naturalHeight != 0) {
        console.log('image source is set, continuing with function');
        clearInterval(checkIfImgSrcSet);
        proceed();
        // when used here img.naturalHeight is available
        // just have to wait for image src to be loaded
        console.log('papa2' + img.naturalHeight);
      } else {
        console.log('!!!!!!!! no source yet !!!!!!!!');
      }
    }, 5);

    //console.log('image source is: ' + img.src);

    //proceed();
    //console.log('image source is: ' + img.src);






  }



  function calculateColor() {

  }

  /*
  the process
  on file submit run function

  */


}
