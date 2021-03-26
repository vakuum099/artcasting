'use strict'

//filter buttons

const filterHide=[
    ['.castingfilter', '.castingfilterhide'],
    ['.sexfilter', '.sexfilterhide'],
    ['.agefilter', '.agefilterhide']//,
 //   ['.morefilters', '.morefiltershide']
];

filterHide.forEach(e=>toggleViewHover(e)); 

function toggleViewHover(ar){
    document.querySelector(ar[0]).addEventListener('mouseover', ()=> {
        document.querySelector(ar[1]).style.display='block';
    });
    document.querySelector(ar[0]).addEventListener('mouseout', ()=> {
        document.querySelector(ar[1]).style.display='none';
    });
}

document.querySelector('.morefilters').addEventListener('mouseover', ()=> document.querySelector('.morefiltershide').style.display='grid');
document.querySelector('.morefilters').addEventListener('mouseout', ()=> document.querySelector('.morefiltershide').style.display='none');


//mobile-menu

document.querySelector('nav>svg').addEventListener("mouseup", ()=> document.querySelector('.mobile-menu').style.display='block');
document.querySelector('div.logo>svg').addEventListener("mouseup", ()=> document.querySelector('.mobile-menu').style.display='none');

//filter sex

document.querySelector('.sexfilterhide').addEventListener('mouseup', (e)=>setColorForTarget(e,'#383838','#68CBB3'));

function setColorForTarget(el, defaultColor, targetColor){
    el.target.parentNode.childNodes.forEach(e=>{
        if(e.style){
            e.style.color = defaultColor;
        }
    });
    el.target.style.color = targetColor;
}

//banner slider hover

bannerSliderHover('.left-banner-button','#fff', '#B0E9DD');
bannerSliderHover('.right-banner-button','#fff', '#B0E9DD');

function bannerSliderHover(button, colorIn, colorOut){
    document.querySelector(button).addEventListener("mouseover", (e)=> e.target.parentNode.tagName=="svg" ? 
    e.target.parentNode.childNodes[1].style.stroke=colorIn : 
    e.target.parentNode.childNodes[1].childNodes[1].style.stroke=colorIn);
    document.querySelector(button).addEventListener("mouseout", (e)=> e.target.parentNode.tagName=="svg" ? 
    e.target.parentNode.childNodes[1].style.stroke=colorOut : 
    e.target.parentNode.childNodes[1].childNodes[1].style.stroke=colorOut);
}

//banner slider carousel
let temp=[];
const banner = {
    position:0,
    pages: [
        ['ARTcasting', 'Это самый удобный, интуитивный сервис кастингов в рунете'],
        ['ARTcasting', 'Это самый большой выбор актеров, артистов и ведущих'],
        ['ARTcasting', 'Новый уровень удобства кастингов в рунете']],       
};

banner.left = function(){
    this.position === 0 ? this.position=this.pages.length-1 : this.position=this.position - 1;
    this.show();
}
banner.right = function(){
    this.position === this.pages.length - 1 ? this.position=0 : this.position=this.position + 1;
    this.show();
}
banner.show = function(){
    document.querySelector('.text-banner>h2').innerHTML = this.pages[this.position][0];
    document.querySelector('.text-banner>p').innerHTML = this.pages[this.position][1];
    document.querySelector('.banner-slider').childNodes.forEach(e=>{
        if (e.tagName==="svg"){
            e.childNodes[1].style.fillOpacity=0.35;
            temp.push(e);
        }
    });
    temp[this.position].childNodes.forEach(e=>{
        if (e.tagName=="circle"){
            e.style.fillOpacity = 1;
        }
    });
}

document.querySelector('.left-banner-button').addEventListener("mouseup", ()=>banner.left() );
document.querySelector('.right-banner-button').addEventListener("mouseup", ()=> banner.right() );


//casting carousel
let container=document.querySelector('.actorsCards');

function castingMoveLeft(){
    container.insertBefore(container.firstChild, null);
    container.insertBefore(container.firstChild, null);
}

function castingMoveRight(){
    container.insertBefore(container.lastChild, container.firstChild);
    container.insertBefore(container.lastChild, container.firstChild);
}

let trackXDown;

document.querySelector('.casting').addEventListener('mousedown', downMeasure);
document.querySelector('.casting').addEventListener('mouseup', castingMove);

function downMeasure(e){
    trackXDown = e.clientX;
}

function castingMove(e){
    let xDown = e.clientX;

    console.log(trackXDown, xDown, Math.abs(trackXDown-xDown)>120, trackXDown>xDown ? "castingMoveRight" : "castingMoveLeft");
    if (Math.abs(trackXDown-xDown)>120){
        let count = Math.ceil(Math.abs((trackXDown-xDown)/140));
        let callback = trackXDown>xDown ? castingMoveLeft : castingMoveRight;
        for (let i = 0; i <count; i++){
                console.log('move!');
                callback();
        }
    }
}


//custom checkbox <div class="checkbox">

document.querySelectorAll('div.checkbox').forEach(e=>e.addEventListener("mouseover", checkboxIn));
document.querySelectorAll('div.checkbox').forEach(e=>e.addEventListener("mouseout", checkboxOut));
document.querySelectorAll('div.checkbox').forEach(e=>e.addEventListener("mouseup", checkboxClick));
document.querySelectorAll('div.checkbox').forEach(e=>e.addEventListener("change", checkboxClick));


function checkboxClick(e){
    const container = findContainerCheckbox(e);
    if(e.target.tagName === 'svg' || e.target.tagName === 'rect' || e.target.tagName === 'path'){
        container[3].checked = !container[3].checked;
    }
    checkForCheck(container);
}

function findContainerCheckbox(e){
    if(e.target.className === "checkbox"){
        return e.target.childNodes;
    } else if (e.target.parentNode.className === "checkbox"){
        return e.target.parentNode.childNodes;
    }else if (e.target.parentNode.parentNode.className === "checkbox"){
        return e.target.parentNode.parentNode.childNodes;
    } else {
        console.log(e);
    }
}

function checkForCheck(container){
    container[3].checked ? container[1].childNodes[3].style.stroke = "#68CBB3" : container[1].childNodes[3].style.stroke = null;
}

function checkboxIn(e){
    checkboxHover(e, '#68CBB3');
}

function checkboxOut(e){
    checkboxHover(e, '#E0E0E0');
}

function checkboxHover(e,color){
    let container = findContainerCheckbox(e);
        container[1].childNodes[1].style.stroke = color;
        checkForCheck(container);
}

// input search

let inp = document.querySelector('.inputtext');

inp.addEventListener('change', inputHandler);

function inputHandler(){
    inp.value ? inp.style.backgroundImage = "url(./media/search.svg)" : inp.style.backgroundImage = "url(./media/searchgrey.svg)";
}


