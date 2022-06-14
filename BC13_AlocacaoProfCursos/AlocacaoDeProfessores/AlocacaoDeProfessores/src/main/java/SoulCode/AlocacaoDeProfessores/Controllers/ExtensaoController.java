package SoulCode.AlocacaoDeProfessores.Controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import SoulCode.AlocacaoDeProfessores.Models.Extensao;
import SoulCode.AlocacaoDeProfessores.Models.Professor;
import SoulCode.AlocacaoDeProfessores.Services.ExtensaoService;
import SoulCode.AlocacaoDeProfessores.Services.ProfessorService;

@CrossOrigin
@RestController
@RequestMapping("alocacao")

public class ExtensaoController {
	@Autowired
	ExtensaoService extensaoService;
	@Autowired
	ProfessorService professorService;
	
	@GetMapping ("/extensoes")
	public List<Extensao> mostrarTodasExtensoes(){
	    List<Extensao> extensoes = extensaoService.acharTodasExtensoes();
	    return extensoes;
	}
	
	@GetMapping ("/extensao/id/{idExtensao}")
	public ResponseEntity<Extensao> 
	mostrarUmaExtensao(@PathVariable Integer idExtensao)
	{
		Extensao extensao = extensaoService.acharExtensaoPeloId(idExtensao);
		return ResponseEntity.ok().body(extensao);
	}
	
	@PostMapping("/extensao")
	public ResponseEntity<Extensao> inserirExtensao(@RequestBody Extensao extensao){
		extensao = extensaoService.inserirExtensao(extensao);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(extensao.getIdExtensao()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
	@PutMapping("/extensao/id/{idExtensao}")
	public ResponseEntity<Extensao> editarExtensao
	(@PathVariable Integer idExtensao, @RequestBody Extensao extensao){
		extensao.setIdExtensao(idExtensao);
		extensao = extensaoService.editarExtensao(extensao);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("extensao/id/{idExtensao}")
	public ResponseEntity<Void> excluirExtensao(@PathVariable Integer idExtensao){
		extensaoService.excluirExtensao(idExtensao);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping ("/professor/id/{idProf}/extensao")
	public ResponseEntity<Extensao> mostrarExtensaoPorProf(@PathVariable Integer idProf)
	{	Professor professor = professorService.buscarIdProfessor(idProf);
		Extensao extensao = extensaoService.acharExtensaoPorProf(professor);
		return ResponseEntity.ok().body(extensao);
	}
	
	@GetMapping("/extensaoStatus")
	public List<Extensao> buscarExtensaoPeloStatus(@RequestParam("status") String status){
		List<Extensao> extensao = extensaoService.buscarExtensaoPeloStatus(status);
		return extensao;
	}
}
