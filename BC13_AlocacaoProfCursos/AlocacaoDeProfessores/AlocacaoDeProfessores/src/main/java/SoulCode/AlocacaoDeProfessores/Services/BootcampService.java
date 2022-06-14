package SoulCode.AlocacaoDeProfessores.Services;

import SoulCode.AlocacaoDeProfessores.Models.Bootcamp;
import SoulCode.AlocacaoDeProfessores.Repositories.BootcampRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BootcampService {
    @Autowired
	
	
    BootcampRepository bootcampRepository;

    public List<Bootcamp> mostrarTodosBootcamps() {
        return bootcampRepository.findAll();
    }
    public Bootcamp buscarIdBootcamp(Integer idBootcamp) {
        Optional<Bootcamp> bootcamp = bootcampRepository.findById(idBootcamp);
        return bootcamp.orElseThrow();
    }

    public Bootcamp inserirBootcamp(Bootcamp bootcamp){
        bootcamp.setIdBootcamp(null);
        return bootcampRepository.save(bootcamp);
    }

    public Bootcamp editarBootcamp(Bootcamp bootcamp) {
        buscarIdBootcamp(bootcamp.getIdBootcamp());
        return bootcampRepository.save(bootcamp);
    }

    public void excluirBootcamp(Integer idBootcamp) {
        buscarIdBootcamp(idBootcamp);
        bootcampRepository.deleteById(idBootcamp);
    }

}
