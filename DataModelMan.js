function DataModelMan()
{
  console.log('createing datamodelman');
  var self = this;
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
