package SoulCode.AlocacaoDeProfessores.Models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
public class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idProfessor;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 100, unique = true)
    private String email;

    @ManyToMany
    @JoinTable(name = "Prof_X_Turma", joinColumns = @JoinColumn(
    			name = "idProfessor", referencedColumnName = "idProfessor"),
    			inverseJoinColumns = @JoinColumn(
    			name = "idTurmaBootcamp", referencedColumnName = "idTurmaBootcamp"))
    private List<TurmaBootcamp> turmaBootcamp = new ArrayList<>();

    @ManyToMany
	@JoinTable(	name = "Prof_X_Habilidade", joinColumns = @JoinColumn(
				name = "idProfessor", referencedColumnName = "idProfessor"),
				inverseJoinColumns = @JoinColumn(
				name = "idHabilidadeTecnica", referencedColumnName = "idHabilidadeTecnica"))
    private List<HabilidadeTecnica> habilidadeTecnica = new ArrayList<>();


    @ManyToOne
    @JoinColumn(name = "idBootcamp")
    private Bootcamp bootcamp;


	@ManyToOne
    @JoinColumn(name = "idExtensao")
    private Extensao extensao;


	public void setIdProfessor(Integer idProfessor) {
		this.idProfessor = idProfessor;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
      public Integer getIdProfessor() {
        return idProfessor;
    }

	public Bootcamp getBootcamp() {
		return bootcamp;
	}

	public void setBootcamp(Bootcamp bootcamp) {
		this.bootcamp = bootcamp;
	}

	public Extensao getExtensao() {
		return extensao;
	}

	public void setExtensao(Extensao extensao) {
		this.extensao = extensao;
	}

	public List<TurmaBootcamp> getTurmaBootcamp() {
		return turmaBootcamp;
	}

	public void setTurmaBootcamp(List<TurmaBootcamp> turmaBootcamp) {
		this.turmaBootcamp = turmaBootcamp;
	}
	
	public List<HabilidadeTecnica> getHabilidadeTecnica() {
		return habilidadeTecnica;
	}

	public void setHabilidadeTecnica(List<HabilidadeTecnica> habilidadeTecnica) {
		this.habilidadeTecnica = habilidadeTecnica;
	}

}
