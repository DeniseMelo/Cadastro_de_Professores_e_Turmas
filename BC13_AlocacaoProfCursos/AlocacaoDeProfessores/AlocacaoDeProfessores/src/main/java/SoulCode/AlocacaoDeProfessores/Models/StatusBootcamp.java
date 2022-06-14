package SoulCode.AlocacaoDeProfessores.Models;



public enum StatusBootcamp {
	
	
		ABERTA("Aberta"),

	    PROXIMATURMA ("Proxima Turma"),

	    ENCERRADA("Encerrada");

	    private String descricao;

	    StatusBootcamp(String descricao) {this.descricao = descricao; }

	    public String getDescricao () {return descricao;}

}
