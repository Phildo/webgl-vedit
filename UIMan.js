function UIMan(delegate, model)
{
  console.log('creating uiman');

  //Create
  var self = this;
  self.currentEditor = "triangle";

  self.drawingarea = createDrawingarea(self, model);
  self.triangleinspector = createTriangleinspector(self);
  self.lightinspector = createLightinspector(self);
  self.triangleselector = createTriangleselector(self, model);
  self.lightselector = createLightselector(self, model);
  self.jsonrenderer = createJsonrenderer(self, model);

  //Style
  self.veditor = document.getElementById('veditor'); //The whole page/app
  self.veditor.style.width = '1040px';
  self.veditor.style.margin = '0px auto';

  //Main sections of editor
  self.leftpane = document.createElement('div');
  self.leftpane.style.width = '200px';
  self.leftpane.style.height = '640px';
  self.leftpane.style.margin = '0px';
  self.leftpane.style.padding = '0px';
  self.leftpane.style.float = 'left';
  self.centerpane = document.createElement('div');
  self.centerpane.style.width = '640px';
  self.centerpane.style.height = '640px';
  self.centerpane.style.margin = '0px';
  self.centerpane.style.padding = '0px';
  self.centerpane.style.float = 'left';
  self.rightpane = document.createElement('div');
  self.rightpane.style.width = '200px';
  self.rightpane.style.height = '640px';
  self.rightpane.style.margin = '0px';
  self.rightpane.style.padding = '0px';
  self.rightpane.style.float = 'left';

  self.editTrianglesButton = createButton('edit triangles',function(e) { console.log('uiman edittrianglesbutton clicked'); self.setEditor("triangle"); });
  self.editLightsButton = createButton('edit lights',function(e) { console.log('uiman editlightsbutton clicked'); self.setEditor("light"); });

  //Functionality
  self.setEditor = function(editor)
  {
    console.log('uiman seteditor');
    switch(editor)
    {
      case "triangle":
        self.lightinspector.style.display = "none";
        self.lightselector.style.display = "none";
        self.triangleinspector.style.display = "block";
        self.triangleselector.style.display = "block";
        break;
      case "light":
        self.triangleinspector.style.display = "none";
        self.triangleselector.style.display = "none";
        self.lightinspector.style.display = "block";
        self.lightselector.style.display = "block";
    }
  }

  self.addTriangleButtonClicked = function(ts)
  {
    console.log('uiman addtrianglebuttonclicked');

    if(typeof delegate.addTriangle == 'function')
      delegate.addTriangle();
  }
  self.removeTriangleButtonClicked = function(ts)
  {
    console.log('uiman removetrianglebuttonclicked');

    var index = self.triangleselector.selectedIndex;
    if(index == -1) return;
    self.triangleselector.clearSelection();
    self.triangleinspector.clearTriangle();
    if(typeof delegate.removeTriangle == 'function')
      delegate.removeTriangle(index);
  }
  self.addLightButtonClicked = function(ls)
  {
    console.log('uiman addlightbuttonclicked');

    if(typeof delegate.addLight == 'function')
      delegate.addLight();
  }
  self.removeLightButtonClicked = function(ts)
  {
    console.log('uiman removelightbuttonclicked');

    var index = self.lightselector.selectedIndex;
    if(index == -1) return;
    self.lightselector.clearSelection();
    self.lightinspector.clearLight();
    if(typeof delegate.removeLight == 'function')
      delegate.removeLight(index);
  }
  self.loadJsonButtonClicked = function(jr, triangles, lights)
  {
    console.log('uiman loadjsonbuttonclicked');
    if(typeof delegate.loadJson == 'function')
      delegate.loadJson(triangles, lights);
  }
  self.outputJsonButtonClicked = function(jr)
  {
    console.log('uiman outputjsonbuttonclicked');
    if(typeof delegate.outputJson == 'function')
      delegate.outputJson();
  }
  self.triangleChanged = function(ti, triangle)
  {
    console.log('uiman trianglechanged');
    
    if(typeof delegate.triangleChanged == 'function')
      delegate.triangleChanged(triangle,self.triangleselector.selectedIndex);
  }
  self.lightChanged = function(li, light)
  {
    console.log('uiman lightchanged');
    
    if(typeof delegate.lightChanged == 'function')
      delegate.lightChanged(light,self.lightselector.selectedIndex);
  }
  self.triangleSelected = function(ts, index, triangle)
  {
    console.log('uiman triangleselected');
    if(index == -1)
      self.triangleinspector.clearTriangle();
    else
      self.triangleinspector.setTriangle(triangle);
  }
  self.lightSelected = function(ls, index, light)
  {
    console.log('uiman lightselected');
    if(index == -1)
      self.lightinspector.clearLight();
    else
      self.lightinspector.setLight(light);
  }

  //Construct
  self.veditor.appendChild(self.leftpane);
  self.veditor.appendChild(self.centerpane);
  self.veditor.appendChild(self.rightpane);

  self.leftpane.appendChild(self.editTrianglesButton);
  self.leftpane.appendChild(self.editLightsButton);
  self.leftpane.appendChild(self.triangleinspector);
  self.leftpane.appendChild(self.lightinspector);

  self.rightpane.appendChild(self.triangleselector);
  self.rightpane.appendChild(self.lightselector);

  self.centerpane.appendChild(self.drawingarea);
  self.centerpane.appendChild(self.jsonrenderer);

  self.setEditor("triangle");
}

function createButton(text, func)
{
  console.log('uiman createbutton');
  var b = document.createElement('input');
  b.setAttribute('type','button');
  b.setAttribute('value',text);
  b.addEventListener('click',func);
  return b;
}
