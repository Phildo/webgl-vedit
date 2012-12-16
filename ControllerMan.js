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
}
  /*

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

  //Functionality
  jr.loadjsonbutton.addEventListener('click', 
    function(e) 
    {
      console.log('jsonrenderer loadjsonbutton clicked');
      var newtris = [];
      
      if(!IsJsonString(jr.inputbox.value)) return;
      var geo = JSON.parse(jr.inputbox.value);
      for(var i = 0; i < geo.indexes.length/3; i++)
      {
        newtris[newtris.length] = new XGLGeo(
          [
            geo.verts[(geo.indexes[(i*3)+0]*3)+0],geo.verts[(geo.indexes[(i*3)+0]*3)+1],geo.verts[(geo.indexes[(i*3)+0]*3)+2], 
            geo.verts[(geo.indexes[(i*3)+1]*3)+0],geo.verts[(geo.indexes[(i*3)+1]*3)+1],geo.verts[(geo.indexes[(i*3)+1]*3)+2], 
            geo.verts[(geo.indexes[(i*3)+2]*3)+0],geo.verts[(geo.indexes[(i*3)+2]*3)+1],geo.verts[(geo.indexes[(i*3)+2]*3)+2], 
          ],
          [
            geo.colors[(geo.indexes[(i*3)+0]*3)+0],geo.colors[(geo.indexes[(i*3)+0]*3)+1],geo.colors[(geo.indexes[(i*3)+0]*3)+2], 
            geo.colors[(geo.indexes[(i*3)+1]*3)+0],geo.colors[(geo.indexes[(i*3)+1]*3)+1],geo.colors[(geo.indexes[(i*3)+1]*3)+2], 
            geo.colors[(geo.indexes[(i*3)+2]*3)+0],geo.colors[(geo.indexes[(i*3)+2]*3)+1],geo.colors[(geo.indexes[(i*3)+2]*3)+2], 
          ],
          [
            geo.normals[(geo.indexes[(i*3)+0]*3)+0],geo.normals[(geo.indexes[(i*3)+0]*3)+1],geo.normals[(geo.indexes[(i*3)+0]*3)+2], 
            geo.normals[(geo.indexes[(i*3)+1]*3)+0],geo.normals[(geo.indexes[(i*3)+1]*3)+1],geo.normals[(geo.indexes[(i*3)+1]*3)+2], 
            geo.normals[(geo.indexes[(i*3)+2]*3)+0],geo.normals[(geo.indexes[(i*3)+2]*3)+1],geo.normals[(geo.indexes[(i*3)+2]*3)+2], 
          ],
          [
            0,
            1,
            2
          ]
        );
      }
      delegate.setNewDataList(newtris);
    },
  false);

  jr.outputjsonbutton.addEventListener('click', function(e) { console.log('jsonrenderer outputjsonbutton clicked'); delegate.sendStringifyRequest(jr); }, false);

  jr.stringify = function(tris, lights)
  {
    console.log('jsonrenderer stringify');
    var verts = [];
    var colors = [];
    var normals = [];
    var indexes = [];
    var lightposs = [];

    //Gather all data into arrays
    for(var i = 0; i < tris.length; i++)
    {
      for(var j = 0; j < 9; j++)
      {
        verts[verts.length] = tris[i].verts[j];
        colors[colors.length] = tris[i].colors[j];
        normals[normals.length] = tris[i].normals[j];
      }

      for(var j = 0; j < 3; j++)
        indexes[indexes.length] = indexes.length;
    }
    for(var i = 0; i < lights.length; i++)
    {
      for(var j = 0; j < 3; j++)
        lightposs[lightposs.length] = lights[i].position[j];
    }

    //Pack into minimal element array
    //(n^2, but who cares)
    for(var i = 0; i < indexes.length; i++)
    {
      for(var j = i+1; j < indexes.length; j++)
      {
        if(indexes[i] < indexes[j]
        && verts[(indexes[i]*3)+0] == verts[(indexes[j]*3)+0] 
        && verts[(indexes[i]*3)+1] == verts[(indexes[j]*3)+1] 
        && verts[(indexes[i]*3)+2] == verts[(indexes[j]*3)+2] 
        && colors[(indexes[i]*3)+0] == colors[(indexes[j]*3)+0] 
        && colors[(indexes[i]*3)+1] == colors[(indexes[j]*3)+1] 
        && colors[(indexes[i]*3)+2] == colors[(indexes[j]*3)+2] 
        && normals[(indexes[i]*3)+0] == normals[(indexes[j]*3)+0] 
        && normals[(indexes[i]*3)+1] == normals[(indexes[j]*3)+1] 
        && normals[(indexes[i]*3)+2] == normals[(indexes[j]*3)+2])
        {
          verts.splice(indexes[j]*3,3);
          colors.splice(indexes[j]*3,3);
          normals.splice(indexes[j]*3,3);
          indexes[j] = indexes[i];
          for(var k = j+1; k < indexes.length; k++)
            if(indexes[k] > indexes[j]) indexes[k]--;
        }
      }
    }
  
    //Pack into JSON object
    var geo = {};
    geo.verts = verts;
    geo.colors = colors;
    geo.normals = normals;
    geo.indexes = indexes;
    geo.lights = lightposs;

    //Print JSON object
    jr.outputbox.innerHTML = JSON.stringify(geo);

function IsJsonString(str) 
{
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
  }
  */
