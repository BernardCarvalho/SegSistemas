function geraNovaChave(){
	let tabela = document.getElementById("chave-playfair");
	let pilha = preenchePilhaComLetrasPossiveis();
	//alert(pilha);
	let tds = tabela.querySelectorAll("td");
	for(let i=0; i<tds.length; i++){
		tds[i].innerHTML="";
		input = document.createElement("Input");
		input.setAttribute("type","text");
		tds[i].appendChild(input);
		input.value=pilha.pop();
	}
	
}
function preenchePilhaComLetrasPossiveis(){
	
	let pilha = [], 
		vetor = ['A','B','C','D','E','F','G','H','I','J','K','L','M',
			     'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
		letraExcluida=document.getElementById("excluir-letra").value;
	vetor=excluiLetraDoVetor(vetor,letraExcluida);
	let vetorAux=preencheVetorComPossiveisValores(vetor);
	for( 	let i=getRandomInt(0,vetorAux.length-1);pilha.length<25;){
		pilha.push(vetorAux[i]);
		for(let j=0;j<vetor.length;j++){
			if(vetor[j]==vetorAux[i])
				vetor[j]='-';
		}
		vetorAux=preencheVetorComPossiveisValores(vetor);

		i=getRandomInt(0,vetorAux.length-1)
	}
	return pilha;
}
function excluiLetraDoVetor(vetor, letraExcluida){
	for(let i=0; i<vetor.length;i++){
		if(vetor[i]==letraExcluida)
			vetor[i]='-';
	}
	return vetor;	
}
function preencheVetorComPossiveisValores(vetor){
	let vetorAux=[];
	for(let i=0;i<vetor.length;i++){
		if(vetor[i]!="-")
			vetorAux.push(vetor[i]);
	}
	if(vetorAux.length>2)
	{
		let aux=vetorAux[vetorAux.length-1];
		let aux2=vetorAux[Math.floor(vetorAux.length/2)];
		vetorAux[Math.floor(vetorAux.length/2)]=aux;
		vetorAux[vetorAux.length-1]=aux2;
	}
	return vetorAux;
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function geraChaveManual(){
	if(document.getElementById("chave").value.length!=5){
		console.log("Chave de tamanho diferente de 5");
		return;
	}
	for(let i=0; i<5;i++)
		if(	document.getElementById("chave").value[i]
			==
			document.getElementById("excluir-letra").value){
			alert("Elemento da Chave é a letra excluida do alfabeto");
			return;
		}
	
	let pilha = [], 
		vetor = ['A','B','C','D','E','F','G','H','I','J','K','L','M',
			     'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
		letraExcluida=document.getElementById("excluir-letra").value;
		vetor = excluiLetraDoVetor(vetor, letraExcluida);
	for(let i=0; i<25; i++){
		if(i<5)
		{
			document.querySelectorAll("td")[i].innerHTML="";
			let input=document.createElement("input");
			input.setAttribute("type","text");
			 document.querySelectorAll("td")[i].appendChild(input);
			input.setAttribute("value",document.getElementById("chave").value[i]);
			vetor = excluiLetraDoVetor(vetor, document.getElementById("chave").value[i]);
		}
		else{
			for(let j=0; j<26; j++){
				if(vetor[j]!='-'){
					document.querySelectorAll("td")[i].innerHTML="";
					let input=document.createElement("input");
					input.setAttribute("type","text");
					 document.querySelectorAll("td")[i].appendChild(input);
					input.setAttribute("value",vetor[j]);
					vetor = excluiLetraDoVetor(vetor, vetor[j]);
					break;
				}
			}
		}
		//console.log(vetor);
		
		
	}
	
	
	
}



function formataGrupos(textoClaroSubStr){
	let texto=[];
	for(let i=0; i<textoClaroSubStr.length;i++){
		//console.log(textoClaroSubStr[i][0]==textoClaroSubStr[i][1]);
		if(textoClaroSubStr[i][0]==textoClaroSubStr[i][1])
		{
			let textoAux=textoClaroSubStr[i][0];
			textoAux+='Z';
			texto.push(textoAux);
			continue;
		}
		texto.push(textoClaroSubStr[i]);
	}
	//console.log(texto);
	return texto;
}
function criptografaGrupos(pilhaGrupos){
	let resposta=[];
	for(let i=0;i<pilhaGrupos.length;i++){
		if(
			getCol(getIndex(pilhaGrupos[i][0])) ==
			getCol(getIndex(pilhaGrupos[i][1]))
			){
			let string = 	getChar(getCol(getIndex(pilhaGrupos[i][0])),getRow(getIndex(pilhaGrupos[i][0]))+1)								+
							getChar(getCol(getIndex(pilhaGrupos[i][1])),getRow(getIndex(pilhaGrupos[i][1]))+1);
			//console.log("String: "+string);
			resposta.push(string);
			continue;
		}
	
		if(
			getRow(getIndex(pilhaGrupos[i][0])) ==
			getRow(getIndex(pilhaGrupos[i][1]))
			){
			let string = 	getChar(getCol(getIndex(pilhaGrupos[i][0])+1),getRow(getIndex(pilhaGrupos[i][0])))								+
							getChar(getCol(getIndex(pilhaGrupos[i][1])+1),getRow(getIndex(pilhaGrupos[i][1])));
			//console.log("String: "+string);
			resposta.push(string);
			continue;
		}
		
		let string = 	getChar(getCol(getIndex(pilhaGrupos[i][1])),getRow(getIndex(pilhaGrupos[i][0])))								+
						getChar(getCol(getIndex(pilhaGrupos[i][0])),getRow(getIndex(pilhaGrupos[i][1])));
		//console.log("String: "+string);
		resposta.push(string);
		
		
		
			
		//console.log(getCol(getIndex(pilhaGrupos[i][0])) == getCol(getIndex(pilhaGrupos[i][1])));
	}
	//console.log(resposta);
	return resposta;
}
function criptografa(){
	
	let possivel = true;
	
	for(let i=0; i<document.getElementById("texto-claro").value.length;i++){
		if(	document.getElementById("texto-claro").value[i]==
			document.getElementById("excluir-letra").value
		)
		possivel=false;
	}
	
	if(!possivel)
	{
		alert("Letra do texto claro não pertence ao conjunto de caracteres");
		return;
	}
	
	let textoClaro=document.getElementById("texto-claro").value;
	if(textoClaro.length%2==1)
		textoClaro+='Z';
	//alert(textoClaro)
	let textoClaroSubStr =[];
	for(let i=0;i<textoClaro.length;i+=2){
		textoClaroSubStr.push(textoClaro.substring(i,i+2));
	}
	//console.log(textoClaroSubStr);
	//falta formatar os grupos
	textoClaroSubStr=formataGrupos(textoClaroSubStr);
	//console.log(textoClaroSubStr);
	let PilhaGruposCifrados=criptografaGrupos(textoClaroSubStr);
	
	document.getElementById('texto-cifrado').value="";
	
	for(let i=0; i<PilhaGruposCifrados.length;i++){
		document.getElementById('texto-cifrado').value+=PilhaGruposCifrados[i];
	}
}
function getChar(col, row){
	
	if(col>4)
		col-=5;
	if(row>4)
		row-=5;
	//console.log(col+":"+row);
	
	return document.querySelectorAll("td")[row*5+col].firstChild.value;
}
function getIndex(c){
	let celulas=document.querySelectorAll("td");
	for(let i=0;i<celulas.length;i++){
		if(celulas[i].firstChild.value==c)
			return i;
	}
}
function getCol(index){
	return index%5;
}
function getRow(index){
	//console.log("getRow Index:"+index);
	let ans = Math.floor(index/5);
	if(ans>4)
		ans-=5;
	//console.log("getRow returning "+ans);
	return ans;
}

onload=function(){
	document.getElementById("chave").onkeyup=geraChaveManual;
	document.getElementById("chave").addEventListener("keyup",criptografa);
	document.getElementById("botao-insere-chave").onclick=geraChaveManual;
	document.getElementById("botao-insere-chave").addEventListener("click",criptografa,false);
	document.getElementById("texto-claro").onkeyup=criptografa;
	document.getElementById("gerar-chave-playfair").onclick=geraNovaChave;
	document.getElementById("excluir-letra").onchange=geraNovaChave;
	document.getElementById("gerar-chave-playfair").addEventListener("click",criptografa,false);
	document.getElementById("criptografa").onclick=criptografa;
	geraNovaChave();
};