$(function () {

	/*메뉴 버튼*/
	var $menuBtn = $('.btn-menu'),
		$calcBtn = $('.btn-calc'),
		$closeBtn = $('.btn-close'),
		$menuBox = $('.menu-box'),
		$calcWrap = $('.ct-wrap');

	$menuBtn.click(function () {
		$("html").addClass("open");
		$(".menu-box,.menu-list,.btn-close").fadeIn(200);
		window.location.hash = "#open";
	});

	$calcBtn.click(function () {
		$("html").addClass("open");
		$(".menu-box,.menu-list,.btn-close").hide();
		$(".menu-box,.ct-wrap,.btn-close").fadeIn(200);
		$('html, body').stop().animate({
			scrollTop: 0
		}, 100);
		window.location.hash = "#open";
	});

	window.onhashchange = function () {
		if (location.hash != "#open") {
			$("html").removeClass("open");
			$(".menu-box,.ct-wrap,.menu-list,.btn-close").hide();
			$popMn.hide();
		}
	};


	/*계산기 선택하기*/
	var selected = $('.selected');
	var optionsContainer = $('.options-container');
	var optionsList = $('.option');
	var $calCu = $('section');

	selected.on('click', function () {
		optionsContainer.toggleClass('active');
	});

	optionsList.each(function () {
		var o = $(this);
		o.on('click', function () {
			selected.html(o.children('label').text());
			optionsContainer.removeClass('active');
			var calcSel = o.children('label').attr('for');
			if (calcSel == 'calc-2') {
				$calCu.removeClass('on');
				$calCu.eq(1).addClass('on');
				return;
			} else if (calcSel == 'calc-3') {
				$calCu.removeClass('on');
				$calCu.eq(2).addClass('on');
				return;
			} else if (calcSel == 'calc-4') {
				$calCu.removeClass('on');
				$calCu.eq(3).addClass('on');
				return;
			} else if (calcSel == 'calc-5') {
				$calCu.removeClass('on');
				$calCu.eq(4).addClass('on');
				return;
			} else {
				$calCu.removeClass('on');
				$calCu.eq(0).addClass('on');
			}
		});
	});

	/*a-cal*/
	var $aCal = $('.a-cal'),
		$aResult1 = $aCal.find('.a-result1'),
		$aResult2 = $aCal.find('.a-result2'),
		$aResult3 = $aCal.find('.a-result3'),
		$aSubmit = $aCal.find('#a-submit');

	$aSubmit.on('click', function () {
		var aInput1 = Number($aCal.find('#a-in1').val()),
			aInput2 = Number($aCal.find('#a-in2').val()),
			aUnit = $aCal.find('#unit-box option:selected').val(),
			aSum = 0,
			aSum2 = 0,
			aSum3 = 0;

		if (0 < (aInput1 * aInput2)) {
			aSum = Math.round(aInput1 / aInput2 * 100) / 100; /*반올림*/
			aSum2 = Math.round(aInput1 / aInput2 * 1000) / 100; /*반올림*/
			aSum3 = Math.round(aInput1 / aInput2 * 10000) / 100; /*반올림*/
		} else {
			aSum = 0;
			aSum2 = 0;
			aSum3 = 0;
		}

		var result = comma(aSum);
		$aResult1.html('1 ' + aUnit + '당 <span>' + result + '</span> 원');
		var result = comma(aSum2);
		$aResult2.html('10 ' + aUnit + '당 <span>' + result + '</span> 원');
		var result = comma(aSum3);
		$aResult3.html('100 ' + aUnit + '당 <span>' + result + '</span> 원');
	});

	/*b-cal*/
	var $bCal = $('.b-cal'),
		$bResult1 = $bCal.find('.b-result1'),
		$bResult2 = $bCal.find('.b-result2'),
		$bSubmit = $bCal.find('#b-submit');

	$bSubmit.on('click', function () {
		var bInput1 = Number($bCal.find('#b-in1').val()),
			bInput2 = Number($bCal.find('#b-in2').val()),
			bSum1 = 0,
			bSum2 = 0;

		if (0 < (bInput1 * bInput2)) {
			bSum1 = Math.round(bInput2 / bInput1 * 100 * 100) / 100; /*반올림*/
			bSum2 = bInput1 - bInput2
		} else {
			bSum1 = 0;
		}
		var result = comma(bSum1);
		$bResult1.html('할인율 <span>' + result + '</span> &percnt;');
		var result = comma(bSum2);
		$bResult2.html('최종 판매가 <span>' + result + '</span> 원');
	});

	/*c-cal*/
	var $cCal = $('.c-cal'),
		$cResult1 = $cCal.find('.c-result1'),
		$cResult2 = $cCal.find('.c-result2'),
		$cResult3 = $cCal.find('.c-result3'),
		$cResult4 = $cCal.find('.c-result4'),
		$cResult5 = $cCal.find('.c-result5'),
		$cSubmit = $cCal.find('#c-submit');

	$cSubmit.on('click', function () {
		var cInput1 = Number($cCal.find('#c-in1').val()),
			cInput2 = Number($cCal.find('#c-in2').val()),
			cInput3 = Number($cCal.find('#c-in3').val()),
			unitR1 = $cCal.find('input[name="unit-r1"]:checked').val(),
			unitR2 = $cCal.find('input[name="unit-r2"]:checked').val(),
			cDcsum = 0,
			cSubdc = 0,
			cSum1 = 0,
			cSum2 = 0,
			cSum3 = 0;

		if (0 < (cInput1 * cInput2)) {
			if (1 < unitR1) {
				cDcsum = cInput2;
			} else {
				cDcsum = Math.round((cInput1 * cInput2 / 100) * 100) / 100;
			}
		} else {
			cDcsum = 0;
		}

		if (0 < (cInput1 * cInput2 * cInput3)) {
			if (1 < unitR2) {
				cSubdc = cInput3;
			} else {
				cSubdc = Math.round(((cInput1 - cDcsum) * cInput3 / 100) * 100) / 100;
			}
		} else {
			cSubdc = 0;
		}

		cSum1 = Math.round((cDcsum + cSubdc) * 100) / 100;
		cSum2 = Math.round(cSum1 / cInput1 * 100 * 100) / 100; /*반올림*/
		cSum3 = Math.round((cInput1 - cSum1) * 100) / 100;

		var result = comma(cDcsum);
		$cResult1.html('할인금액 <span>' + result + '</span> 원');
		result = comma(cSubdc);
		$cResult2.html('추가할인금액 <span>' + result + '</span> 원');
		result = comma(cSum1);
		$cResult3.html('총 할인금액 <span>' + result + '</span> 원');
		$cResult4.html('총 할인율 <span>' + cSum2 + '</span> &percnt;');
		result = comma(cSum3);
		$cResult5.html('최종 판매가 <span>' + result + '</span> 원');
	});

	/*d-cal*/
	var $dCal = $('.d-cal'),
		$dResult1 = $dCal.find('.d-result1'),
		$dResult2 = $dCal.find('.d-result2'),
		$dSubmit = $dCal.find('#d-submit');

	$dSubmit.on('click', function () {
		var dInput1 = Number($dCal.find('#d-in1').val()),
			dInput2 = Number($dCal.find('#d-in2').val()),
			dSum1 = 0,
			dSum2 = dInput1 - dInput2;
		if (0 < (dInput1 * dInput2)) {
			dSum1 = Math.round((dInput1 - dInput2) / dInput1 * 100 * 100) / 100; /*반올림*/
		} else {
			dSum1 = 0;
		}
		var result = comma(dSum1);
		$dResult1.html('할인율 <span>' + result + '</span> &percnt;');
		var result = comma(dSum2);
		$dResult2.html('할인된 금액 <span>' + result + '</span> 원');
	});
	
	/*e-cal*/
	var $eCal = $('.e-cal'),
		$eResult1 = $eCal.find('.e-result1'),
		$eResult2 = $eCal.find('.e-result2'),
		$eResult3 = $eCal.find('.e-result3'),
		$eResult4 = $eCal.find('.e-result4'),
		$eResult5 = $eCal.find('.e-result5'),
		$eSubmit = $eCal.find('#e-submit');

	$eSubmit.on('click', function () {
		var eInput1 = Number($eCal.find('#e-in1').val()),
			eInput1rd = $eCal.find('input[name="unit-er1"]:checked').val(),
			eInput2 = Number($eCal.find('#e-in2').val()),
			eInput3 = Number($eCal.find('#e-in3').val()),
			eSum1 = 0; //고기중량
			if (eInput1rd == 2) {
			eInput1 = eInput1 * 1000
			eSum1 = Math.round(eInput1 * eInput2 / 100 * 100) / 100;
		} else {
			eSum1 = Math.round(eInput1 * eInput2 / 100 * 100) / 100;
		}
		
		var	eSum2 = Math.round(eInput3/eInput1*100 * 100) / 100, //양념+고기 100g 당
				eSum3 = Math.round(eInput3/eSum1*100 * 100) / 100; //real고기 100g 당
				
		var result = comma(eInput1);
		$eResult1.html('전체무게 <span>' + result + 'g</span> 중');
		var result = comma((eInput1-eSum1));
		$eResult2.html('양념무게 <span>' + result + 'g</span> &lpar;' + (100 - eInput2) + '&percnt;&rpar;');
		var result = comma(eSum1);
		$eResult3.html('<b>고기무게</b> <span>' + result + 'g</span> &lpar;' + eInput2 + '&percnt;&rpar;');
		var result = comma(eSum2);
		$eResult4.html('양념+고기 100g당 <span>' + result + '</span> 원');
		var result = comma(eSum3);
		$eResult5.html('<b>순수고기</b> 100g당 <span>' + result + '</span> 원');
	});
	
	/*3자리 콤마*/
	function comma(numb) {
		var money = numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return money;
	}

	/*사용법 안내*/
	var $popMn = $('.pop-manual'),
		$popCont = $('.pop-cont'),
		$popClose = $('.pop-close'),
		$popList = $popCont.find('li'),
		$popSlide = $popCont.find('.slide-cont'),
		$popM1 = $('.manual-1'),
		$popM2 = $('.manual-2'),
		$popM3 = $('.manual-3'),
		$popM4 = $('.manual-4');
		$popM5 = $('.manual-5');

	$popMn.hide();

	$popList.eq(1).hide();
	$popList.eq(3).hide();
	$popList.eq(5).hide();
	$popList.eq(7).hide();
	$popList.eq(9).hide();

	/*팝업 띄우기전 메뉴얼 선택*/
	/*a-cal에서 선택*/
	$popM1.on('click', function () {
		$popMn.fadeIn(200);
		$popSlide.stop().slideUp();
		$popList.eq(1).stop().slideDown();
		$('html, body').stop().animate({
			scrollTop: 0
		}, 100);
		window.location.hash = "#open";
	});
	/*b-cal에서 선택*/
	$popM2.on('click', function () {
		$popMn.fadeIn(200);
		$popSlide.stop().slideUp();
		$popList.eq(3).stop().slideDown();
		$('html, body').stop().animate({
			scrollTop: 0
		}, 100);
		window.location.hash = "#open";
	});
	/*c-cal에서 선택*/
	$popM3.on('click', function () {
		$popMn.fadeIn(200);
		$popSlide.stop().slideUp();
		$popList.eq(5).stop().slideDown();
		$('html, body').stop().animate({
			scrollTop: 0
		}, 100);
		window.location.hash = "#open";
	});
	/*d-cal에서 선택*/
	$popM4.on('click', function () {
		$popMn.fadeIn(200);
		$popSlide.stop().slideUp();
		$popList.eq(7).stop().slideDown();
		$('html, body').stop().animate({
			scrollTop: 0
		}, 100);
		window.location.hash = "#open";
	});
	/*e-cal에서 선택*/
	$popM5.on('click', function () {
		$popMn.fadeIn(200);
		$popSlide.stop().slideUp();
		$popList.eq(9).stop().slideDown();
		$('html, body').stop().animate({
			scrollTop: 0
		}, 100);
		window.location.hash = "#open";
	});
	/*팝업 띄운 후 메뉴얼 선택시*/
	$popList.on('click', function () {
		switch ($(this).index()) {
			case 0:
				$popSlide.stop().slideUp();
				$popList.eq(1).stop().slideDown();
				break;
			case 2:
				$popSlide.stop().slideUp();
				$popList.eq(3).stop().slideDown();
				break;
			case 4:
				$popSlide.stop().slideUp();
				$popList.eq(5).stop().slideDown();
				break;	
			case 6:
				$popSlide.stop().slideUp();
				$popList.eq(7).stop().slideDown();
				break;
			case 8:
				$popSlide.stop().slideUp();
				$popList.eq(9).stop().slideDown();
				break;
		}
	});

	/*오늘날짜 표시*/
	var mydate = new Date();
	var year = mydate.getYear();

	if (year < 1000) {
		year += 1900;
	}

	var day = mydate.getDay();
	var month = mydate.getMonth();
	var daym = mydate.getDate();
	if (daym < 10) {
		daym = "0" + daym;
	}

	var dayarray = new Array("일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일");
	var montharray = new Array("1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월");

	var selectedDayOfMonth = mydate.getDate();
	var first = new Date(mydate.getFullYear() + '/' + (mydate.getMonth() + 1) + '/01');
	var monthFirstDateDay = first.getDay();
	var todayResult = Math.ceil((selectedDayOfMonth + monthFirstDateDay) / 7);

	var $tResult = $('.today-result');
	$tResult.html('오늘은 ' + year + '년 ' + montharray[month] + ' ' + +daym + '일 ' + dayarray[day] + '<br>');
	/*오늘날짜 표시 - 종료*/

	/*1번째 부터 시작하는 수요일과 일요일 표시*/
	var today = new Date(),
		lastDay = new Date(
			today.getFullYear(),
			today.getMonth() + 1,
			0).getDate(), //이번달의 마지막 날
		thisYear = today.getFullYear(),
		thisMonth = today.getMonth() + 1,
		thisDate = new Date(),
		thisDay = new Date(),
		dNum = 1,
		seqNumSun = 1,
		seqNumWed = 1;

	for (dNum = 1; dNum <= lastDay; dNum++) {
		thisDate = new Date(thisYear + '-' + thisMonth + '-' + dNum);
		thisDay = thisDate.getDay();
		if (thisDay == 0) {
			if (seqNumSun == 1) {
				$('.day-result1').append(seqNumSun + '번째(일) <b>' + dNum + '일</b> ')
			seqNumSun++;
			} else {
				$('.day-result1').append(' / ' + seqNumSun + '번째(일) <b>' + dNum + '일</b> ')
			seqNumSun++;
			}
			
		}
		if (thisDay == 3) {
			if (seqNumWed == 1) {
				$('.day-result2').append(seqNumWed + '번째(수) <b>' + dNum + '일</b> ')
			seqNumWed++;
			} else {
				$('.day-result2').append(' / ' + seqNumWed + '번째(수) <b>' + dNum + '일</b> ')
			seqNumWed++;
			}
		}
	}
	/*1번째 부터 시작하는 수요일과 일요일 표시 종료*/

	/*PWA 시작*/
	var deferredPrompt;
	var btnSave = document.getElementById('btn-save');
	btnSave.style.display = 'none';

	window.addEventListener('beforeinstallprompt', function (e) {
		console.log('beforeinstallprompt Event fired');
		e.preventDefault();

		// Stash the event so it can be triggered later. 
		deferredPrompt = e;
		btnSave.style.display = 'block';
		return false;
	});

	// 특정 버튼 클릭 시 설치 시작 
	btnSave.addEventListener('click', function () {
		if (deferredPrompt !== undefined) {
			// The user has had a postive interaction with our app and Chrome 
			// has tried to prompt previously, so let's show the prompt. 
			deferredPrompt.prompt();
			// Follow what the user has done with the prompt. 
			deferredPrompt.userChoice.then(function (choiceResult) {
				console.log(choiceResult.outcome);
				if (choiceResult.outcome == 'dismissed') {
					console.log('User cancelled home screen install');
				} else {
					console.log('User added to home screen');
					btnSave.style.display = 'none';
				}
				// We no longer need the prompt. Clear it up. 
				deferredPrompt = null;
			});
		}
	});
	/*PWA 종료*/

	/*f12 & 우클릭 막기*/
	var keydownCtrl = 0;
	var keydownShift = 0;

	document.onkeydown = keycheck;
	document.onkeyup = uncheckCtrlShift;

	function keycheck() {
		switch (event.keyCode) {
			case 123:
				event.keyCode = '';
				return false;
				break; //F12
			case 17:
				event.keyCode = '';
				keydownCtrl = 1;
				return false;
				break; //컨트롤키
		}
		if (keydownCtrl) return false;
	}

	function uncheckCtrlShift() {
		if (event.keyCode == 17) keydownCtrl = 0;
		if (event.keyCode == 16) keydownShift = 0;
	}

	function click() {
		if ((event.button == 2) || (event.button == 2)) {
			alert('마트랑계산기 :: 마트갈때 필수품');
		}
	}
	document.onmousedown = click;
	/*f12 & 우클릭 막기 종료*/

});
