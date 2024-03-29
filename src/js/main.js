define([
    'get',
    'iframe-messenger',
    'ractive',
    'text!./templates/appTemplate.html',
    'text!./templates/topicsTemplate.html',
    'text!./templates/speechTemplate.html'
], function(
    get,
    iframeMessenger,
    Ractive,
    appTemplate,
    topicsTemplate,
    speechesTemplate
) {
   'use strict';


    var div;

    function init(el, context, config, mediator) {
        div = el;

        //load the data from the spreadsheet
        var SPREADSHEET_KEY = '1ZNv3HDwNcpddzplUuxgiV4tgFYcozfH2ojxpjriIruA';
        get('http://interactive.guim.co.uk/spreadsheetdata/'+SPREADSHEET_KEY+'.json')
            .then(JSON.parse)
            .then(renderInteractive);
        // Enable iframe resizing on the GU site
        iframeMessenger.enableAutoResize();
    }

    function renderInteractive(data){
 


        var baseTemplate = new Ractive({
            el: div,
            template: appTemplate,
            components: {
                topics: Ractive.extend({template: topicsTemplate}),
                speeches: Ractive.extend({template: speechesTemplate})
            },
            data: {
                winners: data.sheets.Sheet1,
                topics: data.sheets.Sheet2,
                isSelected: function(e,f){
                    if(!e[f]) return;
                    return 'active'
                },
                highlight:'',
                expanded: ''

            }

        })
        //resize event to set the width if needed
        // window.onresize = function(event) {
        //     //baseTemplate.set('width', documen)
        // };
        baseTemplate.on('speeches.hoverCategory',function(i){
        })

        baseTemplate.on('highlightStyle',function(e,style){
            baseTemplate.set('highlight',style);
        })
        baseTemplate.on('revealWinners',function(e,style){
            baseTemplate.set('expanded','expanded');
        })


    }




    return {
        init: init
    };
});
