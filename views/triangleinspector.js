function createTriangleinspector(delegate)
{
  console.log('creating triangleinspector');
  //Constants
  var HEIGHT = 320;

  //Create
  var ti = createPropertyinspector(delegate);
  ti.titlebox.innerHTML = "Triangle:";
  ti.vertexes = [];
  for(var i = 0; i < 3; i++)
    ti.vertexes[i] = createVertexinspector(ti);

  //Style
  ti.style.height = HEIGHT+'px';
  
  ti.setTriangle = function(triangle)
  {
    console.log('triangleinspector settriangle');

    for(var i = 0; i < 3; i++)
    {
      ti.vertexes[i].style.display = 'block';
      ti.vertexes[i].setVertex(triangle.vertexes[i]);
    }
  }
  ti.clearTriangle = function()
  {
    console.log('triangleinspector cleartriangle');

    for(var i = 0; i < 3; i++)
    {
      ti.vertexes[i].style.display = 'none';
      ti.vertexes[i].clearVertex();
    }
  }
  ti.getTriangle = function()
  {
    console.log('triangleinspector gettriangle');

    var triangle = {};
    triangle.vertexes = [];
    for(var i = 0; i < 3; i++)
      triangle.vertexes[i] = ti.vertexes[i].getVertex();
    return triangle;
  }

  ti.vertexChanged = function(vi,vertex)
  {
    console.log('triangleinspector vertexchanged');
    if(typeof delegate.triangleChanged == 'function')
      delegate.triangleChanged(ti,ti.getTriangle());
  }
  ti.vertexFocused = function(vi,vertex)
  {
    console.log('triangleinspector vertexfocused');
    if(typeof delegate.triangleFocused == 'function')
      delegate.triangleFocused(ti);
  }
  ti.vertexBlurred = function(vi,vertex)
  {
    console.log('triangleinspector vertexblurred');
    ti.vertexChanged(vi,vertex);
    if(typeof delegate.triangleBlurred == 'function')
      delegate.triangleBlurred(ti);
  }

  //Construct
  for(var i = 0; i < ti.vertexes.length; i++)
    ti.appendChild(ti.vertexes[i]);

  ti.clearTriangle();
  return ti;
}
