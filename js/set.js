/* SET */

$('document').ready(function () {

	// Build the deck... total of 81 cards.
	// Each card has 3 options for number, color, shape, and texture
	var numberOptions = ["1", "2", "3"];
	var colorOptions = ["#BA1E1E", "#1EBA20", "#7636C9"];
	var shapeOptions = ["0", "1", "2"];
	var textureOptions = ["1", ".3", "0"];
	var cardFeatures = [numberOptions, colorOptions, shapeOptions, textureOptions];

	// Build combinations
	var BASE = 3, LEN = 4, LIMIT = Math.round(Math.pow(BASE, LEN));
	var featureSets = [];
	for (var i = 0; i < LIMIT; ++i) {
	  var item = [];
	  for (var j = 0, k = i; j < LEN; ++j, k = Math.floor(k/BASE)) {
	    item.push(k % BASE);
	  }
	  featureSets.push(item);
	}

	// Build cards
	for ( var i=0; i<featureSets.length; i++ ) {
		var cardWrapper = document.createElement('div');
		var featureSet = featureSets[i];
		var newCard = Raphael(cardWrapper, 250, 100);
		$(cardWrapper).addClass('card');
		$(newCard).add($(cardWrapper))
			.attr('data-number', numberOptions[featureSet[0]])
			.attr('data-color', colorOptions[featureSet[1]])
			.attr('data-shape', shapeOptions[featureSet[2]])
			.attr('data-texture', textureOptions[featureSet[3]]);
		renderCard(newCard);
		$('#deck').append(cardWrapper);
	}

	// Draw a card
	function drawCard() {
		var deckSize = $('#deck .card').length;
		var drawNumber = Math.ceil((Math.random() * deckSize) - 1);
		var card = $('#deck .card').get(drawNumber);
		$(card).appendTo('#card-table');
	}

	// Set up table
	for ( var i=0; i<9; i++ ) {
		drawCard();
	}

	// Select cards to check
	$(document).on( 'click', '#card-table .card', function () {
		console.log('hello?');
		if ($(this).hasClass('selected')) {
			$(this).removeClass('selected');
		} else if ($('.selected').length < 3) {
			$(this).toggleClass('selected');
		}
	});

	// Check selected set
	$(document).on( 'click', '#check-set', function (){
		if ($('.selected').length == 3) {
			var $set = $('.selected');
			
			$set.each(function () {
				var myNumber = $(this).attr('data-number');
				numberSet = $(this).siblings('.selected[data-number="' + myNumber + '"]').length == 0 || $(this).siblings('.selected[data-number="' + myNumber + '"]').length == 2 ;

				var myColor = $(this).attr('data-color');
				colorSet = $(this).siblings('.selected[data-color="' + myColor + '"]').length == 0 || $(this).siblings('.selected[data-color="' + myColor + '"]').length == 2 ;

				var myShape = $(this).attr('data-shape');
				shapeSet = $(this).siblings('.selected[data-shape="' + myShape + '"]').length == 0 || $(this).siblings('.selected[data-shape="' + myShape + '"]').length == 2 ;

				var myTexture = $(this).attr('data-texture');
				textureSet = $(this).siblings('.selected[data-texture="' + myTexture + '"]').length == 0 || $(this).siblings('.selected[data-texture="' + myTexture + '"]').length == 2 ;
			});

			if ( numberSet && colorSet && shapeSet && textureSet ) {
				alert('Set!');
				$set.removeClass('selected').appendTo('#discard-pile');
				if ( $('#card-table .card').length < 9 ) {
					for ( var i=0; i<3; i++ ) {
						drawCard();
					}
				}
			} else {
				alert('Nope!');
			}

		} else {
			alert("Please select 3 cards.");
		}
	});

	// Draw more 
	$(document).on( 'click', '#no-sets', function (){
		for ( var i=0; i<3; i++ ) {
			drawCard();
		}
	});

});