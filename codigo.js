function cifrar(){
	let textoOriginal = document.getElementById("texto-original").value,
		numeroCifra = parseInt(document.getElementById("chave").value),
		textoCifrado = "";
	//alert(textoOriginal);
	
	if(numeroCifra<1)
		numeroCifra+=26;
		
	for(let i=0; i < textoOriginal.length;	i++){
		let valor=0;
		if(	textoOriginal.charCodeAt(i) > 64 && textoOriginal.charCodeAt(i) < 91){
			//cifra maiuscula aqui
			valor=(((textoOriginal.charCodeAt(i)-64)+numeroCifra)%26)+64;
			if(((textoOriginal.charCodeAt(i)-64)+numeroCifra)%26==0)
				valor+=26;
			textoCifrado+=String.fromCharCode(valor);
			continue;
		}
		if(	textoOriginal.charCodeAt(i) > 96 && textoOriginal.charCodeAt(i) < 123){
			//cifra minuscula aqui
			valor=(((textoOriginal.charCodeAt(i)-96)+numeroCifra)%26)+96;
			if(((textoOriginal.charCodeAt(i)-96)+numeroCifra)%26==0)
				valor+=26;
			textoCifrado+=String.fromCharCode(valor);
			continue;
		}
		textoCifrado+=textoOriginal[i];		
	}
	document.getElementById("texto-cifrado").value = textoCifrado;	
}
onload=()=>{
        
		document.getElementById("chave").onchange=cifrar;
		document.getElementById("texto-original").onkeyup=cifrar;
};