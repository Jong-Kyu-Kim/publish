// 퍼블리싱 파일 확인용 스크립트 파일입니다.
// url mapping 이후에는 /_include/head.asp에서 제거 필요합니다.

$(function(){
    switch (location.pathname) {     
        case '/products/fasoo-data-radar': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;
        case '/products/fasoo-riskview': 
            $('#lnb ul li').removeClass('active').eq(2).addClass('active');
            break;
        case '/products/fasoo-enterprise-drm': 
            $('#lnb ul li').removeClass('active').eq(3).addClass('active');
            break;
        case '/products/fasoo-secure-document': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;
        case '/products/fasoo-secure-exchange': 
            $('#lnb ul li').removeClass('active').eq(2).addClass('active');
            break;
        case '/products/fasoo-eprint': 
            $('#lnb ul li').removeClass('active').eq(3).addClass('active');
            break;
        case '/products/fasoo-approval-system-tool': 
            $('#lnb ul li').removeClass('active').eq(4).addClass('active');
            break;
        case '/products/fasoo-secure-mail-gateway': 
            $('#lnb ul li').removeClass('active').eq(5).addClass('active');
            break;
        case '/products/fasoo-secure-web': 
            $('#lnb ul li').removeClass('active').eq(6).addClass('active'); 
            break;
        case '/products/fasoo-secure-screen': 
            $('#lnb ul li').removeClass('active').eq(7).addClass('active');
            break;
        case '/products/fasoo-mobile-solution': 
            $('#lnb ul li').removeClass('active').eq(8).addClass('active');
            break;
        case '/products/fasoo-usage-tracer': 
            $('#lnb ul li').removeClass('active').eq(9).addClass('active');
            break;
        case '/products/pii-filter-for-onnara': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;
        case '/products/pii-manager': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;
        case '/products/pii-filter': 
            $('#lnb ul li').removeClass('active').eq(2).addClass('active');
            break;
        case '/products/fasoo-edata-manager-for-privacy': 
            $('#lnb ul li').removeClass('active').eq(3).addClass('active');
            break;
        case '/products/fasoo-eprint-for-privacy': 
            $('#lnb ul li').removeClass('active').eq(4).addClass('active');
            break;
        case '/products/wrapsody-eco': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;
        case '/products/analyticdid-de-identification-service': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;
        case '/services/information-security-consulting': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;
        case '/services/system-integration':
            $('#lnb ul li').removeClass('active').eq(2).addClass('active');
            break;
        case '/promotion':
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;            
        case '/video/company': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;
        case '/video/product': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;
        case '/leadership': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;                    
        case '/history': 
            $('#lnb ul li').removeClass('active').eq(2).addClass('active');
            break;
        case '/customers': 
            $('#lnb ul li').removeClass('active').eq(3).addClass('active');
            break;
        case '/partners': 
            $('#lnb ul li').removeClass('active').eq(4).addClass('active');
            break;
        case '/recruit': 
            $('#lnb ul li').removeClass('active').eq(5).addClass('active');
            break;
        case '/support': 
            $('#lnb ul li').removeClass('active').eq(6).addClass('active');
            break;
        case '/contact-us':
            $('#lnb ul li').removeClass('active').eq(7).addClass('active');
            break;
    }
/*
    switch (location.pathname) {     
        case '/_product/fasoo_data_radar.asp': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;
        case '/_product/fasoo_risk_view.asp': 
            $('#lnb ul li').removeClass('active').eq(2).addClass('active');
            break;
        case '/_product/fasoo_enterprise_drm.asp': 
            $('#lnb ul li').removeClass('active').eq(3).addClass('active');
            break;
        case '/_product/fasoo_secure_document.asp': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;
        case '/_product/fasoo_secure_exchange.asp': 
            $('#lnb ul li').removeClass('active').eq(2).addClass('active');
            break;
        case '/_product/fasoo_eprint.asp': 
            $('#lnb ul li').removeClass('active').eq(3).addClass('active');
            break;
        case '/_product/fasoo_approval_system_tool.asp': 
            $('#lnb ul li').removeClass('active').eq(4).addClass('active');
            break;
        case '/_product/fasoo_secure_mail_gateway.asp': 
            $('#lnb ul li').removeClass('active').eq(5).addClass('active');
            break;
        case '/_product/fasoo_secure_web.asp': 
            $('#lnb ul li').removeClass('active').eq(6).addClass('active'); 
            break;
        case '/_product/fasoo_secure_screen.asp': 
            $('#lnb ul li').removeClass('active').eq(7).addClass('active');
            break;
        case '/_product/fasoo_mobile_solution.asp': 
            $('#lnb ul li').removeClass('active').eq(8).addClass('active');
            break;
        case '/_product/fasoo_usage_tracer.asp': 
            $('#lnb ul li').removeClass('active').eq(9).addClass('active');
            break;
        case '/_product/pii_filter_for_onnara.asp': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;
        case '/_product/pii_manager.asp': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;
        case '/_product/pii_filter.asp': 
            $('#lnb ul li').removeClass('active').eq(2).addClass('active');
            break;
        case '/_product/fasoo_edata_manager.asp': 
            $('#lnb ul li').removeClass('active').eq(3).addClass('active');
            break;
        case '/_product/fasoo_eprint_privacy.asp': 
            $('#lnb ul li').removeClass('active').eq(4).addClass('active');
            break;
        case '/_product/wrapsody_eco.asp': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;
        case '/_product/ads.asp': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;
        case '/_service/information_security_consulting.asp': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;
        case '/_service/system_integration.asp': 
            $('#lnb ul li').removeClass('active').eq(2).addClass('active');
            break;
        case '/_news/newsletter.asp': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;
        case '/_news/promotion.asp': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;                                
        case '/_news/event_list.asp': 
            $('#lnb ul li').removeClass('active').eq(2).addClass('active');
            break;
        case '/_news/webtoon_list.asp': 
            $('#lnb ul li').removeClass('active').eq(3).addClass('active');
            break;
        case '/_data/video_company.asp': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;
        case '/_data/video_product.asp': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;
        case '/_about/leadership.asp': 
            $('#lnb ul li').removeClass('active').eq(1).addClass('active');
            break;                    
        case '/_about/history.asp': 
            $('#lnb ul li').removeClass('active').eq(2).addClass('active');
            break;
        case '/_about/customer.asp': 
            $('#lnb ul li').removeClass('active').eq(3).addClass('active');
            break;
        case '/_about/partner.asp': 
            $('#lnb ul li').removeClass('active').eq(4).addClass('active');
            break;
        case '/_about/recruit.asp': 
            $('#lnb ul li').removeClass('active').eq(5).addClass('active');
            break;
        case '/_about/support.asp': 
            $('#lnb ul li').removeClass('active').eq(6).addClass('active');
            break;
        case '/_about/contact-us.asp':
            $('#lnb ul li').removeClass('active').eq(7).addClass('active');
            break;
    }
*/
    /*
    $('a').click(function(e){
        e.preventDefault();

        switch (e.currentTarget.pathname) {
            case '/': 
                location.href = '/_main.asp'
                break;            
            case '/products/fasoo-solution-overview': 
                location.href = '/_product/overview.asp';
                break;
            case '/products/fasoo-data-security-framework': 
                location.href = '/_product/fasoo_data_security_framework.asp';
                break;
            case '/products/fasoo-data-radar': 
                location.href = '/_product/fasoo_data_radar.asp';
                break;
            case '/products/fasoo-riskview': 
                location.href = '/_product/fasoo_risk_view.asp';
                break;
            case '/products/fasoo-enterprise-drm': 
                location.href = '/_product/fasoo_enterprise_drm.asp';
                break;
            case '/products/fasoo-secure-node': 
                location.href = '/_product/fasoo_secure_node.asp';
                break;
            case '/products/fasoo-secure-document': 
                location.href = '/_product/fasoo_secure_document.asp';
                break;
            case '/products/fasoo-secure-exchange': 
                location.href = '/_product/fasoo_secure_exchange.asp';
                break;
            case '/products/fasoo-eprint': 
                location.href = '/_product/fasoo_eprint.asp';
                break;
            case '/products/fasoo-approval-system-tool': 
                location.href = '/_product/fasoo_approval_system_tool.asp';
                break;
            case '/products/fasoo-secure-mail-gateway': 
                location.href = '/_product/fasoo_secure_mail_gateway.asp';
                break;
            case '/products/fasoo-secure-web': 
                location.href = '/_product/fasoo_secure_web.asp';
                break;
            case '/products/fasoo-secure-screen': 
                location.href = '/_product/fasoo_secure_screen.asp';
                break;
            case '/products/fasoo-mobile-solution': 
                location.href = '/_product/fasoo_mobile_solution.asp';
                break;
            case '/products/fasoo-usage-tracer': 
                location.href = '/_product/fasoo_usage_tracer.asp';
                break;
            case '/products/fasoo-onnara-drm': 
                location.href = '/_product/fasoo_onnara_drm.asp';
                break;
            case '/products/pii-filter-for-onnara': 
                location.href = '/_product/pii_filter_for_onnara.asp';
                break;
            case '/products/fasoo-total-privacy-solution': 
                location.href = '/_product/fasoo_total_privacy_solution.asp';
                break;
            case '/products/pii-manager': 
                location.href = '/_product/pii_manager.asp';
                break;
            case '/products/pii-filter': 
                location.href = '/_product/pii_filter.asp';
                break;
            case '/products/fasoo-edata-manager-for-privacy': 
                location.href = '/_product/fasoo_edata_manager.asp';
                break;
            case '/products/fasoo-eprint-for-privacy': 
                location.href = '/_product/fasoo_eprint_privacy.asp';
                break;
            case '/products/wrapsody': 
                location.href = '/_product/wrapsody.asp';
                break;
            case '/products/wrapsody-eco': 
                location.href = '/_product/wrapsody_eco.asp';
                break;
            case '/products/analyticdid': 
                location.href = '/_product/analytic_did.asp';
                break;                
            case '/products/analyticdid-de-identification-service': 
                location.href = '/_product/ads.asp';
                break;
            case '/products/fasooblock': 
                location.href = '/_product/fasoo_block.asp';
                break;
            case '/services/data-security-consulting': 
                location.href = '/_service/data_security_consulting.asp';
                break;
            case '/services/information-security-consulting': 
                location.href = '/_service/information_security_consulting.asp';
                break;
            case '/services/system-integration': 
                location.href = '/_service/system_integration.asp';
                break;
            case '/press-release': 
                location.href = '/_news/news_list.asp';
                break;
            case '/press-release/201811222124': 
                location.href = '/_news/news_view.asp';
                break;                
            case '/newsletter': 
                location.href = '/_news/newsletter.asp';
                break;
            case '/promotion': 
                location.href = '/_news/promotion.asp';
                break;                                
            case '/event/upcoming': 
                location.href = '/_news/event_list.asp';
                break;
            case '/webtoon/fasaeng': 
                location.href = '/_news/webtoon_list.asp';
                break;
            case '/document': 
                location.href = '/_data/brochure_list.asp';
                break;
            case '/video/company': 
                location.href = '/_data/video_company.asp';
                break;
            case '/video/product': 
                location.href = '/_data/video_product.asp';
                break;                
            case '/about-us': 
                location.href = '/_about/about-us.asp';
                break;
            case '/history': 
                location.href = '/_about/history.asp';
                break;
            case '/leadership': 
                location.href = '/_about/leadership.asp';
                break;
            case '/customers': 
                location.href = '/_about/customer.asp';
                break;
            case '/partners': 
                location.href = '/_about/partner.asp';
                break;
            case '/recruit': 
                location.href = '/_about/recruit.asp';
                break;
            case '/support': 
                location.href = '/_about/support.asp';
                break;
            case '/contact-us':
            location.href = '/_about/contact-us.asp';
                break;
            case '/terms-of-service': 
                location.href = '/_terms.asp';
                break;                
            case '/privacy-policy': 
                location.href = '/_privacy.asp';
                break;
        }
    })
    */


   $('a').click(function(e){
        e.preventDefault();
        $(this).attr('id') === 'upper' && $(window).scrollTop(0);

        switch (e.currentTarget.pathname) {
            case '/': 
                location.href = '/html/0_main.html'
                break;            
            // case '/products/fasoo-solution-overview': 
            //     location.href = '/html/1_product/1_01_overview.html';
            //     break;
            case '/products/fasoo-data-security-framework': 
                location.href = '/html/1_product/1_02_fasoo_data_security_framework.html';
                break;
            case '/products/fasoo-data-radar': 
                location.href = '/html/1_product/1_03_fasoo_data_radar.html';
                break;
            case '/products/fasoo-riskview': 
                location.href = '/html/1_product/1_15_fasoo_risk_view.html';
                break;
            case '/products/fasoo-enterprise-drm': 
                if ($(this).parents('#lnb')[0]) location.href = '/html/1_product/1_04_fasoo_enterprise_drm.html';
                break;
            case '/products/fasoo-secure-node': 
                location.href = '/html/1_product/1_05_fasoo_secure_node.html';
                break;
            case '/products/fasoo-secure-document': 
                location.href = '/html/1_product/1_06_fasoo_secure_document.html';
                break;
            case '/products/fasoo-secure-exchange': 
                location.href = '/html/1_product/1_07_fasoo_secure_exchange.html';
                break;
            case '/products/fasoo-eprint': 
                location.href = '/html/1_product/1_08_fasoo_eprint_1.html';
                break;
            case '/products/fasoo-approval-system-tool': 
                location.href = '/html/1_product/1_09_fasoo_approval_system_tool.html';
                break;
            case '/products/fasoo-secure-mail-gateway': 
                location.href = '/html/1_product/1_10_fasoo_secure_mail_gateway.html';
                break;
            case '/products/fasoo-secure-web': 
                location.href = '/html/1_product/1_11_fasoo_secure_web.html';
                break;
            case '/products/fasoo-secure-screen': 
                location.href = '/html/1_product/1_12_fasoo_secure_screen.html';
                break;
            case '/products/fasoo-mobile-solution': 
                location.href = '/html/1_product/1_13_fasoo_mobile_solution.html';
                break;
            case '/products/fasoo-usage-tracer': 
                location.href = '/html/1_product/1_14_fasoo_usage_tracer.html';
                break;
            case '/products/fasoo-onnara-drm': 
                location.href = '/html/1_product/1_16_fasoo_onnara_drm.html';
                break;
            case '/products/pii-filter-for-onnara': 
                location.href = '/html/1_product/1_17_pii_filter_for_onnara.html';
                break;
            case '/products/fasoo-total-privacy-solution': 
                if ($(this).parents('#lnb')[0]) location.href = '/html/1_product/1_18_fasoo_total_privacy_solution.html';
                break;
            case '/products/pii-manager': 
                location.href = '/html/1_product/1_19_pii_manager.html';
                break;
            case '/products/pii-filter': 
                location.href = '/html/1_product/1_20_pii_filter.html';
                break;
            case '/products/fasoo-edata-manager-for-privacy': 
                location.href = '/html/1_product/1_21_fasoo_edata_manager.html';
                break;
            case '/products/fasoo-eprint-for-privacy': 
                location.href = '/html/1_product/1_22_fasoo_eprint_2.html';
                break;
            case '/products/wrapsody': 
                location.href = '/html/1_product/1_23_wrapsody.html';
                break;
            case '/products/wrapsody-eco': 
                location.href = '/html/1_product/1_24_wrapsody_eco.html';
                break;
            case '/products/analyticdid': 
                location.href = '/html/1_product/1_25_analytic_did.html';
                break;                
            case '/products/analyticdid-de-identification-service': 
                location.href = '/html/1_product/1_26_ads.html';
                break;
            case '/products/fasooblock': 
            location.href = '/html/1_product/1_27_fasoo_block.html';
                break;
            case '/services/data-security-consulting': 
                location.href = '/html/2_service/2_1_data_security_consulting.html';
                break;
            case '/services/information-security-consulting': 
                location.href = '/html/2_service/2_2_information_security_consulting.html';
                break;
            case '/services/system-integration': 
                location.href = '/html/2_service/2_3_system_integration.html';
                break;
            case '/press-release': 
                location.href = '/html/3_news/3_1_1_news_list.html';
                break;
            case '/press-release/2018121801': 
                location.href = '/html/3_news/3_1_2_news_view.html';
                break;                
            case '/newsletter': 
                location.href = '/html/3_news/3_2_1_newsletter.html';
                break;
            case '/promotion': 
                location.href = '/html/3_news/3_2_2_promotion.html';
                break;                                
            case '/event/upcoming': 
                location.href = '/html/3_news/3_3_1_event_list.html';
                break;
            case '/webtoon/fasaeng': 
                location.href = '/html/3_news/3_4_1_webtoon_list.html';
                break;
            case '/document': 
                location.href = '/html/4_data/4_1_1_brochure_list.html';
                break;
            case '/video/company': 
                location.href = '/html/4_data/4_2_1_video_list.html';
                break;
            // case '/video/product': 
            //     location.href = '/html/_data/video_product.asp';
            //     break;                
            case '/about-us': 
                location.href = '/html/5_about/5_1_about-us.html';
                break;
            case '/history': 
                location.href = '/html/5_about/5_2_history.html';
                break;
            case '/leadership': 
                location.href = '/html/5_about/5_3_leadership.html';
                break;
            case '/customers': 
                location.href = '/html/5_about/5_4_customer.html';
                break;
            case '/partners': 
                location.href = '/html/5_about/5_5_partner.html';
                break;
            case '/recruit': 
                location.href = '/html/5_about/5_6_recruit.html';
                break;
            case '/support': 
                location.href = '/html/5_about/5_7_support.html';
                break;
            case '/contact-us':
                location.href = '/html/5_about/5_8_contact-us.html';
                break;
            case '/terms-of-service': 
                location.href = '/html/_terms.asp';
                break;                
            case '/privacy-policy': 
                location.href = '/html/_privacy.asp';
                break;
        }
    })
})

