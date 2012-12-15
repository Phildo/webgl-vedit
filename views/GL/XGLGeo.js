var XGLGeo = function (verts, colors, normals, indexes)
{
  this.verts = verts;
  this.colors = colors;
  this.normals = normals;
  this.indexes = indexes;

  this.programGeoListIndex = -1; //Used entirely by XGLPrograms. Should be otherwise ignored.
}
