var InputMan = function()
{
  var self = this;

  this.up = false;
  this.down = false;
  this.left = false;
  this.right = false;
  this.w = false;
  this.a = false;
  this.s = false;
  this.d = false;
  this.space = false;
  this.shift = false;

  document.addEventListener('keydown', 
    function(e) 
    { 
      switch(e.keyIdentifier)
      {
        case 'Up':
          self.up = true;
          break;
        case 'Down':
          self.down = true;
          break;
        case 'Left':
          self.left = true;
          break;
        case 'Right':
          self.right = true;
          break;
        case 'U+0020'://Space
          self.space = true;
          break;
        case 'Shift':
          self.shift = true;
          break;
        case 'U+0057':
          self.w = true;
          break;
        case 'U+0053':
          self.s = true;
          break;
        case 'U+0041':
          self.a = true;
          break;
        case 'U+0044':
          self.d = true;
          break;
      }
    }
  );

  document.addEventListener('keyup', 
    function(e) 
    { 
      switch(e.keyIdentifier)
      {
        case 'Up':
          self.up = false;
          break;
        case 'Down':
          self.down = false;
          break;
        case 'Left':
          self.left = false;
          break;
        case 'Right':
          self.right = false;
          break;
        case 'U+0020'://Space
          self.space = false;
          break;
        case 'Shift':
          self.shift = false;
          break;
        case 'U+0057':
          self.w = false;
          break;
        case 'U+0053':
          self.s = false;
          break;
        case 'U+0041':
          self.a = false;
          break;
        case 'U+0044':
          self.d = false;
          break;
      }
    }
  );
}
