package SoulCode.AlocacaoDeProfessores.Models;

public enum StatusExtensao {
    ABERTA("Aberta"),

    PROXIMATURMA ("Proxima Turma"),

    ENCERRADA("Encerrada");



    private String descricao;

    StatusExtensao(String descricao) {this.descricao = descricao; }

    public String getDescricao () {return descricao;}

}
