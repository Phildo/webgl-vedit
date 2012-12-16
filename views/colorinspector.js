function createColorinspector(delegate)
{
  console.log('creating colorinspector');

  //Create
  var ci = createPropertyinspector(delegate);
  ci.titlebox.innerHTML = "Color:";

  ci.inputs = [];
  for(var i = 0; i < 3; i++)
    ci.inputs[i] = createFloatbox(ci);

  //Style
  for(var i = 0; i < 3; i++)
    ci.inputs[i].style.float = 'left';

  //Functionality
  ci.setColor = function(color)
  {
    console.log('colorinspector setcolor');

    for(var i = 0; i < 3; i++)
      ci.inputs[i].box.value = color[i];
  }
  ci.clearColor = function()
  {
    console.log('colorinspector clearcolor');

    for(var i = 0; i < 3; i++)
      ci.inputs[i].box.value = '';
  }
  ci.getColor = function()
  {
    console.log('colorinspector getcolor');

    color = [];
    for(var i = 0; i < 3; i++)
      color[i] = parseFloat(ci.inputs[i].box.value);
    return color;
  }

  ci.fbChanged = function(fb)
  {
    console.log('colorinspector fbchanged');
    if(typeof delegate.colorChanged == 'function')
      delegate.colorChanged(ci,ci.getColor());
  }
  ci.fbFocused = function(fb)
  {
    console.log('colorinspector fbfocused');
    if(typeof delegate.colorFocused == 'function')
      delegate.colorFocused(ci);
  }
  ci.fbBlurred = function(fb)
  {
    console.log('colorinspector fbblurred');
    if(typeof delegate.colorBlurred == 'function')
      delegate.colorBlurred(ci);
  }

  //Construct
  ci.appendChild(ci.titlebox);
  for(var i = 0; i < 3; i++)
    ci.appendChild(ci.inputs[i]);

  return ci;
}
