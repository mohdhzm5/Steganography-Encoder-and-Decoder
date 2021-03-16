const imageloader = document.getElementById('imageLoader');
addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');
var messageInput = document.getElementById('message');

var textCanvas = document.getElementById('textCanvas');
var tctx = textCanvas.getContext('2d');
var dwn = document.getElementById('btndownload');



var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}







function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            textCanvas.width=img.width;
            textCanvas.height=img.height;
            tctx.font = "20px Arial";
      var messageText = (messageInput.value.length) ? messageInput.value : 'Hello';
            tctx.fillText(messageText,10,50);
            ctx.drawImage(img,0,0);
            var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var textData = tctx.getImageData(0, 0, canvas.width, canvas.height);
            
            for (var i = 0; i < textData.data.length; i += 4) {
                if (textData.data[i+3] !== 0) {
                    
                     if (imgData.data[i+1] > 245) {
                        imgData.data[i+1] = 245;
                    }
                    else {
                        while (imgData.data[i+1] % 10 != 5) {
                            imgData.data[i+1]++;
                        }
                    }
                 
                }
                else {
                    if (imgData.data[i+1]%10 == 5) {
                        imgData.data[i+1]--;
                    }
                 
                }
            }
            
            ctx.putImageData(imgData, 0, 0);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}


dwn.onclick = function(){
    download(canvas, 'myimage.png');
  }
  function download(canvas, filename) {
    /// create an "off-screen" anchor tag
    var lnk = document.createElement('a'), e;
  
    /// the key here is to set the download attribute of the a tag
    lnk.download = filename;
  
    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = canvas.toDataURL("image/png;base64");
  
    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window,
                       0, 0, 0, 0, 0, false, false, false,
                       false, 0, null);
  
      lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }
  }

var decodeCanvas = document.getElementById('imageCanvas2');
var dctx = decodeCanvas.getContext('2d');
var imageLoader2 = document.getElementById('imageLoader2');
    imageLoader2.addEventListener('change', handleImage2, false);

function handleImage2(e){
    
    var reader2 = new FileReader();
    reader2.onload = function(event){
        
        var img2 = new Image();
        img2.onload = function(){
            
            decodeCanvas.width = img2.width;
            decodeCanvas.height = img2.height;
            dctx.drawImage(img2,0,0);
            var decodeData = dctx.getImageData(0, 0, decodeCanvas.width, decodeCanvas.height);
            for (var i = 0; i < decodeData.data.length; i += 4) {
                if (decodeData.data[i+1] % 10 == 5) {
                    decodeData.data[i] = 0;
                    decodeData.data[i+1] = 0;
                    decodeData.data[i+2] = 0;
                    decodeData.data[i+3] = 255;
                }
                else {
                      decodeData.data[i] = 0;
                    decodeData.data[i+1] = 0;
                    decodeData.data[i+2] = 0;
                    decodeData.data[i+3] = 0;
                }
            }
            dctx.putImageData(decodeData, 0, 0);
        };
        img2.src = event.target.result;
    };
    reader2.readAsDataURL(e.target.files[0]);
}