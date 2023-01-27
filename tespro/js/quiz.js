$(document).ready(function () {
    var total;
    var quiz = [];
    var scormData = new ScormData();

    if(!$('.js__recurso-multipla-escolha').length) return;
    total = $('.js__recurso-multipla-escolha').length;
    console.log(total);

    $('.js__recurso-multipla-escolha').each(function(idquestao) {
        quiz.push({
            id:idquestao,
            acerto:false,
            element:this,
            respondida:false
        });
        var recurso = this
        var fecha   = function() {
            $(recurso).removeClass('recurso-multipla-escolha--errado');
            $(recurso).removeClass('recurso-multipla-escolha--correto');
        };

        defineInputType(recurso);

        $(recurso).find('.recurso-multipla-escolha__btn_confirmar').on('click', function (e) {
            var marcadas = $(recurso).find(':checked');
            if (!marcadas.length) return;
            
            var alternativas = $(recurso).find('.recurso-multipla-escolha__alternativas:not(.recurso-multipla-escolha__pdf_true) :checkbox, :radio');
            var respostaCorreta = true;
            
            for (let index = 0; index < alternativas.length; index++) {
                const alternativa = alternativas[index];

                var marcouErrada = alternativa.checked && alternativa.value != 1;
                var naoMarcouCorreta = !alternativa.checked && alternativa.value == 1;
                
                if (marcouErrada || naoMarcouCorreta) {
                    respostaCorreta = false;
                    break;
                }
            }

            var qualQuiz = quiz.find(el => el.id == idquestao);
            qualQuiz.acerto = respostaCorreta;
            qualQuiz.respondida = true;
            gravaScore();


            if (respostaCorreta)
                return $(recurso).addClass('recurso-multipla-escolha--correto');
            $(recurso).addClass('recurso-multipla-escolha--errado');
        })

        $(this).find('.js__recurso-multipla-escolha__modal').on('click', function(e) {
            if(e.currentTarget == e.target) fecha();
        });
        $(this).find('.js__recurso-multipla-escolha__fechar').on('click', function(e) {
            fecha();
        });
    });

    function defineInputType(recurso) {
        var alternativas = $(recurso).find('.recurso-multipla-escolha__alternativas input.recurso-multipla-escolha-false');

        var contagemRespostaCorreta = 0;
        for (let index = 0; index < alternativas.length; index++) {
            if (alternativas[index].value == 1)
                contagemRespostaCorreta++;
            if (contagemRespostaCorreta > 1)
                break;
        }

        if (contagemRespostaCorreta == 1)
            for (let index = 0; index < alternativas.length; index++) {
                alternativas[index].type = 'radio'; 
            }
    }

    function gravaScore(){
        var respondidas = quiz.filter(el => el.respondida == true);
        if(respondidas.length == quiz.length){            
            var acertos = quiz.filter(el => el.acerto == true).length;            
            var nota = (acertos / quiz.length) * 100;
            scormData.set("cmi.core.score.min", 70);
            scormData.set("cmi.core.score.max", 100);
            scormData.set("cmi.core.score.raw", nota);
        }
    }
});