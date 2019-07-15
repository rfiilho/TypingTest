$("#numeroPalavras").text($(".frase").text().split(" ").length)
var tempoInicial = $("#tempoDigitacao").text()


$(function(){
    iniciaContador()
    iniciaCronometro()
    controlaBorda()
    $("#btnRestart").click(reiniciaJogo)
    $(".btnRemove").click(removeLinha)
})

function iniciaContador(){
    $(".campoDigitacao").on("input", function(){
        conteudo = $(".campoDigitacao").val()
        qtdPalavras = conteudo.split(/\S+/).length - 1
        $("#contPal").text(qtdPalavras)
        $("#contCarac").text(conteudo.length)
    })
}


function controlaBorda(){
    var frase = $(".frase").text();
    $(".campoDigitacao").on("input", function(){
        var digitado = $(".campoDigitacao").val()

        if(frase.startsWith(digitado)){
            $(".campoDigitacao").removeClass("bordaVermelha")
            $(".campoDigitacao").addClass("bordaVerde")
        }else{
            $(".campoDigitacao").removeClass("bordaVerde")
            $(".campoDigitacao").addClass("bordaVermelha")
        }
    })
}

function iniciaCronometro(){
    var tempoRestante = $("#tempoDigitacao").text()
    $(".campoDigitacao").one("focus", function(){
        $("#btnRestart").attr("disabled",true);
        var cronometroID = setInterval(function(){
                tempoRestante--
                $("#tempoDigitacao").text(tempoRestante)
                if(tempoRestante < 1){
                    clearInterval(cronometroID)
                    gameOver()
                }
        }, 1000)
    })
}

function gameOver(){
    $(".campoDigitacao").attr("disabled", true)
    $("#btnRestart").attr("disabled",false);
    var corpoTabela = $(".placar").find("tbody")
    var numPalavras = $("#contPal").text()
    var usuario = "Renato"
    var linha = novaLinha(usuario, numPalavras)
    linha.find(".btnRemove").click(removeLinha)
    corpoTabela.prepend(linha)
}

function removeLinha(event){
    event.preventDefault()
    $(this).parent().parent().remove()
}

function novaLinha(usuario, palavras){
    var linha = $("<tr>")
    var colUsuario = $("<td>").text(usuario)
    var colPalavras = $("<td>").text(palavras)
    var colRemover = $("<td>")

    var link = $("<a>").attr("href", "#").addClass("btnRemove")
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete")

    link.append(icone)
    colRemover.append(link)

    linha.append(colUsuario)
    linha.append(colPalavras)
    linha.append(colRemover)

    return linha
}

function reiniciaJogo(){
        $(".campoDigitacao").attr("disabled", false)
        $(".campoDigitacao").val("")
        $("#contPal").text("0")
        $("#contCarac").text("0")
        $("#tempoDigitacao").text(tempoInicial)
        iniciaCronometro()
        $(".campoDigitacao").removeClass("bordaVerde")
        $(".campoDigitacao").removeClass("bordaVermelha")
}