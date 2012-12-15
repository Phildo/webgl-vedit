function createObjectselector(delegate)
{
  console.log('creating objectselector');

  //Constants
  var WIDTH = 200;
  var HEIGHT = 340;
  
  //Create
  var os = createPane();
  os.titlebox.innerHTML = "Objects:";
  os.table = document.createElement('div');
  os.selectables = [];
  os.selectedIndex = -1;

  //Style
  os.style.width = WIDTH+'px';
  os.style.height = HEIGHT+'px';
  os.table.style.width = WIDTH+'px';
  os.table.style.height = HEIGHT-20+'px';
  os.table.style.margin = '0px';
  os.table.style.padding = '0px';
  os.table.style.overflow = 'scroll';

  //Construct
  os.appendChild(os.titlebox);
  os.appendChild(os.table);

  return os;
}
