package SoulCode.AlocacaoDeProfessores.Controllers;

import SoulCode.AlocacaoDeProfessores.Models.Professor;
import SoulCode.AlocacaoDeProfessores.Models.UsuarioJWT;
import SoulCode.AlocacaoDeProfessores.Repositories.UsuarioJWTRepository;
import SoulCode.AlocacaoDeProfessores.Services.UsuarioJWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/alocacao")
public class UsuarioJWTController {

    @Autowired
    UsuarioJWTService usuarioJWTService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    UsuarioJWTRepository usuarioJWTRepository;

    @GetMapping("/usuario")
    public ResponseEntity<List<UsuarioJWT>> listarUsuarioJWT(){
        return ResponseEntity.ok(usuarioJWTService.listarUsuarioJWT());
    }

    @PostMapping("/usuario")
    public ResponseEntity<UsuarioJWT> inserirUsuario(@RequestBody UsuarioJWT usuarioJWT){
        usuarioJWT.setPassword(encoder.encode(usuarioJWT.getPassword()));
        return ResponseEntity.ok(usuarioJWTService.inserirUsuario(usuarioJWT));
    }

    @GetMapping("/usuario/id/{id}")
    public ResponseEntity<UsuarioJWT> buscarIdUsuario(@PathVariable Integer id){
        UsuarioJWT usuario = usuarioJWTService.buscarIdUsuario(id);
        return ResponseEntity.ok().body(usuario);
    }

    @DeleteMapping("/usuario/id/{id}")
    public ResponseEntity<Void> excluirUsuario(@PathVariable Integer id){
        usuarioJWTService.excluirUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/usuario/id/{id}")
    public ResponseEntity<UsuarioJWT> editarUsuario(@PathVariable Integer id, @RequestBody UsuarioJWT usuario) {
        usuario.setId(id);
        usuario = usuarioJWTService.editarUsuario(usuario);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/usuario/login/{login}")
    public ResponseEntity<UsuarioJWT> buscarLoginUsuario(@PathVariable String login) {
        UsuarioJWT usuario = usuarioJWTService.findByLogin(login);
        return ResponseEntity.ok().body(usuario);
    }


}
