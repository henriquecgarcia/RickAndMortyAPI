$(".dropdown-trigger").on("click", function () {
	let self = $(this);
	let dropdown = self.parent().find(".dropdown-content");
	console.log(self);
	console.log(dropdown);
	if (dropdown.is(":visible")) {
		dropdown.hide();
	} else {
		dropdown.show();
	}
});