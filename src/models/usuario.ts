
export class Usuario {
    constructor(
        public $key: string,
        public nombre: string, 
        public apellidos: string,
        public email: string,
        public picture: string, 
        public cedula: string,
        public celular: string,
        public admin:boolean,
        public genero: string,
    ){}

    static fromJson(
        {$key, nombre, apellidos, email, picture,
         cedula, celular, admin, genero}): Usuario{
        return new Usuario($key, nombre, apellidos, email, picture,
         cedula, celular, admin, genero);
    }
}