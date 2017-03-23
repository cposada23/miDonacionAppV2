
export class SubCategoriaBienes {
    constructor(
        public $key: string,
        public nombre: string, 
        public descripcion: string,
        public categoriaKey: string,
        public categoria: string
    ){}

    static fromJson(
        {$key, nombre, descripcion, categoriaKey, categoria}): SubCategoriaBienes{
        return new SubCategoriaBienes($key, nombre, descripcion, categoriaKey, categoria);
    }

    static fromjsonArray(array):SubCategoriaBienes[]{
        return array.map(SubCategoriaBienes.fromJson);
    }
}