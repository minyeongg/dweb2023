$(function(){
  // 메모장
  

  // 메모 객체
  var Sticky = {
    // 메모 추가 메서드
    add: function () {
      // 창 크기를 구함
      var win_width = $("#sticky_wrap").width() - 250,
        win_height = $("#sticky_wrap").height() - 300,
        x = Math.random() * win_width, // 랜덤으로 좌표를 지정
        y = Math.random() * win_height;

      // 메모장 초기화
      $("#sticky_wrap").append(sticky_html); // 메모장 추가
      var $new_sticky = $('.sticky').last();  // 새로 생성된 메모장 객체

      $new_sticky.css({ // 메모장 위치 지정
        left: parseInt(x) + 'px',
        top: y,
      });
      $('.sticky').css('zIndex', '0');
      $new_sticky.css('zIndex', '99');
    },

    // 메모 저장 메서드
    save : function(current_memo){
      var idx = localStorage.length; // 저장된 글 수
      var txt = current_memo.val(); // 작성 중인 글

      // 작성된 글이 있으면 저장
      if (txt !== '') {
        var key = prompt('저장할 파일명?', '');
        localStorage.setItem(key, txt);
      }
    },

    // 메모 목록 및 읽기 메서드
    get : function list_storage(current_memo){
      var key;
      var 1 = localStorage.length; // 총 스토리지 길이
      var del_icon = '<i class="fa fa-trash"></i>';

      current_memo.find('ol').empty(); // 목록 초기화
      current_memo.toggleClass('active'); // 목록 토글

      // 현재 메모장의 사이드바에 파일 목록 표시
      for(var i = 0; i < list_storage; i++){
        key = localStorage.key(i);
        current_memo.find('ol')
          .append('<li>' + key + del_icon + '</li>');
      }

      // 목록을 클릭 시 메모 읽어 오기
      current_memo.find('li').click(function(){
        var getData = $(this).text(); // 목록의 글 제목을 읽음
        var txt = localStorage.getItem(getData); 
        current_memo.toggleClass('active'); // 목록창 닫기
        current_memo.prev('.txt').val(txt); // 내용 표시
      });

      // 목록 삭제 버튼
      current_memo.find('li > i').click(function(){
        var key = $(this).parent().text(); // 목록의 제목(key)을 읽음
        var ok = confirm('해당 메모를 삭제할까요?');
        if(ok){
          localStorage.removeItem(key);
        }
      });
    } // end get()

  }; // end Sticky{}

  // 추가 버튼
  $('#sticky_wrap').on('click', '.add', function(){
    Sticky.add();
  });

  // 저장 버튼
  $('#sticky_wrap').on('click', '.save', function(){
    // 동적으로 생성된 요소는 직접 참조되지 않으므로 this를 통해 탐색
    // 형제 filter() 메서드는 작동하지 않으므로 next() 사용
    var current_memo = $(this).parent().siblings('.txt'); // 글 영역 선택
    Sticky.save(current_memo);
  });

  // 읽기 버튼
  $('#sticky_wrap').on('click', '.get', function(){
    // 현재 버튼의 부모를 경유해서 .side_nav 선택(동적 생성 요소 참조)
    var current_memo = $(this).parents('.top_nav').siblings('.side_nav');
    Sticky.get(current_memo);
  });

  // 창 닫기 버튼
  $('#sticky_wrap').on('click', '.del', function(){
    var current_memo = $(this).parents('.sticky').remove();
  });

  // 마우스 입력: 마우스가 메모장 상단에 위치하면 드래그 활성화
  $('#sticky_wrap').on('mouseover', '.top_nav', function(){
    $(this).parent().draggable();
  });

  // 터치 입력
  $('#sticky_wrap').on('touchstart mousedown', '.sticky', function(){ // 복수 이벤트 지정
    $('.sticky').css('zIndex', '0'); // 드래그 시 메모장 표시 우선 순위 설정
    $(this).css('zIndex', '99'); 
  });

  $('#sticky_wrap').on('touchmove', '.top_nav', function(e){
    var $sticky = $(this).parent(); // 메모장 객체
    var event = e.originalEvent; // 제이쿼리에서 기존 자바스크립트 이벤트 받을 때 필요
    var touchobj = event.changedTouches[0]; // 터치 이벤트 객체

    // 현재 손가락 위치
    var x = parseInt(touchobj.clientX),
      y = parseInt(touchobj.clientY),
      ex = x - 125;
      ey = y - 16;

    // 메모장 위치 지정
    $sticky.css('left', ex + 'px');
    $sticky.css('top', ey + 'px');
  });
  
  /*// 메모장 초기화
  $('#sticky_wrap').append(sticky_html);
  */

  

});
