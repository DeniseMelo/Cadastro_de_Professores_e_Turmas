package SoulCode.AlocacaoDeProfessores.Controllers;

import SoulCode.AlocacaoDeProfessores.Models.Bootcamp;
import SoulCode.AlocacaoDeProfessores.Services.BootcampService;
import SoulCode.AlocacaoDeProfessores.Services.TurmaBootcampService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("alocacao")
public class BootcampController {
    @Autowired
    BootcampService bootcampService;
    
    @Autowired
    TurmaBootcampService turmaBootcampService;

    @GetMapping("/bootcamp")
    public List<Bootcamp>mostrarTodosBootcamps(){
        List<Bootcamp> bootcamps = bootcampService.mostrarTodosBootcamps();
        return bootcamps;
    }
    @GetMapping("/bootcamp/id/{idBootcamp}")
    public ResponseEntity<Bootcamp>buscarIdBootcamp(@PathVariable Integer idBootcamp) {
        Bootcamp bootcamp = bootcampService.buscarIdBootcamp(idBootcamp);
        return ResponseEntity.ok().body(bootcamp);
    }

    @PostMapping("/bootcamp")
    public ResponseEntity<Bootcamp> inserirBootcamp(@RequestBody Bootcamp bootcamp) {
        bootcamp = bootcampService.inserirBootcamp(bootcamp);
        URI novaUri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(bootcamp.getIdBootcamp()).toUri();
        return ResponseEntity.created(novaUri).body(bootcamp);
    }

    @PutMapping("/bootcamp/id/{idBootcamp}")
    public ResponseEntity<Bootcamp> editarBootcamp(@PathVariable Integer idBootcamp, @RequestBody Bootcamp bootcamp) {
        bootcamp.setIdBootcamp(idBootcamp);
        bootcamp = bootcampService.editarBootcamp(bootcamp);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("bootcamp/id/{idBootcamp}")
    public ResponseEntity<Void> excluirBootcamp(@PathVariable Integer idBootcamp){
        bootcampService.excluirBootcamp(idBootcamp);
        return ResponseEntity.noContent().build();
    }

}
