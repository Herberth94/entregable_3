import fs from 'fs'
export class ProductManager {
    constructor(){
        this.product =[]
        this.path = './text.json'
        if(fs.existsSync('./text.json')){
            console.log("El archivo EXISTE!");
         }else{
            console.log("El archivo NO EXISTE!");
            fs.writeFileSync(this.path,'[]')
        }
    }
    // Verificación si los campos estan debidamente ingresados o si el usuario omitio algo retorna un false si todo esta ok
     #verificationProducts(newProduct){
        const verificationNewProduct = Object.values(newProduct).some((values)=>values === null || values === undefined || values === '');
        return(verificationNewProduct);
    }
    // Método que muesta en consola todos los productos agregados al archivo JSON
    async getProducts(){
        const readFile = await fs.promises.readFile(this.path,'utf-8')
        if(readFile == "" || readFile == '[]'){
        //console.log("vacio")
            //console.log(this.product)
            return this.product
        }
       else{
        this.product= JSON.parse(readFile);
        return this.product
       }
    };
    // Método que agrega un producto al archivo text.json
    async addProduct(
        title,
        description,
        price,
        thumbnail,
        code,
        stock
        )
        {
       let newProduct ={
        title:title,
        description:description,
        price:price,
        thumbnail: thumbnail,
        code: code,
        stock:stock,
       }
       // Verifica si el producto tiene todos sus campos llenos
       const verification = this.#verificationProducts(newProduct);
       // Lee el archivo text.json
       const readFile = await fs.promises.readFile(this.path,'utf-8');
       console.log(readFile)
       if(!verification){
           if(readFile == ""){
            // Agrega id = 0 al Objeto creado
            newProduct = {...newProduct,id:0}
            // Agrega el nuevo producto al archivo text.json
            await fs.promises.appendFile(this.path,JSON.stringify([newProduct]))
          
           
           }
           else{
              // Transforma los datos JSON en un Objeto de JS
              let newArray =(JSON.parse(readFile));
              let id = newArray.length;
              newProduct = {...newProduct,id:id};
              newArray.push(newProduct);
              await fs.promises.writeFile(this.path,JSON.stringify(newArray))
                         
           }

       }

    }
    // Método que busca el producto en base al ID del archivo text.json
   async getProductById (id){
        let readFile = await fs.promises.readFile(this.path,'utf-8');
        readFile = JSON.parse(readFile);
        const searchProduct = readFile.find((value)=>{
            if(value.id == id){
                //console.log(value);
                return value
                }});
            if(searchProduct == undefined){return true}
            else{
                //console.log(searchProduct);
                return searchProduct
            };
   }
   // Actulización de un producto atravez de su Id y ademas se debe ingresar el campo que desea actulizar y su valor de la misma
   async updateProduct (id,updateField,newValue){
    // Se lee el archivo text y se transforma de JSON a un array de objectos de JS
    let readFile = await fs.promises.readFile(this.path,'utf-8');
        readFile = JSON.parse(readFile);
    // Con la funcion map recorro el array de objeto condicionando que el id ingresado sea igual al id de productos
    const newArray = readFile.map(product => {
        if (product.id === id ) {
            const update = { ...product, [updateField]: newValue }
            console.log(update)
            return update ;
          
        }
        return product;
      });
       await fs.promises.writeFile(this.path,JSON.stringify(newArray));
      

   }  
   async deleteProduct(id){
    let deleteArray = []
    let readFile = await fs.promises.readFile(this.path,'utf-8');
        readFile = JSON.parse(readFile);
    const searchProduct = readFile.find( (value)=>{
        if(value.id == id){
            const newArray = readFile.filter(element => element.id !== id);
            console.log(newArray);
            deleteArray = newArray

            return true;
        }
    });
    console.log
    if(searchProduct == undefined){return console.log("not found")}
    else{
        console.log(deleteArray);
        await fs.promises.writeFile(this.path,JSON.stringify(deleteArray));
      
         
    }
   }

}
