package SoulCode.AlocacaoDeProfessores.Services;

import SoulCode.AlocacaoDeProfessores.Models.Extensao;
import SoulCode.AlocacaoDeProfessores.Models.Professor;
import SoulCode.AlocacaoDeProfessores.Models.TurmaBootcamp;
import SoulCode.AlocacaoDeProfessores.Repositories.ExtensaoRepository;
import SoulCode.AlocacaoDeProfessores.Repositories.ProfessorRepository;
import SoulCode.AlocacaoDeProfessores.Repositories.TurmaBootcampRepository;

import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProfessorService {

    @Autowired
    ProfessorRepository professorRepository;
    
    @Autowired 
    ExtensaoRepository extensaoRepository; 
    
    @Autowired
    TurmaBootcampRepository turmaBootcampRepository;
    
    @Autowired
    TurmaBootcampService turmaBootcampService;
    

    public List<Professor> mostrarTodosProfessores() {
        return professorRepository.findAll();
    }

    public Professor buscarIdProfessor(Integer idProfessor) {
        Optional<Professor> professor = professorRepository.findById(idProfessor);
        return professor.orElseThrow();
    }
    public Professor buscarNomeProfessor(String nome) {
        Optional<Professor> professor = professorRepository.findByNome(nome);
        return professor.orElseThrow();
    }

    public Professor buscarEmailProfessor(String email) {
        Optional<Professor> professor = professorRepository.findByEmail(email);
        return professor.orElseThrow();
    }

    public Professor inserirProfessor(Professor professor){
        professor.setIdProfessor(null);
        return professorRepository.save(professor);
    }

    public Professor editarProfessor(Professor professor) {
        buscarIdProfessor(professor.getIdProfessor());
        return professorRepository.save(professor);
    }

    public void excluirProfessor(Integer idProfessor) {
        buscarIdProfessor(idProfessor);
        professorRepository.deleteById(idProfessor);
    }
    
    public List<Professor> mostrarProfessoresPorHabilidade(Integer idHabilidade) {
    	return professorRepository.findByHabilidade(idHabilidade);
    }

    public List<Professor> mostrarProfessoresPorTurma(Integer idTurmaBootcamp){
        return professorRepository.findByTurma(idTurmaBootcamp);
    }

    public List<Professor> mostraProfessorPorExtensao(Integer idExtensao){
        return professorRepository.findByExtensao(idExtensao);
    }

    public List<Professor> professores100PorCentoDisponiveis(){
        // seleciona e captura todos porfessores
        List<Professor> professores = mostrarTodosProfessores();

        List<Professor> professores100 = new ArrayList<>();

        for(int i = 0; i < professores.size(); i++){

            if(professores.get(i).getExtensao() == null && professores.get(i).getTurmaBootcamp().isEmpty()){
                professores100.add(professores.get(i));
            }
        }

        return professores100;
    }

    public List<Professor> professores100PorCentoOcupado(){
        // seleciona e captura todos professores
        List<Professor> professores = mostrarTodosProfessores();

        List<Professor> professoresNaoDisponiveis = new ArrayList<>();

        for(int i =0; i < professores.size(); i++){

            Professor professor = professores.get(i);

            if(professores.get(i).getExtensao() != null){
                professoresNaoDisponiveis.add(professores.get(i));
            }else if (professor.getTurmaBootcamp().size() == 1){
                // separar a duração do propjeto final do bootcamp associado a turmaBootcamp que esta associado a professor
                Integer duracaoProjetoFinal = professor.getTurmaBootcamp().get(0).getBootcamp().getDuracaoProjetoFinal();

                // separar a dataTermino da turmaBootcamp associada a professor
                Date dataTerminoTurmaBootcamp = professor.getTurmaBootcamp().get(0).getDataTermino();
                Date dataInicioTurmaBootcamp = professor.getTurmaBootcamp().get(0).getDataInicio();

                // covertendo a data em localDate
                LocalDate dataTerminoConvertida = dataTerminoTurmaBootcamp.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                LocalDate dataInicioConvertida = dataInicioTurmaBootcamp.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

                // subtraindo da data o periodo de projeto final
                LocalDate dataTerminoSubtraindoProjetoFinal = dataTerminoConvertida.minusWeeks(duracaoProjetoFinal);

                // separando a data atual
                LocalDate dataAtual = LocalDate.now();

                // verificando se a dataAtual vem antes da dataTerminoBootcamp
                boolean verificandoSeDataEAntes = dataAtual.isBefore(dataTerminoSubtraindoProjetoFinal);
                boolean verificandoSeVaiAte = dataAtual.isAfter(dataInicioConvertida);

                // verificando se o bootcamp ainda está em andamento e se o mesmo já esta em projetoFinal
                if(verificandoSeDataEAntes && verificandoSeVaiAte){
                    professoresNaoDisponiveis.add(professores.get(i));
                }
            }
        }

        return professoresNaoDisponiveis;
    }

    public List<Professor> professores50PorCentoDisponiveis(){
        // seleciona e captura todos os professores
        List<Professor> professores = mostrarTodosProfessores();

        List<Professor> professores50 = new ArrayList<>();

        for(int i = 0; i < professores.size(); i++){
            // separar apenas um professor
            Professor professor = professores.get(i);

            if (professor.getTurmaBootcamp().size() == 1 && professor.getExtensao() == null){
                // separar a duração do propjeto final do bootcamp associado a turmaBootcamp que esta associado a professor
                Integer duracaoProjetoFinal = professor.getTurmaBootcamp().get(0).getBootcamp().getDuracaoProjetoFinal();

                // separar a dataTermino da turmaBootcamp associada a professor
                Date dataTerminoTurmaBootcamp = professor.getTurmaBootcamp().get(0).getDataTermino();
                Date dataInicioTurmaBootcamp = professor.getTurmaBootcamp().get(0).getDataInicio();

                // covertendo a data em localDate
                LocalDate dataTerminoConvertida = dataTerminoTurmaBootcamp.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                LocalDate dataInicioConvertida = dataInicioTurmaBootcamp.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

                // subtraindo da data o periodo de projeto final
                LocalDate dataTerminoSubtraindoProjetoFinal = dataTerminoConvertida.minusWeeks(duracaoProjetoFinal);

                // separando a data atual
                LocalDate dataAtual = LocalDate.now();

                // verificando se a dataAtual vem antes da dataTerminoBootcamp
                boolean verificandoSeDataEAntes = dataAtual.isBefore(dataTerminoConvertida);
                boolean verificandoSeVaiAte = dataAtual.isAfter(dataTerminoSubtraindoProjetoFinal);

                // verificando se o bootcamp ainda está em andamento e se o mesmo já esta em projetoFinal
                if(verificandoSeDataEAntes && verificandoSeVaiAte){
                    professores50.add(professores.get(i));
                }
            }
        }
        
        return professores50;
    }

    
    public Professor atribuirExtensaoAoProfessor(Integer idProfessor, Integer idExtensao) {
		
    	Optional<Extensao> extensao = extensaoRepository.findById(idExtensao);
		
    	Professor professor = buscarIdProfessor(idProfessor);
		
    	if (professores100PorCentoDisponiveis().contains(professor)) {
			professor.setIdProfessor(idProfessor);
			professor.setExtensao(extensao.get());
		}
		
    	return professorRepository.save(professor);
	}
    
    

    public Professor atribuirTurmaAoProfessor(Integer idProfessor, Integer idTurma) throws Exception {
		Optional<TurmaBootcamp> turma = turmaBootcampRepository.findById(idTurma);
		Professor professor = buscarIdProfessor(idProfessor);
		
		if (professor.getTurmaBootcamp().contains(turma.get())) {
			throw new Exception("Professor já alocado a essa turma");
			}
		else if (professores100PorCentoDisponiveis().contains(professor) 
		|| professores50PorCentoDisponiveis().contains(professor)) 
		{
		professor.setIdProfessor(idProfessor);
	
		List<TurmaBootcamp> novaListaTurmas = professor.getTurmaBootcamp();
		
		novaListaTurmas.add(turma.get());
		
		professor.setTurmaBootcamp(novaListaTurmas);
		}
		else {
			throw new Exception("Professor indisponível");
		}
		return professorRepository.save(professor);	
    }
}
