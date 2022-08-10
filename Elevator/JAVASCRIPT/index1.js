function display(e){
    if(e==0){
        document.getElementById('lift2').style.marginTop=600 - (e*100)+"px";
    document.getElementById('lift2').style.transitionDuration=5+"s";
    document.getElementById('lift2').innerText="G";
    }
    else{
    document.getElementById('lift1').style.marginTop=600 - (e*100)+"px";
    document.getElementById('lift1').style.transitionDuration=5+"s";
    document.getElementById('lift1').innerText=e;
    }
    
}
function display1(e){
    if(e>0){

    document.getElementById('lift2').style.marginTop=600 - (e*100)+"px";
    document.getElementById('lift2').style.transitionDuration=5+"s";
    document.getElementById('lift2').innerText=e;
    }
   
}