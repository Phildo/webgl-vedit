function UIMan()
{
  console.log('creating uiman');

  var self = this;
  self.veditor = document.getElementById('veditor');

  //Main sections of editor
  self.propertiesArea = document.createElement('div');
  self.propertiesArea.style.float = 'left';
  self.renderArea = document.createElement('div');
  self.renderArea.style.float = 'left';
  self.contentArea = document.createElement('div');
  self.contentArea.style.float = 'left';
  self.fileArea = document.createElement('div');

  self.editTrisButton = createButton('edit tris',function(e) { console.log('uiman edittrisbutton clicked'); self.setEditor("tri"); });
  self.editLightsButton = createButton('edit lights',function(e) { console.log('uiman editlightsbutton clicked'); self.setEditor("light"); });
  self.addTriButton = createButton('add tri',function(e) { console.log('uiman addtributton clicked'); cm.addTri(); });
  self.saveTriButton = createButton('save tri',function(e) { console.log('uiman savetributton clicked'); cm.saveTri(); });
  self.removeTriButton = createButton('remove tri',function(e) { console.log('uiman removetributton clicked'); cm.removeTri(); });
  self.addLightButton = createButton('add light',function(e) { console.log('uiman addlightbutton clicked'); cm.addLight(); });
  self.saveLightButton = createButton('save light',function(e) { console.log('uiman savelightbutton clicked'); cm.saveLight(); });
  self.removeLightButton = createButton('remove light',function(e) { console.log('uiman removelightbutton clicked'); cm.removeLight(); });

  self.initPage = function(canvas)
  {
    console.log('uiman initpage');
    self.canvas = canvas;
    self.triEditor = createTrieditor(self);
    self.triEditor.appendChild(self.addTriButton);
    self.triEditor.appendChild(self.saveTriButton);
    self.triEditor.appendChild(self.removeTriButton);
    self.lightEditor = createLighteditor(self);
    self.lightEditor.appendChild(self.addLightButton);
    self.lightEditor.appendChild(self.saveLightButton);
    self.lightEditor.appendChild(self.removeLightButton);
    self.triSelector = createTriselector(self);
    self.lightSelector = createLightselector(self);
    self.jsonRenderer = createJSONrenderer(self);

    self.renderArea.appendChild(self.canvas);
    self.renderArea.appendChild(new Image('assets/shadow.png'));

    self.propertiesArea.appendChild(self.editTrisButton);
    self.propertiesArea.appendChild(self.editLightsButton);
    self.propertiesArea.appendChild(self.triEditor);
    self.propertiesArea.appendChild(self.lightEditor);

    self.contentArea.appendChild(self.triSelector);
    self.contentArea.appendChild(self.lightSelector);

    self.fileArea.appendChild(self.jsonRenderer);

    self.setEditor("tri");

    self.veditor.appendChild(self.propertiesArea);
    self.veditor.appendChild(self.renderArea);
    self.veditor.appendChild(self.contentArea);
    self.veditor.appendChild(self.fileArea);
  }

  self.setEditor = function(editor)
  {
    console.log('uiman seteditor');
    switch(editor)
    {
      case "tri":
        self.lightEditor.style.display = 'none';
        self.lightSelector.style.display = 'none';
        self.triEditor.style.display = 'block';
        self.triSelector.style.display = 'block';
        break;
      case "light":
        self.triEditor.style.display = 'none';
        self.triSelector.style.display = 'none';
        self.lightEditor.style.display = 'block';
        self.lightSelector.style.display = 'block';
        break;
    }
  }

  self.triContentChanged = function(triEditor)
  {
    console.log('uiman tricontentchanged');
    cm.saveTri();
  }

  self.lightContentChanged = function(lightEditor)
  {
    console.log('uiman lightcontentchanged');
    cm.saveLight();
  }

  self.newSelection = function(selector)
  {
    console.log('uiman newselection');
    switch(selector)
    {
      case self.triSelector:
        if(selector.selectedIndex != -1)
          self.triEditor.setTri(dmm.tris[selector.selectedIndex]);
        else
          self.triEditor.clearTri();
        break;
      case self.lightSelector:
        if(selector.selectedIndex != -1)
          self.lightEditor.setLight(dmm.lights[selector.selectedIndex]);
        else
          self.lightEditor.clearLight();
        break;
    }
  }

  self.sendStringifyRequest = function(renderer)
  {
    renderer.stringify(dmm.tris,dmm.lights);
  }

  self.setNewDataList = function(tris)
  {
    cm.setNewDataList(tris);
  }

  self.addTri = function()
  {
    console.log('uiman addtri');
    self.triSelector.addSelectable();
  }
  self.saveTri = function()
  {
    console.log('uiman savetri');
    self.triEditor.saveTri();
  }
  self.removeTri = function()
  {
    console.log('uiman removetri');
    self.triSelector.removeSelectable();
  }

  self.addLight = function()
  {
    console.log('uiman addlight');
    self.lightSelector.addSelectable();
  }
  self.saveLight = function()
  {
    console.log('uiman savelight');
    self.lightEditor.saveLight();
  }
  self.removeLight = function()
  {
    console.log('uiman removelight');
    self.lightSelector.removeSelectable();
  }
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
