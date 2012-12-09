function createTrieditor(delegate)
{
  console.log('creating trieditor');
  //Constants

  //Create
  var te = document.createElement('div');
  te.vertEditor = document.createElement('div');
  te.colorEditor = document.createElement('div');
  te.normalEditor = document.createElement('div');

  te.vertEditor.titlebox = document.createElement('div');
  te.vertEditor.titlebox.innerHTML = "Verts:";
  te.vertEditor.inputs = [];
  for(var i = 0; i < 9; i++)
    te.vertEditor.inputs[te.vertEditor.inputs.length] = createFloatbox(te);
  te.colorEditor.titlebox = document.createElement('div');
  te.colorEditor.titlebox.innerHTML = "<br />Colors:";
  te.colorEditor.inputs = [];
  for(var i = 0; i < 9; i++)
    te.colorEditor.inputs[te.colorEditor.inputs.length] = createFloatbox(te);
  te.normalEditor.titlebox = document.createElement('div');
  te.normalEditor.titlebox.innerHTML = "<br />Normals:";
  te.normalEditor.inputs = [];
  for(var i = 0; i < 9; i++)
    te.normalEditor.inputs[te.normalEditor.inputs.length] = createFloatbox(te);

  //Style
  te.style.width = '150px';
  for(var i = 0; i < 9; i++)
    if(i%3 == 0) te.vertEditor.inputs[i].style.float = 'clear';
    else te.vertEditor.inputs[i].style.float = 'left';
  for(var i = 0; i < 9; i++)
    if(i%3 == 0) te.colorEditor.inputs[i].style.float = 'clear';
    else te.colorEditor.inputs[i].style.float = 'left';
  for(var i = 0; i < 9; i++)
    if(i%3 == 0) te.normalEditor.inputs[i].style.float = 'clear';
    else te.normalEditor.inputs[i].style.float = 'left';

  //Functionality
  te.currentTri = null;
  te.setTri = function(tri)
  {
    console.log('trieditor settri');
    te.currentTri = tri;
    for(var i = 0; i < 9; i++)
      te.vertEditor.inputs[i].box.value = te.currentTri.verts[i];
    for(var i = 0; i < 9; i++)
      te.colorEditor.inputs[i].box.value = te.currentTri.colors[i];
    for(var i = 0; i < 9; i++)
      te.normalEditor.inputs[i].box.value = te.currentTri.normals[i];
  }
  te.clearTri = function()
  {
    console.log('trieditor cleartri');
    if(!te.currentTri) return;
    for(var i = 0; i < 9; i++)
      te.vertEditor.inputs[i].box.value = '';
    for(var i = 0; i < 9; i++)
      te.colorEditor.inputs[i].box.value = '';
    for(var i = 0; i < 9; i++)
      te.normalEditor.inputs[i].box.value = '';
    te.currentTri = null;
  }
  te.saveTri = function()
  {
    console.log('trieditor savetri');
    if(!te.currentTri) return;
    for(var i = 0; i < 9; i++)
      te.currentTri.verts[i] = te.vertEditor.inputs[i].box.value;
    for(var i = 0; i < 9; i++)
      te.currentTri.colors[i] = te.colorEditor.inputs[i].box.value;
    for(var i = 0; i < 9; i++)
      te.currentTri.normals[i] = te.normalEditor.inputs[i].box.value;
  }
  te.fbBlurred = function(fb)
  {
    console.log('trieditor fbblurred');
    delegate.triContentChanged(te);
  }

  //Construct
  te.appendChild(te.vertEditor);
  te.appendChild(te.colorEditor);
  te.appendChild(te.normalEditor);

  te.vertEditor.appendChild(te.vertEditor.titlebox);
  for(var i = 0; i < 9; i++)
    te.vertEditor.appendChild(te.vertEditor.inputs[i]);
  te.colorEditor.appendChild(te.colorEditor.titlebox);
  for(var i = 0; i < 9; i++)
    te.colorEditor.appendChild(te.colorEditor.inputs[i]);
  te.normalEditor.appendChild(te.normalEditor.titlebox);
  for(var i = 0; i < 9; i++)
    te.normalEditor.appendChild(te.normalEditor.inputs[i]);

  return te;
}
