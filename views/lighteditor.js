function createLighteditor(delegate)
{
  console.log('creating lighteditor');
  //Constants

  //Create
  var le = document.createElement('div');
  le.posEditor = document.createElement('div');

  le.posEditor.titlebox = document.createElement('div');
  le.posEditor.titlebox.innerHTML = "Position:";
  le.posEditor.inputs = [];
  for(var i = 0; i < 3; i++)
    le.posEditor.inputs[le.posEditor.inputs.length] = createFloatbox(le);

  //Style
  le.style.width = '150px';
  for(var i = 0; i < 3; i++)
    if(i%3 == 0) le.posEditor.inputs[i].style.float = 'clear';
    else le.posEditor.inputs[i].style.float = 'left';

  //Functionality
  le.currentLight = null;
  le.setLight = function(light)
  {
    console.log('lighteditor setlight');
    le.currentLight = light;
    for(var i = 0; i < 3; i++)
      le.posEditor.inputs[i].box.value = le.currentLight.position[i];
  }
  le.clearLight = function()
  {
    console.log('lighteditor clearlight');
    if(!le.currentLight) return;
    for(var i = 0; i < 3; i++)
      le.posEditor.inputs[i].box.value = '';
    le.currentLight = null;
  }
  le.saveLight = function()
  {
    console.log('lighteditor savelight');
    if(!le.currentLight) return;
    for(var i = 0; i < 3; i++)
      le.currentLight.position[i] = parseFloat(le.posEditor.inputs[i].box.value);
  }
  le.fbBlurred = function(fb)
  {
    console.log('lighteditor fbblurred');
    delegate.lightContentChanged(le);
  }

  //Construct
  le.appendChild(le.posEditor);

  le.posEditor.appendChild(le.posEditor.titlebox);
  for(var i = 0; i < 3; i++)
    le.posEditor.appendChild(le.posEditor.inputs[i]);

  return le;
}
