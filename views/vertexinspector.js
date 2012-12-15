function createVertexinspector(delegate)
{
  console.log('creating vertexinspector');
  //Constants
  var HEIGHT = 100;

  //Create
  var vi = createPropertyinspector(delegate);
  vi.titlebox.innerHTML = "Vertex:";

  vi.positioninspector = createPositioninspector(vi);
  vi.colorinspector = createColorinspector(vi);
  vi.normalinspector = createNormalinspector(vi);

  //Style
  vi.style.height = HEIGHT+'px';

  //Functionality
  vi.setVertex = function(vertex)
  {
    console.log('vertexinspector setvertex');

    vi.positioninspector.setPosition(vertex.position);
    vi.colorinspector.setColor(vertex.color);
    vi.normalinspector.setNormal(vertex.normal);
  }
  vi.clearVertex = function()
  {
    console.log('vertexinspector clearvertex');

    vi.positioninspector.clearPosition();
    vi.colorinspector.clearColor();
    vi.normalinspector.clearNormal();
  }
  vi.getVertex = function()
  {
    console.log('vertexinspector getvertex');

    var vertex = {};
    vertex.position = vi.positioninspector.getPosition();
    vertex.color = vi.colorinspector.getColor();
    vertex.normal = vi.normalinspector.getNormal();
    return vertex;
  }

  vi.positionChanged = function(pi)
  {
    console.log('vertexinspector positionchanged');
    if(typeof delegate.vertexChanged == 'function')
      delegate.vertexChanged(vi,vi.getVertex());
  }
  vi.positionFocused = function(pi)
  {
    console.log('vertexinspector positionfocused');
    if(typeof delegate.vertexFocused == 'function')
      delegate.vertexFocused(vi);
  }
  vi.positionBlurred = function(pi)
  {
    console.log('vertexinspector positionblurred');
    if(typeof delegate.vertexBlurred == 'function')
      delegate.vertexBlurred(vi);
  }
  vi.colorChanged = function(ci)
  {
    console.log('vertexinspector colorchanged');
    if(typeof delegate.vertexChanged == 'function')
      delegate.vertexChanged(vi,vi.getVertex());
  }
  vi.colorFocused = function(ci)
  {
    console.log('vertexinspector colorfocused');
    if(typeof delegate.vertexFocused == 'function')
      delegate.vertexFocused(vi);
  }
  vi.colorBlurred = function(ci)
  {
    console.log('vertexinspector colorblurred');
    if(typeof delegate.vertexBlurred == 'function')
      delegate.vertexBlurred(vi);
  }
  vi.normalChanged = function(ni)
  {
    console.log('vertexinspector normalchanged');
    if(typeof delegate.vertexChanged == 'function')
      delegate.vertexChanged(vi,vi.getVertex());
  }
  vi.normalFocused = function(ni)
  {
    console.log('vertexinspector normalfocused');
    if(typeof delegate.vertexFocused == 'function')
      delegate.vertexFocused(vi);
  }
  vi.normalBlurred = function(ni)
  {
    console.log('vertexinspector normalblurred');
    if(typeof delegate.vertexBlurred == 'function')
      delegate.vertexBlurred(vi);
  }

  //Construct
  vi.appendChild(vi.titlebox);
  vi.appendChild(vi.positioninspector);
  vi.appendChild(vi.colorinspector);
  vi.appendChild(vi.normalinspector);

  return vi;
}
