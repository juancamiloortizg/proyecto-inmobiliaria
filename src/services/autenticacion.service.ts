import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Administrador, Asesor, Cliente} from '../models';
import {AdministradorRepository, AsesorRepository, ClienteRepository} from '../repositories';

const generador = require("password-generator"); //Generar contraseña
const cryptoJS = require("crypto-js"); //Encriptar contraseña
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,

    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,

    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository

  ) { }

  /*
   * Add service methods here
   */

  GenerarContrasena() {
    let contrasena = generador(8, false);
    return contrasena;
  }

  CifrarContrasena(contrasena: string) {
    let contrasenaCifrada = cryptoJS.MD5(contrasena).toString();
    return contrasenaCifrada;
  }

  IdentificarAdministrador(usuario: string, contrasena: string) {
    try {
      let p = this.administradorRepository.findOne({where: {email: usuario, contrasena: contrasena}});
      if (p) {
        return p;
      }
      return false;
    }
    catch {
      return false;

    }
  }

  IdentificarAsesor(usuario: string, contrasena: string) {
    try {
      let p = this.asesorRepository.findOne({where: {email: usuario, contrasena: contrasena}});
      if (p) {
        return p;
      }
      return false;
    }
    catch {
      return false;
    }
  }

  IdentificarCliente(usuario: string, contrasena: string) {
    try {
      let p = this.clienteRepository.findOne({where: {email: usuario, contrasena: contrasena}});
      if (p) {
        return p;
      }
      return false;
    }
    catch {
      return false;
    }
  }

  GenerarTokenJWTADM(administrador: Administrador) {
    let token = jwt.sign({
      data: {
        id: administrador.id,
        email: administrador.email,
        nombre: administrador.nombres + "" + administrador.apellidos
      }

    },
      Llaves.claveJWT);
    return token;
  }
  GenerarTokenJWTASE(asesor: Asesor) {
    let token = jwt.sign({
      data: {
        id: asesor.id,
        email: asesor.email,
        nombre: asesor.nombres + "" + asesor.apellidos
      }

    },
      Llaves.claveJWT);
    return token;
  }

  GenerarTokenJWTCLI(cliente: Cliente) {
    let token = jwt.sign({
      data: {
        id: cliente.id,
        email: cliente.email,
        nombre: cliente.nombres + "" + cliente.apellidos
      }

    },
      Llaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }

}
