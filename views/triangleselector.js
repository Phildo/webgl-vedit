function createTriangleselector(delegate, model)
{
  console.log('creating triangleselector');

  //Constants
  var HEIGHT = 100;

  //Create
  var ts = createObjectselector(delegate);
  ts.titlebox.innerHTML = 'Triangles:';
  ts.addtrianglebutton = createButton('add triangle', function(e) { console.log('triangleselector addtrianglebuttonclick'); if(typeof delegate.addTriangleButtonClicked == 'function') delegate.addTriangleButtonClicked(ts); });
  ts.removetrianglebutton = createButton('remove triangle', function(e) { console.log('triangleselector removetrianglebuttonclick'); if(typeof delegate.removeTriangleButtonClicked == 'function') delegate.removeTriangleButtonClicked(ts); });
  ts.selectedIndex = -1;

  //Style
  ts.style.height = HEIGHT+'px';
  
  //Functionality
  ts.populateWithData = function(triangles,deltas)
  {
    console.log('triangleselector populatewithdata');
    ts.selectables = [];
    for(var i = 0; i < triangles.length; i++)
      ts.selectables[i] = ts.generateSelectableFromTriangle(triangles[i], i);

    ts.table.innerHTML = '';
    for(var i = 0; i < ts.selectables.length; i++)
      ts.table.appendChild(ts.selectables[i]);

    if(ts.selectedIndex != -1)
      ts.selectables[ts.selectedIndex].highlight();
  }
  ts.generateSelectableFromTriangle = function(triangle, index)
  {
    var s = createSelectable(ts, triangle, index);
    s.innerHTML = 'triangle '+index;
    return s;
  }

  ts.sSelected = function(s, triangle)
  {
    console.log('triangleselector sselected');
    if(s.selected)
    {
      ts.selectedIndex = -1;
      s.unhighlight();
    }
    else
    {
      if(ts.selectedIndex != -1)
        ts.selectables[ts.selectedIndex].unhighlight();
      ts.selectedIndex = s.index;
      s.highlight();
    }
    if(typeof delegate.triangleSelected == 'function')
      delegate.triangleSelected(ts,ts.selectedIndex,triangle);
  }

  ts.clearSelection = function()
  {
    ts.selectables[ts.selectedIndex].unhighlight();
    ts.selectedIndex = -1;
  }

  //Construct
  ts.appendChild(ts.addtrianglebutton);
  ts.appendChild(ts.removetrianglebutton);

  model.registerCallback('trianglesUpdated',ts.populateWithData);

  return ts;
}
