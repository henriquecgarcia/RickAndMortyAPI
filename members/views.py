from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.template import loader
import requests
from . import util

def index(request):
	return HttpResponse("Hello, world. You're at the members index.")

def personagens(request):
	template = loader.get_template('personagens.html')
	context = {}
	return HttpResponse(template.render(context, request))

def personagem(request, personagem_id):
	# requesting the character data from the API
	response = requests.get(f"https://rickandmortyapi.com/api/character/{personagem_id}")
	# if the request was successful
	if response.status_code == 200:
		personagem = response.json()
		origin = {
			'name': 'unknown',
			'id': None,
		}
		if personagem['origin']['url'] != "":
			origin = requests.get(personagem['origin']['url']).json()
		location = {
			'name': 'unknown',
			'id': None,
		}
		if personagem['location']['url'] != "":
			location = requests.get(personagem['location']['url']).json()
		eps = []
		for ep in personagem['episode']:
			spited = ep.split('/')
			eps.append(int(spited[-1]))
		episodes = util.getEpisodesData(*eps)

		personagem['created'] = util.fixDate(personagem['created'])

		template = loader.get_template('personagem.html')
		context = {'personagem': personagem, 'origin': origin, 'location': location, 'episodes': episodes}
		return HttpResponse(template.render(context, request))
	else:
		# if the request was not successful
		return HttpResponse("Personagem não encontrado.", status=404)

def episodios(request):
	template = loader.get_template('episodes.html')
	context = {}
	return HttpResponse(template.render(context, request))
