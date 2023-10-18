require('colors');
const fs = require('fs');

const datosArchivo = require('./datos.json');

const main = async() =>{
    console.clear();
    console.log(`//////////////////////////////`);
    console.log(`//     Proyecto Clases      //`);
    console.log(`//////////////////////////////\n`);

    class Producto {
        #codigoProducto;
        #nombreProducto;
        #inventarioProducto;
        #precioProducto;


        constructor() {
            this.#codigoProducto = '';
            this.#nombreProducto = '';
            this.#inventarioProducto = 0;
            this.#precioProducto = 0;
        }

        set setCodigoProducto(value){
            this.#codigoProducto = value;
        }

        get getCodigoProducto(){
            return this.#codigoProducto;
        }

        set setNombreProducto(value){
            this.#nombreProducto = value;
        }

        get getNombreProducto(){
            return this.#nombreProducto;
        }

        set setInventarioProducto(value){
            this.#inventarioProducto = value;
        }

        get getInventarioProducto(){
            return this.#inventarioProducto;
        }

        set setPrecioProducto(value){
            this.#precioProducto = value;
        }

        get getPrecioProducto(){
            return this.#precioProducto;
        }
    }

    class ProductoTienda{
        #listaProducto;

        constructor(){
            this.#listaProducto = [];
        }

        get getListaProducto(){
            return this.#listaProducto;
        }

        cargaArchivoProducto(){
            let contador = 0;
            if(datosArchivo.length > 0){
                datosArchivo.forEach(objeto => {
                    contador++;
                    let producto = new Producto;
                    producto.setCodigoProducto =  objeto.codigoproducto;
                    producto.setNombreProducto = objeto.nombreProducto;
                    producto.setInventarioProducto = objeto.inventarioProducto;
                    producto.setPrecioProducto = objeto.precioProducto;
                    this.#listaProducto.push(producto);
                });
            } else {
                console.log(`ERROR, el archivo datos.json no contiene datos\n`.bgRed);
            }
            console.log(`Total de productos cargados ==> `.bgBlue + `${contador}`.red);
        }

        grabaArchivoProducto(){
            const instanciaClaseAObjetos = this.getListaProducto.map(producto =>{
                return{
                    codigoproducto: producto.getCodigoProducto,
                    nombreProducto: producto.getNombreProducto,
                    inventarioProducto: producto.getInventarioProducto,
                    precioProducto: producto.getPrecioProducto
                };
            });

            const cadenaJson = JSON.stringify(instanciaClaseAObjetos,null,2);

            const nombreAchivo = 'datos.json';

            fs.writeFileSync(nombreAchivo,cadenaJson, 'UTF-8');

            console.log(`DATOS GUARDADOS EN ${nombreAchivo}`.bgMagenta);
        }

    mostrarProductos(){
        this.getListaProducto.forEach(producto => {
            console.log(`|     ` + producto.getCodigoProducto + `    |` + 
                        `      ` + producto.getNombreProducto + `   |` + 
                        `      ` + producto.getInventarioProducto + `    |` + 
                        `      ` + producto.getPrecioProducto + `    |`);
        })

        }
    }
    
    let productosTienda = new ProductoTienda;

    productosTienda.cargaArchivoProducto();

    console.log(`DATOS APERTURA TIENDA`.bgBlue);

    productosTienda.mostrarProductos();

    productosTienda.getListaProducto.forEach(producto => {
        producto.setInventarioProducto = Math.floor(Math.random() * (20 - 1) + 1);
    });

    console.log(`DATOS CIERRE TIENDA`.bgGreen);
    productosTienda.mostrarProductos();

    productosTienda.grabaArchivoProducto();
}

main();

