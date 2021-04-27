function gen_pokecard (pokemon) {
	let poke_card =  `<div class="card col-3" style="width: 18rem;">
						<img src="${pokemon.sprites.other.dream_world.front_default}" class="card-img-top" alt="...">
						<div class="card-body">
							<h5 class="card-title">${pokemon.name}</h5>
							<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#pokeModal" data-pokemon="${pokemon.name}">I wanna know more</button>
						</div>
					  </div>`;
					  
	return poke_card;
};

function build_row (counter) {
	let poke_row = `<div class="row" id="row-${counter}"></div>`;
	$('#principal').append(poke_row);
};

function build_div (counter, tag, bclass, preid) {
	let poke_div = `<div class=${bclass} id="${preid}-${counter}"></div>`;
	$(tag).append(poke_div);
};

function build_modal (){
	var pokeModal = `<div class="modal fade" id="pokeModal" tabindex="-1" aria-labelledby="pokeModalLabel" aria-hidden="true">
							<div class="modal-dialog">
	  							<div class="modal-content">
									<div class="modal-header">
			  							<h5 class="modal-title" id="pokeModalLabel">PokeModal</h5>
			  							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
			  							</button>
									</div>
									<div class="modal-body">
										<div class="row">
											<div class="col">
												<img src="" id="pokeImg">
												<p id="pokeFlavor"></p>
												<div class="row" id="pokeGen"><h5>Generations</h5></div>
											</div>
											<div class="col">
												<div class="row" id="pokeName"><h3></h3></div>
												<div class="row" id="pokeType"><h5>Type</h5></div>
												<div class="row"><div class="container col" id="pokeStats"><h5>Stats</h5></div></div>
												<div class="row"><div class="col" id="pokeAbility"><h5>Abilities</h5></div></div>
												<div class="row"><div class="col" id="pokeSkill"><h5>Skills</h5></div></div>
												<div class="row" id="pokeEvol"></div>
											</div>
										</div>
									</div>
									<div class="modal-footer">
					  					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
									</div>
	  							</div>
							</div>
						</div>`;
	return pokeModal;
};

function update_pokemodal_1(pokename){
	$.ajax('https://pokeapi.co/api/v2/pokemon/'+pokename)
		.done(function(pokemon){
			modal = $('#pokeModal')
			modal.find('.modal-title').text(pokename)

			modal.find('#pokeImg').attr("src", pokemon.sprites.	other.dream_world.front_default)
			modal.find('#pokeName h3').text(pokemon.name)

			$.each(pokemon.game_indices, function(index){
				/*$('<div />', {
					'class' : 'col', 
					text : this.version.name,
					appendTo : "#pokeGen"
				  });					
				  */
				build_div(index+1, '#pokeGen', "col", "version")
				$('#version-'+(index+1)).text(this.version.name);
			});

			$.each(pokemon.types, function(index){
				/*$('<div />', {
					'class' : 'col', 
					text : this.type.name,
					appendTo : "#pokeType"
				  });
				  */
				build_div(index+1, '#pokeType', "col", "type")
				$('#type-'+(index+1)).text(this.type.name);
			});
/*
			$('<div />', {
				'class' : 'row', 
				text : "Height: " + pokemon.height,
				appendTo : "#pokeStats"
			  });
			  

			$('<div />', {
				'class' : 'row', 
				text : "Weight: " + pokemon.weight,
				appendTo : "#pokeStats"
			  });
*/

			build_div("1", '#pokeStats', "row", "height")
			$('#height-1').text("Height: " + pokemon.height);

			build_div("1", '#pokeStats', "row", "weight")
			$('#weight-1').text("Weight: " + pokemon.weight);

			$.each(pokemon.stats, function(index){
				/*$('<div />', {
					'class' : 'row', 
					text : this.stat.name + ": " + this.base_stat,
					appendTo : "#pokeStats"
				  });
				*/
				build_div(index+1, '#pokeStats', "row", "stat")
				$('#stat-'+(index+1)).text(this.stat.name + ": " + this.base_stat);
			});

			console.log(pokemon.abilities.slice(0,2))
			$.each(pokemon.abilities.slice(0,2), function(index){
				/*$('<li />', { 
					text : this.ability.name,
					appendTo : "#pokeAbility"
				  });
				*/
				build_div(index+1, '#pokeAbility', "row", "ability")
				$('#ability-'+(index+1)).text(this.ability.name);
			});
		
			$.each(pokemon.moves.slice(0,5), function(index){
				/*$('<li />', { 
					text : this.move.name,
					appendTo : "#pokeSkill"
				  });
				*/
				build_div(index+1, '#pokeSkill', "row", "skill")
				$('#skill-'+(index+1)).text(this.move.name);
			});

			update_pokemodal_2(pokename)
		});
}

function update_pokemodal_2(pokename){
	$.ajax('https://pokeapi.co/api/v2/pokemon-species/'+pokename)
		.done(function(pokemon){
			var modal = $('#pokeModal')
			modal.find('#pokeFlavor').text(pokemon.flavor_text_entries[0].flavor_text)
		});
}







$('document').ready(function(){
$.ajax('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
	.done(function(data){
		let counter_row = 1;
		let poke_count = 1;
		$.each(data.results, function(index){
			$.ajax(this.url)
				.done(function(poke_data){
					if ( index % 4 == 0 ){
						build_row(counter_row);
						counter_row += 1;
					}
				
					$('#row-'+(counter_row-1)).append(gen_pokecard(poke_data));
					poke_count += 1;
				
					if( poke_count == 4) {
						poke_count = 0;
						$('#principal').append($('#row-'+(counter_row-1)));
					}
				});
		});
		$('body').append(build_modal())
	});

	$('#principal').on('click', 'button', function (event) {
	
		$('#pokeModal').on('show.bs.modal', function (event) {
  			var button = $(event.relatedTarget) // Button that triggered the modal
  			var recipient = button.data('pokemon') // Extract info from data-* attributes
  			// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  			// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
		
  			update_pokemodal_1(recipient)
			/*update_pokemodal_2(recipient)*/
		})

	});
	

	$('#pokeModal').on('hide.bs.modal', function (event) {
		$('#pokeModal').remove();
		$('body').append(build_modal());
	});

});
