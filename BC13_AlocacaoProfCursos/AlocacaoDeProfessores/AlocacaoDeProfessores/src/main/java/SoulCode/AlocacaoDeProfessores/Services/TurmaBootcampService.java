package SoulCode.AlocacaoDeProfessores.Services;


import SoulCode.AlocacaoDeProfessores.Models.Bootcamp;
import SoulCode.AlocacaoDeProfessores.Models.TurmaBootcamp;
import SoulCode.AlocacaoDeProfessores.Repositories.TurmaBootcampRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TurmaBootcampService {
	
	@Autowired
	TurmaBootcampRepository turmaBootcampRepository;

	@Autowired
	BootcampService bootcampService;

	
	public List<TurmaBootcamp> mostrarTodosTurmaBootcamp(){
		return turmaBootcampRepository.findAll();
		
	}
	
	public TurmaBootcamp mostrarUmaTurmaBootcamp(Integer idTurmaBootcamp) {
		Optional<TurmaBootcamp> turmaBootcamp = turmaBootcampRepository.findById(idTurmaBootcamp);
		return turmaBootcamp.orElseThrow();
	}
	
	public TurmaBootcamp inserirTurmaBootcamp(TurmaBootcamp turmaBootcamp) {
		turmaBootcamp.setIdTurmaBootcamp(null);
		return turmaBootcampRepository.save(turmaBootcamp);
		
	}
	
	public TurmaBootcamp editarTurmaBootcamp(TurmaBootcamp turmaBootcamp) {
		mostrarUmaTurmaBootcamp(turmaBootcamp.getIdTurmaBootcamp());
		return turmaBootcampRepository.save(turmaBootcamp);
	}
	
	public void excluirTurmaBootcamp(Integer idTurmaBootcamp) {
		mostrarUmaTurmaBootcamp(idTurmaBootcamp);
		turmaBootcampRepository.deleteById(idTurmaBootcamp);
	}
	
	public List<TurmaBootcamp> mostrarTurmasPorProf(Integer idProf){
		return turmaBootcampRepository.findByProfessor(idProf);
	}

	public List<TurmaBootcamp> buscarBootcampPeloStatus(String status){
		return turmaBootcampRepository.findByStatus(status);
	}

	public ZonedDateTime calculaDataFinal(Integer idTurmaBootcamp){
		// capturar a turma e seus dados
		TurmaBootcamp turma = mostrarUmaTurmaBootcamp(idTurmaBootcamp);

		// capturando duração do bootcamp atrelado a turma_Bootcamp
		Integer duracao = turma.getBootcamp().getDuracao();

		// capturando data de inicio da turma_Bootcamp e covertendo para o tipo LocalDateTime
		LocalDateTime dataInicio = turma.getDataInicio().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

		// convertendo a data para ZonedDateTime para pegar o Fuso horário de São Paulo
		ZonedDateTime dataConvertida = ZonedDateTime.of(dataInicio, ZoneId.of("America/Sao_Paulo"));

		// adicionando as semanas da data de inicio do bootcamp
		ZonedDateTime dataFinal = dataConvertida.plusWeeks(duracao);

		return dataFinal;
	}

	public ZonedDateTime calculaDataInicio(Integer idTurmaBootcamp){
		// capturar a turma e seus dados
		TurmaBootcamp turma = mostrarUmaTurmaBootcamp(idTurmaBootcamp);

		// capturando duração do bootcamp atrelado a turma_Bootcamp
		Integer duracao = turma.getBootcamp().getDuracao();

		// capturando data de inicio da turma_Bootcamp e covertendo para o tipo LocalDateTime
		LocalDateTime dataInicio = turma.getDataTermino().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

		// convertendo a data para ZonedDateTime para utilizar o método plusWeeks()
		ZonedDateTime dataConvertida = ZonedDateTime.of(dataInicio, ZoneId.of("America/Sao_Paulo"));

		// subtraindo as semanas da data de inicio do bootcamp
		ZonedDateTime dataFinal = dataConvertida.minusWeeks(duracao);

		return dataFinal;
	}


	public ZonedDateTime calculaDataFinalDeNovaTurma(Integer idBootcamp, String dataInicio){

		// capturando o bootcamp(carreira) solicitado
		Bootcamp bootcamp = bootcampService.buscarIdBootcamp(idBootcamp);

		// capturando duração do bootcamp selecionado
		Integer duracao = bootcamp.getDuracao();

		// convertendo o parâmetro tipo String em um LocalDate
		LocalDate recebendoData = LocalDate.parse(dataInicio);

		// convertendo recebendoData em LocalDateTime
		LocalDateTime dataInicioDateTime = recebendoData.atTime(0,0);

		// convertendo a data para ZonedDateTime para utilizar o método plusWeeks()
		ZonedDateTime dataConvertida = ZonedDateTime.of(dataInicioDateTime, ZoneId.of("America/Sao_Paulo"));

		// adicionando as semanas da data de inicio do bootcamp
		ZonedDateTime dataFinal = dataConvertida.plusWeeks(duracao);

		return dataFinal;
	}

	public ZonedDateTime calculaDataInicioDeNovaTurma(Integer idBootcamp, String dataTermino){
		// capturando o bootcamp(carreira) solicitado
		Bootcamp bootcamp = bootcampService.buscarIdBootcamp(idBootcamp);

		// capturando duração do bootcamp selecionado
		Integer duracao = bootcamp.getDuracao();

		// convertendo o parâmetro tipo String em um LocalDate
		LocalDate recebendoData = LocalDate.parse(dataTermino);

		// convertendo recebendoData em LocalDateTime
		LocalDateTime dataInicioDateTime = recebendoData.atTime(0,0);

		// convertendo a data para ZonedDateTime para utilizar o método plusWeeks()
		ZonedDateTime dataConvertida = ZonedDateTime.of(dataInicioDateTime, ZoneId.of("America/Sao_Paulo"));

		// adicionando as semanas da data de inicio do bootcamp
		ZonedDateTime dataFinal = dataConvertida.minusWeeks(duracao);

		return dataFinal;
	}
}
