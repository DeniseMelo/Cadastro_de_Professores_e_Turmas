package SoulCode.AlocacaoDeProfessores.Controllers;

import SoulCode.AlocacaoDeProfessores.Models.Professor;
import SoulCode.AlocacaoDeProfessores.Services.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("alocacao")
public class ProfessorController{

    @Autowired
    ProfessorService professorService;

    @GetMapping("/professores")
    public List<Professor>mostrarTodosProfessores(){
        List<Professor> professores = professorService.mostrarTodosProfessores();
        return professores;
    }

    @GetMapping("/professor/id/{idProfessor}")
    public ResponseEntity<Professor> buscarIdProfessor(@PathVariable Integer idProfessor) {
        Professor professor = professorService.buscarIdProfessor(idProfessor);
        return ResponseEntity.ok().body(professor);
    }

    @GetMapping("/professor/nome/{nome}")
    public ResponseEntity<Professor> buscarNomeProfessor(@PathVariable String nome) {
        Professor professor = professorService.buscarNomeProfessor(nome);
        return ResponseEntity.ok().body(professor);

    }

    @GetMapping("/professor/email/{email}")
    public ResponseEntity<Professor> buscarEmailProfessor(@PathVariable String email) {
        Professor professor = professorService.buscarEmailProfessor(email);
        return ResponseEntity.ok().body(professor);

    }

    @PostMapping("/professor")
    public ResponseEntity<Professor> inserirProfessor(@RequestBody Professor professor) {
        professor = professorService.inserirProfessor(professor);
        URI novaUri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(professor.getIdProfessor()).toUri();
        return ResponseEntity.created(novaUri).body(professor);
    }

    @PutMapping("/professor/id/{idProfessor}")
    public ResponseEntity<Professor> editarProfessor(@PathVariable Integer idProfessor, @RequestBody Professor professor) {
        professor.setIdProfessor(idProfessor);
        professor = professorService.editarProfessor(professor);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("professor/id/{idProfessor}")
    public ResponseEntity<Void> excluirProfessor(@PathVariable Integer idProfessor){
        professorService.excluirProfessor(idProfessor);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("habilidade/{idHabilidade}/professores")
    public List<Professor> mostrarProfessoresPorHabilidade(@PathVariable Integer idHabilidade){
    	List<Professor> professores = professorService.mostrarProfessoresPorHabilidade(idHabilidade);
        return professores;
    }

    @GetMapping("turmas/{idTurmaBootcamp}/professores")
    public List<Professor> mostrarProfessoresPorTurma(@PathVariable Integer idTurmaBootcamp){
        List<Professor> professores = professorService.mostrarProfessoresPorTurma(idTurmaBootcamp);
        return professores;
    }

    @GetMapping("extensao/{idExtensao}/professores")
    public List<Professor> mostrarProfessoresPorExtensao(@PathVariable Integer idExtensao){
        List<Professor> professores = professorService.mostraProfessorPorExtensao(idExtensao);
        return professores;
    }
    
    @GetMapping("professores/totalDisponiveis")
    public List<Professor> mostraProfessores100PorCentoDisponiveis(){
        List<Professor> professores100 = professorService.professores100PorCentoDisponiveis();
        return professores100;
        
    }	

    @GetMapping("professores/nadaDisponiveis")
    public List<Professor> mostrarProfessoresNadaDisponiveis(){
        List<Professor> professoresNaoDisponiveis = professorService.professores100PorCentoOcupado();
        return professoresNaoDisponiveis;
    }

    @GetMapping("professores/metadeDisponiveis")
    public List<Professor> mostraProfessores50PorCentoDisponiveis(){
        List<Professor> professores50 = professorService.professores50PorCentoDisponiveis();
        return professores50;
    } 

    @PostMapping("/atribuirExtensao/professor/{idProfessor}/extensao/{idExtensao}")
	public ResponseEntity<Professor> atribuirExtensaoAoProfessor
	(@PathVariable Integer idProfessor, @PathVariable Integer idExtensao){
		professorService.atribuirExtensaoAoProfessor(idProfessor, idExtensao);
		return ResponseEntity.ok().body(buscarIdProfessor(idProfessor)).getBody();
    }
    
    @PostMapping("/atribuirTurma/professor/{idProfessor}/turma/{idTurma}")
	public ResponseEntity<Professor> atribuirTurmaAoProfessor
	(@PathVariable Integer idProfessor, @PathVariable Integer idTurma) throws Exception{
		professorService.atribuirTurmaAoProfessor(idProfessor, idTurma);
		return ResponseEntity.ok().body(buscarIdProfessor(idProfessor)).getBody();
    }

}

