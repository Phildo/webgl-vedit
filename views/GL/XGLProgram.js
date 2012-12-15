//This is designed to be 'parasitically' extended
var XGLProgram = function (gl, vs, fs)
{
  //Init GL Program
  var gl_vshader;
  var gl_fshader;
  var gl_program;
  //Create/Compile Shaders
  gl_vshader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(gl_vshader,vs);
  gl.compileShader(gl_vshader);
  gl_fshader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(gl_fshader,fs);
  gl.compileShader(gl_fshader);
  //Create Program from Shaders
  gl_program = gl.createProgram();
  gl.attachShader(gl_program,gl_vshader);
  gl.attachShader(gl_program,gl_fshader);

  gl.linkProgram(gl_program);

  this.gl_program = gl_program;

  //XGeo objects
  this.geos = [];
  this.addGeo = function(xGeo)
  {
    xGeo.programGeoListIndex = this.geos.length;
    this.geos[this.geos.length] = xGeo;
    return this.geos.length-1; //return xGeo;
  }
  this.removeGeo = function(xGeo)
  {
    for(var i = xGeo.programGeoListIndex+1; i < this.geos.length; i++)
      this.geos[i].programGeoListIndex--;
    this.geos.splice(xGeo.programGeoListIndex,1);
    xGeo.programGeoListIndex = -1;
    return xGeo;
  }
  this.getGeo = function(g)
  {
    return this.geos[g];
  }

  this.draw = function()
  {
    console.log('This program has not implemented its draw function!');
  }
}
