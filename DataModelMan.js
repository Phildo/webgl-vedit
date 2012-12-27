function DataModelMan()
{
  console.log('createing datamodelman');
  var self = this;

  self.triangles = [];
  self.lights = [];

  //You can essentially 'subscribe functions' to these events
  //by adding them to these arrays
  self.trianglesUpdatedCallbacks = [];
  self.lightsUpdatedCallbacks = [];
  self.JSONUpdatedCallbacks = [];

  self.createTriangle = function()
  {
    console.log('datamodelman createtriangle');
    var t = {};
    t.vertexes = [];
    for(var i = 0; i < 3; i++)
    {
      t.vertexes[i] = {};
      t.vertexes[i].position = [0,0,0];
      t.vertexes[i].color = [0,0,0];
      t.vertexes[i].normal = [0,0,0];
    }

    return t;
  }
  self.addTriangle = function(triangle)
  {
    console.log('datamodelman addtriangle');
    self.triangles[self.triangles.length] = triangle;
    self.trianglesUpdated({'added':[triangle],'removed':[]});
  }
  self.removeTriangle = function(index)
  {
    console.log('datamodelman removetriangle');
    var oldTriangle = self.triangles[index];
    self.triangles.splice(index,1);
    self.trianglesUpdated({'added':[],'removed':[oldTriangle]});
  }
  self.changeTriangle = function(triangle, index)
  {
    console.log('datamodelman changetriangle');
    var oldTriangle = self.triangles[index];
    self.triangles[index] = triangle;
    self.trianglesUpdated({'added':[triangle],'removed':[oldTriangle]});
  }

  self.createLight = function()
  {
    console.log('datamodelman createlight');
    var l = {};
    l.position = [0,0,0];

    return l;
  }
  self.addLight = function(light)
  {
    console.log('datamodelman addlight');
    self.lights[self.lights.length] = light;
    self.lightsUpdated({'added':[light],'removed':[]});
  }
  self.removeLight = function(index)
  {
    console.log('datamodelman removelight');
    var oldLight = self.lights[index];
    self.lights.splice(index,1);
    self.lightsUpdated({'added':[],'removed':[oldLight]});
  }
  self.changeLight = function(light, index)
  {
    console.log('datamodelman changelight');
    var oldLight = self.lights[index];
    self.lights[index] = light;
    self.lightsUpdated({'added':[light],'removed':[oldLight]});
  }

  self.registerCallback = function(eventname,callback)
  {
    console.log('datamodelman registercallback');
    callbackArray = self[eventname+'Callbacks'];
    if(callbackArray) 
      callbackArray[callbackArray.length] = callback;
  }
  self.trianglesUpdated = function(deltas)
  {
    console.log('datamodelman trianglesupdated');
    for(var i = 0; i < self.trianglesUpdatedCallbacks.length; i++)
      self.trianglesUpdatedCallbacks[i](self.triangles, deltas);
  }
  self.lightsUpdated = function(deltas)
  {
    console.log('datamodelman lightsupdated');
    for(var i = 0; i < self.lightsUpdatedCallbacks.length; i++)
      self.lightsUpdatedCallbacks[i](self.lights, deltas);
  }
  self.JSONUpdated = function(newJSON)
  {
    console.log('datamodelman jsonupdated');
    for(var i = 0; i < self.JSONUpdatedCallbacks.length; i++)
      self.JSONUpdatedCallbacks[i](newJSON);
  }
}
/*
  self.dirtybit = false;
  self.tris = [];
  self.lights = [];

  self.addTri = function(tri)
  {
    console.log('datamodelman addtri');
    self.tris[self.tris.length] = tri;
    glm.geoProgram.addGeo(tri);
    self.dirtybit = true;
  }
  self.saveTri = function()
  {
    console.log('datamodelman savetri');
    self.dirtybit = true;
  }
  self.removeTri = function(tri)
  {
    console.log('datamodelman removetri');
    self.tris.splice(tri.programGeoListIndex,1);
    glm.geoProgram.removeGeo(tri);
    self.dirtybit = true;
  }

  self.addLight = function(light)
  {
    console.log('datamodelman addlight');
    self.lights[self.lights.length] = light;
    glm.geoProgram.addLight(light);
    self.dirtybit = true;
  }
  self.saveLight = function()
  {
    console.log('datamodelman savelight');
    self.dirtybit = true;
  }
  self.removeLight = function(light)
  {
    if(self.lights.length == 1) return;
    console.log('datamodelman removelight');
    self.lights.splice(light.programGeoListIndex,1);
    glm.geoProgram.removeLight(light);
    self.dirtybit = true;
  }

}
*/
