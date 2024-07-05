var video;
var scaler = 4;
var preFrame;
var c1 = '#1C4DA1';
var c2 = '#FFFFFF';
var propor = 0.75;

function setup() {
  
  var h = windowHeight/0.75;
  
  createCanvas(h, windowHeight);
  
  pixelDensity(3);
  video = createCapture(VIDEO);
  video.size(width / scaler, height / scaler);
  video.hide();
  preFrame = createImage(video.width, video.height);
  background(c1);
}

function draw() {
  
  print(width);
  translate(width, 0);
  scale(-1, 1);
  video.loadPixels();
  preFrame.loadPixels();
  
     let grid = 2;

  for (let y = 0; y < video.height; y+=grid) {
    for (let x = 0; x < video.width; x+=grid) {
      var index = (x + y * video.width) * 4
      let pr = preFrame.pixels[index + 0];
      let pg = preFrame.pixels[index + 1];
      let pb = preFrame.pixels[index + 2];
      let pbright = (pr + pg + pb) / 3;

      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let bright = (r + g + b) / 3;
			
      var diff = dist(r, g, b, pr, pg, pb);
			if (diff<20){
        stroke(c1);
      } else {
        stroke(c2);
      }
      
      strokeWeight(1.2);

      d = scaler;
      cornerx = x * scaler;
      cornery = y * scaler;
      centeruno = cornerx+d; 
      centerdos = cornery+d;
      //centeruno = random(cornerx, cornerx+d); 
      //centerdos = random(cornery, cornery+d);
          
      line (cornerx, cornery, centeruno, centerdos);
      line (cornerx+d, cornery, centeruno, centerdos);
      line (cornerx, cornery+d, centeruno, centerdos);
      
      //rect(x * scaler, y * scaler, scaler, scaler);
    }
  }

    preFrame.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);

}