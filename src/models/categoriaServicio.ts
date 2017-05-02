export class CategoriaServicio {
    constructor(
        public $key: string,
        public nombre: string, 
        public descripcion: string
    ){}

    static fromJson (
        { $key, nombre, descripcion } ): CategoriaServicio{
        return new CategoriaServicio($key, nombre, descripcion);
    }

    static fromjsonArray(array): CategoriaServicio[]{
        return array.map(CategoriaServicio.fromJson);
    }
}