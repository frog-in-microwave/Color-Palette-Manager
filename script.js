/* The block of code is responsible for selecting specific elements from the HTML document
using their IDs*/
let save_button = document.getElementById("save_button");
let palette_name = document.getElementById("palette_name");
let color1 = document.getElementById("color1");
let color2 = document.getElementById("color2");
let color3 = document.getElementById("color3");
let palette_container = document.getElementById("saved_palettes_section");
let error_section = document.getElementById("error_section");
let root = document.querySelector(':root');
let change_mode_button = document.getElementById("change_mode");

//localStorage.clear();
let light = {
    
    primary_color: "#ff4d4d",
    background_color: "rgba(255, 255, 255, 0.9)",
    input_backgroun_color: "rgb(255 , 255 , 255)",
    color_input_border_color: "rgba(0, 0, 0, 0)",
    opposite_mode_color: "rgb(0, 0, 0)",
    opposite_mode_text_color: "rgb(255, 255, 255)",
    input_text_color: "rgb(0, 0, 0)",
    input_placeholder_color: "rgba(0, 0, 0 , 0.5)",
    text_color: "rgb(0, 0, 0)",
    hover_color: "rgba(0, 0, 0 , 0.7)",
    hover_button_color: "rgba(255, 255, 255, 0.7)",
    hover_text_color:"rgb(255, 255, 255)",
    palette_box_background_color: "rgb(255, 255, 255)",
    delete_button_border_color: "rgb(255, 0, 0)",
    mode: "light"
    
}

let dark = {
    primary_color: "#3161e3",
    background_color: "rgba(4, 4, 52, 0.9)",
    input_backgroun_color: "rgb(0 , 0 , 0)",
    color_input_border_color: "rgb(255, 255, 255)",
    opposite_mode_color: "rgb(255, 255, 255)",
    opposite_mode_text_color: "rgb(0, 0, 0)",
    input_text_color: "rgb(255, 255, 255)",
    input_placeholder_color: "rgba(255, 255, 255, 0.5)",
    text_color: "rgb(255, 255, 255)",
    hover_color: "rgba(255, 255, 255, 0.7)",
    hover_button_color: "rgba(255, 255, 255, 0.7)",
    hover_text_color:"rgb(0, 0, 0)",
    palette_box_background_color: "rgb(134, 161, 176)",
    delete_button_border_color: "rgb(255, 255, 255)",
    mode: "dark"
}




/* This block of code is responsible for setting up the functionality to save and display color
palettes.*/
let saved_palettes = JSON.parse(localStorage.getItem("palette_list")) || [];
localStorage.setItem("palette_list" , JSON.stringify(saved_palettes));
load_saved_palettes();
save_button.addEventListener("click" , () => {
    if(palette_name.value != ""){
        if(check_for_duplicates(palette_name.value)){
            error_section.textContent = "Please enter a unique palette name";
        }
        else{

            let palette = save_palette(palette_name.value , color1.value , color2.value , color3.value);
            add_palette_to_container(palette_name.value , color1.value , color2.value , color3.value , palette.id);
            saved_palettes.push(palette);
            update_local_storage();
        }
    }
    else{
        error_section.textContent = "Please enter a palette name";
    }
})

change_mode_button.addEventListener("click" , () => {
    let current_mode = getComputedStyle(root).getPropertyValue("--mode");
    console.log(current_mode);
    if(current_mode == "light"){
        console.log("changing to dark");
        root.style.setProperty("--mode" , dark.mode);
        root.style.setProperty("--primary-color" , dark.primary_color);
        root.style.setProperty("--background-color" , dark.background_color);
        root.style.setProperty("--input-background-color" , dark.input_backgroun_color);
        root.style.setProperty("--color-input-border-color" , dark.color_input_border_color);
        root.style.setProperty("--opposite-mode-color" , dark.opposite_mode_color);
        root.style.setProperty("--opposite-mode-text-color" , dark.opposite_mode_text_color);
        root.style.setProperty("--input-text-color" , dark.input_text_color);
        root.style.setProperty("--input-placeholder-color" , dark.input_placeholder_color);
        root.style.setProperty("hover-color" , dark.hover_color);
        root.style.setProperty("hover-text-color" , dark.hover_text_color);
        root.style.setProperty("--palette-box-color" , dark.palette_box_background_color);
        root.style.setProperty("--delete-button-border-color" , dark.delete_button_border_color);
        root.style.setProperty("--text-color" , dark.text_color);
        change_mode_button.innerText = "Light Mode";
    }
    else{
        console.log("changing to light");
        root.style.setProperty("--mode" , light.mode);
        root.style.setProperty("--primary-color" , light.primary_color);
        root.style.setProperty("--background-color" , light.background_color);
        root.style.setProperty("--input-background-color" , light.input_backgroun_color);
        root.style.setProperty("--color-input-border-color" , light.color_input_border_color);
        root.style.setProperty("--opposite-mode-color" , light.opposite_mode_color);
        root.style.setProperty("--opposite-mode-text-color" , light.opposite_mode_text_color);
        root.style.setProperty("--input-text-color" , light.input_text_color);
        root.style.setProperty("--input-placeholder-color" , light.input_placeholder_color);
        root.style.setProperty("hover-color" , light.hover_color);
        root.style.setProperty("hover-text-color" , light.hover_text_color);
        root.style.setProperty("--palette-box-color" , light.palette_box_background_color);
        root.style.setProperty("--delete-button-border-color" , light.delete_button_border_color);
        root.style.setProperty("--text-color" , light.text_color);
        change_mode_button.innerText = "Dark Mode";
    }
} )


/**
 * The function `add_palette_to_container` creates a new palette box with specified colors and name,
 * and adds a delete button to remove it.
 * @param palette_name - The `palette_name` parameter is a string that represents the name of the color
 * palette being added to the container.
 * @param color1 - Color1 is the first color in the palette, color2 is the second color, and color3 is
 * the third color. The function `add_palette_to_container` creates a new palette box with the given
 * palette name and colors, and adds a delete button to remove the palette.
 * @param color2 - Color 2 is the second color in the palette, represented by the variable `color2`.
 * @param color3 - Color3 is the third color in the palette that will be added to the container.
 * @param id - The `id` parameter in the `add_palette_to_container` function is used to uniquely
 * identify each palette that is added to the container. This identifier can be used to perform actions
 * such as deleting a specific palette from the container.
 */
function add_palette_to_container(palette_name , color1 , color2 , color3 , id){




    error_section.textContent = "";
    let div = document.createElement("div");
    let delete_button = document.createElement("button");


    delete_button.innerText = "Delete";
    delete_button.className = "delete_button";
    div.className = "palette_box";
    div.innerHTML = `
        <div class="palette_details">
            <span class="palette_name">${sanitize(palette_name)}</span>
            <div class="color_sample" style="background-color: ${color1}"></div>
            <div class="color_sample" style="background-color: ${color2};"></div>
            <div class="color_sample" style="background-color: ${color3};"></div>
        </div>
    `;

    div.appendChild(delete_button);
    delete_button.addEventListener("click" , () => {

        div.remove();
        delete_palette(id);
    })

    document.getElementById("saved_palettes_section").appendChild(div);
}




/**
 * The `sanitize` function removes certain special characters from a string by replacing them with
 * spaces.
 * @param string - The `sanitize` function takes a string as input and replaces any occurrences of
 * double quotes, less than sign, greater than sign, single quote, and square brackets with a space.
 * @returns The `sanitize` function takes a string as input and replaces any occurrences of double
 * quotes, less than sign, greater than sign, single quote, and square brackets with a space. The
 * sanitized string is then returned.
 */

function sanitize(string){
    return string.replace(/[""<>'\[\]]/g , " ");
} 



/**
 * The function `update_local_storage` saves the `saved_palettes` array to the local storage as a JSON
 * string.
 */

function update_local_storage(){
    localStorage.setItem("palette_list" , JSON.stringify(saved_palettes));
}



/**
 * here this function creates an object with the inputed parameters and pushes it to the saved_palettes array
 * then updates the local storage and at last it returns that object *
 */

function save_palette(name , color1 , color2 , color3){
    let palette = {
        name: name,
        1: color1,
        2: color2,
        3: color3,
        id: generate_id()
    }
    return palette;
}

/**
 * The function `load_saved_palettes` iterates over saved palettes and adds them to a container while
 * logging their details.
 */

function load_saved_palettes(){
    for(let i = 0; i < saved_palettes.length; i++){
        add_palette_to_container(saved_palettes[i].name , saved_palettes[i][1] , saved_palettes[i][2] , saved_palettes[i][3] , saved_palettes[i].id)
    }
}





/**
 * The function generates a random ID number.
 * @returns A randomly generated ID is being returned by the `generate_id` function. The ID is a random
 * number between 0 and 9999999999999999999999999 (exclusive) generated using `Math.random()` and
 * `Math.floor()`.~
 */

function generate_id(){
    return Math.floor(Math.random() * 9999999999999999999999999);
}
/**
 * The function `delete_palette` removes a palette with a specific ID from the `saved_palettes` array
 * and updates the local storage.
 *@param id - The `id` parameter in the `delete_palette` function represents the unique identifier of
 * the palette that needs to be deleted from the `saved_palettes` array.
 */

function delete_palette(id){
    
    saved_palettes = saved_palettes.filter(palette => palette.id != id);
    update_local_storage();
}



/**
 * The function `check_for_duplicates` checks if a given name already exists in an array of saved
 * palettes.
 * @param name - The `name` parameter in the `check_for_duplicates` function is the name of a palette
 * that you want to check for duplicates in the `saved_palettes` array. The function iterates through
 * the `saved_palettes` array and returns `true` if a palette with the same name as
 * @returns The function `check_for_duplicates` is returning a boolean value. It returns `true` if
 * there is a palette with the same name as the input `name` in the `saved_palettes` array, and `false`
 * otherwise.
 */
function check_for_duplicates(name){
    let is_duplicate = false;
    saved_palettes.forEach(palette => {
        if(palette.name == name){
            is_duplicate = true;
        }
    })  
    return is_duplicate;
}


