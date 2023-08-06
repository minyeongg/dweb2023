src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>
const API_KEY = "91fb5e4126753eefb783bf60eb1d8a40";
async function getData() {
  newPage;
  const date = document.frm.movieSearch.value;
  const url =
    "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=91fb5e4126753eefb783bf60eb1d8a40&targetDt=${date}";
  $.getJSON(url, function (data) {
    let type = data.boxofficeType;
    let showRange = data.showRange;
    let rnum = data.rnum;
    let rank = data.rank;
    let name = data.movieNm;
    let date = data.openDt;
    let audiAcc = data.audiAcc;
  }); // url에서 Json 파일 로드. 콜백 함수에서 Json 파일을 이용하여 로드된 데이터를 처리
}

function newPage() {
  window.location.href = "./serach.html";
}
