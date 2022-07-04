from django.shortcuts import render
from medicament.models import Categorie,SousCategorie, Dci,Medicament
from django.http import JsonResponse

# Create your views here.


def index_caise(request):
    categories = Categorie.objects.all()
    souscategories = SousCategorie.objects.all()

    return render(request, 'caise/index_caise.html',{
		'categories': categories,'souscategories':souscategories,
	})

def get_json_cat_data(request):
    qs_val = list(Categorie.objects.values())
    return JsonResponse({'data':qs_val})

def get_json_souscat_data(request, *args, **kwargs):
    cat_selected = kwargs.get('cat')
    obj_souscat = list( SousCategorie.objects.filter(categorie__nom=cat_selected).values())
    return JsonResponse({'data':obj_souscat})


def get_json_dci_data(request,*args, **kwargs):
    souscat_selected = kwargs.get('souscat')
    obj_dci = list( Dci.objects.filter(sous_categorie__nom=souscat_selected).values())
    return JsonResponse({'data':obj_dci})



def get_json_med_data(request,*args, **kwargs):
    med_selected = kwargs.get('med')
    obj_med = list( Medicament.objects.filter(dci__nom=med_selected).values())
    return JsonResponse({'data':obj_med})



def get_json_med_detail_data(request,*args, **kwargs):
    med_selected = kwargs.get('med')

    obj_med = list( Medicament.objects.filter(id=med_selected).values())
    return JsonResponse({'data':obj_med})
