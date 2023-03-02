const fs= require('fs')

class ProductManager {
    static id = 1


    constructor (path) {
        this.products = [];
        this.path = path
    }
    
    addProduct(title, description, price, thumbnail, code, stock ) {
        
        const product = ({
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: ProductManager.id
        })
            
        if (this.products !=  undefined){
            
            const chekCode = this.products.find(e => e.code === product.code)

            if (chekCode != undefined) {
                 console.log('error, se a colocado el mismo codigo en un producto distinto')
             } else if ( (!product.title ) || (!product.description) || (!product.price ) || (!product.thumbnail ) || (!product.code ) || (!product.stock ) ) {
                  console.log('todos los campos son obligatorios ')
             } else {
                this.products.push(product)
                fs.writeFileSync(this.path, JSON.stringify(this.products))
                ProductManager.id++
            }
        }
    }

    getProducts() {
        const data = fs.promises.readFile(this.path,'utf-8')
        .then( data => {
            data = JSON.stringify(data)
            console.log("\n")
            console.log("Productos en formato de arreglo:")
            console.log(data)}) 
    }

    getProductsById(id) {
        const data = fs.promises.readFile(this.path,'utf-8')
        .then(data => {
            data = JSON.parse(data)
            const productId = data.find(e => e.id == id)
            if(productId != undefined){
                console.log("\n")
                console.log("Producto con id ["+id+"]")
                console.log(productId)
            } else { error();}
        })
         .catch (error => {
            console.log("Producto con id ["+id+"]")
            console.log("not found")
        })
    }

    // updateProduct(id, dateUp){
    //     const data = fs.promises.readFile(this.path,"utf-8")
    //     .then(data => {
    //         const data2 = JSON.parse(data)
    //         const productId = data2.find(e => e.id == id)
    //         if(productId != undefined) {
    //             data2.dateUp
    //         }
    //     })
    // }

    deleteProduct (id) {
        
        const data = fs.promises.readFile(this.path,'utf-8')
        .then(data => {
            data = JSON.parse(data)
            const productId = data.filter(e => e.id != id)

            fs.unlinkSync(this.path)
            fs.writeFileSync(this.path, JSON.stringify(productId))
            
            data = fs.promises.readFile(this.path,'utf-8')
            .then(data => {
                console.log("\nSe a eliminida el producto")
                console.log("Productos Restantes:")
                console.log(data)})
            
        })
    }
}
   
 


const products = new ProductManager('archivoProductos.json');

products.addProduct("Siempre Listo", "Pasapañuelos", "$500", "imgRoutes", 1855, 10)
products.addProduct("Manada", "Pasapañuelos", "$800", "imgRouts", 1856, 9)
products.addProduct("Cacatua", "Animal", "$800", "imgRouts", 187856, 9)

 products.getProducts();
 products.getProductsById(2);
 products.deleteProduct(1);

// products.updateProduct(2,)


