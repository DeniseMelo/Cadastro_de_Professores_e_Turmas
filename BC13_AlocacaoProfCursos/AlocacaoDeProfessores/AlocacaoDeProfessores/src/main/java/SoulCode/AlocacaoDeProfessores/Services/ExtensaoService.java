package SoulCode.AlocacaoDeProfessores.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import SoulCode.AlocacaoDeProfessores.Models.Extensao;
import SoulCode.AlocacaoDeProfessores.Models.Professor;
import SoulCode.AlocacaoDeProfessores.Repositories.ExtensaoRepository;

@Service
public class ExtensaoService {
	@Autowired
	ExtensaoRepository extensaoRepository;

	public List<Extensao>acharTodasExtensoes(){
		return extensaoRepository.findAll();
	}

	public Extensao acharExtensaoPeloId(Integer idExtensao) {
		Optional<Extensao> extensao = extensaoRepository.findById(idExtensao);
		return extensao.orElseThrow();
	}

	public Extensao acharExtensaoPeloNome(String nome) {
		Optional<Extensao> extensao = extensaoRepository.findByNome(nome);
		return extensao.orElseThrow();
	}

	public Extensao inserirExtensao (Extensao extensao) {
		extensao.setIdExtensao(null);
		return extensaoRepository.save(extensao);
	}
	
	public Extensao editarExtensao(Extensao extensao) {
		acharExtensaoPeloId(extensao.getIdExtensao());
		return extensaoRepository.save(extensao);
	}
	
	public void excluirExtensao (Integer idExtensao) {
		acharExtensaoPeloId(idExtensao);
		extensaoRepository.deleteById(idExtensao);
    }
	
	public Extensao acharExtensaoPorProf (Professor prof) {
		Optional<Extensao> extensao = extensaoRepository.findByProfessores(prof);
		return extensao.orElseThrow();
	}

	public List<Extensao> buscarExtensaoPeloStatus(String status){
		return extensaoRepository.findByStatus(status);
	}
}
