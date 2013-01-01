function ControllerMan(model)
{
  console.log('creating controllerman');
  var self = this;

  self.addTriangle = function()
  {
    console.log('controllerman addtriangle');

    model.addTriangle(model.createTriangle());
  }

  self.removeTriangle = function(index)
  {
    console.log('controllerman removetriangle');

    model.removeTriangle(index);
  }

  self.triangleChanged = function(triangle,index)
  {
    console.log('controllerman trianglechanged');

    model.changeTriangle(triangle, index);
  }

  self.addLight = function()
  {
    console.log('controllerman addlight');

    model.addLight(model.createLight());
  }

  self.removeLight = function(index)
  {
    console.log('controllerman removelight');

    model.removeLight(index);
  }

  self.lightChanged = function(light,index)
  {
    console.log('controllerman lightchanged');

    model.changeLight(light, index);
  }

  self.loadJson = function(triangles, lights)
  {
    console.log('controllerman loadjson');

    model.removeAllTriangles();
    model.removeAllLights();
    for(var i = 0; i < triangles.length; i++)
      model.addTriangle(triangles[i]);
    for(var i = 0; i < lights.length; i++)
      model.addLight(lights[i]);
  }

  self.outputJson = function()
  {
    console.log('controllerman outputjson');

    model.requestStateDeclaration();
  }
}
