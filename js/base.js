console.log("Hello jQuery");
	$.ajax('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
		.done(function(data){
			console.log(data.results);
			
			$.ajax(data.results[0].url)
				.done(function(data_unit){
					$('#principal').append(gen_pokecard(data_unit));
					console.log(data_unit);
					/* Name */
					console.log(data_unit.name);
					/* Orer */
					console.log(data_unit.order);
					/* Physical Data */
					console.log(data_unit.height);
					console.log(data_unit.weight);
					/* Type */
					console.log(data_unit.types[0].type.name);
					console.log(data_unit.types[1].type.name);
					/* Stripe */
					console.log(data_unit.sprites.other.dream_world.front_default);
					/* Abilities */
					console.log(data_unit.abilities[0].ability.name);
					console.log(data_unit.abilities[1].ability.name);
					/* Moves */
					console.log(data_unit.moves[0].move.name);
					console.log(data_unit.moves[1].move.name);
					console.log(data_unit.moves[2].move.name);
					console.log(data_unit.moves[3].move.name);
					console.log(data_unit.moves[4].move.name);
					/* Stats */
					console.log(data_unit.stats[0].stat.name);
					console.log(data_unit.stats[0].base_stat);
					console.log(data_unit.stats[1].stat.name);
					console.log(data_unit.stats[1].base_stat);
					console.log(data_unit.stats[2].stat.name);
					console.log(data_unit.stats[2].base_stat);
					console.log(data_unit.stats[3].stat.name);
					console.log(data_unit.stats[3].base_stat);
					console.log(data_unit.stats[4].stat.name);
					console.log(data_unit.stats[4].base_stat);
					console.log(data_unit.stats[5].stat.name);
					console.log(data_unit.stats[5].base_stat);
				})	
				.fail(function(error){
					if(error.status == 404) {
						console.log('Pokemon not Found');
					}
				});	
		})
		.fail(function(error){
			if(error.status == 404) {
				console.log('PokeAPI not found');
			}
		});

	$.ajax('https://pokeapi.co/api/v2/pokemon-species/1/')
	.done(function(data_see){
		console.log(data_see.generation.name);
		console.log(data_see.flavor_text_entries[0].flavor_text);
	});

	$.ajax('https://pokeapi.co/api/v2/evolution-chain/1/')
	.done(function(data_evol){
		console.log(data_evol.chain.evolves_to[0].species.name);
	});





});
