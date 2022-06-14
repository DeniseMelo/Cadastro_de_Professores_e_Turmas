package SoulCode.AlocacaoDeProfessores.Controllers;

import SoulCode.AlocacaoDeProfessores.Models.TurmaBootcamp;
import SoulCode.AlocacaoDeProfessores.Services.TurmaBootcampService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.ZonedDateTime;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("alocacao")
public class TurmaBootcampController {

	@Autowired
	TurmaBootcampService turmaBootcampService;
	
	@GetMapping("/turmas")
	public List<TurmaBootcamp> mostrarTodosTurmaBootcamp() {
		List<TurmaBootcamp> turmaBootcamp = turmaBootcampService.mostrarTodosTurmaBootcamp();
		return turmaBootcamp;
	}
	
	@GetMapping("turmaBootcamp/id/{idTurmaBootcamp}")
	public ResponseEntity<TurmaBootcamp> mostrarUmaTurmaBootcamp(@PathVariable Integer idTurmaBootcamp) {
		TurmaBootcamp turmaBootcamp = turmaBootcampService.mostrarUmaTurmaBootcamp(idTurmaBootcamp);
		return ResponseEntity.ok().body(turmaBootcamp);
		
	}
	
	@PostMapping("/novaTurmaBootcamp")
	public ResponseEntity<TurmaBootcamp> inserirTurmaBootcamp(@RequestBody TurmaBootcamp turmaBootcamp) {
		turmaBootcamp = turmaBootcampService.inserirTurmaBootcamp(turmaBootcamp);
		URI novaUri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(turmaBootcamp.getIdTurmaBootcamp()).toUri();
		return ResponseEntity.created(novaUri).body(turmaBootcamp);
		
	}
	
	@PutMapping("turmaBootcamp/id/{idTurmaBootcamp}")
	public ResponseEntity<TurmaBootcamp> editarTurmaBootcamp(@PathVariable Integer idTurmaBootcamp,
			@RequestBody TurmaBootcamp turmaBootcamp) {
		turmaBootcamp.setIdTurmaBootcamp(idTurmaBootcamp);
		turmaBootcamp = turmaBootcampService.editarTurmaBootcamp(turmaBootcamp);
		return ResponseEntity.noContent().build();
		
	}
	
	@DeleteMapping("turmaBootcamp/id/{idTurmaBootcamp}")
	public ResponseEntity<Void> excluirTurmaBootcamp(@PathVariable Integer idTurmaBootcamp) {
		turmaBootcampService.excluirTurmaBootcamp(idTurmaBootcamp);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("idprofessor/{idProfessor}/turmas")
	public ResponseEntity<List<TurmaBootcamp>> mostrarTurmasPorIdProf(@PathVariable Integer idProfessor) {
		List<TurmaBootcamp> turmas = turmaBootcampService.mostrarTurmasPorProf(idProfessor);
		return ResponseEntity.ok().body(turmas);
	}

	@GetMapping("turmaBootcamp/cdf/{idTurmaBootcamp}")
	public ResponseEntity<ZonedDateTime> calculaDataFinalBootcampExistente(@PathVariable Integer idTurmaBootcamp) {
		ZonedDateTime dataTermino =  turmaBootcampService.calculaDataFinal(idTurmaBootcamp);
		return ResponseEntity.ok().body(dataTermino);
	}

	@GetMapping("/turmaBootcampStatus")
	public List<TurmaBootcamp> buscarBootcampPeloStatus(@RequestParam("status") String status) {
		List<TurmaBootcamp> Bootcamp = turmaBootcampService.buscarBootcampPeloStatus(status);
		return Bootcamp;
	}

	@GetMapping("turmaBootcamp/cdi/{idTurmaBootcamp}")
	public ResponseEntity<ZonedDateTime> calculaDataInicioBootcampExistente(@PathVariable Integer idTurmaBootcamp){
		ZonedDateTime dataInicio = turmaBootcampService.calculaDataInicio(idTurmaBootcamp);
		return ResponseEntity.ok().body(dataInicio);
	}

	@GetMapping("turmaBootcamp/{idBootcamp}/CalculaDataTermino")
	public ResponseEntity<ZonedDateTime> calculaDataFinalNovoBootcamp(@PathVariable Integer idBootcamp,
																	  @RequestParam("dataInicio") String dataInicio){
		ZonedDateTime dataTermino = turmaBootcampService.calculaDataFinalDeNovaTurma(idBootcamp, dataInicio);
		return ResponseEntity.ok().body(dataTermino);
	}

	@GetMapping("turmaBootcamp/{idBootcamp}/CalculaDataInicio")
	public ResponseEntity<ZonedDateTime> calculaDataInicioNovoBootcamp(@PathVariable Integer idBootcamp,
																	   @RequestParam("dataTermino") String dataTermino){
		ZonedDateTime dataInicio = turmaBootcampService.calculaDataInicioDeNovaTurma(idBootcamp,dataTermino);
		return ResponseEntity.ok().body(dataInicio);
	}
}
