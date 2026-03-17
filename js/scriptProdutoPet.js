document.addEventListener("DOMContentLoaded", () => {

    /* TROCAR IMAGEM */
    
    const mainImg = document.getElementById("mainImg")
    const thumbs = document.querySelectorAll(".thumbs img")
    
    thumbs.forEach(img => {
    
    img.addEventListener("click", () => {
    
    mainImg.src = img.src
    
    })
    
    })
    
    /* ZOOM IMAGEM */
    
    mainImg.addEventListener("mousemove", () => {
    
    mainImg.style.transform = "scale(1.1)"
    
    })
    
    mainImg.addEventListener("mouseleave", () => {
    
    mainImg.style.transform = "scale(1)"
    
    })
    
    /* BOTÃO COMPRAR */
    
    const botao = document.querySelector(".comprar")
    
    botao.addEventListener("click", () => {
    
    botao.innerText = "✔ Produto adicionado!"
    
    })
    
    /* ESTOQUE DINÂMICO */
    
    const estoque = document.getElementById("estoque")
    
    let qtd = Math.floor(Math.random()*10)+5
    
    estoque.innerText =
    "🔥 Restam apenas "+qtd+" unidades em estoque"
    
    /* PESSOAS VISUALIZANDO */
    
    const viewers = document.getElementById("viewers")
    
    let pessoas = Math.floor(Math.random()*15)+3
    
    viewers.innerText =
    "👀 "+pessoas+" pessoas vendo este produto"
    
    /* ANIMAÇÃO SCROLL */
    
    const elementos = document.querySelectorAll(".vantagem, .review")
    
    function revelar(){
    
    const alturaTela = window.innerHeight
    
    elementos.forEach((el,index)=>{
    
    const pos = el.getBoundingClientRect().top
    
    if(pos < alturaTela - 100){
    
    setTimeout(()=>{
    
    el.classList.add("show")
    
    }, index * 200)
    
    }
    
    })
    
    }
    
    window.addEventListener("scroll", revelar)
    
    revelar()
    
    })