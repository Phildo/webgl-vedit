function createSelectable(delegate, content, index)
{
  console.log('creating selectable');
  var s = document.createElement('div');
  s.innerHTML = content;
  s.style.width = '20px';
  s.style.height = '20px';
  s.style.backgroundColor = 'white';
  s.selected = false;
  s.index = index;

  s.addEventListener('click',function(e){ console.log('selectable clicked'); delegate.selectableSelected(s) });

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
