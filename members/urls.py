from django.urls import path
from . import views

urlpatterns = [
	path('', views.personagens, name='index'),
	path('personagens/', views.personagens, name='personagens'),
	path('personagens/<int:personagem_id>/', views.personagem, name='personagem'),
	path('character/<int:personagem_id>/', views.personagem, name='personagem'),
	path('episodes/', views.episodios, name='episodes'),
]