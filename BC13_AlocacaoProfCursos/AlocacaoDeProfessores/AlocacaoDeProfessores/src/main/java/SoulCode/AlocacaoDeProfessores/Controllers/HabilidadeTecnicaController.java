package SoulCode.AlocacaoDeProfessores.Controllers;

import SoulCode.AlocacaoDeProfessores.Models.HabilidadeTecnica;
import SoulCode.AlocacaoDeProfessores.Services.HabilidadeTecnicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("alocacao")
public class HabilidadeTecnicaController {

    @Autowired
    HabilidadeTecnicaService habilidadeTecnicaService;

    @GetMapping("/habilidadeTecnica")
    public List<HabilidadeTecnica> mostrarHabilidadeTecnica(){
        List<HabilidadeTecnica> habilidadesTecnicas = habilidadeTecnicaService.mostrarHabilidadeTecnica();
        return habilidadesTecnicas;

    }
    @GetMapping("/habilidadeTecnica/id/{idHabilidadeTecnica}")
    public ResponseEntity<HabilidadeTecnica> mostrarIdHabilidade(@PathVariable Integer idHabilidadeTecnica){
        HabilidadeTecnica habilidadeTecnica= habilidadeTecnicaService.mostrarIdHabilidade(idHabilidadeTecnica);
        return ResponseEntity.ok().body(habilidadeTecnica);
    }

    @GetMapping("/habilidadeTecnica/nome/{nome}")
    public ResponseEntity<HabilidadeTecnica> buscarNomeHabilidade(@PathVariable String nome) {
        HabilidadeTecnica habilidadeTecnica = habilidadeTecnicaService.buscarNomeHabilidade(nome);
        return ResponseEntity.ok().body(habilidadeTecnica);
    }

    @PostMapping("/habilidadeTecnica")
    public ResponseEntity<HabilidadeTecnica> inserirHabilidadeTecnica(@RequestBody HabilidadeTecnica habilidadeTecnica) {
        habilidadeTecnica = habilidadeTecnicaService.inserirHabilidadeTecnica(habilidadeTecnica);
        URI novaUri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(habilidadeTecnica.getIdHabilidadeTecnica()).toUri();
        return ResponseEntity.created(novaUri).body(habilidadeTecnica);
    }

    @PutMapping("/habilidadeTecnica/id/{idHabilidadeTecnica}")
    public ResponseEntity<HabilidadeTecnica> editarHabilidadeTecnica(@PathVariable Integer idHabilidadeTecnica, @RequestBody HabilidadeTecnica habilidadeTecnica) {
        habilidadeTecnica.setIdHabilidadeTecnica(idHabilidadeTecnica);
        habilidadeTecnica = habilidadeTecnicaService.editarHabilidadeTecnica(habilidadeTecnica);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("habilidadeTecnica/id/{idHabilidadeTecnica}")
    public ResponseEntity<Void> excluirHabilidadeTecnica(@PathVariable Integer idHabilidadeTecnica){
        habilidadeTecnicaService.excluirHabilidadeTecnica(idHabilidadeTecnica);
        return ResponseEntity.noContent().build();
    }
}
