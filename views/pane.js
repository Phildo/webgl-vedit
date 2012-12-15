function createPane(delegate)
{
  console.log('creating pane');

  //Constants
  var WIDTH = 200;
  var HEIGHT = 20;
  
  //Create
  var p = document.createElement('div');
  p.titlebox = document.createElement('div');
  p.titlebox.innerHTML = "Pane:";
  p.titlebox.style.float = 'left';

  //Style
  p.style.width = WIDTH+'px';
  p.style.height = HEIGHT+'px';
  p.style.margin = '0px';
  p.style.padding = '0px';
  p.titlebox.style.width = WIDTH+'px';
  p.titlebox.style.height = 20+'px';
  p.titlebox.style.margin = '0px';
  p.titlebox.style.padding = '0px';

  //Construct
  p.appendChild(p.titlebox);

  return p;
}
