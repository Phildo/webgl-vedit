function createJsonrenderer(delegate, model)
{
  console.log('creating jsonrenderer');
  //Constants
  var WIDTH = 640;
  var HEIGHT = 320;

  //Create
  var jr = createPane(delegate);
  jr.titlebox.innerHTML = 'JSON Renderer:';
  jr.io = document.createElement('div');
  jr.inputbox = document.createElement('textarea');
  jr.outputbox = document.createElement('div');
  jr.loadjsonbutton = createButton('load json', function(e) { console.log('jsonrenderer loadjsonbuttonclick'); jr.parseJSON(jr.inputbox.value); });
  jr.outputjsonbutton = createButton('output json', function(e) { console.log('jsonrenderer outputjsonbuttonclick'); if(typeof delegate.outputJsonButtonClicked == 'function') delegate.outputJsonButtonClicked(jr); });

  //Style
  jr.style.width = WIDTH+'px';
  jr.style.height = HEIGHT+'px';
  jr.io.style.width = WIDTH+'px';
  jr.io.style.height = HEIGHT+'px';
  jr.inputbox.style.width = (WIDTH/2)+'px';
  jr.inputbox.style.height = HEIGHT+'px';
  jr.inputbox.style.margin = '0px';
  jr.inputbox.style.float = 'left';
  jr.outputbox.style.width = (WIDTH/2)+'px';
  jr.outputbox.style.height = HEIGHT+'px';
  jr.outputbox.style.margin = '0px';
  jr.outputbox.style.padding = '0px';
  jr.outputbox.style.float = 'left';

  jr.populateWithData = function(triangles, lights)
  {
    console.log('jsonrenderer populatewithdata');

    var verts = [];
    var colors = [];
    var normals = [];
    var indexes = [];
    var lightposs = [];

    //Gather all data into arrays
    for(var i = 0; i < triangles.length; i++) //each triangle
    {
      for(var j = 0; j < 3; j++) //each vertex
      {
        for(var k = 0; k < 3; k++) //each members (coincidence that position, color, and normal all have 3 members)
        {
            verts[verts.length] = triangles[i].vertexes[j].position[k];
            colors[colors.length] = triangles[i].vertexes[j].color[k];
            normals[normals.length] = triangles[i].vertexes[j].normal[k];
        }
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

    jr.outputbox.innerHTML = JSON.stringify(geo);
  }

  jr.parseJSON = function(data)
  {
    var newtris = [];
    var newlights = [];

    var geo;
    try { geo = JSON.parse(data); }
    catch(e) { return; }

    for(var i = 0; i < geo.indexes.length/3; i++)
    {
      var tri = model.createTriangle();

      tri.vertexes[0].position = [geo.verts[(geo.indexes[(i*3)+0]*3)+0],geo.verts[(geo.indexes[(i*3)+0]*3)+1],geo.verts[(geo.indexes[(i*3)+0]*3)+2]];
      tri.vertexes[1].position = [geo.verts[(geo.indexes[(i*3)+1]*3)+0],geo.verts[(geo.indexes[(i*3)+1]*3)+1],geo.verts[(geo.indexes[(i*3)+1]*3)+2]];
      tri.vertexes[2].position = [geo.verts[(geo.indexes[(i*3)+2]*3)+0],geo.verts[(geo.indexes[(i*3)+2]*3)+1],geo.verts[(geo.indexes[(i*3)+2]*3)+2]];

      tri.vertexes[0].color = [geo.colors[(geo.indexes[(i*3)+0]*3)+0],geo.colors[(geo.indexes[(i*3)+0]*3)+1],geo.colors[(geo.indexes[(i*3)+0]*3)+2]];
      tri.vertexes[1].color = [geo.colors[(geo.indexes[(i*3)+1]*3)+0],geo.colors[(geo.indexes[(i*3)+1]*3)+1],geo.colors[(geo.indexes[(i*3)+1]*3)+2]];
      tri.vertexes[2].color = [geo.colors[(geo.indexes[(i*3)+2]*3)+0],geo.colors[(geo.indexes[(i*3)+2]*3)+1],geo.colors[(geo.indexes[(i*3)+2]*3)+2]];

      tri.vertexes[0].normal = [geo.normals[(geo.indexes[(i*3)+0]*3)+0],geo.normals[(geo.indexes[(i*3)+0]*3)+1],geo.normals[(geo.indexes[(i*3)+0]*3)+2]];
      tri.vertexes[1].normal = [geo.normals[(geo.indexes[(i*3)+1]*3)+0],geo.normals[(geo.indexes[(i*3)+1]*3)+1],geo.normals[(geo.indexes[(i*3)+1]*3)+2]];
      tri.vertexes[2].normal = [geo.normals[(geo.indexes[(i*3)+2]*3)+0],geo.normals[(geo.indexes[(i*3)+2]*3)+1],geo.normals[(geo.indexes[(i*3)+2]*3)+2]];

      newtris[newtris.length] = tri;
    }
    for(var i = 0; i < geo.lights.length/3; i++)
    {
      var light = model.createLight();

      light.position[0] = geo.lights[(i*3)+0];
      light.position[1] = geo.lights[(i*3)+1];
      light.position[2] = geo.lights[(i*3)+2];

      newlights[newlights.length] = light;
    }

    if(typeof delegate.loadJsonButtonClicked == 'function') delegate.loadJsonButtonClicked(jr, newtris, newlights); 
  }
  
  model.registerCallback('stateDeclared',jr.populateWithData);

  //Construct
  jr.appendChild(jr.loadjsonbutton);
  jr.appendChild(jr.outputjsonbutton);
  jr.appendChild(jr.io);
  jr.io.appendChild(jr.inputbox);
  jr.io.appendChild(jr.outputbox);

  return jr;
}
