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
/* Utility */
function capitalize (word) {
	var cap_word = word.charAt(0).toUpperCase()+word.substr(1)
	return cap_word;
};

function removeAllChildNodes(parent){
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
};

/* Poke Builders */
function build_row (counter) {
	var div = document.createElement("div");
	div.className = "row row-cols-4";
	div.id = "row-" + counter;

	document.getElementById('principal').appendChild(div);
};

function build_div (counter, tag, bclass, preid) {
	var div = document.createElement("div");
	div.className = bclass;
	div.id = preid + "-" + counter;

	document.getElementById(tag).appendChild(div);
};

function build_badge (content, tag) {
	var h5 = document.createElement("h5");
		var span = document.createElement("span");
		span.className = "badge badge-info";
		span.appendChild( document.createTextNode(content.name) );

		var button = document.createElement("button");
		button.setAttribute("type", "button");
		button.setAttribute("data-toggle", "modal");
		button.setAttribute("data-target", "#pokeTypeModal");
		button.setAttribute("data-poketypeurl", content.url);
		button.className = "btn btn-link py-0 px-1";
			var i = document.createElement("i");
			i.setAttribute("data-toggle","tooltip");
			i.setAttribute("data-trigger","hover");
			i.setAttribute("title","See DMG Relations");
			i.className = "far fa-question-circle";

		button.appendChild(i);	
	h5.appendChild(span);
	h5.appendChild(button);

	document.getElementById(tag).appendChild(h5);
};

function build_stat (field, content, tag) {
	var div1 = document.createElement("div");
	var div2 = document.createElement("div");
	var strong = document.createElement("strong");
	strong.appendChild( document.createTextNode(capitalize(field)) );
	div1.appendChild(strong);
	div1.className = "col p-0";
	div2.className = "col p-0 text-center";
	div2.appendChild( document.createTextNode(content) );

	var parent_element = document.getElementById(tag);
	parent_element.appendChild(div1);
	parent_element.appendChild(div2);
};

function build_inner_col (content, tag, ability_url) {
	var parent = document.getElementById(tag);
	var div = document.createElement("div");
	div.className = "col";
	div.appendChild( document.createTextNode( capitalize(content.name) ) );	
	parent.appendChild(div);

	if (ability_url) {
		var div2 = document.createElement("div");
		div2.setAttribute("data-toggle","tooltip");
		div2.setAttribute("data-trigger","hover");
		div2.setAttribute("title","See Pokemon's with the same Ability");
		
		div2.className = "col";
		
			var button = document.createElement("button");
			button.setAttribute("type", "button");
			button.setAttribute("data-toggle", "modal");
			button.setAttribute("data-target", "#pokeAbilityModal");
			button.setAttribute("data-pokeabilityurl", content.url);
			button.className = "btn btn-link pt-1 px-1"
				var i = document.createElement("i");
				i.className = "fas fa-list";
			button.appendChild(i);

		div2.appendChild(button);
		parent.appendChild(div2);
	}
	
};

function build_li (content){
	var poke_type = document.createTextNode(content);
	var li = document.createElement("li");
	li.appendChild(poke_type);

	return li;
};

function build_table_row(th_data, td_data, tag, modal_tag){
	var modal = document.getElementById(modal_tag);
	var tr = document.createElement("tr");
		var th = document.createElement("th");
		th.appendChild( document.createTextNode(th_data) );

		var td = document.createElement("td");
			var ul = document.createElement("ul");

			td_data.forEach(function(poke_type){
				ul.appendChild( build_li(poke_type.name) )
			})
		td.appendChild(ul);
	tr.appendChild(th);
	tr.appendChild(td);

	modal.querySelector("#"+tag).appendChild(tr);
};

/* Poke Methods */
function gen_pokecard (pokemon, tag) {
	var poke_card = document.createElement("div");
	poke_card.className = "col";
		var card = document.createElement("div");
		card.className = "card";
			var img = document.createElement("img");
			img.src = pokemon.sprites.other.dream_world.front_default;
			img.className = "card-img-top"
			var card_body = document.createElement("div");
			card_body.className = "card-body";
				var h5 = document.createElement("h5");
				h5.className = "card-title";
				h5.appendChild( document.createTextNode(pokemon.name) );
				var button = document.createElement("button");
				button.type = "button";
				button.className = "btn btn-primary"
				button.setAttribute("data-toggle", "modal");
				button.setAttribute("data-target", "#pokeModal");
				button.setAttribute("data-pokemon", pokemon.name);
				button.appendChild( document.createTextNode("I wanna know more") );
			card_body.appendChild(h5);
			card_body.appendChild(button);
		card.appendChild(img);
		card.appendChild(card_body);
	poke_card.appendChild(card);

	document.getElementById(tag).appendChild(poke_card);
};

function render_pokecards(offset){
	fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset='+offset)
		.then(response => response.json())
		.then(function(pokemon_data){
			var counter_row = 1 + offset/4;

			pokemon_data.results.forEach( function(data, index){
				if ( index % 4 == 0 ){
					console.log("index: " + index)
					console.log(counter_row)
					build_row(counter_row);
					counter_row += 1;
				}

				fetch(data.url)
					.then(response2 => response2.json())
					.then(function(poke_data){
						gen_pokecard(poke_data, 'row-'+(counter_row-1));
					})
					.catch(function(error){
						console.log(data.name + " has scaped");
						console.log(error);
					});
			});
		})
		.catch(function(error){
			console.log("Too many pokemon's at the same time!!");
			console.log(error);
		});
};

function build_pokemodal (){
	var poke_modal = new DOMParser().parseFromString(`<div class="modal fade" id="pokeModal" tabindex="-1" aria-labelledby="pokeModalLabel" aria-hidden="true">
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
						</div>`, 'text/html');
	document.querySelector('body').prepend(poke_modal.body.firstChild);
};

function update_pokemodal_1(pokename){
	fetch('https://pokeapi.co/api/v2/pokemon/'+pokename)
		.then(response => response.json())
		.then(function(pokemon){

			var modal = document.getElementById('pokeModal');

			modal.querySelector('#pokeImg').setAttribute("src", pokemon.sprites.other.dream_world.front_default);
			modal.querySelector('#pokeName h3').textContent = pokemon.name + " #" + pokemon.id;

			var gen = modal.querySelector('#pokeGen');
			pokemon.game_indices.forEach( function(indice, index) {
				build_div(index+1, 'pokeGen', "col", "version");
				gen.querySelector('#version-'+(index+1)).textContent = capitalize(indice.version.name);
			});

			removeAllChildNodes(modal.querySelector('#pokeType'));
			pokemon.types.forEach( function(type, index){
				build_div(index+1, 'pokeType', "col", "type");
				build_badge(type.type, 'type-'+(index+1));
			});

			removeAllChildNodes(modal.querySelector('#pokeStats'));
			build_div("1", 'pokeStats', "row", "height")
			build_stat("height", pokemon.height, 'height-1');
			
			build_div("1", 'pokeStats', "row", "weight")
			build_stat("weight", pokemon.weight, 'weight-1');

			pokemon.stats.forEach( function(stat, index){
				build_div(index+1, 'pokeStats', "row", "stat")
				build_stat(stat.stat.name, stat.base_stat,'stat-'+(index+1));
			});
			
			removeAllChildNodes(modal.querySelector('#pokeAbility'));
			pokemon.abilities.forEach( function(ability, index){
				build_div(index+1, 'pokeAbility', "row", "ability")
				build_inner_col(ability.ability, 'ability-'+(index+1), true);
			});
		
			removeAllChildNodes(modal.querySelector('#pokeSkill'));
			pokemon.moves.slice(0,5).forEach( function(move, index){
				build_div(index+1, 'pokeSkill', "row", "skill")
				build_inner_col(move.move, 'skill-'+(index+1), false);
			});

			update_pokemodal_2(pokename)
		})
		.catch(function(error){
			console.log("Unknown Pokemon 1");
			console.log(error);
		})
};

function update_pokemodal_2(pokename){
	fetch('https://pokeapi.co/api/v2/pokemon-species/'+pokename)
		.then(response => response.json())
		.then(function(pokemon){
			let modal = document.getElementById('pokeModal');
			modal.querySelector('#pokeFlavor').textContent = pokemon.flavor_text_entries[0].flavor_text;
		})
		.catch(function(error){
			console.log("Unknown Pokemon 2");
			console.log(error);
		});
};

function build_poketype_modal (){
	var poke_type = new DOMParser().parseFromString(`<div class="modal fade" id="pokeTypeModal" tabindex="-1" aria-labelledby="pokeTypeModalLabel" aria-hidden="true">
							<div class="modal-dialog modal-dialog-scrollable">
	  							<div class="modal-content">
									<div class="modal-header">
										<h5 class="modal-title">Damage Relations</h5>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div class="modal-body">
										<table class="table">
											<tbody id="dmgRelations">
											</tbody>
										</table>
									</div>
									<div class="modal-footer">
					  					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
									</div>
	  							</div>
							</div>
						</div>`, 'text/html');
	document.querySelector('body').appendChild(poke_type.body.firstChild);
};

function update_poketype_modal(poke_url){
	var modal = document.getElementById('pokeTypeModal');
	removeAllChildNodes(modal.querySelector('#dmgRelations'));

	fetch(poke_url)
		.then(response => response.json())
		.then(function(poke_data){
			var dmg_relations = poke_data.damage_relations
			
			for (var key in dmg_relations){
				build_table_row(key, dmg_relations[key], 'dmgRelations', 'pokeTypeModal')
			}
		})
		.catch(function(event){
			console.log("Too much DMG !!!!");
			console.log(event)
		})
};

function build_pokeability_modal (){
	var poke_ability = new DOMParser().parseFromString(`<div class="modal fade" id="pokeAbilityModal" tabindex="-1" aria-labelledby="pokeAbilityModalLabel" aria-hidden="true">
							<div class="modal-dialog modal-dialog-scrollable"">
	  							<div class="modal-content">
									<div class="modal-header">
										<h5 class="modal-title">Pokemon's with same Ability</h5>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
							  		</div>
									<div class="modal-body">
										<ul id="otherPokemons">
										</ul>
									</div>
									<div class="modal-footer">
					  					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
									</div>
	  							</div>
							</div>
						</div>`, 'text/html');
	document.querySelector('body').appendChild(poke_ability.body.firstChild);
};

function update_pokeability_modal(poke_url){
	var modal = document.getElementById('pokeAbilityModal');
	removeAllChildNodes(modal.querySelector('#otherPokemons'));

	fetch(poke_url)
		.then(response => response.json())
		.then(function(poke_data){
			poke_list = document.getElementById('pokeAbilityModal').querySelector("#otherPokemons")
		
			poke_data.pokemon.forEach(function(pokemon){
				poke_list.appendChild(build_li(pokemon.pokemon.name))
			})
		})
		.catch(function(event){
			console.log("Too much DMG !!!!");
			console.log(event)
		})
};

document.addEventListener('DOMContentLoaded', function(){
	var offset = 0;
	
	build_pokemodal();
	build_poketype_modal();
	build_pokeability_modal();
	render_pokecards(0);

	document.getElementById('principal').addEventListener('click', function (event) {
		if (event.target.type == "button") {

			update_pokemodal_1(event.target.dataset.pokemon)
		}

		document.getElementById('pokeModal').addEventListener('click', function(event){
			/* if click on "i" */
			if(event.target.parentElement.dataset.target == "#pokeTypeModal"){
				console.log(event.target.parentElement.dataset.poketypeurl)
				update_poketype_modal(event.target.parentElement.dataset.poketypeurl);
			}
			
			else if (event.target.parentElement.dataset.target == "#pokeAbilityModal"){
				console.log(event.target.parentElement.dataset.pokeabilityurl)
				update_pokeability_modal(event.target.parentElement.dataset.pokeabilityurl);
			}
	
			/* if click on button */
			else if (event.target.dataset.target == "#pokeTypeModal"){
				console.log(event.target.dataset.poketypeurl)
				update_poketype_modal(event.target.dataset.poketypeurl);
			}		
	
			else if (event.target.dataset.target == "#pokeAbilityModal"){
				console.log(event.target.dataset.pokeabilityurl)
				update_pokeability_modal(event.target.dataset.pokeabilityurl);
			}
		});
	});

	document.getElementById('pokeModal').addEventListener('hide', function (event) {
		document.querySelector('body').removeChild('#pokeModal');
		build_pokemodal();
	});

	document.getElementById('morePokemon').addEventListener('click', function (event) {
		offset += 20;
		render_pokecards(offset)
	});

});
