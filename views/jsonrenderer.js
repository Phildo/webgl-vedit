function createJSONrenderer(delegate)
{
  console.log('creating jsonrenderer');
  //Create
  var jr = document.createElement('div');
  jr.io = document.createElement('div');
  jr.inputbox = document.createElement('textarea');
  jr.outputbox = document.createElement('div');
  jr.parsebutton = createButton('load json', null);
  jr.stringifybutton = createButton('get json', null);

  //Style
  jr.style.width = '800px';
  jr.io.style.width = '640px';
  jr.io.style.float = 'left';
  jr.parsebutton.style.display = 'block';
  jr.parsebutton.style.float = 'left';
  jr.stringifybutton.style.display = 'block';
  jr.stringifybutton.style.float = 'left';
  jr.inputbox.style.width = '320px';
  jr.inputbox.style.margin = '0px';
  jr.inputbox.style.float = 'left';
  jr.outputbox.style.width = '320px';
  jr.outputbox.style.margin = '0px';
  jr.outputbox.style.padding = '0px';
  jr.outputbox.style.float = 'left';
  jr.outputbox.style.overflow = 'scroll';

  //Functionality
  jr.parsebutton.addEventListener('click', 
    function(e) 
    {
      console.log('jsonrenderer parsebutton clicked');
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

  jr.stringifybutton.addEventListener('click', function(e) { console.log('jsonrenderer stringifybutton clicked'); delegate.sendStringifyRequest(jr); }, false);

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
  }

  //Construct
  jr.appendChild(jr.parsebutton);
  jr.appendChild(jr.io);
  jr.io.appendChild(jr.inputbox);
  jr.io.appendChild(jr.outputbox);
  jr.appendChild(jr.stringifybutton);

  return jr;
}

function IsJsonString(str) 
{
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
