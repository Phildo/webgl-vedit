function createSelectable(delegate, data, index)
{
  console.log('creating selectable');

  //Constants
  var WIDTH = 50;
  var HEIGHT = 20;

  //Create
  var s = document.createElement('div');
  s.highlightcolor = 'yellow';
  s.unhighlightcolor = 'white';
  s.selected = false;
  s.data = data;
  s.index = index;

  //Style
  s.style.width = WIDTH+'px';
  s.style.height = HEIGHT+'px';
  s.style.margin = '0px';
  s.style.padding = '0px';
  s.style.backgroundcolor = s.unhighlightedcolor;

  //Functionality
  s.addEventListener('click',function(e){ console.log('selectable clicked'); if(typeof delegate.sSelected == 'function') delegate.sSelected(s,s.data); });

  s.highlight = function()
  {
    console.log('selectable highlight');
    s.selected = true;
    s.style.backgroundColor = 'yellow';
  }

  s.unhighlight = function()
  {
    console.log('selectable unhighlight');
    s.selected = false;
    s.style.backgroundColor = 'white';
  }

  return s;
}
