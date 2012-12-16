function createDrawingarea(delegate, model)
{
  console.log('creating drawingarea');
  //Constants
  var WIDTH = 650;
  var HEIGHT = 360;

  //Create
  var da = createPane(delegate);
  da.titlebox.innerHTML = "Drawing Area:";
  da.dirtybit = true; //true = needs to be drawn
  da.glm = null; //GL Manager
  da.alm = null; //Async Load Manager
  da.im = null; //Input Manager

  da.glTriangleCache = [];
  da.glLightCache = [];

  //Style
  da.style.width = WIDTH+'px';
  da.style.height = HEIGHT+'px';

  //Functionality
  da.startDrawing = function()
  {
    console.log('drawingarea startdrawing');
    //Move the camera back a bit
    mat4.translate(da.glm.geoProgram.camMatData,[0,0,10.0]);

    requestAnimFrame(da.tick,da.glm.canvas);
  }

  da.tick = function()
  {
    requestAnimFrame(da.tick,da.glm.canvas);

    if(da.im.up || da.im.w) { mat4.translate(da.glm.geoProgram.camMatData,[0,0,-0.05]); da.dirtybit = true; }
    if(da.im.down || da.im.s) { mat4.translate(da.glm.geoProgram.camMatData,[0,0,0.05]); da.dirtybit = true; }
    if(da.im.a) { mat4.translate(da.glm.geoProgram.camMatData,[-0.05,0,0]); da.dirtybit = true; }
    if(da.im.d) { mat4.translate(da.glm.geoProgram.camMatData,[0.05,0,0]); da.dirtybit = true; }
    if(da.im.space) { mat4.translate(da.glm.geoProgram.camMatData,[0,0.05,0]); da.dirtybit = true; }
    if(da.im.shift) { mat4.translate(da.glm.geoProgram.camMatData,[0,-0.05,0]); da.dirtybit = true; }
    if(da.im.left) { mat4.rotate(da.glm.geoProgram.camMatData,0.02,[0,1,0]); da.dirtybit = true; }
    if(da.im.right) { mat4.rotate(da.glm.geoProgram.camMatData,-0.02,[0,1,0]); da.dirtybit = true; }
  
    if(da.dirtybit)
    {
      console.log('drawingarea tick');//only output when actually drawn
      da.glm.draw();
      da.dirtybit = false;
    }
  }

  da.editTriangles = function(triangles, deltas)
  {
    console.log('drawingarea edittriangles');
    if(deltas.removed.length > 0)//fuck it, redo the whole thing
    {
      for(var i = 0; i < da.glTriangleCache.length; i++)
        da.glm.geoProgram.removeGeo(da.glTriangleCache[i]);
      da.glTriangleCache = [];

      for(var i = 0; i < triangles.length; i++)
      {
        var geo = da.createGeoFromTriangle(triangles[i]);
        da.glm.geoProgram.addGeo(geo);
        da.glTriangleCache[da.glTriangleCache.length] = geo;
      }
    }
    else//only adds... nice
    {
      for(var i = 0; i < deltas.added.length; i++)
      {
        var geo = da.createGeoFromTriangle(deltas.added[i]);
        da.glm.geoProgram.addGeo(geo);
        da.glTriangleCache[da.glTriangleCache.length] = geo;
      }
    }
    da.glm.geoProgram.compileStaticData();
    da.dirtybit = true;
  }
  da.createGeoFromTriangle = function(triangle)
  {
    console.log('drawingarea creategeofromtriangle');
    var verts = triangle.vertexes[0].position.concat(triangle.vertexes[1].position.concat(triangle.vertexes[2].position));
    var colors = triangle.vertexes[0].color.concat(triangle.vertexes[1].color.concat(triangle.vertexes[2].color));
    var normals = triangle.vertexes[0].normal.concat(triangle.vertexes[1].normal.concat(triangle.vertexes[2].normal));
    var indexes = [0,1,2];
    var geo  = new XGLGeo(verts,colors,normals,indexes);

    return geo;
  }

  da.editLights = function(lights, deltas)
  {
    console.log('drawingarea editlights');
    if(deltas.removed.length > 0)//fuck it, redo the whole thing
    {
      for(var i = 0; i < da.glLightCache.length; i++)
        da.glm.geoProgram.removeLight(da.glLightCache[i]);
      da.glLightCache = [];

      for(var i = 0; i < lights.length; i++)
      {
        var light = da.createGLLightFromLight(lights[i]);
        da.glm.geoProgram.addLight(light);
        da.glLightCache[da.glLightCache.length] = light;
      }
    }
    else//only adds... nice
    {
      for(var i = 0; i < deltas.added.length; i++)
      {
        var light = da.createGLLightFromLight(deltas.added[i]);
        da.glm.geoProgram.addLight(light);
        da.glLightCache[da.glLightCache.length] = light;
      }
    }
    da.glm.geoProgram.compileStaticData();
    da.dirtybit = true;
  }
  da.createGLLightFromLight = function(light)
  {
    console.log('drawingarea creategllightfromlight');
    var light  = new XGLLight(light.position);

    return light;
  }

  //Construct (in functions due to asynchronaeity) <- no way I spelled that correctly...
  da.startInit = function()
  {
    console.log('drawingarea startinit');
    da.alm = new AsyncLoaderMan();
    da.alm.loadBatch(new AsyncLoaderBatch(
      ['views/GL/shaders/geovshader.txt',
      'views/GL/shaders/geofshader.txt'],
      ['geovs','geofs'], 
      da.finishInit));
    da.im = new InputMan();
  }
  da. finishInit = function(asyncData)
  {
    console.log('drawingarea finishinit');
    console.log('init');
    //Init the men
    da.glm = new GLMan(640, 320);
    da.glm.setProgram("geo",asyncData.geovs,asyncData.geofs);
    da.appendChild(da.glm.canvas);

    da.startDrawing();
  }
  da.startInit();

  model.registerCallback('trianglesUpdated',da.editTriangles);
  model.registerCallback('lightsUpdated',da.editLights);

  return da;
}
