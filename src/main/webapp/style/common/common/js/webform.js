var JS = JS || {};

$(document).ready(function(){
	JS.WebFormsUtil = new WebFormsUtil();
});

WebFormsUtil = function(){
	this.init();
}

WebFormsUtil.prototype = {
	init: function(){
		this.inicializarControles();
		this.inicializarEventos();

        this.mostrarComplementoRestricao();
	},

	inicializarControles: function(){
        this.$restricaoOutro = $('.form-group .RestricaoAlimentar__c input[type="checkbox"][value="Outro"]');
        this.$complementoRestricao = $('textarea.ComplementoRestricaoAlimentar__c').closest('.form-group');
        
	},

	inicializarEventos: function(){
		var _ = this;
		_.arrumarCalendario();
		_.verificarMensagemErro();
		_.controlarRestricoesAlimentares();
	},

	/* Calendário - mudar range de anos */
	arrumarCalendario: function(){
        var $calYearPicker = $('#calYearPicker');
        if ($calYearPicker.length > 0){
            $calYearPicker.children().remove();
            for (var year=1900; year<2020; year++){
                var $ano = $('<option></option>');
                $ano.text(year);
                $ano.val(year);
                $calYearPicker.append($ano);
            }
        }
	},

	/*  Animacao de scroll de mensagem de erro */
	verificarMensagemErro: function() {
        var _ = this;
		// mensagem de erro
        var $container_erro = $('ul[role="alert"]');
        if ($container_erro.length > 0){
            setTimeout(function(){ _.jump('formulario'); }, 1000);
        }
	},

	controlarRestricoesAlimentares: function(){
        var _ = this;
		if ((_.$restricaoOutro.length > 0) && (_.$complementoRestricao.length > 0)){
			_.$restricaoOutro.off('click').click(function(){
				_.mostrarComplementoRestricao();
			});
		}
	},

    mostrarComplementoRestricao: function(){
        var _ = this;
        if (_.$restricaoOutro.is(':checked')){
            _.$complementoRestricao.css('visibility', 'visible');
        }
        else{
            _.$complementoRestricao.css('visibility', 'hidden');
        }
    },


	/* Funções auxiliares */
	// Pular a tela para uma posicao especifica
    jump: function(h) {
        var top = document.getElementById(h).offsetTop,
            left = document.getElementById(h).offsetLeft;
        var animator = JS.WebFormsUtil.createAnimator({
            start: [0,0],
            end: [left, top],
            duration: 1000
        }, function(vals){
            console.log(arguments);
            window.scrollTo(vals[0], vals[1]);
        });
        
        //run
        animator();
    },
    
    //Animator
    //Licensed under the MIT License
    createAnimator: function(config, callback, done) {
        if (typeof config !== "object") throw new TypeError("Arguement config expect an Object");
        
        var start = config.start,
            mid = $.extend({}, start), //clone object
            math = $.extend({}, start), //precalculate the math
            end = config.end,
            duration = config.duration || 1000,
            startTime, endTime;
        
        //t*(b-d)/(a-c) + (a*d-b*c)/(a-c);
        function precalculate(a, b, c, d) {
            return [(b - d) / (a - c), (a * d - b * c) / (a - c)];
        }
        
        function calculate(key, t) {
            return t * math[key][0] + math[key][1];
        }
        
        function step() {
            var t = Date.now();
            var val = end;
            if (t < endTime) {
                val = mid;
                for (var key in mid) {
                    mid[key] = calculate(key, t);
                }
                callback(val);
                requestAnimationFrame(step);
            } else {
                callback(val);
                done && done();
            }
        }
        
        return function () {
            startTime = Date.now();
            endTime = startTime + duration;
            
            for (var key in math) {
                math[key] = precalculate(startTime, start[key], endTime, end[key]);
            }
            
            step();
        }
    }
}

