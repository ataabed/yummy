import * as myFetch_data from "./myFetch.js"


function PageLoad() {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    myFetch_data.Get(url, displayData);

}

function displayData(data) {

     $(".loading-screen").fadeOut(500, function () {
        $("body").css("overflow", "visible")

        $("#MainDisplay_row").empty()
        console.log(data)
        const { meals } = data;
    
        const rowParent = document.querySelector('#MainDisplay_row');
    
    
        meals.slice(0, 20).forEach(element => {
            const { idMeal, strMeal, strMealThumb, strSource, strYoutube } = element;
    
            let divP = document.createElement('div');
    
            divP.setAttribute('class', 'col-md-3 ');
            let divP_Link = document.createElement("div");
            divP_Link.setAttribute('class', 'divChild')
            /* divP_Link.setAttribute('href',strSource);
            */
            let divP_Link_img = document.createElement('img');
            divP_Link_img.setAttribute('src', strMealThumb);
            divP_Link_img.setAttribute('class', 'w-100 rounded-4');
    
            let div_Overlay = document.createElement("div");
            div_Overlay.setAttribute('class', 'img_overlay w-100 rounded-4')
            let div_Overlay_text = document.createElement("h3");
            div_Overlay_text.innerText = strMeal;
            div_Overlay_text.setAttribute('class', 'ms-4 ')
            divP_Link.appendChild(divP_Link_img);
            div_Overlay.appendChild(div_Overlay_text);
            divP_Link.appendChild(div_Overlay);
            divP.append(divP_Link)
    
    
    
    
            rowParent.append(divP);
            $(divP).click(function () {
                let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
                myFetch_data.Get(url, displayMealPage)
            });
            $(divP).mouseenter(function () {
                $(div_Overlay).animate({
                    top: '0%'
    
                })
    
            })
    
            $(divP).mouseleave(function () {
                $(div_Overlay).animate({
                    top: '100%'
    
                })
    
            })
    
    
    
    
    
        });
    


    }) 



}


function displayMealPage(data) {

/*     $(".loading-screen").fadeOut(500, function () {
        $("body").css("overflow", "visible"); */

    $('#MainDisplay_row').empty();

    const { meals } = data;
    const [meal] = meals;

    const { idMeal, strMealThumb, strMeal, strInstructions, strArea, strCategory,
        strSource, strYoutube





    } = meal
    console.log(meal)
    let leftCol = document.createElement('div');
    leftCol.setAttribute('class', 'mealPage_leftDiv col-md-3 text-white');
    let rightCol = document.createElement('div');
    rightCol.setAttribute('class', 'mealPage_rightDiv  col-md-9 text-white');

    // left col

    let leftCol_Div1 = document.createElement('div');

    let leftCol_Div1_image = document.createElement('img');
    leftCol_Div1_image.setAttribute('src', strMealThumb);
    leftCol_Div1_image.setAttribute('class', 'w-100 rounded-4')
    leftCol_Div1.append(leftCol_Div1_image)
    let leftCol_Div1_mealName = document.createElement('h2');
    leftCol_Div1_mealName.innerText = strMeal;
    leftCol_Div1.append(leftCol_Div1_mealName)
    leftCol.append(leftCol_Div1);




    //right col

    let mealInstructionsDiv = document.createElement('div');
    mealInstructionsDiv.setAttribute('class', 'mb-4')
    let mealInstructionsDiv_header = document.createElement('h2');
    mealInstructionsDiv_header.innerText = 'Instructions';
    let mealInstructionsDiv_content = document.createElement('p');
    mealInstructionsDiv_content.innerHTML = strInstructions
    mealInstructionsDiv.append(mealInstructionsDiv_header)
    mealInstructionsDiv.append(mealInstructionsDiv_content)

    rightCol.append(mealInstructionsDiv);
    // area
    let AreaDiv = document.createElement('div');
    let AreaDiv_key = document.createElement('h2');
    AreaDiv_key.innerText = `Area :${strArea}`
    AreaDiv.append(AreaDiv_key)
    rightCol.append(AreaDiv);
    //category
    let categoryDiv = document.createElement('div');
    categoryDiv.setAttribute('class', 'mb-3')
    let categoryDiv_content = document.createElement('h2');
    categoryDiv_content.innerText = `category : ${strCategory}`;
    categoryDiv.append(categoryDiv_content);
    rightCol.append(categoryDiv);

    //Recipes :
    let recipe_div = document.createElement('div');
    let recipe_div_header = document.createElement('h2');
    recipe_div_header.innerText = "Recipes :";
    recipe_div_header.setAttribute('class', 'mb-3')
    let recipe_List = document.createElement('ul');
    recipe_List.setAttribute('class', 'lstRecipe d-flex p-0 mb-4 g-2 w-100 list-unstyled   ')
    for (let i = 1; i < 20; i++) {
        if (meal[`strMeasure${i}`].length > 2) {
            let recipe_List_element = document.createElement('li');
            recipe_List_element.setAttribute('class', 'col-12 col-sm-3  m-1 px-2 rounded-2')

            recipe_List_element.innerText = meal[`strMeasure${i}`] + " " + meal[`strIngredient${i}`]
            recipe_List.append(recipe_List_element);

        }

    }
    recipe_div.append(recipe_div_header);

    recipe_div.append(recipe_List);
    rightCol.append(recipe_div);
    // Tags
    let tag_div = document.createElement('div');
    let tag_div_header = document.createElement('h2');
    tag_div_header.innerText = "Tags :";
    tag_div_header.setAttribute('class', 'mb-4')

    let tag_div_source = document.createElement('a');
    tag_div_source.setAttribute('class', 'mb-2 btn btn-success');
    tag_div_source.setAttribute('href', `${strSource}`);
    tag_div_source.setAttribute('target', `_blank`);
    tag_div_source.innerText = "Source";

    let tag_div_youtube = document.createElement('a');
    tag_div_youtube.setAttribute('class', 'btn btn-danger d-inline-block mb-2 ms-0 ms-sm-2');
    tag_div_youtube.setAttribute('href', `${strYoutube}`);
    tag_div_youtube.setAttribute('target', `_blank`);
    tag_div_youtube.innerText = "Youtube";


    tag_div.append(tag_div_header);
    tag_div.append(tag_div_source);
    tag_div.append(tag_div_youtube);
    rightCol.append(tag_div);

    // last
    $('#MainDisplay_row').append(leftCol);
    $('#MainDisplay_row').append(rightCol);

}

// 
function showSearchInputs() {
    closeSideNav()
    $('#MainDisplay_row').empty();
    $('#frm_search').removeClass('d-none');
    $('#frm_search').addClass('row');
}
document.querySelector('#searchLink').addEventListener('click', function () {

    showSearchInputs()
})
document.querySelector('#inputSearchByname').addEventListener('change', function () {

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.value}`
    myFetch_data.Get(url, displayData);

})

document.querySelector('#inputSearchByFirstLetter').addEventListener('change', function () {

    if (this.value.length > 0) {
        let fletter = this.value[0];
        alert(fletter)
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${fletter}`
        myFetch_data.Get(url, displayData);
    }

});

document.querySelector('#mealCategoryLink').addEventListener('click', function () {
    closeSideNav()
    $('#MainDisplay_row').empty();
    if (document.querySelector('#frm_search').classList.contains('row')) {
        document.querySelector('#frm_search').classList.replace('row', 'd-none')
    }
    const url = `https://www.themealdb.com/api/json/v1/1/categories.php`;
    myFetch_data.Get(url, displayCategories);
})
document.querySelector('#MealAreaLink').addEventListener('click', function () {
    closeSideNav()
    $('#MainDisplay_row').empty();
    if (document.querySelector('#frm_search').classList.contains('row')) {
        document.querySelector('#frm_search').classList.replace('row', 'd-none')
    }
    const url = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
    myFetch_data.Get(url, displayAreas);
})
document.querySelector('#IngredientsLink').addEventListener('click', function () {
    closeSideNav()
    $('#MainDisplay_row').empty();
    if (document.querySelector('#frm_search').classList.contains('row')) {
        document.querySelector('#frm_search').classList.replace('row', 'd-none')
    }
    const url = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
    myFetch_data.Get(url, displayIngredient);
})

//form validarion 
const Contactvalid = {
    name: false, mail: false, phone: false,
    age: false, password: false, repassword: false
};

function checkContactValid() {
    let v = true;
    for (let k in Contactvalid) {

        if (Contactvalid[k] == false) {
            v = Contactvalid[k]
            document.querySelector('#btnSubmit').setAttribute('disabled','true')
            return v;

        }
    }
    document.querySelector('#btnSubmit').removeAttribute('disabled')

    return v;
}

function checkName_Valid(v) {
    let result = (/^[a-zA-Z]+$/.test(v))
    Contactvalid.name = result;
    checkContactValid();
    return result

}
function checkEmail_Valid(v) {
    let result = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v))

    Contactvalid.mail = result;
    checkContactValid();
    return result

}

function checkPhone_Valid(v) {
    let result = (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v))

    Contactvalid.phone = result;
    checkContactValid();
    return result

}

function checkAge_Valid(v) {
    let result = (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(v))


    Contactvalid.age = result;
    checkContactValid();
    return result

}

function checkPassword_Valid(v) {
    let result = (/^[A-Z][0-9a-zA-Z]{8,}$/.test(v))

    Contactvalid.password = result;
    checkContactValid();
    return result

}
function checkRePassword_Valid(v) {
    let result = false;
    if (document.querySelector('#repasswordInput').value === document.querySelector('#passwordInput').value) {
        result = true
    }

    Contactvalid.repassword = result;
    checkContactValid();
    return result

}
document.querySelector('#ContactLink').addEventListener('click', function () {
    closeSideNav()
    $('#MainDisplay_row').empty();
    if (document.querySelector('#frm_search').classList.contains('row')) {
        document.querySelector('#frm_search').classList.replace('row', 'd-none')

    }

    $("#MainDisplay_row").empty()
    let rowParent = document.querySelector('#MainDisplay_row');

    let inputParentDiv = document.createElement('div');
    inputParentDiv.setAttribute('class', 'row g-4 w-75');

    // name 
    let nameDivParent = document.createElement('div');
    nameDivParent.setAttribute('class', 'col-md-6');
    let nameDivInput = document.createElement('input');

    nameDivInput.setAttribute('id', 'nameInput')
    nameDivInput.setAttribute('type', 'text')
    nameDivInput.setAttribute('class', 'form-control')
    nameDivInput.setAttribute('placeholder', 'Enter Yoyr Name')

    // name valid div 
    let name_ValidDivParent = document.createElement('div');

    name_ValidDivParent.setAttribute('class', 'alert alert-danger w-100 mt-2 d-none ');
    name_ValidDivParent.innerText = `Special characters and numbers not allowed`



    nameDivParent.append(nameDivInput);
    nameDivParent.append(name_ValidDivParent)

    // mail div
    let mailDivParent = document.createElement('div');
    mailDivParent.setAttribute('class', 'col-md-6');
    let mailDivInput = document.createElement('input');
    mailDivInput.setAttribute('id', 'mailInput')
    mailDivInput.setAttribute('type', 'email')
    mailDivInput.setAttribute('class', 'form-control')
    mailDivInput.setAttribute('placeholder', 'Enter Your email')

    // mail valid div 
    let mail_ValidDivParent = document.createElement('div');
    mail_ValidDivParent.setAttribute('class', 'alert alert-danger w-100 mt-2 d-none ');
    mail_ValidDivParent.innerText = `Email not valid *exemple@yyy.zzz`

    mailDivParent.append(mailDivInput);
    mailDivParent.append(mail_ValidDivParent)


    // phone 
    //  div
    let phoneDivParent = document.createElement('div');
    phoneDivParent.setAttribute('class', 'col-md-6');
    let phoneDivInput = document.createElement('input');
    phoneDivInput.setAttribute('id', 'phoneInput')
    phoneDivInput.setAttribute('type', 'email')
    phoneDivInput.setAttribute('class', 'form-control')
    phoneDivInput.setAttribute('placeholder', 'Enter Your Phone')

    //  valid div 
    let phone_ValidDivParent = document.createElement('div');
    phone_ValidDivParent.setAttribute('class', 'alert alert-danger w-100 mt-2 d-none ');
    phone_ValidDivParent.innerText = `Enter valid Phone Number`

    phoneDivParent.append(phoneDivInput);
    phoneDivParent.append(phone_ValidDivParent)

    // Age 
    //  div
    let ageDivParent = document.createElement('div');
    ageDivParent.setAttribute('class', 'col-md-6');
    let ageDivInput = document.createElement('input');
    ageDivInput.setAttribute('id', 'ageInput')
    ageDivInput.setAttribute('type', 'number')
    ageDivInput.setAttribute('min', '0')
    ageDivInput.setAttribute('class', 'form-control')
    ageDivInput.setAttribute('placeholder', 'Enter Your Age')

    //  valid div 
    let age_ValidDivParent = document.createElement('div');
    age_ValidDivParent.setAttribute('class', 'alert alert-danger w-100 mt-2 d-none ');
    age_ValidDivParent.innerText = `Enter valid Phone age`

    ageDivParent.append(ageDivInput);
    ageDivParent.append(age_ValidDivParent)


    // password 
    //  div
    let passwordDivParent = document.createElement('div');
    passwordDivParent.setAttribute('class', 'col-md-6');
    let passwordDivInput = document.createElement('input');
    passwordDivInput.setAttribute('id', 'passwordInput')
    passwordDivInput.setAttribute('type', 'password')
    passwordDivInput.setAttribute('class', 'form-control')
    passwordDivInput.setAttribute('placeholder', 'Enter Your Password')

    //  valid div 
    let password_ValidDivParent = document.createElement('div');
    password_ValidDivParent.setAttribute('class', 'alert alert-danger w-100 mt-2 d-none ');
    password_ValidDivParent.innerText = `Enter Valid Password`

    passwordDivParent.append(passwordDivInput);
    passwordDivParent.append(password_ValidDivParent)
// Repassword 
    //  div
    let rePasswordDivParent = document.createElement('div');
    rePasswordDivParent.setAttribute('class', 'col-md-6');
    let rePasswordDivInput = document.createElement('input');
    rePasswordDivInput.setAttribute('id', 'repasswordInput')
    rePasswordDivInput.setAttribute('type', 'password')
    rePasswordDivInput.setAttribute('class', 'form-control')
    rePasswordDivInput.setAttribute('placeholder', 'RePassword')

    //  valid div 
    let rePassword_ValidDivParent = document.createElement('div');
    rePassword_ValidDivParent.setAttribute('class', 'alert alert-danger w-100 mt-2 d-none ');
    rePassword_ValidDivParent.innerText = `Enter valid Password`

    rePasswordDivParent.append(rePasswordDivInput);
    rePasswordDivParent.append(rePassword_ValidDivParent)



//button
let btnSubmit=document.createElement('button');
btnSubmit.setAttribute('class',' col-2 mx-auto text-white btn btn-outline-danger px-2 mt-3')
btnSubmit.setAttribute('disabled','true')
btnSubmit.setAttribute('id','btnSubmit')
btnSubmit.innerText="Submit"
    //

    inputParentDiv.append(nameDivParent)

    inputParentDiv.append(mailDivParent)
    inputParentDiv.append(phoneDivParent)
    inputParentDiv.append(ageDivParent)

    inputParentDiv.append(passwordDivParent)
    inputParentDiv.append(rePasswordDivParent)
    inputParentDiv.append(btnSubmit)
    rowParent.append(inputParentDiv);
    nameDivInput.addEventListener('change', function () {

        if (checkName_Valid(this.value) === false) {
            name_ValidDivParent.classList.remove('d-none')

        }
        else {
            if (name_ValidDivParent.classList.contains('d-none') == false) {
                name_ValidDivParent.classList.add('d-none')

            }

        }
    })

    mailDivInput.addEventListener('change', function () {

        if (checkEmail_Valid(this.value) === false) {
            mail_ValidDivParent.classList.remove('d-none')

        }
        else {
            if (mail_ValidDivParent.classList.contains('d-none') == false) {
                mail_ValidDivParent.classList.add('d-none')

            }

        }
    })

    phoneDivInput.addEventListener('change', function () {

        if (checkPhone_Valid(this.value) === false) {
            phone_ValidDivParent.classList.remove('d-none')

        }
        else {
            if (phone_ValidDivParent.classList.contains('d-none') == false) {
                phone_ValidDivParent.classList.add('d-none')

            }

        }
    })

    ageDivInput.addEventListener('change', function () {

        if (checkAge_Valid(this.value) === false) {
            age_ValidDivParent.classList.remove('d-none')

        }
        else {
            if (age_ValidDivParent.classList.contains('d-none') == false) {
                age_ValidDivParent.classList.add('d-none')

            }

        }
    })

    passwordDivInput.addEventListener('change', function () {

        if (checkPassword_Valid(this.value) === false) {
            password_ValidDivParent.classList.remove('d-none')

        }
        else {
            if (password_ValidDivParent.classList.contains('d-none') == false) {
                password_ValidDivParent.classList.add('d-none')

            }

        }
    })
    rePasswordDivInput.addEventListener('change', function () {

        if (checkRePassword_Valid(this.value) === false) {
            rePassword_ValidDivParent.classList.remove('d-none')

        }
        else {
            if ( rePassword_ValidDivParent.classList.contains('d-none') == false) {
                rePassword_ValidDivParent.classList.add('d-none')

            }

        }
    })

})



function extractDescriptio(des) {
    let c = des.search(',')
    if (c < 40) {
        return (des.slice(0, 40))
    }
    else {
        return (des.slice(0, 40))
    }

}
function displayCategories(data) {
    $(".loading-screen").fadeOut(1000, function () {
        $("body").css("overflow", "visible")


    })
    $("#MainDisplay_row").empty()
    console.log(data)
    const { categories } = data;

    const rowParent = document.querySelector('#MainDisplay_row');

    categories.forEach(element => {
        const { idCategory, strCategory, strCategoryDescription, strCategoryThumb } = element;

        let divP = document.createElement('div');

        divP.setAttribute('class', 'col-md-3 ');
        let divP_Link = document.createElement("div");
        divP_Link.setAttribute('class', 'divChild')

        let divP_Link_img = document.createElement('img');
        divP_Link_img.setAttribute('src', strCategoryThumb);
        divP_Link_img.setAttribute('class', 'w-100 rounded-4');

        let div_Overlay = document.createElement("div");
        div_Overlay.setAttribute('class', 'd-flex flex-column justify-content-center align-items-center text-center  img_overlay w-100 rounded-4')
        let div_Overlay_text = document.createElement("h3");
        div_Overlay_text.innerText = strCategory;
        /*     /*  function findComma(value, index, array)
             {
              /*  return  value===','; */
        /*} */
        let div_Overlay_p = document.createElement('p');
        div_Overlay_p.innerText = extractDescriptio(strCategoryDescription)



        div_Overlay_text.setAttribute('class', 'ms-4')
        divP_Link.appendChild(divP_Link_img);
        div_Overlay.appendChild(div_Overlay_text);
        div_Overlay.appendChild(div_Overlay_p);

        divP_Link.appendChild(div_Overlay);
        divP.append(divP_Link)




        rowParent.append(divP);
        $(divP).click(function () {
            let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`
            myFetch_data.Get(url, displayData)
        });
        $(divP).mouseenter(function () {
            $(div_Overlay).animate({
                top: '0%'

            })

        })

        $(divP).mouseleave(function () {
            $(div_Overlay).animate({
                top: '100%'

            })

        })





    });

}

function displayAreas(data) {
    $(".loading-screen").fadeOut(1000, function () {
        $("body").css("overflow", "visible")


    })
    $("#MainDisplay_row").empty();
    console.log(data);

    const { meals } = data;
    const rowParent = document.querySelector('#MainDisplay_row');

    meals.forEach(element => {
        const { strArea } = element;

        let divP = document.createElement('div');

        divP.setAttribute('class', 'col-md-3 ');

        let divData = document.createElement('div');
        divData.setAttribute('class', 'text-white d-flex flex-column justify-content-center align-items-center ');
        let divData_i = document.createElement('i');
        divData_i.setAttribute('class', 'fa-solid fa-house-laptop fa-4x')
        let divData_h = document.createElement('h3');
        divData_h.innerText = strArea;
        divData.append(divData_i);
        divData.append(divData_h);
        divP.append(divData);



        rowParent.append(divP);
        $(divP).click(function () {
            let url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${strArea}`
            myFetch_data.Get(url, displayData)
        });









    });

}

function displayIngredient(data) {
    $(".loading-screen").fadeOut(1000, function () {
        $("body").css("overflow", "visible")


    })
    $("#MainDisplay_row").empty()
    console.log(data)
    const { meals } = data;

    const rowParent = document.querySelector('#MainDisplay_row');

    meals.slice(0, 20).forEach(element => {
        const { idIngredient, strDescription, strIngredient } = element;

        let divP = document.createElement('div');

        divP.setAttribute('class', 'col-md-3 d-flex flex-column justify-content-center align-content-center text-white ');
        divP.setAttribute('style', 'cursor:pointer')
        let divp_i = document.createElement('i');
        divp_i.setAttribute('class', 'fa-solid fa-drumstick-bite fa-4x')
        let divp_h = document.createElement('h3');
        divp_h.innerText = strIngredient;
        let divP_p = document.createElement('p');
        divP_p.innerText = strDescription.slice(0, 200)


        divP.append(divp_i)
        divP.append(divp_h)
        divP.append(divP_p)
        rowParent.append(divP);
        $(divP).click(function () {
            let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`
            myFetch_data.Get(url, displayData)
        });








    });
}
// side navbar
function closeSideNav() {
    let boxWidth = $("#Side_NavBar .nav-tab").outerWidth()
    $("#Side_NavBar").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

function openSideNav() {
    // $('.nav-tab').removeClass('d-none')
    $("#Side_NavBar").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

(function(){
    let boxWidth = $("#Side_NavBar .nav-tab").outerWidth()
    $("#Side_NavBar").animate({
        left: -boxWidth,
       opacity:'1'
    }, 0)})()


$(document).ready(function () {

    let boxWidth = $("#Side_NavBar .nav-tab").outerWidth()
    $("#Side_NavBar").animate({
        left: -boxWidth
    }, 0)
   // closeSideNav();
    PageLoad();
    //load website 


  $("#Side_NavBar i.open-close-icon").click(() => {
        if ($("#Side_NavBar").css("left") == "0px") {
            closeSideNav()
        } else {
            openSideNav()
        }
    })
 


    // image overlay animation



})




