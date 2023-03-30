document.getElementById("color-picker").addEventListener("submit",function(e){
    e.preventDefault()
    generateColorScheme()
})

function generateColorScheme(){
    const myColor = document.getElementById("my-color").value
    const scheme = document.getElementById("select-scheme").value
    // get request to fetch the range of colors matching the color of myColor
    fetch(`https://www.thecolorapi.com/scheme?hex=${myColor.slice(1,7)}&mode=${scheme}`)
        .then((res) => res.json())
        .then((data) => {
            // store the colors that we get from the api in an array
            let colorArray = []
            for (let i = 0; i < data.colors.length; i++) {
                colorArray.push(data.colors[i].hex.value)
            }
            
            // time to loop over the array and render it to the DOM
            let html = ""
            
            for (let color of colorArray){
                html += `
                <div class="mid-section">
                    <div id="color-scheme" onclick="cop" style="background-color:${color}"></div>
                    <p id="${color}" onclick="copyToClipboard('${color}')">${color}</p>
                </div>`
            }
            // render to DOM
            document.querySelector("main").innerHTML = html
        })
    
}

// copy hexcode to clipboard
window.copyToClipboard = (color) =>{
    navigator.clipboard.writeText(`${color}`)

    // toast notification for copying hexcode to clipboard
    var x = document.getElementById("snackbar");
    x.innerHTML = `Copied ${color} to clipboard`
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
