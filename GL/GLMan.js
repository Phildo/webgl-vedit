var GLMan = function (width, height)
{
  //Init html element
  var canvas = document.createElement('canvas');
  canvas.setAttribute('width',width);
  canvas.setAttribute('height',height);
  canvas.style.border = '1px solid black';
  canvas.innerHTML = 'Your browser can\'t handle stuff this cool...';
  this.canvas = canvas;

  //Init gl obj
  var gl = canvas.getContext('experimental-webgl');
  gl.enable(gl.DEPTH_TEST);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  this.gl = gl;

  this.geoProgram = null;

  this.setProgram = function(program, vs, fs)
  {
    switch(program)
    {
      case "geo":
        this.geoProgram = new GeoGLProgram(gl,vs,fs);
        break;
    }
  }

  this.draw = function()
  {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.geoProgram.draw();
  }
}
