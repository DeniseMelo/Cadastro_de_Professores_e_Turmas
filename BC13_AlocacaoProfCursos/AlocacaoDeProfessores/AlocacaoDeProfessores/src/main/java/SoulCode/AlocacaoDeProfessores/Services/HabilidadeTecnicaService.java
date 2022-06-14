package SoulCode.AlocacaoDeProfessores.Services;

import SoulCode.AlocacaoDeProfessores.Models.HabilidadeTecnica;
import SoulCode.AlocacaoDeProfessores.Models.Professor;
import SoulCode.AlocacaoDeProfessores.Models.TurmaBootcamp;
import SoulCode.AlocacaoDeProfessores.Repositories.HabilidadeTecnicaRepository;
import SoulCode.AlocacaoDeProfessores.Repositories.ProfessorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HabilidadeTecnicaService {

    @Autowired
    HabilidadeTecnicaRepository habilidadeTecnicaRepository;
    @Autowired
    ProfessorRepository professorRepository;


    public List<HabilidadeTecnica> mostrarHabilidadeTecnica() {
        return habilidadeTecnicaRepository.findAll();
    }

    public HabilidadeTecnica mostrarIdHabilidade(Integer idHabilidadeTecnica) {
        Optional<HabilidadeTecnica> habilidadeTecnica = habilidadeTecnicaRepository.findById(idHabilidadeTecnica);
        return habilidadeTecnica.orElseThrow();
    }

    public HabilidadeTecnica buscarNomeHabilidade(String nome) {
        Optional<HabilidadeTecnica> habilidadeTecnica = habilidadeTecnicaRepository.findByNome(nome);
        return habilidadeTecnica.orElseThrow();
    }

    public HabilidadeTecnica inserirHabilidadeTecnica(HabilidadeTecnica habilidadeTecnica){
        habilidadeTecnica.setIdHabilidadeTecnica(null);
        return habilidadeTecnicaRepository.save(habilidadeTecnica);
    }

    public HabilidadeTecnica editarHabilidadeTecnica(HabilidadeTecnica habilidadeTecnica) {
        mostrarIdHabilidade(habilidadeTecnica.getIdHabilidadeTecnica());
        return habilidadeTecnicaRepository.save(habilidadeTecnica);
    }

    public void excluirHabilidadeTecnica(Integer idHabilidadeTecnica) {
        mostrarIdHabilidade(idHabilidadeTecnica);
        habilidadeTecnicaRepository.deleteById(idHabilidadeTecnica);
    }

}