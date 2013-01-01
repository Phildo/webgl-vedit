function createLightselector(delegate, model)
{
  console.log('creating lightselector');

  //Constants
  var HEIGHT = 100;

  //Create
  var ls = createObjectselector(delegate);
  ls.titlebox.innerHTML = 'Lights:';
  ls.addlightbutton = createButton('add light', function(e) { console.log('lightselector addlightbuttonclick'); if(typeof delegate.addLightButtonClicked == 'function') delegate.addLightButtonClicked(ls); });
  ls.removelightbutton = createButton('remove light', function(e) { console.log('lightselector removelightbuttonclick'); if(typeof delegate.removeLightButtonClicked == 'function') delegate.removeLightButtonClicked(ls); });
  ls.selectedIndex = -1;

  //Style
  ls.style.height = HEIGHT+'px';
  
  //Functionality
  ls.populateWithData = function(lights,deltas)
  {
    console.log('lightselector populatewithdata');
    if(lights.length <= ls.selectedIndex) ls.clearSelection();//HACK UGH BAD CODE NO BAD BAD BAD

    ls.selectables = [];
    for(var i = 0; i < lights.length; i++)
      ls.selectables[i] = ls.generateSelectableFromLight(lights[i], i);

    ls.table.innerHTML = '';
    for(var i = 0; i < ls.selectables.length; i++)
      ls.table.appendChild(ls.selectables[i]);

    if(ls.selectedIndex != -1)
      ls.selectables[ls.selectedIndex].highlight();
  }
  ls.generateSelectableFromLight = function(light, index)
  {
    var s = createSelectable(ls, light, index);
    s.innerHTML = 'light '+index;
    return s;
  }

  ls.sSelected = function(s, light)
  {
    console.log('lightselector sselected');
    if(s.selected)
    {
      ls.selectedIndex = -1;
      s.unhighlight();
    }
    else
    {
      if(ls.selectedIndex != -1)
        ls.selectables[ls.selectedIndex].unhighlight();
      ls.selectedIndex = s.index;
      s.highlight();
    }
    if(typeof delegate.lightSelected == 'function')
      delegate.lightSelected(ls,ls.selectedIndex,light);
  }

  ls.clearSelection = function()
  {
    ls.selectables[ls.selectedIndex].unhighlight();
    ls.selectedIndex = -1;
  }

  //Construct
  ls.appendChild(ls.addlightbutton);
  ls.appendChild(ls.removelightbutton);

  model.registerCallback('lightsUpdated',ls.populateWithData);

  return ls;
}
