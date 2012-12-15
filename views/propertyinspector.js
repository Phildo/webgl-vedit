function createPropertyinspector(delegate)
{
  console.log('creating propertyinspector');

  //Create
  var pi = createPane(delegate);
  pi.titlebox.innerHTML = "Property:";

  return pi;
}
