<!DOCTYPE html>
<html lang="ko">
<head>
<!--#include virtual="/_include/head.asp"-->
<title>오시는 길 - Fasoo.com</title>
</head>
<body>
<!--#include virtual="/_include/header.asp"-->
<!--#include virtual="/_include/visual_about.asp"-->
@@include('../_include/lnb.html', { "menu": "about", "nav": "contact" })
    <div id="content" class="contact_us">
        <div class="inner">
            <h3>오시는 길</h3>
            <div class="section sangam">
                <div class="info">
                    <p class="title">파수닷컴 본사</p>
                    <p class="address">서울 마포구 월드컵북로 396(상암동 1605, 누리꿈스퀘어 비즈니스타워 17층) 121-795</p>
                    <span class="tel"><strong>Tel</strong>02-300-9000</span>
                    <span class="fax"><strong>Fax</strong>02-300-9400</span>     
                    <p class="subway"><strong>지하철</strong>디지털미디어시티역 6호선, 공항철도, 경의중앙선</p>
                    <p class="bus"><strong>버스정류장</strong>누리꿈스퀘어.MBC (간선 171, 271, 470, 673, 710, 771 / 지선 6715, 7019, 7711, 7715, 7730 / 광역 9711A, 9711B)</p>
                </div>
                <div id="map" class="map"></div>
            </div>
            <div class="section gangnam">
                <div class="info">
                    <p class="title">강남 오피스</p>
                    <p class="address">서울 서초구 1330-8번지 EWR빌딩 10층 137-858</p>
                    <span class="tel"><strong>Tel</strong>02-300-9190</span>
                    <span class="fax"><strong>Fax</strong>02-300-9405</span>
                </div>
                <div id="map2" class="map"></div>
            </div>
            <div class="section us">
                <div class="info">
                    <p class="title">미국 법인</p>
                    <p class="address">7315 Wisconsin Avenue, Suite 420, Bethesda, MD 20814</p>
                    <span class="tel"><strong>Tel</strong>+1-732-955-2333</span>
                    <!-- <span class="fax"><strong>Fax</strong>02-300-9400</span> -->
                </div>
                <iframe allowfullscreen="" frameborder="0" width="1100" height="450" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1550.715329498479!2d-77.0935131!3d38.9826665!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c97aee4bea6d%3A0x970923b68e9b6fb2!2s7315+Wisconsin+Ave+%23420%2C+Chevy+Chase%2C+MD+20815+%EB%AF%B8%EA%B5%AD!5e0!3m2!1sko!2skr!4v1538984456555" style="border:0" width="1000"></iframe>
            </div>            
        </div>
    </div>
<!--#include virtual="/_include/footer.asp"-->
<script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?clientId=vVbdZOQUBHOUmuvNC_gf"></script>
<script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script><script type="text/javascript"></script>
<script>
    var HOME_PATH = window.HOME_PATH || '.';
    var map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.5796828, 126.8897253),
        zoom: 10
    });

    makeMarker(map, new naver.maps.LatLng(37.5796828, 126.8897253), 0);
    makeMarker(map, new naver.maps.LatLng(37.4927408, 127.0283276), 1);

    function makeMarker(map, position, index) {

        var ICON_GAP = 31;
        var ICON_SPRITE_IMAGE_URL = HOME_PATH +'/img/example/sp_pin_hd.png';
        var iconSpritePositionX = (index * ICON_GAP) + 1;
        var iconSpritePositionY = 1;

        var marker = new naver.maps.Marker({
            map: map,
            position: position,
            icon: {
            url: ICON_SPRITE_IMAGE_URL,
            size: new naver.maps.Size(26, 36), // 이미지 사이즈
            origin: new naver.maps.Point(iconSpritePositionX, iconSpritePositionY), // 스프라이트 이미지에서 클리핑 위치
            anchor: new naver.maps.Point(13, 36), // 지도 상 위치에서 이미지 위치의 offset 값
            scaledSize: new naver.maps.Size(395, 79)
            }
        });

        return marker;
    }  
    var map = new naver.maps.Map('map', mapOptions);


    var HOME_PATH = window.HOME_PATH || '.';
    var map = new naver.maps.Map('map1', {
        center: new naver.maps.LatLng(37.4927408, 127.0283276),
        zoom: 10
    });

    makeMarker(map, new naver.maps.LatLng(37.5796828, 126.8897253), 0);
    makeMarker(map, new naver.maps.LatLng(37.4927408, 127.0283276), 1);

    function makeMarker(map, position, index) {

        var ICON_GAP = 31;
        var ICON_SPRITE_IMAGE_URL = HOME_PATH +'/img/example/sp_pin_hd.png';
        var iconSpritePositionX = (index * ICON_GAP) + 1;
        var iconSpritePositionY = 1;

        var marker = new naver.maps.Marker({
            map: map,
            position: position,
            icon: {
            url: ICON_SPRITE_IMAGE_URL,
            size: new naver.maps.Size(26, 36), // 이미지 사이즈
            origin: new naver.maps.Point(iconSpritePositionX, iconSpritePositionY), // 스프라이트 이미지에서 클리핑 위치
            anchor: new naver.maps.Point(13, 36), // 지도 상 위치에서 이미지 위치의 offset 값
            scaledSize: new naver.maps.Size(395, 79)
            }
        });

        return marker;
    }  
    var map = new naver.maps.Map('map1', mapOptions);
</script>
</body>
</html>