var AsyncLoaderMan = function()
{

  this.loadBatch = function(batch)
  {
    for(var i = 0; i < batch.fileArray.length; i++)
      this.loadFile(batch.fileArray[i],batch.responseHandler,i);
  };

  this.loadFile = function(file, callback, id)
  {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function()
    {
      if(request.readyState == 1)
      {
        //request.overrideMimeType('application/json');
        request.send();
      }
      if(request.readyState == 4)
      {
        if(request.status == 200)
          callback(request.responseText, id);
        else
          callback(false, id);
      }
    }
    request.open('GET',file,true);
  };
}

var AsyncLoaderBatch = function(fileArray, resultsArray, callback)
{
  var self=this;
  this.fileArray = fileArray;
  this.resultsArray = resultsArray;
  this.returnObject = {};
  this.returnCount = 0;

  this.responseHandler = function(response, id)
  {
    self.returnCount++;
    self.returnObject[resultsArray[id]] = response;
    if(self.returnCount == self.fileArray.length)
      callback(self.returnObject);
  };
}
