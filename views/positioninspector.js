function createPositioninspector(delegate)
{
  console.log('creating positioninspector');

  //Create
  var pi = createPropertyinspector(delegate);
  pi.titlebox.innerHTML = "Position:";

  pi.inputs = [];
  for(var i = 0; i < 3; i++)
    pi.inputs[i] = createFloatbox(pi);

  //Style
  for(var i = 0; i < 3; i++)
    pi.inputs[i].style.float = 'left';

  //Functionality
  pi.setPosition = function(position)
  {
    console.log('positioninspector setposition');

    for(var i = 0; i < 3; i++)
      pi.inputs[i].box.value = position[i];
  }
  pi.clearPosition = function()
  {
    console.log('positioninspector clearposition');

    for(var i = 0; i < 3; i++)
      pi.inputs[i].box.value = '';
  }
  pi.getPosition = function()
  {
    console.log('positioninspector getposition');

    position = [];
    for(var i = 0; i < 3; i++)
      position[i] = parseFloat(pi.inputs[i].box.value);
    return position;
  }

  pi.fbChanged = function(fb)
  {
    console.log('positioninspector fbchanged');
    if(typeof delegate.positionChanged == 'function')
      delegate.positionChanged(pi,pi.getPosition());
  }
  pi.fbFocused = function(fb)
  {
    console.log('positioninspector fbfocused');
    if(typeof delegate.positionFocused == 'function')
      delegate.positionFocused(pi);
  }
  pi.fbBlurred = function(fb)
  {
    console.log('positioninspector fbblurred');
    if(typeof delegate.positionBlurred == 'function')
      delegate.positionBlurred(pi);
  }

  //Construct
  pi.appendChild(pi.titlebox);
  for(var i = 0; i < 3; i++)
    pi.appendChild(pi.inputs[i]);

  return pi;
}
