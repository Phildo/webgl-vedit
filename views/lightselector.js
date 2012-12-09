function createLightselector(delegate)
{
  console.log('creating lightselector');
  //Constants

  //Create
  var ls = document.createElement('div');
  ls.selectables = [];
  ls.selectedIndex = -1;

  //Style
  ls.style.width = '150px';
  
  //Functionality
  ls.addSelectable = function()
  {
    console.log('lightselector addselectable');
    if(ls.selectedIndex != -1)
      ls.selectableSelected(ls.selectables[ls.selectedIndex]);
    var s = createSelectable(ls,'o',ls.selectables.length);
    ls.selectables[ls.selectables.length] = s
    ls.appendChild(s);
    ls.selectableSelected(s);
  }
  ls.removeSelectable = function()
  {
    console.log('lightselector removeselectable');
    if(ls.selectables.length == 0) return;
    if(ls.selectedIndex != -1)
      ls.selectableSelected(ls.selectables[ls.selectedIndex]);
    var s = ls.selectables[ls.selectables.length-1];
    ls.selectables.splice(ls.selectables.length-1,1);
    ls.removeChild(ls.children[ls.children.length-1]);
  }

  ls.selectableSelected = function(selectable)
  {
    console.log('lightselector selectableselected');
    if(selectable.selected)
    {
      ls.selectedIndex = -1;
      selectable.unhighlight();
    }
    else
    {
      if(ls.selectedIndex != -1)
        ls.selectableSelected(ls.selectables[ls.selectedIndex]);
      ls.selectedIndex = selectable.index;
      selectable.highlight();
    }
    delegate.newSelection(ls);
  }

  return ls;
}
