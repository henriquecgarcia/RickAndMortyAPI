let page = 1;
let totalPages = 0;
let allEpisodes = [];
let epsBySeason = [];

function updateDisplay() {
	$("#display-page").html(page);
	$("#display-total").html(totalPages);
	$("#display-chars").html("");
	let episodes = epsBySeason[page];
	episodes.forEach(function (episode) {
		let episodeHTML = "<div class='episode'>";
		episodeHTML += "<h3>" + episode.name + "</h3>";
		episodeHTML += "<p>" + episode.episode + "</p>";
		episodeHTML += "<p>" + episode.air_date + "</p>";
		episodeHTML += "</div>";
		$("#display-chars").append(episodeHTML);
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
}

function preLoadAllPages() {
	let hasNext = true;
	let seasons = 0;
	while (hasNext) {
		$.ajax({
			url: "https://rickandmortyapi.com/api/episode?page=" + page,
			async: false,
			success: function (data) {
				hasNext = data.info.next != null;
				let episodes = data.results;
				episodes.forEach(function (episode) {
					allEpisodes.push(episode);
					let season = episode.episode.split("E")[0].split("S")[1];
					if (epsBySeason[season] == null) {
						epsBySeason[season] = [];
						seasons++;
					}
					epsBySeason[season].push(episode);
				});
				page++;
			}
		});
	}
	totalPages = seasons;
	page = 1;
	$("#display-total").html(totalPages);
	updateDisplay();
}
$().ready(function () {
	preLoadAllPages();
	$(".display-prev .display-btn").click(function () {
		if (page > 1) {
			page--;
			updateDisplay();

			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		}
	});
	$(".display-next .display-btn").click(function () {
		page++;
		updateDisplay();
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	});
});