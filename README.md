Funcionamineto de la API ProducManager

Se mandara a llamar http://localhost:8080/products sin query, eso debe devolver todos los 10 productos.
Se mandará a llamar http://localhost:8080/products?limit=5 , eso debe devolver sólo los primeros 5 de los 10 productos.
Se mandará a llamar http://localhost:8080/products/2, eso debe devolver sólo el producto con id=2.
Se mandará a llamar  http://localhost:8080/products/34123123, al no existir el id del producto, debe devolver un objeto con un error indicando que el producto no existe.
