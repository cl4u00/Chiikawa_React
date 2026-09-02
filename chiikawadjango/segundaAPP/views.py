from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def inicio(request):
    return HttpResponse("<h1>Pagina inicial de la primeraApp del Proyecto</h1>")

def saludo(request):
    salida = "<h1>  Buenas tardes desde segundaApp </h1>"
    return HttpResponse(salida)
