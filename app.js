const SUPABASE_URL = "https://ngitcbwpoencfoczuaoe.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5naXRjYndwb2VuY2ZvY3p1YW9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNjI3MDYsImV4cCI6MjA4ODkzODcwNn0.s6krkNEGUkG7JGZD_LY1tgz85qfTRrVxCSkO2Ly05-A";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let empresaEditando = null
let vagaEditando = null



/* =========================
NAVEGAÇÃO
========================= */

function abrirTela(tela){

/* menu ativo */

document.querySelectorAll(".sidebar li").forEach(li=>{
li.classList.remove("active")
})

document
.querySelector(`.sidebar li[onclick="abrirTela('${tela}')"]`)
.classList.add("active")

document.querySelectorAll(".tela").forEach(t=>{
t.style.display="none"
})

if(tela==="dashboard"){
document.getElementById("telaDashboard").style.display="block"
carregarDashboard()
}

if(tela==="empresas"){
document.getElementById("telaEmpresas").style.display="block"
carregarEmpresas()
}

if(tela==="vagas"){
document.getElementById("telaVagas").style.display="block"
carregarVagas()
}

if(tela==="candidatos"){
document.getElementById("telaCandidatos").style.display="block"
carregarCandidatosVagas()
}

}



/* =========================
DASHBOARD
========================= */

async function carregarDashboard(){

/* vagas abertas */

const {count:abertas} = await client
.from("vagas")
.select("*",{count:"exact",head:true})
.eq("status","publicada")

document.getElementById("dashVagasAbertas").innerText = abertas || 0


/* vagas processo */

const {count:processo} = await client
.from("vagas")
.select("*",{count:"exact",head:true})
.in("status",["triagem","entrevistas","entrevista_gestor"])

document.getElementById("dashVagasProcesso").innerText = processo || 0


/* vagas concluídas */

const {count:concluidas} = await client
.from("vagas")
.select("*",{count:"exact",head:true})
.eq("status","concluida")

document.getElementById("dashVagasConcluidas").innerText = concluidas || 0


/* total candidatos */

const {count:candidatos} = await client
.from("candidatos")
.select("*",{count:"exact",head:true})

document.getElementById("dashCandidatos").innerText = candidatos || 0



/* vagas + candidatos */

const {data:vagas} = await client
.from("vagas")
.select("id,titulo,cidade")

const lista = document.getElementById("dashVagasCandidatos")

lista.innerHTML=""

for(const vaga of vagas){

const {count} = await client
.from("candidatos")
.select("*",{count:"exact",head:true})
.eq("vaga_id",vaga.id)

lista.innerHTML += `

<tr>

<td>${vaga.titulo}</td>
<td>${vaga.cidade || ""}</td>
<td>${count}</td>

</tr>

`

}

}



/* =========================
EMPRESAS
========================= */

async function carregarEmpresas(){

const {data} = await client
.from("empresas")
.select("*")
.order("id",{ascending:false})

const lista = document.getElementById("listaEmpresas")

lista.innerHTML=""

data.forEach(e=>{

lista.innerHTML+=`

<tr>

<td>${e.nome}</td>
<td>${e.cnpj||""}</td>
<td>${e.responsavel||""}</td>
<td>${e.email||""}</td>
<td>${e.telefone||""}</td>
<td>${e.cidade||""}</td>

<td>
<button onclick="editarEmpresa(${e.id})">Editar</button>
<button onclick="excluirEmpresa(${e.id})">Excluir</button>
</td>

</tr>

`

})

}



async function salvarEmpresa(){

const nome=document.getElementById("nome").value
const cnpj=document.getElementById("cnpj").value
const responsavel=document.getElementById("responsavel").value
const email=document.getElementById("email").value
const telefone=document.getElementById("telefone").value
const cidade=document.getElementById("cidade").value
const observacao=document.getElementById("observacao").value

if(empresaEditando){

await client
.from("empresas")
.update({nome,cnpj,responsavel,email,telefone,cidade,observacao})
.eq("id",empresaEditando)

empresaEditando=null

}else{

await client
.from("empresas")
.insert([{nome,cnpj,responsavel,email,telefone,cidade,observacao}])

}

fecharModalEmpresa()
carregarEmpresas()

}



async function editarEmpresa(id){

empresaEditando=id

const {data}=await client
.from("empresas")
.select("*")
.eq("id",id)
.single()

document.getElementById("nome").value=data.nome||""
document.getElementById("cnpj").value=data.cnpj||""
document.getElementById("responsavel").value=data.responsavel||""
document.getElementById("email").value=data.email||""
document.getElementById("telefone").value=data.telefone||""
document.getElementById("cidade").value=data.cidade||""
document.getElementById("observacao").value=data.observacao||""

abrirModalEmpresa()

}



async function excluirEmpresa(id){

if(!confirm("Excluir empresa?")) return

await client
.from("empresas")
.delete()
.eq("id",id)

carregarEmpresas()

}



/* =========================
VAGAS
========================= */

async function carregarVagas(){

const {data} = await client
.from("vagas_com_empresa")
.select("*")

const lista=document.getElementById("listaVagas")

lista.innerHTML=""

data.forEach(v=>{

lista.innerHTML+=`

<tr>

<td>${v.empresa_nome}</td>
<td>${v.titulo}</td>
<td>${v.cidade||""}</td>
<td>${v.status}</td>

<td>
<button onclick="editarVaga(${v.id})">Editar</button>
<button onclick="excluirVaga(${v.id})">Excluir</button>
</td>

</tr>

`

})

}



async function salvarVaga(){

const empresa_id=document.getElementById("empresa_id").value
const titulo=document.getElementById("titulo").value
const cidade=document.getElementById("cidade_vaga").value
const requisitos=document.getElementById("requisitos").value
const atividades=document.getElementById("atividades").value
const salario=document.getElementById("salario").value
const email_contato=document.getElementById("email_contato").value
const status=document.getElementById("status").value

if(vagaEditando){

await client
.from("vagas")
.update({
empresa_id,
titulo,
cidade,
requisitos,
atividades,
salario,
email_contato,
status
})
.eq("id",vagaEditando)

vagaEditando=null

}else{

await client
.from("vagas")
.insert([{
empresa_id,
titulo,
cidade,
requisitos,
atividades,
salario,
email_contato,
status
}])

}

gerarImagemVaga({
titulo,
cidade,
requisitos,
atividades,
salario
})

fecharModalVaga()
carregarVagas()
carregarDashboard()

}



async function editarVaga(id){

vagaEditando=id

const {data}=await client
.from("vagas")
.select("*")
.eq("id",id)
.single()

document.getElementById("empresa_id").value=data.empresa_id
document.getElementById("titulo").value=data.titulo||""
document.getElementById("cidade_vaga").value=data.cidade||""
document.getElementById("requisitos").value=data.requisitos||""
document.getElementById("atividades").value=data.atividades||""
document.getElementById("salario").value=data.salario||""
document.getElementById("email_contato").value=data.email_contato||""
document.getElementById("status").value=data.status||"publicada"

abrirModalVaga()

}



/* =========================
INICIAR SISTEMA
========================= */

abrirTela("dashboard")

async function abrirCandidatos(vagaId,titulo){

/* esconder telas */

document.querySelectorAll(".tela").forEach(t=>{
t.style.display="none"
})

/* abrir tela lista */

document.getElementById("telaListaCandidatos").style.display="block"

/* título da vaga */

document.getElementById("tituloVaga").innerText = "Candidatos - " + titulo


/* buscar candidatos */

const { data, error } = await client
.from("candidatos")
.select("*")
.eq("vaga_id",vagaId)

if(error){
console.error(error)
return
}

/* montar tabela */

const lista=document.getElementById("listaCandidatos")

lista.innerHTML=""

data.forEach(c=>{

lista.innerHTML+=`

<tr>

<td>${c.nome}</td>
<td>${c.cpf}</td>
<td>${c.idade}</td>
<td>${c.whatsapp}</td>
<td>${c.email}</td>

<td>
<a href="${c.curriculo_url}" target="_blank">
<button>Ver currículo</button>
</a>
</td>

</tr>

`

})

}

function voltarCandidatos(){

document.querySelectorAll(".tela").forEach(t=>{
t.style.display="none"
})

document.getElementById("telaCandidatos").style.display="block"

}

/* =========================
MODAL EMPRESA
========================= */

function abrirModalEmpresa(){

document.getElementById("modalEmpresa").style.display="flex"

}

function fecharModalEmpresa(){

document.getElementById("modalEmpresa").style.display="none"

empresaEditando=null

}


/* =========================
MODAL VAGA
========================= */

function abrirModalVaga(){

document.getElementById("modalVaga").style.display="flex"

carregarEmpresasSelect()

}

function fecharModalVaga(){

document.getElementById("modalVaga").style.display="none"

vagaEditando=null

}

async function carregarEmpresasSelect(){

const {data} = await client
.from("empresas")
.select("id,nome")
.order("nome")

const select = document.getElementById("empresa_id")

select.innerHTML=""

data.forEach(e=>{

select.innerHTML += `
<option value="${e.id}">
${e.nome}
</option>
`

})

}

/* =========================
CANDIDATOS POR VAGA
========================= */

async function carregarCandidatosVagas(){

const { data:vagas, error } = await client
.from("vagas")
.select("id,titulo,cidade")

if(error){
console.error(error)
return
}

const lista = document.getElementById("listaCandidatosVagas")

lista.innerHTML=""

for(const vaga of vagas){

const { count } = await client
.from("candidatos")
.select("*",{count:"exact",head:true})
.eq("vaga_id",vaga.id)

lista.innerHTML += `

<tr>

<td>${vaga.titulo}</td>
<td>${vaga.cidade || ""}</td>
<td>${count}</td>

<td>
<button onclick="abrirCandidatos(${vaga.id},'${vaga.titulo.replace(/'/g,"")}')">
Ver candidatos
</button>
</td>

</tr>

`

}

}

function escreverTexto(ctx, texto, x, y, maxWidth, lineHeight){

const palavras = texto.split(" ")
let linha = ""

for(let n=0;n<palavras.length;n++){

let testeLinha = linha + palavras[n] + " "
let largura = ctx.measureText(testeLinha).width

if(largura > maxWidth && n > 0){
ctx.fillText(linha,x,y)
linha = palavras[n] + " "
y += lineHeight
}else{
linha = testeLinha
}

}

ctx.fillText(linha,x,y)

return y + lineHeight
}

function quebrarTexto(ctx,texto,x,y,maxWidth,lineHeight){

const palavras = texto.split(" ")
let linha=""

for(let i=0;i<palavras.length;i++){

let teste = linha + palavras[i] + " "
let largura = ctx.measureText(teste).width

if(largura > maxWidth && i>0){

ctx.fillText(linha,x,y)
linha = palavras[i] + " "
y += lineHeight

}else{

linha = teste

}

}

ctx.fillText(linha,x,y)

return y + lineHeight
}

/* =========================
GERAR IMAGEM DA VAGA
========================= */

function gerarImagemVaga(dados){

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 1080
canvas.height = 1080

const img = new Image()
img.src = "modelo-padrao.png"

img.onload = function(){

ctx.drawImage(img,0,0,1080,1080)

/* TITULO */

ctx.fillStyle="#F5A400"
ctx.font="bold 48px Arial"

let yTitulo = 350

/* TITULO */

ctx.fillStyle="#F5A400"
ctx.font="bold 48px Arial"

yTitulo = quebrarTexto(ctx,dados.titulo,420,yTitulo,600,50)

/* CIDADE */

ctx.fillStyle="white"
ctx.font="30px Arial"

yTitulo += 10

yTitulo = quebrarTexto(ctx,dados.cidade,420,yTitulo,600,35)

/* CIDADE */

ctx.fillStyle="white"
ctx.font="30px Arial"

/* REQUISITOS */

let y = 560

/* TITULO */

ctx.fillStyle="#F5A400"
ctx.font="bold 34px Arial"
ctx.fillText("REQUISITOS",140,y)

y += 40

/* LISTA */

ctx.font="26px Arial"
ctx.fillStyle="white"

dados.requisitos.split("\n").forEach(r=>{
y = quebrarTexto(ctx,"• "+r,140,y,780,34)
})

/* ATIVIDADES */

y += 40

ctx.fillStyle="#F5A400"
ctx.font="bold 34px Arial"
ctx.fillText("ATIVIDADES",140,y)

y += 40

ctx.font="26px Arial"
ctx.fillStyle="white"

dados.atividades.split("\n").forEach(a=>{
y = quebrarTexto(ctx,"• "+a,140,y,780,34)
})

/* SALARIO */

y += 40

ctx.fillStyle="#F5A400"
ctx.font="bold 34px Arial"
ctx.fillText("SALÁRIO",140,y)

y += 45

ctx.fillStyle="white"
ctx.font="bold 32px Arial"
ctx.fillText(dados.salario,140,y)

/* DOWNLOAD */

const link = document.createElement("a")

const nomeArquivo = dados.titulo
.replaceAll(" ","_")
.replace(/[^\w]/g,"")

link.download = nomeArquivo + ".png"
link.href = canvas.toDataURL()
link.click()

}

}

/* =========================
LOGIN SIMPLES
========================= */

function fazerLogin(){

const user=document.getElementById("loginUser").value
const pass=document.getElementById("loginPass").value

if(user==="admin" && pass==="admin"){

localStorage.setItem("logado","true")

document.getElementById("loginScreen").style.display="none"

}else{

document.getElementById("loginErro").innerText="Usuário ou senha inválidos"

}

}

function logout(){

localStorage.removeItem("logado")

location.reload()

}

/* verificar login */

window.onload=function(){

const logado=localStorage.getItem("logado")

if(logado==="true"){

document.getElementById("loginScreen").style.display="none"

}else{

document.getElementById("loginScreen").style.display="flex"

}

}