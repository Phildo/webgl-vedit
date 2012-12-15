function createJsonrenderer(delegate)
{
  console.log('creating jsonrenderer');
  //Constants
  var WIDTH = 640;
  var HEIGHT = 320;

  //Create
  var jr = createPane(delegate);
  jr.titlebox.innerHTML = 'JSON Renderer:';
  jr.io = document.createElement('div');
  jr.inputbox = document.createElement('textarea');
  jr.outputbox = document.createElement('div');
  jr.loadjsonbutton = createButton('load json', function(e) { console.log('jsonrenderer loadjsonbutonclick'); if(typeof delegate.loadJsonButtonClicked == 'function') delegate.loadJsonButtonClicked(jr); });
  jr.outputjsonbutton = createButton('output json', function(e) { console.log('jsonrenderer outputjsonbutonclick'); if(typeof delegate.outputJsonButtonClicked == 'function') delegate.outputJsonButtonClicked(jr); });

  //Style
  jr.style.width = WIDTH+'px';
  jr.style.height = HEIGHT+'px';
  jr.io.style.width = WIDTH+'px';
  jr.io.style.height = HEIGHT+'px';
  jr.inputbox.style.width = (WIDTH/2)+'px';
  jr.inputbox.style.height = HEIGHT+'px';
  jr.inputbox.style.margin = '0px';
  jr.inputbox.style.float = 'left';
  jr.outputbox.style.width = (WIDTH/2)+'px';
  jr.outputbox.style.height = HEIGHT+'px';
  jr.outputbox.style.margin = '0px';
  jr.outputbox.style.padding = '0px';
  jr.outputbox.style.float = 'left';

  //Construct
  jr.appendChild(jr.loadjsonbutton);
  jr.appendChild(jr.outputjsonbutton);
  jr.appendChild(jr.io);
  jr.io.appendChild(jr.inputbox);
  jr.io.appendChild(jr.outputbox);

  return jr;
}
