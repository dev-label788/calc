/*
  <!--lotto base code - Kkaesaem-->
  <!--Thank you for your work.-->
*/

$(function(){
	$('#btn-lotto').on('click', function(){
		lotto();
	});
	
	var totalNum,
			lNum1,
			lNum2,
			lNum3,
			lNum4,
			lNum5,
			lNum6,
			lNumSum;
		
	function lotto() {
 
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.clearRect(0,0, canvas.width, canvas.height);
 
    lottoNum = new Array(45);
    for (i = 0; i < 45; i++) {
        lottoNum[i] = i + 1;
    }
 
    var rNum;
    myNum = new Array(6);
    for (i = 0; i < 6; i++) {
        rNum = parseInt(Math.random()*lottoNum.length);
        myNum[i] = lottoNum[rNum];
        lottoNum.splice(rNum,1); //해당 배열 한칸 줄임
    }
  
    for (i = 0; i < 6; i++) {
        for (j = 0; j <= i; j++) {
            if(myNum[i] <= myNum[j]) {
                k = myNum[i];
                myNum[i] = myNum[j];
                myNum[j] = k;
            }
        }
    } 
    document.getElementById('lotto-number').innerHTML = myNum;
		
    ctx.font='22px Arial';
    ctx.textAlign = "center";

    for(i=0;i<6;i++) {
        switch(Math.ceil(myNum[i]/10)){
            case 1:
                ctx.beginPath();
                ctx.arc(i*50+21,25,20,0,2*Math.PI,false);
                ctx.fillStyle = "rgb(251,196,0)";
                ctx.fill();
                ctx.closePath();
                break;
            case 2:
                ctx.beginPath();
                ctx.arc(i*50+21,25,20,0,2*Math.PI,false);
                ctx.fillStyle = "rgb(105,200,242)";
                ctx.fill();
                ctx.closePath();
                break;
            case 3:
                ctx.beginPath();
                ctx.arc(i*50+21,25,20,0,2*Math.PI,false);
                ctx.fillStyle = "rgb(255,114,114)";
                ctx.fill();
                ctx.closePath();
                break;
            case 4:
                ctx.beginPath();
                ctx.arc(i*50+21,25,20,0,2*Math.PI,false);
                ctx.fillStyle = "rgb(170,170,170)";
                ctx.fill();
                ctx.closePath();
                break;
            case 5:
                ctx.beginPath();
                ctx.arc(i*50+21,25,20,0,2*Math.PI,false);
                ctx.fillStyle = "rgb(176,216,64)";
                ctx.fill();
                ctx.closePath();
                break;
        }
        ctx.fillStyle = "white";
        ctx.fillText(myNum[i],i*50+21,32);
    }
		    
		totalNum = myNum[0] + myNum[1] + myNum[2] + myNum[3] + myNum[4] + myNum[5];
				lNum1 = Math.ceil(myNum[0]%2);
				lNum2 = Math.ceil(myNum[1]%2);
				lNum3 = Math.ceil(myNum[2]%2);
				lNum4 = Math.ceil(myNum[3]%2);
				lNum5 = Math.ceil(myNum[4]%2);
				lNum6 = Math.ceil(myNum[5]%2);
				lNumSum = lNum1 + lNum2 + lNum3 + lNum4 + lNum5 + lNum6;
				
		if (totalNum < 100 || totalNum > 181) {
			lotto();
			return;
		} else if (lNumSum < 2 || lNumSum > 4) {
			lotto();
			return;
		}
		/*
		console.log(totalNum);
		console.log(lNum1 + '/' + lNum2 + '/' + lNum3 + '/' + lNum4 + '/' + lNum5 + '/' + lNum6 + '=' + lNumSum);
		*/
	}
	/*첫 방문시 바로 로또번호 생성*/
	lotto(); 
});