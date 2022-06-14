package SoulCode.AlocacaoDeProfessores.Models;



import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;



@Entity
public class TurmaBootcamp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTurmaBootcamp;

    @Column(nullable = false, length = 50)
    private String nome;


    @DateTimeFormat(pattern = "dd-MM-yyyy")
	@Column (columnDefinition = "Date", nullable = false)
    private Date dataInicio;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
	@Column (columnDefinition = "Date", nullable = false)
    private Date dataTermino;

    @ManyToOne
    @JoinColumn(name = "idBootcamp")
    private Bootcamp bootcamp;

    @Enumerated(EnumType.STRING)
    @Column private StatusBootcamp status;

	@JsonIgnore
    @ManyToMany
	@JoinTable(	name = "Prof_X_Turma", joinColumns = @JoinColumn(
				name = "idTurmaBootcamp", referencedColumnName = "idTurmaBootcamp"),
				inverseJoinColumns = @JoinColumn(
				name = "idProfessor", referencedColumnName = "idProfessor"))
    private List<Professor> professores = new ArrayList<>();

	public Integer getIdTurmaBootcamp() {
		return idTurmaBootcamp;
	}

	public void setIdTurmaBootcamp(Integer idTurmaBootcamp) {
		this.idTurmaBootcamp = idTurmaBootcamp;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Date getDataInicio() {
		return dataInicio;
	}

	public void setDataInicio(Date dataInicio) {
		this.dataInicio = dataInicio;
	}

	public Date getDataTermino() {
		return dataTermino;
	}

	public void setDataTermino(Date dataTermino) {
		this.dataTermino = dataTermino;
	}

	public Bootcamp getBootcamp() {
		return bootcamp;
	}


	public void setBootcamp(Bootcamp bootcamp) {
		this.bootcamp = bootcamp;
	}

	public StatusBootcamp getStatus() {
		return status;
	}

	public void setStatus(StatusBootcamp status) {
		this.status = status;
	}

	public List<Professor> getProfessores() {
		return professores;
	}

	public void setProfessores(List<Professor> professores) {
		this.professores = professores;
}



}