function ControllerMan()
{
  console.log('creating controllerman');
  var self = this;

  self.setNewDataList = function(data)
  {
    console.log('controllerman setnewdatalist');

    while(dmm.tris.length > 0)
      dmm.removeTri(dmm.tris[0]);
      uim.removeTri();

    for(var i = 0; i < data.length; i++)
    {
      dmm.addTri(data[i]);
      uim.addTri(data[i]);
    }

    glm.geoProgram.compileStaticData();
  }

  self.addTri = function()
  {
    console.log('controllerman addtri');
    var tri = new XGLGeo(
      [1.0,0.0,0.0, 0.0,1.0,0.0, 0.0,0.0,1.0], 
      [0.5,0.5,0.5, 0.5,0.5,0.5, 0.5,0.5,0.5],
      [0.0,1.0,0.0, 0.0,1.0,0.0, 0.0,1.0,0.0],
      [0,1,2]);
    dmm.addTri(tri);
    uim.addTri(tri);

    glm.geoProgram.compileStaticData();
  }
  self.saveTri = function()
  {
    console.log('controllerman savetri');
    dmm.saveTri();
    uim.saveTri();

    glm.geoProgram.compileStaticData();
  }
  self.removeTri = function()
  {
    if(!uim.triEditor.currentTri) return;
    console.log('controllerman removetri');
    dmm.removeTri(uim.triEditor.currentTri);
    uim.removeTri();

    glm.geoProgram.compileStaticData();
  }

  self.addLight = function()
  {
    console.log('controllerman addlight');
    var light = new XGLLight([0,0,0]);
    dmm.addLight(light);
    uim.addLight(light);

    glm.geoProgram.compileStaticData();
  }
  self.saveLight = function()
  {
    console.log('controllerman savelight');
    dmm.saveLight();
    uim.saveLight();

    glm.geoProgram.compileStaticData();
  }
  self.removeLight = function()
  {
    if(dmm.lights.length == 1 || !uim.lightEditor.currentLight) return;
    console.log('controllerman removelight');
    dmm.removeLight(uim.lightEditor.currentLight);
    uim.removeLight();

    glm.geoProgram.compileStaticData();
  }
}
