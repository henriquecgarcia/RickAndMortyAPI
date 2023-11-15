let page = 1;
let totalPages = 0;
let chars = [];
let showPages = [];
let searchVal = "";

function charInfo(character) {
	let str = "<div class='char'>";
	str += "<div class='left'><img src='" +
		character.image +
	"' alt='" +
		character.name +
	"'></div>";
	str += "<div class='right'>";

	str += "<p class='char-name'>Nome: ";
	
	str += "<span class='gender'>";
	switch (character.gender) {
		case "Male":
			str += "♂️";
			break;
		case "Female":
			str += "♀️";
			break;
		case "unknown":
			str += "🤷";
			break;
		default:
			str += "⚧️" + character.gender;
	}
	str += "</span> ";

	str += "<span><a href='/character/" + character.id + "'>" +
			character.name + "</a></span> (";
	switch (character.status) {
		case "Alive":
			str += "<span class='col-verde'>" + character.status + "</span>";
			break;
		case "Dead":
			str += "<span class='col-vermelho'>" + character.status + "</span>";
			break;
		case "unknown":
			str += "<span class='italic'>" + character.status + "</span>";
			break;
	}
	str += ")";
	str += "<p class='char-species'>Espécie: <span>" + character.species + "</span></p>";
	str += "<p class='char-origin'>Origem: <span>" + character.origin.name + "</span></p>";
	str += "<p class='char-location'>Localização: <span>" + character.location.name + "</span></p>";

	str += "</div>";

	str += "</div>";
	return str;
}

function updateChars(force = false) {
	if (showPages[page] != null && !force) {
		const display = $("#display-chars");
		display.html("");
		showPages[page].forEach(function (character) {
			let str = charInfo(character);
			display.append(str);
		});
		if (page > 1) {
			$(".display-prev").show();
		} else {
			$(".display-prev").hide();
		}
		if (page < totalPages) {
			$(".display-next").show();
		} else {
			$(".display-next").hide();
		}
		$("#display-page").html(page);
		return;
	}
	$.get("https://rickandmortyapi.com/api/character?page=" + page, function (data) {
		let characters = data.results;
		const display = $("#display-chars");
		display.html("");
		characters.forEach(function (character) {
			chars[character.id] = character;
			let str = charInfo(character);
			display.append(str);
		});
		if (page > 1) {
			$(".display-prev").show();
		} else {
			$(".display-prev").hide();
		}
		if (page < totalPages) {
			$(".display-next").show();
		} else {
			$(".display-next").hide();
		}
		$("#display-page").html(page);
	});
}

function separatePages( toShow ) {
	page = 1;
	showPages = [];
	let maxPerPage = 20;
	toShow.forEach(function (character) {
		if (showPages[page] == null) {
			showPages[page] = [];
		}
		showPages[page].push(character);
		if (showPages[page].length >= maxPerPage) {
			page++;
		}
	});
	totalPages = page;
	page = 1;
	$("#display-total").html(totalPages);
	updateChars();
}

function preLoadAllPages() {
	let hasNext = true;
	while (hasNext) {
		$.ajax({
			url: "https://rickandmortyapi.com/api/character?page=" + page,
			async: false,
			success: function (data) {
				hasNext = data.info.next != null;
				showPages[page] = [];
				let characters = data.results;
				characters.forEach(function (character) {
					chars[character.id] = character;
					showPages[page].push(character);
				});
				page++;
			}
		});
	}
	totalPages = page-1;
	page = 1;
	$("#display-total").html(totalPages);
	updateChars();
}
$().ready(function () {
	preLoadAllPages();
	$(".display-prev .display-btn").click(function () {
		if (page > 1) {
			page--;
			updateChars();

			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		}
	});
	$(".display-next .display-btn").click(function () {
		page++;
		updateChars();
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	});
});
$("#char-search").keyup(() => {
	searchVal = $("#char-search").val();
	let display = $("#display-chars");
	display.html("");
	let foundChars = [];
	if (searchVal == "") {
		separatePages(chars);
		return;
	}
	chars.forEach(function (character) {
		if (character.name.toLowerCase().includes(searchVal.toLowerCase())) {
			foundChars.push(character);
		}
	});
	if (foundChars.length <= 0) {
		display.html("<p class='italic'>Nenhum personagem encontrado</p>");
	} else {
		separatePages(foundChars);
	}
});