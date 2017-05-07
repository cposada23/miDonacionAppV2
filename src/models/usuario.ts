
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
        public donacionesHechas: number,
        public donacionesRecibidas: number,
        public donacionesBienes: number,
        public donacionesServicios: number,
        public ciudadRecidencia:string,
        public notificaciones: number
    ){}

    static fromJson(
        {$key, nombre, apellidos, email, picture,
         cedula, celular, admin, genero, donacionesHechas,
         donacionesRecibidas, donacionesBienes, donacionesServicios,
          ciudadRecidencia, notificaciones }): Usuario{
        return new Usuario($key, nombre, apellidos, email, picture,
         cedula, celular, admin, genero, donacionesHechas,
         donacionesRecibidas,donacionesBienes, donacionesServicios,
          ciudadRecidencia, notificaciones );
    }
}