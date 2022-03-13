const alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var letraDummy = 'Z';
var alfabetoValido =[];
var alfabetoValidoSet = new Set([]);
var chave = new Set(["G","R","I","T","O"]);

function separaGrupoBigramicoDePalavra(palavra){
	let vetor=[];
	let indiceInicio=0;
	for(let indiceFim=2; indiceFim	< palavra.length; indiceFim+=2){
		if(palavra.substring(indiceInicio,indiceFim)[0]!=palavra.substring(indiceInicio,indiceFim)[1])
			vetor.push(palavra.substring(indiceInicio,indiceFim));
		else
			vetor.push(palavra.substring(indiceInicio,indiceFim)[0]+letraDummy);
		indiceInicio=indiceFim;
	}
	if(palavra.length-indiceInicio==2)
		vetor.push(palavra.substring(indiceInicio,palavra.length));
	else
		vetor.push(palavra.substring(indiceInicio,palavra.length)+letraDummy);
	//console.log(vetor);
	return vetor;
}
function separaPalavrasDeString(frase){
	let pilhaDePalavras=[];
	let indiceFim=0, indiceInicio=0;
	for(indiceFim=0; indiceFim<frase.length; indiceFim++){	
		//encontrou um espaço, logo indiceFim seria o fim da palavra
		if(frase[indiceFim]==" "){
			let palavraIdentificada=frase.substring(indiceInicio,(indiceFim));
			if(palavraIdentificada!="")
				pilhaDePalavras.push(palavraIdentificada);
			indiceInicio=indiceFim+1;
		}
	}
	let palavraIdentificada=frase.substring(indiceInicio,(indiceFim));
	if(palavraIdentificada!="")
				pilhaDePalavras.push(palavraIdentificada);
	return pilhaDePalavras;
}
function isUpperCase(letra){
	if(letra.charCodeAt(0)>64 && letra.charCodeAt(0)<91)
		return true;
	return false;
}
function isLowerCase(letra){
	if(letra.charCodeAt(0)>96 && letra.charCodeAt(0)<123)
		return true;
	return false;
}


function converteTabelaEmMatriz(idTabela){
	let matrizTabela = [];
	let linhaTabela = [];
	let elementoTabela = document.getElementById(idTabela).childNodes[1];
	let filhosTabela=elementoTabela.childNodes;
	for(let i = 0; i < filhosTabela.length; i++)
	{
		if(filhosTabela[i].nodeType!=Node.TEXT_NODE)
		{if(filhosTabela[i].nodeName=="TR"){
			// CASO SEJA UMA LINHA NOVA (ELEMENTO NÃO TEXTO) e não cabeçalho
			let elementoLinhaTabela=filhosTabela[i];
			linhaTabela.push(converteLinhaTabelaEmVetor(elementoLinhaTabela));
			matrizTabela.push(linhaTabela);
			linhaTabela=[];
		}
		}
	}
	return matrizTabela;
}
function converteLinhaTabelaEmVetor(elementoLinha){
	let filhosElementoLinha = elementoLinha.childNodes;
	let vetor=[];
	for(let i = 0; i < filhosElementoLinha.length; i++){
		if(filhosElementoLinha.nodeType!=Node.TEXT_NODE)
		{	// CASO SEJA UM NOVO ELEMENTO "TD" (NÃO TEXTO)
			vetor.push(filhosElementoLinha[i].innerHTML);
		}
	}
	return vetor;
}
function preencheTabelaComMatriz(idTabela, matriz){
	elementoTabela = document.getElementById(idTabela);
	elementoTabela.innerHTML="";
	for(var linha=0; linha<matriz.length; linha++){
		let elementoLinha = document.createElement("tr");
		for(let coluna=0; coluna < matriz[linha][0].length; coluna++){
			let elementoItem = document.createElement("td");
			let conteudoItem = document.createTextNode(matriz[linha][0][coluna]);
			elementoItem.appendChild(conteudoItem);
			elementoLinha.appendChild(elementoItem);
		}
		elementoTabela.appendChild(elementoLinha);
	}	
}


function getCharColCodeFromCipher(caractere, matriz){
	for(let indiceLinha=0; indiceLinha< matriz.length; indiceLinha++)
		for(let indiceColuna=0;indiceColuna<matriz[indiceLinha][0].length;indiceColuna++){
			if(matriz[indiceLinha][0][indiceColuna]==caractere)
				return indiceColuna;
		}
	return false;
}
function getCharRowCodeFromCipher(caractere, matriz){
	for(let indiceLinha=0; indiceLinha< matriz.length; indiceLinha++)
		for(let indiceColuna=0;indiceColuna<matriz[indiceLinha][0].length;indiceColuna++){
			if(matriz[indiceLinha][0][indiceColuna]==caractere)
				return indiceLinha;
		}
	return false;
}



function updateChave(){
	updateAlfabetoValido();
	let tamanho = document.getElementById("chave-input").value.length;
	document.getElementById("chave-input").value=document.getElementById("chave-input").value.toUpperCase();
	let letras = new Set();
	for(let i=0; i < tamanho; i++){
		for(let j=0; j<alfabetoValido.length; j++){
			alfabetoValidoSet.add(alfabetoValido[j]);
		}
		if(letras.has(document.getElementById("chave-input").value[i].toUpperCase()))
		{
			document.getElementById("chave-input").value=document.getElementById("chave-input").value.substring(0,i);
			console.log("Apenas são aceitos valores únicos na chave");
			return;
		}
		else
		{
			if(!alfabetoValidoSet.has(document.getElementById("chave-input").value[i].toUpperCase())){
				console.log("Letra '"+document.getElementById("chave-input").value[i].toUpperCase()+"' não pode ser usada pois não faz parte do alfabeto valido");
				document.getElementById("chave-input").value=document.getElementById("chave-input").value.substring(0,document.getElementById("chave-input").value.length-1);
			}else
			letras.add(document.getElementById("chave-input").value[i].toUpperCase());
		}
	}
	chave=letras;
	document.getElementById("chave").value=Array.from(chave).join('');
	updateTabela();
}
function updateTabela(){
	updateAlfabetoValido();
	let letrasUsadas = new Set([]);
	let chaveEscolhida=document.getElementById("chave").value;
	let elementos = document.querySelectorAll("td");
	let vetor = alfabetoValido;
	for(let i=0;i<25;i++){
		if(i<chaveEscolhida.length)
		{
			elementos[i].innerHTML=chaveEscolhida[i];
			letrasUsadas.add(chaveEscolhida[i]);
			continue;
		}
		else
		{
			//console.log(letrasUsadas);
			for(let j=0; j<vetor.length; j++){
				if(!letrasUsadas.has(vetor[j])){
					letrasUsadas.add(vetor[j]);
					elementos[i].innerHTML=vetor[j];
					break;
				}
			}
		}
	}
}
function updateAlfabetoValido(){
	document.getElementById("letra-proibida").value=document.getElementById("letra-proibida").value.toUpperCase();
	alfabetoValido=[];
	for(let i=0;i<alfabeto.length;i++){
		let texto=document.getElementById("letra-proibida").value.toUpperCase();
		if(!texto.includes(alfabeto[i]))
			alfabetoValido.push(alfabeto[i]);
	}
	//console.log(alfabetoValido);
	
}
function updateLetraDummy(){
	document.getElementById("letra-dummy").value=document.getElementById("letra-dummy").value.toUpperCase();
	if(document.getElementById("letra-dummy").value[0]!=null)
		letraDummy = document.getElementById("letra-dummy").value[0].toUpperCase();
	else
		letraDummy = "Z";
	console.log("Letra dummy atualizada: "+letraDummy);
}

function updateTextoEncriptado(){
	let textoClaro=document.getElementById("texto-entrada").value;
	let palavras = separaPalavrasDeString(textoClaro);
	let resposta="";
	for(let i=0; i<palavras.length;i++){
		let palavra = palavras[i];
		let gruposBigramicos=separaGrupoBigramicoDePalavra(palavra);
		console.log("Identificada Palavra '"+palavra+"' separada em: ["+gruposBigramicos+"]");	
		for(let j=0; j<gruposBigramicos.length;j++){
			resposta+=cifraGrupoComBaseEmMatriz(gruposBigramicos[j],converteTabelaEmMatriz("chave-playfair"),1);
		}
		if(i+1<(palavras.length))
			resposta+=" ";
	}
	console.log("Frase '"+textoClaro+"' encriptada: '"+resposta+"'");
	document.getElementById("texto-encriptado").value=resposta;
	return resposta;
}
function cifraGrupoComBaseEmMatriz(grupoBigramico, matriz,valor){
	let novoGrupo="";
	
	let colPrimeiraLetra=getCharColCodeFromCipher(grupoBigramico[0].toUpperCase(),matriz),
		colSegundaLetra=getCharColCodeFromCipher(grupoBigramico[1].toUpperCase(),matriz),
		rowPrimeiraLetra=getCharRowCodeFromCipher(grupoBigramico[0].toUpperCase(),matriz),
		rowSegundaLetra=getCharRowCodeFromCipher(grupoBigramico[1].toUpperCase(),matriz);
	//PRIMEIRO CENÁRIO, MESMA COLUNA
	if(colPrimeiraLetra==colSegundaLetra){
		if(valor>0){
			if(rowPrimeiraLetra==4)
				rowPrimeiraLetra=-1;
			if(rowSegundaLetra==4)
				rowSegundaLetra=-1;
		}else{
			if(rowPrimeiraLetra==0)
				rowPrimeiraLetra=5;
			if(rowSegundaLetra==0)
				rowSegundaLetra=5;
		}
		
		if(isLowerCase(grupoBigramico[0]))
			novoGrupo+=matriz[rowPrimeiraLetra+valor][0][colPrimeiraLetra].toLowerCase();
		else
			novoGrupo+=matriz[rowPrimeiraLetra+valor][0][colPrimeiraLetra];
		
		if(isLowerCase(grupoBigramico[1]))
			novoGrupo+=matriz[rowSegundaLetra+valor][0][colSegundaLetra].toLowerCase();
		else
			novoGrupo+=matriz[rowSegundaLetra+valor][0][colSegundaLetra];
		
		//
		if(valor<0 && novoGrupo[1]==letraDummy)
			novoGrupo=novoGrupo[0]+novoGrupo[0];
			
		console.log("'"+grupoBigramico+"' virou '"+novoGrupo+"'");
		return novoGrupo;
	}
	
	//SEGUNDO CENÁRIO, MESMA LINHA
	if(rowPrimeiraLetra==rowSegundaLetra){
		if(valor>0){
			if(colPrimeiraLetra==4)
				colPrimeiraLetra=-1;
			if(colSegundaLetra==4)
				colSegundaLetra=-1;
		}else{
			if(colPrimeiraLetra==0)
				colPrimeiraLetra=5;
			if(colSegundaLetra==0)
				colSegundaLetra=5;
		}
		
		if(isLowerCase(grupoBigramico[0]))
			novoGrupo+=matriz[rowPrimeiraLetra][0][colPrimeiraLetra+valor].toLowerCase();
		else
			novoGrupo+=matriz[rowPrimeiraLetra][0][colPrimeiraLetra+valor];
		
		if(isLowerCase(grupoBigramico[1]))
			novoGrupo+=matriz[rowSegundaLetra][0][colSegundaLetra+valor].toLowerCase();
		else
			novoGrupo+=matriz[rowSegundaLetra][0][colSegundaLetra+valor];
		
		//
		if(valor<0 && novoGrupo[1]==letraDummy)
			novoGrupo=novoGrupo[0]+novoGrupo[0];
		
		console.log("'"+grupoBigramico+"' virou '"+novoGrupo+"'");
		return novoGrupo;
	}
	//TERCEIRO CENARIO, LINHA E COLUNA DISTINTAS
	if(isLowerCase(grupoBigramico[0]))
		novoGrupo+=matriz[rowPrimeiraLetra][0][colSegundaLetra].toLowerCase();
	else
		novoGrupo+=matriz[rowPrimeiraLetra][0][colSegundaLetra];
	
	if(isLowerCase(grupoBigramico[1]))
		novoGrupo+=matriz[rowSegundaLetra][0][colPrimeiraLetra].toLowerCase();
	else
		novoGrupo+=matriz[rowSegundaLetra][0][colPrimeiraLetra];
	
	//
	if(valor<0 && novoGrupo[1]==letraDummy)
				novoGrupo=novoGrupo[0]+novoGrupo[0];
		
	console.log("'"+grupoBigramico+"' virou '"+novoGrupo+"'");
	return novoGrupo;
}
function updateTextoDecriptado(){
	let textoCriptografado=document.getElementById("texto-entrada").value;
	let palavras = separaPalavrasDeString(textoCriptografado);
	let resposta="";
	for(let i=0; i < palavras.length; i++){
		let palavra = palavras[i];
		let gruposBigramicos = separaGrupoBigramicoDePalavra(palavra);
		console.log("Identificada Palavra criptografada '"+palavra+"' separada em: ["+gruposBigramicos+"]");
		for(let j=0; j<gruposBigramicos.length;j++){
			resposta+=cifraGrupoComBaseEmMatriz(gruposBigramicos[j],converteTabelaEmMatriz("chave-playfair"),-1);
		}
		if(resposta[resposta.length-1]==resposta[resposta.length-2])
			resposta=resposta.substring(0,resposta.length-1);
		
		if(i+1<(palavras.length))
			resposta+=" ";
	}
	console.log("Frase encriptada '"+textoCriptografado+"' decriptada: '"+resposta+"'");
	document.getElementById("texto-decriptado").value=resposta;
	return resposta;
}

onload=function(){
	
	document.getElementById("letra-proibida").onkeyup=updateAlfabetoValido;
	document.getElementById("letra-dummy").onkeyup=updateLetraDummy;
	document.getElementById("chave-input").onkeyup=updateChave;
	document.getElementById("botao-encripta").onclick=updateTextoEncriptado;
	document.getElementById("botao-decripta").onclick=updateTextoDecriptado;
	
	updateChave();	
	console.log("Arquivo algoritmos.js carregado");
}