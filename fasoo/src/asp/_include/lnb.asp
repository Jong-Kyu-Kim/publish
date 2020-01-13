<div id="lnb">
    <div class="inner">
        <ul @@if (menu === 'product_1_2') {class="small"}>

            @@if (menu === 'product_1_1') {
                <li @@if (nav === 'fdsf') {class="active"}><a href="/products/fasoo-data-security-framework">FDSF</a></li>
                <li @@if (nav === 'fdr') {class="active"}><a href="/products/fasoo-data-radar">FDR</a></li>
                <li @@if (nav === 'frv') {class="active"}><a href="/products/fasoo-risk-view">FRV</a></li>
                <li @@if (nav === 'fed') {class="active"}><a href="/products/fasoo-enterprise-drm">FED</a></li>
            }
            
            @@if (menu === 'product_1_2') {
                <li @@if (nav === 'fsn') {class="active"}><a href="/products/fasoo-secure-node">FSN</a></li>
                <li @@if (nav === 'fsd') {class="active"}><a href="/products/fasoo-secure-document">FSD</a></li>
                <li @@if (nav === 'fse') {class="active"}><a href="/products/fasoo-secure-exchange">FSE</a></li>
                <li @@if (nav === 'fep') {class="active"}><a href="/products/fasoo-eprint">FEP</a></li>
                <li @@if (nav === 'fast') {class="active"}><a href="/products/fasoo-approval-system-tool">FAST</a></li>
                <li @@if (nav === 'fsmg') {class="active"}><a href="/products/fasoo-secure-mail-gateway">FSMG</a></li>
                <li @@if (nav === 'fsw') {class="active"}><a href="/products/fasoo-secure-web">FSW</a></li>
                <li @@if (nav === 'fss') {class="active"}><a href="/products/fasoo-secure-screen">FSS</a></li>
                <li @@if (nav === 'fms') {class="active"}><a href="/products/fasoo-mobile-solution">FMS</a></li>
                <li @@if (nav === 'fut') {class="active"}><a href="/products/fasoo-usage-tracer">FUT</a></li>              
            }

            @@if (menu === 'product_2') {
                <li @@if (nav === 'onnara_drm') {class="active"}><a href="/products/fasoo-onnara-drm">Fasoo 온나라 DRM</a></li>
                <li @@if (nav === 'pii_filter_onnara') {class="active"}><a href="/products/fasoo-pii-filter-for-onnara">PII Filter for 온나라</a></li>
            }
            
            @@if (menu === 'product_3') {
                <li @@if (nav === 'ftps') {class="active"}><a href="/products/fasoo-total-privacy-solution">Fasoo Total Privacy Solution</a></li>
                <li @@if (nav === 'pii_manager') {class="active"}><a href="/products/pii-manager">PII Manager</a></li>
                <li @@if (nav === 'pii_filter') {class="active"}><a href="/products/pii-filter">PII Filter</a></li>
                <li @@if (nav === 'fedm') {class="active"}><a href="/products/fasoo-edata-manager">Fasoo eData Manager</a></li>
                <li @@if (nav === 'fep') {class="active"}><a href="/products/fasoo-eprint-privacy">Fasoo ePrint</a></li>
            }
            
            @@if (menu === 'product_4') {
                <li @@if (nav === 'wrapsody') {class="active"}><a href="/products/wrapsody">Wrapsody</a></li>
                <li @@if (nav === 'wrapsody_eco') {class="active"}><a href="/products/wrapsody-eco">Wrapsody eCo</a></li>
            }
            
            @@if (menu === 'product_5') {
                <li @@if (nav === 'analytic_did') {class="active"}><a href="/products/analyticdid">Analytic DID</a></li>
                <li @@if (nav === 'ads') {class="active"}><a href="/products/analyticdid-de-identification-service">ADS</a></li>
            }
            
            @@if (menu === 'product_6') {
                <li class="active"><a href="/products/fasoo-block">FasooBlock</a></li>
            }
            
            @@if (menu === 'service') {
                <li @@if (nav === 'data') {class="active"}><a href="/services/data-security-consulting">데이터 보안 컨설팅</a></li>
                <li @@if (nav === 'info') {class="active"}><a href="/services/information-security-consulting">정보보호 컨설팅</a></li>
                <li @@if (nav === 'si') {class="active"}><a href="/services/system-integration">시스템 통합</a></li>
            }
            
            @@if (menu === 'news') {
                <li @@if (nav === 'news') {class="active"}><a href="/news">보도자료</a></li>
                <li @@if (nav === 'newsletter') {class="active"}><a href="/newsletter">뉴스레터 · 프로모션</a></li>
                <li @@if (nav === 'event') {class="active"}><a href="/event">이벤트</a></li>
                <li @@if (nav === 'webtoon') {class="active"}><a href="/webtoon">웹툰</a></li>                
            }
            
            @@if (menu === 'data') {
                <li @@if (nav === 'document') {class="active"}><a href="/document">브로슈어</a></li>
                <li @@if (nav === 'video') {class="active"}><a href="/video">비디오</a></li>
            }
            
            @@if (menu === 'about') {
                <li @@if (nav === 'about') {class="active"}><a href="/about-us">About Us</a></li>
                <li @@if (nav === 'history') {class="active"}><a href="/history">연혁</a></li>
                <li @@if (nav === 'leadership') {class="active"}><a href="/leadership">경영진 소개</a></li>
                <li @@if (nav === 'customer') {class="active"}><a href="/customers">고객사</a></li>
                <li @@if (nav === 'partner') {class="active"}><a href="/partners">파트너사</a></li>
                <li @@if (nav === 'recruit') {class="active"}><a href="/recruit">인재채용</a></li>
                <li @@if (nav === 'support') {class="active"}><a href="/support">문의하기</a></li>
                <li @@if (nav === 'contact') {class="active"}><a href="/contact-us">오시는길</a></li>
            }
        </ul>
    </div>
</div>   