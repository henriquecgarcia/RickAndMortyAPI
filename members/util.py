import requests

months = [
	'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
	'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
]
fullMonthNames = {
	'Jan': 'Janeiro', 'Fev': 'Fevereiro', 'Mar': 'Março',
	'Abr': 'Abril', 'Mai': 'Maio', 'Jun': 'Junho',
	'Jul': 'Julho', 'Ago': 'Agosto', 'Set': 'Setembro',
	'Out': 'Outubro', 'Nov': 'Novembro', 'Dez': 'Dezembro',
}

def getEpisodesData(*epNums) -> dict:
	eps = ""
	for ep in epNums:
		eps += f"{ep},"
	eps = eps[:-1]
	req = requests.get(f"https://rickandmortyapi.com/api/episode/{eps}")
	if req.status_code == 200:
		episode = req.json()
		return episode
	else:
		return None

def getCharactersData(*charIds) -> dict:
	chars = ""
	for char in charIds:
		chars += f"{char},"
	chars = chars[:-1]
	req = requests.get(f"https://rickandmortyapi.com/api/character/{chars}")
	if req.status_code == 200:
		characters = req.json()
		return characters
	else:
		return None

def getLocationsData(*locIds) -> dict:
	locs = ""
	for loc in locIds:
		locs += f"{loc},"
	locs = locs[:-1]
	req = requests.get(f"https://rickandmortyapi.com/api/location/{locs}")
	if req.status_code == 200:
		locations = req.json()
		return locations
	else:
		return None

def fixDate(originalDate : str) -> str:
	date = originalDate.split('T')[0]
	time = originalDate.split('T')[1].split('.')[0]
	date = date.split('-')
	date.reverse()
	date[1] = months[int(date[1])-1]
	date[1] = fullMonthNames[date[1]]
	date = ' de '.join(date)
	return f"{date} às {time}"