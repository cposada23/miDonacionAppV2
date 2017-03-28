/** modelo para la donacion de elementos */

export class Donacion {
    private _usuarioKey:string;
    private _usuarioNombre:string;
    private estado:string;
    private fecha:Date;
    private categoriaKey: string;
    private categoriaNombre: string;
    private subCategoriaKey: string;
    private subCtegoriaNombre: string;


    constructor(
    ){}
    set usuarioNombre(nombre:string){
        this._usuarioNombre = nombre;
    }

    get usuarioNombre(){
        return this._usuarioNombre;
    }

    set usuarioKey(key:string){
        this._usuarioKey = key;
    }

    get usuarioKey(){
        return this._usuarioKey;
    }

  
}