
export class CategoriaBienes {
    constructor(
        public $key: string,
        public nombre: string, 
        public descripcion: string
    ){}

    static fromJson(
        {$key, nombre, descripcion}): CategoriaBienes{
        return new CategoriaBienes($key, nombre, descripcion);
    }

    static fromjsonArray(array):CategoriaBienes[]{
        return array.map(CategoriaBienes.fromJson);
    }
}