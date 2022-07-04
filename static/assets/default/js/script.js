
$('.ui.dropdown').dropdown(
    {
        forceSelection: false
    }
);


$(document).ready(function(){
    //your script here.

    const Category = document.getElementById("c")
    const CategoriesI = document.getElementById("categories")

    const sousCategory = document.getElementById("s")
    const sousCategorieI = document.getElementById("souscategories")
    const souscategorieText = document.getElementById("souscategorie-text")
    
    const Dci = document.getElementById("d")
    const DciI = document.getElementById("dcis")

    const Medicament = document.getElementById("medicament")
    const MedicamentI = document.getElementById("medicaments")


    /// constantes de la partie detail medicament
    const PrixUnitaire = document.getElementById("prix_unitaire")
    const NomCommercial = document.getElementById("nom_commercial")
    const DatePeremption = document.getElementById("date_peremption")




    
    


    $.ajax({
        type: 'GET',
        url: 'cat-json',
        success: function (response) {
            const catData = response.data
            catData.map(item =>{
                const option = document.createElement('option')
                option.textContent = item.nom
                option.setAttribute('class', 'item')
                option.setAttribute('value', item.id)
                Category.appendChild(option)    
            })
        },
        error: function(error) {
            console.log(error)
        }
    })

    CategoriesI.addEventListener('change', e=>{
        
        const selectedCat = e.target.value
        // console.log(selectedCat)
        sousCategory.innerHTML = ""
        souscategorieText.textContent = "All sous categories"
        souscategorieText.classList.add("default") 

        $.ajax({
            type: 'GET',
            url: `sous-cat-json/${selectedCat}/`,
            success: function (response) {
                //console.log(response.data)
                const souscatData = response.data
                souscatData.map(item =>{
                    const option = document.createElement('option')
                    option.textContent = item.nom
                    option.setAttribute('class', 'item')
                    option.setAttribute('value', item.nom)
                    sousCategory.appendChild(option)
                }) 
            },
            error: function(error) {
                console.log(error)
            }
        })
    })

    sousCategorieI.addEventListener('change', e=>{
        const selectedSousCat = e.target.value
        //console.log(selectedSousCat)
        $.ajax({
            type: 'GET',
            url: `sous-dci-json/${selectedSousCat}/`,
            success: function (response) {
                //console.log(response.data)
                const dciData = response.data
                dciData.map(item =>{
                    const option = document.createElement('option')
                    option.textContent = item.nom
                    option.setAttribute('class', 'item')
                    option.setAttribute('value', item.nom)
                    Dci.appendChild(option)
                })
            }, error: function(error) {
                console.log(error)
            }
        })
    })

    DciI.addEventListener('change', e=>{
        const selectedDci = e.target.value
        //console.log(selectedDci)
        $.ajax({
            type: 'GET',
            url: `sous-med-json/${selectedDci}/`,
            success: function (response) {
                // console.log(response.data)
                const medData = response.data
                medData.map(item =>{
                    const button = document.createElement('button')
                    button.textContent = item.nom_commercial
                    button.setAttribute('class', 'list-group-item list-group-item-action')
                    button.setAttribute('value', item.id)
                   
                    button.setAttribute('id', 'medoc')
                    Medicament.appendChild(button)

                })
            }})   
        })

        MedicamentI.addEventListener('click', e=>{
            const selectedMed = e.target.value
            //console.log(selectedMed)
            $.ajax({
                type: 'GET',
                url: `get-med-detail-json/${selectedMed}/`,
                success: function (response) {
                    dict = response.data[0]

                   
                    console.log(dict)

                    // prix_unitaire
                   // const inputPrixUnitaire = document.createElement('input')
                   // inputPrixUnitaire.textContent = dict["prix_unitaire"]
                   // inputPrixUnitaire.setAttribute('class', 'form-control')
                   // inputPrixUnitaire.setAttribute("disabled", true)
                   // inputPrixUnitaire.setAttribute('value', dict["prix_unitaire"])
                   // inputPrixUnitaire.classList.add("disabled") 
                   // PrixUnitaire.appendChild(inputPrixUnitaire)

                    
                    document.getElementById('date_peremption').value = dict["date_peremption"]
                    document.getElementById('nom_commercial').value = dict["nom_commercial"]
                    document.getElementById('prix_unitaire').value = dict["prix_unitaire"]
                    document.getElementById('quantite').value = dict["quantite"] 

                 

                    
                   



                }
            })
            
         

            })


})