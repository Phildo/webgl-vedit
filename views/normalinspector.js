function createNormalinspector(delegate)
{
  console.log('creating normalinspector');

  //Create
  var ni = createPropertyinspector(delegate);
  ni.titlebox.innerHTML = "Normal:";

  ni.inputs = [];
  for(var i = 0; i < 3; i++)
    ni.inputs[i] = createFloatbox(ni);

  //Style
  for(var i = 0; i < 3; i++)
    ni.inputs[i].style.float = 'left';

  //Functionality
  ni.setNormal = function(normal)
  {
    console.log('normalinspector setnormal');

    for(var i = 0; i < 3; i++)
      ni.inputs[i].box.value = normal[i];
  }
  ni.clearNormal = function()
  {
    console.log('normalinspector clearnormal');

    for(var i = 0; i < 3; i++)
      ni.inputs[i].box.value = '';
  }
  ni.getNormal = function()
  {
    console.log('normalinspector getnormal');

    normal = [];
    for(var i = 0; i < 3; i++)
      normal[i] = parseFloat(ni.inputs[i].box.value);
    return normal;
  }

  ni.fbChanged = function(fb)
  {
    console.log('normalinspector fbchanged');
    if(typeof delegate.normalChanged == 'function')
      delegate.normalChanged(ni,ni.getNormal());
  }
  ni.fbFocused = function(fb)
  {
    console.log('normalinspector fbfocused');
    if(typeof delegate.normalFocused == 'function')
      delegate.normalFocused(ni);
  }
  ni.fbBlurred = function(fb)
  {
    console.log('normalinspector fbblurred');
    if(typeof delegate.normalBlurred == 'function')
      delegate.normalBlurred(ni);
  }

  //Construct
  ni.appendChild(ni.titlebox);
  for(var i = 0; i < 3; i++)
    ni.appendChild(ni.inputs[i]);

  return ni;
}
