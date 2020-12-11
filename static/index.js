function suggestion() {
    
    var textarea = document.getElementById("context");
    var textarea2 = document.getElementById("contextg");

    var input = document.getElementById("keyword");
    var input2 = document.getElementById("sentence");
    // var context = "i agree "+ input.value +". "+ input2.value +" "+ textarea.value; 
    var context = "I have a positive opinion on "; 
    context += input.value;
    context += " ";
    context += input2.value;
    context += " ";
    context += textarea.value;

    // var context2 = "i do not agree "+ input.value +". "+ input2.value +" "+textarea2.value; 
    var context2 = "I have a negative opinion about "; 
    context2 += input.value;
    context2 += ", ";
    context2+= input2.value;
    context2 += " ";
    context2 += textarea2.value;

    var formData = new FormData(); 
    var formData2 = new FormData(); 
    formData.append("context", context );
    formData.append("model", model);
    formData.append("length", length);
    formData2.append("context", context2 );
    formData2.append("model", model);
    formData2.append("length", length);
    fetch(
        "/gpt2",
        {
            method: "POST",
            body:formData
        }
    )
    .then(response => {
        if (response.status == 200){
            return response
        }
        else{
            throw Error("Failed");
        }
    })
    .then(response => response.json())
    .then(response => {
        var item = response[0];
        concat(item);
        console.log(item);
    })
    .catch(e => {
        console.log(e);
    })

// second textarea

    fetch(
        "/gpt2",
        {
            method: "POST",
            body:formData2
        }
    )
    .then(response2 => {
        if (response2.status == 200){
            return response2
        }
        else{
            throw Error("Failed");
        }
    })
    .then(response2 => response2.json())
    .then(response2 => {
        var item = response2[0];
        concat2(item);
        console.log(item);
    })
    .catch(e => {
        console.log(e);
    })
    
}

function concat(newText) {
    var context = document.getElementById("context");
    var text = context.value;
    text += newText; 

    context.value = text;
}
function concat2(newText1) {
    var context2 = document.getElementById("contextg");
    var text2 = context2.value;
    text2 += newText1; 

    context2.value = text2;
}
