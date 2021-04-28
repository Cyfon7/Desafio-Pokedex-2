function gen_pokecard (pokemon) {
	let poke_card =  `<div class="col">
						<div class="card">
							<img src="${pokemon.sprites.other.dream_world.front_default}" class="card-img-top" alt="...">
							<div class="card-body">
								<h5 class="card-title">${pokemon.name}</h5>
								<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#pokeModal" data-pokemon="${pokemon.name}">I wanna know more</button>
							</div>
					  	</div>
					  </div>`;
					  
	return poke_card;
};

function build_row (counter) {
	let poke_row = `<div class="row row-cols-4" id="row-${counter}"></div>`;
	$('#principal').append(poke_row);
};

function build_div (counter, tag, bclass, preid) {
	let poke_div = `<div class=${bclass} id="${preid}-${counter}"></div>`;
	$(tag).append(poke_div);
};

function build_badge (content) {
	let poke_badge = `<h5><span class="badge badge-info">${content}</span></h5>`;
	return poke_badge;
};

function capitalize (word) {
	let cap_word = word.charAt(0).toUpperCase()+word.substr(1)
	return cap_word;
}

function build_stat (field, content) {
	let poke_stat = `<div class="col p-0"><strong>${capitalize(field)}</strong></div>
	<div class="col p-0 text-center">${content}</div>`
	return poke_stat;
}

function build_inner_col (content) {
	let poke_ability = `<div class="col">${capitalize(content)}</div>`
	return poke_ability;
}

function build_modal_0 (){
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

function build_modal (){
	var pokeModal = `<div class="modal fade" id="pokeModal" tabindex="-1" aria-labelledby="pokeModalLabel" aria-hidden="true">
							<div class="modal-dialog">
	  							<div class="modal-content">
									<div class="modal-body">
										<div class="row">
											<div class="col">
												<img src="" id="pokeImg">
												<p id="pokeFlavor"></p>
												<div class="row container">
													<h5>Generations</h5>
													<div class="col">
														<div class="row row-cols" id="pokeGen">
														</div>
													</div>
												</div>
											</div>
											<div class="col">
												<div class="row" id="pokeName">
													<div class="col">
														<h3></h3>
													</div>
													<div class="col-auto">
														<button type="button" class="close" data-dismiss="modal" aria-label="Close">
															<span aria-hidden="true">&times;</span>
				  										</button>
													</div>
												</div>
												<div class="row" id="pokeType"></div>
												<div class="row"><div class="col" id="pokeStats"></div></div>
												<div class="row"><div class="col p-0"><h5>Abilities</h5><div id="pokeAbility"></div></div></div>
												<div class="row"><div class="col p-0"><h5>Skills</h5><div id="pokeSkill"></div></div></div>
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

			modal.find('#pokeImg').attr("src", pokemon.sprites.other.dream_world.front_default)
			modal.find('#pokeName h3').text(pokemon.name + " #" + pokemon.id)

			$.each(pokemon.game_indices, function(index){
				build_div(index+1, '#pokeGen', "col", "version");
				$('#version-'+(index+1)).text(capitalize(this.version.name));
			});

			$('#pokeType').empty();
			$.each(pokemon.types, function(index){
				build_div(index+1, '#pokeType', "col", "type");
				$('#type-'+(index+1)).append(build_badge(this.type.name));
			});

			$('#pokeStats').empty();
			build_div("1", '#pokeStats', "row", "height")
			$('#height-1').append(build_stat("height", pokemon.height));
			
			build_div("1", '#pokeStats', "row", "weight")
			$('#weight-1').append(build_stat("weight", pokemon.weight));

			$.each(pokemon.stats, function(index){
				build_div(index+1, '#pokeStats', "row", "stat")
				$('#stat-'+(index+1)).append(build_stat(this.stat.name, this.base_stat));
			});

			$('#pokeAbility').empty();
			$.each(pokemon.abilities, function(index){
				build_div(index+1, '#pokeAbility', "row", "ability")
				$('#ability-'+(index+1)).append(build_inner_col(this.ability.name));
			});
		
			$('#pokeSkill').empty();
			$.each(pokemon.moves.slice(0,5), function(index){
				build_div(index+1, '#pokeSkill', "row", "skill")
				$('#skill-'+(index+1)).append(build_inner_col(this.move.name));
			});

			update_pokemodal_2(pokename)
		})
		.fail(function(){
			console.log("Unknown Pokemon 1");
		});
}

function update_pokemodal_2(pokename){
	$.ajax('https://pokeapi.co/api/v2/pokemon-species/'+pokename)
		.done(function(pokemon){
			let modal = $('#pokeModal')
			modal.find('#pokeFlavor').text(pokemon.flavor_text_entries[0].flavor_text)
		})
		.fail(function(){
			console.log("Unknown Pokemon 2");
		});
}

function render_pokecards(offset){
	$.ajax('https://pokeapi.co/api/v2/pokemon?limit=20&offset='+offset)
		.done(function(data){
			let counter_row = 1 + offset/4;
			let poke_count = 1;
			$.each(data.results, function(index){
				if ( index % 4 == 0 ){
					console.log("index: " + index)
					console.log(counter_row)
					build_row(counter_row);
					counter_row += 1;
				}

				$.ajax(this.url)
					.done(function(poke_data){
						$('#row-'+(counter_row-1)).append(gen_pokecard(poke_data));
						poke_count += 1;
					})
					.fail(function(){
						console.log(poke_data.name + " has scaped");
					});

				if( poke_count == 4 ) {
					poke_count = 0;
					$('#principal').append($('#row-'+(counter_row-1)));
				}
			});
		})
		.fail(function(){
			console.log("Too many pokemon's at the same time!!");
		});
}

$('document').ready(function(){
	let offset = 0;
	$('body').append(build_modal())
	render_pokecards(0)

	$('#principal').on('click', 'button', function (event) {
		$('#pokeModal').on('show.bs.modal', function (event) {
  			let button = $(event.relatedTarget)
  			let recipient = button.data('pokemon') 
  			update_pokemodal_1(recipient)
		})
	});

	$('#pokeModal').on('hide.bs.modal', function (event) {
		$.when( $('#pokeModal').remove() )
			.done(function(){
				$('body').append(build_modal());
			})
	});

	$('#morePokemon').on('click', 'button', function (event) {
		offset += 20;
		render_pokecards(offset)
	});

});
