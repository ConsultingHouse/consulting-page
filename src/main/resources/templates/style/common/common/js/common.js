var JS = JS || {};

$(document).ready(function(){
	JS.Common = new Common();
});

Common = function(){
	this.init();
}

Common.prototype = {
	init: function(){
		this.inicializarControles();
		this.inicializarEventos();
	},

	inicializarControles: function(){
		this.$destaquesRotativos = $('.destaque_rotativo');
		this.$galeriaImagens = $('#galeria_imagens');
	},

	inicializarEventos: function(){
		var _ = this;
		if (_.$destaquesRotativos){
			_.$destaquesRotativos.each(function(i,v){
				_.inicializarCarousel($(v));
			});
		}
		if (_.$galeriaImagens){
			if (_.$galeriaImagens.length > 0){
				_.inicializarGaleria(_.$galeriaImagens);
			}
		}
	},

	inicializarCarousel: function($controle){
		var id_controle = $controle.attr('id');
		if (!id_controle){
			id_controle = 'c_'+Math.random().toString().replace('0.','');
			$controle.attr('id', id_controle);
		}
		var $inner = $('<div class="carousel-inner"></div>').attr('role', 'listbox');
		$controle.find('img').each(function(i,v){
			var $item = $('<div class="item"></div>');
			$item.append($(v).clone());
			$inner.append($item);
			$(v).remove();
		});
		$inner.children(':first').addClass('active');
		$controle.append($inner);

		var quantidade_itens = $controle.find('img').length;
  		var $seta = $('<a class="carousel-control" href="#'+id_controle+'" role="button" data-slide="">');
  		$seta.append($('<span class="glyphicon" aria-hidden="true"></span>'));
  		$seta.append($('<span class="sr-only"></span>'));
  		var $seta_esq = $seta.clone();
		$seta_esq.attr('data-slide', 'prev');
		$seta_esq.addClass('left');
		$seta_esq.find('.glyphicon').addClass('glyphicon-chevron-left');
		$seta_esq.find('sr-only').text('Anterior');
		$controle.append($seta_esq);
		var $seta_dir = $seta.clone();
		$seta_dir.attr('data-slide', 'next');
		$seta_dir.addClass('right');
		$seta_dir.find('.glyphicon').addClass('glyphicon-chevron-right');
		$seta_dir.find('sr-only').text('Próximo');
		$controle.append($seta_dir);
		
		var $bullets = $('<ol class="carousel-indicators"></ol>');
		for (var i=1; i<=quantidade_itens; i++){
			var $b = $('<li data-target="#'+id_controle+'" data-slide-to="'+i+'"></li>');
			$bullets.append($b);
		}
		$bullets.children(':first').addClass('active');
		$controle.prepend($bullets);

		$controle.addClass('carousel slide').removeClass('destaque_rotativo');

		
		if (quantidade_itens > 0){
	    	// Activate Carousel
			$controle.carousel();

			// Enable Carousel Indicators
			$bullets.children().click(function(event){
				var indice = $(event.target).attr('data-slide-to');
			    $controle.carousel(indice-1);
			});

			// Enable Carousel Controls
			$seta_esq.click(function(event){
				event.preventDefault();
			    $controle.carousel("prev");
			});
			$seta_dir.click(function(event){
			    event.preventDefault();
			    $controle.carousel("next");
			});
    	}
	},

	inicializarGaleria: function($controle){
		var $row = $('<div class="row"></div>');
		$controle.find('img').each(function(i,v){
			var $img_original = $(v);
			var img_url = $img_original.attr('src');
			var thumb_url = $img_original.attr('data-thumbnail-src') == undefined ? img_url : $img_original.attr('data-thumbnail-src');
			var title = $img_original.attr('alt');
			var $div = $('<div class="col-md-4"></div>');
			var $a = $('<a href="'+img_url+'" title="'+title+'" data-gallery></a>');
			var $img = $('<img src="'+thumb_url+'" alt="'+title+'"/>');
			$img.attr('width', '320');
			$a.append($img);
			$div.append($a);
			$row.append($div);
			$img_original.remove();
		});
		$controle.append($row);
	}
}

