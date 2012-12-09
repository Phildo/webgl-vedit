function createFloatbox(delegate)
{
  console.log('creating floatbox');
  //Constants
  var DEFAULT_AMOUNT = 0.0;
  var INC_AMOUNT = 0.1;
  var DEC_AMOUNT = 0.1;

  //Create
  var fb = document.createElement('div');
  fb.dec = document.createElement('div');
  fb.dec.innerHTML = '<';
  fb.inc = document.createElement('div');
  fb.box = document.createElement('input');
  fb.box.setAttribute('type','text');
  fb.inc.innerHTML = '>';

  //Style
  fb.style.width = '50px';
  fb.box.style.display = 'block';
  fb.dec.style.width = '10px';
  fb.inc.style.width = '10px';
  fb.box.style.width = '30px';
  fb.dec.style.margin = '0px';
  fb.inc.style.margin = '0px';
  fb.box.style.margin = '0px';
  fb.dec.style.padding = '0px';
  fb.inc.style.padding = '0px';
  fb.dec.style.float = 'left';
  fb.inc.style.float = 'left';
  fb.box.style.float = 'left';

  //Functionality
  fb.box.value = DEFAULT_AMOUNT;
  fb.inc.addEventListener('click', function(e) { if(!isNaN(parseFloat(fb.box.value))) fb.box.value = parseFloat(fb.box.value)+INC_AMOUNT; }, false);
  fb.dec.addEventListener('click', function(e) { if(!isNaN(parseFloat(fb.box.value))) fb.box.value = parseFloat(fb.box.value)-DEC_AMOUNT; }, false);
  fb.box.addEventListener('blur', function(e) { delegate.fbBlurred(fb); }, false);

  //Construct
  fb.appendChild(fb.dec);
  fb.appendChild(fb.box);
  fb.appendChild(fb.inc);

  return fb;
}
