package SoulCode.AlocacaoDeProfessores.Services;

import SoulCode.AlocacaoDeProfessores.Models.Professor;
import SoulCode.AlocacaoDeProfessores.Models.UsuarioJWT;
import SoulCode.AlocacaoDeProfessores.Repositories.UsuarioJWTRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;


@Service
public class UsuarioJWTService {

    @Autowired
    UsuarioJWTRepository usuarioJWTRepository;


    public List<UsuarioJWT> listarUsuarioJWT(){
        return usuarioJWTRepository.findAll();
    }

    public UsuarioJWT buscarIdUsuario(Integer idUsuario){
        Optional<UsuarioJWT> usuario = usuarioJWTRepository.findById(idUsuario);
        return usuario.orElseThrow();
    }

    public UsuarioJWT findByLogin(String login) {
        Optional<UsuarioJWT> usuarioJWT = usuarioJWTRepository.findByLogin(login);
        return usuarioJWT.orElseThrow();
    }

    public UsuarioJWT inserirUsuario(UsuarioJWT usuarioJWT) {
        return usuarioJWTRepository.save(usuarioJWT);
    }

    public UsuarioJWT editarUsuario(UsuarioJWT usuario) {
        buscarIdUsuario(usuario.getId());
        return usuarioJWTRepository.save(usuario);
    }

    public void excluirUsuario(Integer idUsuario) {
        buscarIdUsuario(idUsuario);
        usuarioJWTRepository.deleteById(idUsuario);
    }





}
