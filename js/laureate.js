$(document).ready(function () {

    var windowWidth = $(window).outerWidth(true);
    if (typeof windowWidth != 'undefined' && windowWidth != null && windowWidth < 950) {
        $('html').addClass('print');
    }

    $(window).resize(function () {
        windowWidth = $(window).outerWidth(true);
        $('html').removeClass('print');
        if (typeof windowWidth != 'undefined' && windowWidth != null && windowWidth < 950) {
            $('html').addClass('print');
        }
    });


    $("#print_page").on('click', function () {
        $(".active").each(function () {
            $(this).removeClass('active')
        });
        AOS.init({
            disable: true
        });
        makePDF('<link rel="stylesheet" type="text/css" href="css/print.css">'
        +"<script type='text/javascript' src='js/default/filesaver.js'></script>"
        +"<script type='text/javascript' src='js/default/jspdf.js'></script>"
        +"<script type='text/javascript' src='js/default/addhtml.js'></script>"
        +"<script type='text/javascript' src='js/default/from_html.js'></script>"
        +"<script type='text/javascript' src='js/default/split_text_to_size.js'></script>"
        +"<script type='text/javascript' src='js/default/standard_fonts_metrics.js'></script>"
        +"<script type='text/javascript' src='js/default/autoprint.js'></script>"
        +"<script type='text/javascript' src='js/default/html2canvas.js'></script>"
        +"<script type='text/javascript' src='js/default/canvas.js'></script>"
        +"<script type='text/javascript' src='js/default/html2pdf.js'></script>"
        +"<script type='text/javascript' src='js/jspdf/cell.js'></script>"
        +"<script type='text/javascript' src='js/jspdf/acroform.js'></script>"
        +"<script type='text/javascript' src='js/jspdf/addhtml.js'></script>"
        +"<script type='text/javascript' src='js/jspdf/addimage.js'></script>"
        +"<script type='text/javascript' src='js/jspdf/annotations.js'></script>"
        +"<script type='text/javascript' src='js/jspdf/autoprint.js'></script>"
        +"<script type='text/javascript' src='js/jspdf/canvas.js'></script>"
        +"<script type='text/javascript' src='js/jspdf/context2d.js'></script>"
        +"<script type='text/javascript' src='js/jspdf/javascript.js'></script>"
        +"<script type='text/javascript' src='js/jspdf/outline.js'></script>"
        +"<script type='text/javascript' src='js/jspdf/png.js'></script>"
        +"<script type='text/javascript' src='js/jspdf/prevent_scale_to_fit.js'></script>"
        +"<script type='text/javascript' src='js/jspdf/split_text_to_size.js'></script>"
        +"<script type='text/javascript' src='js/jspdf/standard_fonts_metrics.js'></script>"
        +"<script type='text/javascript' src='js/jspdf/svg.js'></script>"
        +"<script type='text/javascript' src='js/jspdf/total_pages.js'></script>"
        +"<script type='text/javascript' src='js/jspdf/xmp_metadata.js'></script>"
        +"<script type='text/javascript' src='js/jspdf/png_support.js'></script>"
        +"<script type='text/javascript' src='js/jspdf/zlib.js'></script>"
            + $('.intro').html()
            + $('#section_1').html()
            + $('#section_2').html()
           );
        /* if($('html').hasClass('print')){
            window.print();
        }else{
            var mywindow = window.open("", "", "width=500");
            mywindow.document.write('<html>' + $('html').html() + '</html>');
            setTimeout(function () {
                mywindow.print();
                mywindow.focus();
                mywindow.location.reload();
            }, 1000);
        }
 */
    });
    function makePDF(texto) {
        console.log(texto);
        var mywindow = window.open("", "", "width=500");
        mywindow.document.write('<html>' + texto + '</html>'+
        "<script>"
        +"html2canvas(document.body).then(function(canvas) {"
        +"var imgData = canvas.toDataURL('image/jpeg');"
        
        +"var imgWidth = 210;"
    +"var pageHeight = 295;"
    +"var imgHeight = canvas.height * imgWidth / canvas.width;"
    +"var heightLeft = imgHeight;"
    +"var doc = new jsPDF('p', 'mm');"
    +"var position = 0;"

    +"doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);"
    +"heightLeft -= pageHeight;"

    +"while (heightLeft >= 0) {"
        +"position = heightLeft - imgHeight;"
        +"doc.addPage();"
        +"doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);"
        +"heightLeft -= pageHeight;"
    +"}"
    +"doc.save('file.pdf');"

    +"});"
        
          +"</script>"
        
        );
 
           /*

            html2canvas(mywindow), {
                
                onrendered: function(canvas) {
                    console.log('aqui')
                    var imgData = canvas.toDataURL('image/jpeg');
                    
                    console.log('Image URL: ' + imgData);
    
                    var doc = new jsPDF('p','mm','a4');
                    
                    doc.setFontSize(10);
                              
                    doc.text(10, 15, 'Filter section will be printed where.',)
                    
                    doc.addImage(imgData, 'jpeg', 10, 20);
                    
                    doc.save('sample.pdf');
                }
            }
        
            
    
/*  
        var doc = new jsPDF();
        var specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            }
        };

        doc.fromHTML(texto, 15, 15, {
            
        }, function () {
            doc.save('sample-page.pdf');
        }); 
        */
    }

});