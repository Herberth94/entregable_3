import express from "express";
import { ProductManager } from "./productManager.js";
import morgan from "morgan";
const app = express();
const port = 8080;
const product = new ProductManager;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan('dev'));
app.get('/products',async (req,res)=>{
   try {
      const allProduct = await product.getProducts();
      const consulta = req.query
      const setLimit = Object.keys(consulta).length;
      if(setLimit == 0){
         
         res.status(200).send({status:'success',data:allProduct});
         }
      else{
         const newArray = allProduct.slice(0,consulta.limit)
         res.status(200).send({status:'success',data:newArray});
         
      }
      } catch (error) { res.status(401).send(error)};
});
app.get('/products/:pid',async (req,res)=>{
   try {
      const { pid } = req.params;
      const idProduct = await product.getProductById(pid);
      if(idProduct == true){
         res.status(404).send({status:'not found' , data:'The object does not exist'});
      }
      else{
         res.status(200).send({status:'success',data:idProduct});
      }
      
   } catch (error) {
      res.status(404).send(error);     
   }
});


app.listen(port,()=>console.log(`Servidor en el puerto: ${port}`));