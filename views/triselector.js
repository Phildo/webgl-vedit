function createTriselector(delegate)
{
  console.log('creating triselector');
  //Constants

  //Create
  var ts = document.createElement('div');
  ts.selectables = [];
  ts.selectedIndex = -1;

  //Style
  ts.style.width = '150px';
  ts.style.height = '320px';
  ts.style.overflow = 'scroll';
  
  //Functionality
  ts.addSelectable = function()
  {
    console.log('triselector addselectable');
    if(ts.selectedIndex != -1)
      ts.selectableSelected(ts.selectables[ts.selectedIndex]);
    var s = createSelectable(ts,'v',ts.selectables.length);
    ts.selectables[ts.selectables.length] = s
    ts.appendChild(s);
    ts.selectableSelected(s);
  }
  ts.removeSelectable = function()
  {
    console.log('triselector removeselectable');
    if(ts.selectables.length == 0) return;
    if(ts.selectedIndex != -1)
      ts.selectableSelected(ts.selectables[ts.selectedIndex]);
    var s = ts.selectables[ts.selectables.length-1];
    ts.selectables.splice(ts.selectables.length-1,1);
    ts.removeChild(ts.children[ts.children.length-1]);
  }

  ts.selectableSelected = function(selectable)
  {
    console.log('triselector selectableselected');
    if(selectable.selected)
    {
      ts.selectedIndex = -1;
      selectable.unhighlight();
    }
    else
    {
      if(ts.selectedIndex != -1)
        ts.selectableSelected(ts.selectables[ts.selectedIndex]);
      ts.selectedIndex = selectable.index;
      selectable.highlight();
    }
    delegate.newSelection(ts);
  }

  return ts;
}
