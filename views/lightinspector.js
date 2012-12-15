function createLightinspector(delegate)
{
  console.log('creating lightinspector');
  //Constants
  var HEIGHT = 100;

  //Create
  var li = createPropertyinspector(delegate);
  li.titlebox.innerHTML = "Light:";

  li.positioninspector = createPositioninspector(li);

  //Style
  li.style.height = HEIGHT+'px';

  //Functionality
  li.setLight = function(light)
  {
    console.log('lightinspector setlight');

    li.positioninspector.style.display = 'block';
    li.positioninspector.setPosition(light.position);
  }
  li.clearLight = function()
  {
    console.log('lightinspector clearlight');

    li.positioninspector.style.display = 'none';
    li.positioninspector.clearPosition();
  }
  li.getLight = function()
  {
    console.log('lightinspector getlight');

    var light = {};
    light.position = li.positioninspector.getPosition();
    return light;
  }

  li.positionChanged = function(pi)
  {
    console.log('lightinspector positionchanged');
    if(typeof delegate.lightChanged == 'function')
      delegate.lightChanged(li,li.getLight());
  }
  li.positionFocused = function(pi)
  {
    console.log('lightinspector positionfocused');
    if(typeof delegate.lightFocused == 'function')
      delegate.lightFocused(li);
  }
  li.positionBlurred = function(pi)
  {
    console.log('lightinspector positionblurred');
    if(typeof delegate.lightBlurred == 'function')
      delegate.lightBlurred(li);
  }

  //Construct
  li.appendChild(li.titlebox);
  li.appendChild(li.positioninspector);

  li.clearLight();
  return li;
}
