var XGLLight = function (position)
{
  var that = this;
  that.position = position;
  that.setPosition = function(x,y,z)
  {
    that.position[0] = x;
    that.position[1] = y;
    that.position[2] = z;
  }

  that.programLightListIndex = -1; //Used entirely by XGLPrograms. Should be otherwise ignored.
}

//Well this is stupid...
