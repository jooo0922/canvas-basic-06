'use strict';

// Canvas Transform
// 캔버스의 transform은 css의 transform을 생각하면 됨. 물론 캔버스가 훨씬 까다로움.
// 캔버스에서 제일 중요한 내용!

// save() 와 restore()
// save() 는 canvas의 모든 상태를 저장합니다.
// restore() 는 가장 최근에 저장된 canvas 상태를 복원합니다.
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d'); // 여기까진 항상 자동. 캔버스에서 모든 그림을 그릴때는 항상 context를 이용.

// 이제 사각형 하나를 그린 뒤, 얘를 가지고 transform을 시켜볼 것
context.fillRect(100, 100, 200, 200);
context.fillStyle = 'orange';
context.fillRect(150, 150, 200, 200);

context.save(); // 여기까지 해놓고 save 해보자.

// 이번에는 복습 겸 원을 만들어보자
context.fillStyle = 'blue';
context.beginPath();
context.arc(300, 300, 50, 0, Math.PI * 2, false);
context.fill();

context.restore();

// 이 상태에서 작은 원을 더 그려보자
context.beginPath();
context.arc(300, 300, 20, 0, Math.PI * 2, false);
context.fill();
// 근데 위에서 fillStyle = 'blue' 인 상태에서 변화를 준 적이 없는데, orange 색깔로 나왔지?
// 이게 save()와 restore()를 사용했기 때문인 것.
// save()는 save 바로 직전 상태의 context 상태를 저장한 것. (여기서는 fillStyle = 'orange' 로 찍은 것이 저장되어 있겠지?)
// 이 상태에서 fillStyle = 'blue'로 임시로 바꿨다가 다시 restore()로 되돌리면 어디로 되돌아 가는가?
// orange로 save()했던 시점으로 돌아간 것!

/*
save(), restore()는 여러 단계로 중첩됨

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  ctx.fillRect(0, 0, 150, 150);   // 기본 설정으로 사각형을 그리기
  ctx.save();                  // 기본 상태를 저장하기

  ctx.fillStyle = '#09F';      // 설정 변경하기
  ctx.fillRect(15, 15, 120, 120); // 새로운 설정으로 사각형 그리기

  ctx.save();                  // 현재 상태 저장하기
  ctx.fillStyle = '#FFF';      // 설정 변경하기
  ctx.globalAlpha = 0.5;
  ctx.fillRect(30, 30, 90, 90);   // 새로운 설정으로 사각형 그리기

  ctx.restore();               // 이전 상태 복원하기
  ctx.fillRect(45, 45, 60, 60);   // 복원된 설정으로 사각형 그리기

  ctx.restore();               // 초기 상태를 복원하기
  ctx.fillRect(60, 60, 30, 30);   // 복원된 설정으로 사각형 그리기
}

MDN 예시를 가져온 것. 결과값은 MDN에서 확인해볼 것.
요지는 뭐냐면, save를 여러 번 호출하고 난 뒤, restore로 복원하면
가장 최근에 저장된 canvas 상태가 복원되고, restore를 또 호출하면
두 번째로 최근에 저장된 canvas 상태가 복원됨!
 */