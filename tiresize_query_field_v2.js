$(document).ready(function(){
    url = "https://api.joyroadtires.ca"
    load_json_data();
    load_json_data_wrd();
    function load_json_data() {
        let html_code = '';
        //let nameCapitalized = id.charAt(0).toUpperCase() + id.slice(1)
        html_code += '<option value="">Select Year</option>';
        //html_code += '<option value="">Select Make</option>';
        // html_code += '<option value="">Select Model</option>';
        // html_code += '<option value="">Select Tire Option</option>';
        $.getJSON(url+ '/queryall_ymmt', function (data) {
            $.each(data, function (key, value) {
                html_code += '<option value="' + key + '">' + value["Year"] + '</option>';
            });
            $('#year').html(html_code);
            $('#make').html('<option value="">Select Make</option>');
            $('#model').html('<option value="">Select Model</option>');
            $('#trim').html('<option value="">Select Trim</option>');
            $('#tiresize').html('<option value="">Select Tire Option</option>');
        });
    }
    function load_json_data_wrd() {
        let html_code = '';
        //let nameCapitalized = id.charAt(0).toUpperCase() + id.slice(1)
        html_code += '<option value="">Select Width</option>';
        //html_code += '<option value="">Select Make</option>';
        // html_code += '<option value="">Select Model</option>';
        // html_code += '<option value="">Select Tire Option</option>';
        $.getJSON(url+ '/queryall_wrd', function (data) {
            $.each(data, function (key, value) {
                html_code += '<option value="' + key + '">' + value["Width"] + '</option>';
            });
            $('#width').html(html_code);
            $('#ratio').html('<option value="">Select Aspect Ratio</option>');
            $('#diameter').html('<option value="">Select Diameter</option>');
            $('#tiresize_1').html('<option value="">Select Tire Option</option>');
        });
    }

    function load_json_data1(id, year_name, make_name, model_name, trim_name, selected_size) {
        let html_code = '';
        let link =''
        let nameCapitalized = ''
        if(id == "tiresize"){
            nameCapitalized = "Tire Option"
        }else{
            nameCapitalized = id.charAt(0).toUpperCase() + id.slice(1)
        }
        html_code += '<option value="">Select '+nameCapitalized+'</option>';
        if (id == "make") {
            link = url + '/query_ymmt/make/?' + 'year=' + year_name
        }else if (id == "model") {
            link = url + '/query_ymmt/model/?' + 'year=' + year_name + '&make=' + make_name
        }else if (id == "trim") {
            link = url + '/query_ymmt/trim/?' + 'year=' + year_name + '&make=' + make_name + '&model=' + model_name
        }else if (id == "tiresize") {
            link = url + '/query_ymmt/tiresize/?' + 'year=' + year_name + '&make=' + make_name + '&model=' + model_name + '&trim=' + trim_name
        }else if (id == "matched") {
            link = url + '/query_ymmt/tiresize/?' + 'year=' + year_name + '&make=' + make_name + '&model=' + model_name + '&trim=' + trim_name + '&TireSize=' + selected_size
        }
        $.getJSON(link, function (data, status) {
            if (status == "success") {
                $.each(data, function (key, value) {
                    html_code += '<option value="' + key + '">' + value[id] + '</option>';
                });
                $('#' + id).html(html_code);
            }
        });
    }
    function load_json_data_wrd_find(id, year_name, make_name, model_name, trim_name, selected_size) {
        let html_code = '';
        let link =''
        let nameCapitalized = ''
        if(id == "aspectratio"){
            nameCapitalized = "Aspect Ratio"
        }else{
            nameCapitalized = id.charAt(0).toUpperCase() + id.slice(1)
        }
        html_code += '<option value="">Select '+nameCapitalized+'</option>';
        if (id == "aspectratio") {
            link = url + '/query_ymmt/aspectratio/?' + 'width=' + year_name
        }else if (id == "diameter") {
            link = url + '/query_ymmt/diameter/?' + 'width=' + year_name + '&aspectratio=' + make_name
        }
        $.getJSON(link, function (data, status) {
            if (status == "success") {
                $.each(data, function (key, value) {
                    html_code += '<option value="' + key + '">' + value[id] + '</option>';
                });
                $('#' + id).html(html_code);
            }
        });
    }

    $(document).on('change', '#year', function(){
        var year_id = $(this).val();
        var year_name = $("#year :selected").text()
        if(year_id != '')
        {
            $('#make').html('<option value="">Select Make</option>');
            $('#model').html('<option value="">Select Model</option>');
            $('#trim').html('<option value="">Select Trim</option>');
            $('#tiresize').html('<option value="">Select Tire Option</option>');
            load_json_data1('make', year_name);

        }
        else
        {
            $('#make').html('<option value="">Select Make</option>');
            $('#model').html('<option value="">Select Model</option>');
            $('#trim').html('<option value="">Select Trim</option>');
            $('#tiresize').html('<option value="">Select Tire Option</option>');
        }
    });
    $(document).on('change', '#make', function(){
        var make_id = $(this).val();
        var year_name = $("#year :selected").text()
        var make_name = $("#make :selected").text()
        if(make_id != '')
        {
            $('#model').html('<option value="">Select Model</option>');
            $('#trim').html('<option value="">Select Trim</option>');
            $('#tiresize').html('<option value="">Select Tire Option</option>');
            load_json_data1('model', year_name, make_name);
        }
        else
        {
            $('#model').html('<option value="">Select Model</option>');
            $('#trim').html('<option value="">Select Trim</option>');
            $('#tiresize').html('<option value="">Select Tire Option</option>');
        }
    });
    $(document).on('change', '#model', function(){
        var make_id = $(this).val();
        var year_name = $("#year :selected").text()
        var make_name = $("#make :selected").text()
        var model_name = $("#model :selected").text()
        if(make_id != '')
        {
            $('#trim').html('<option value="">Select Trim</option>');
            $('#tiresize').html('<option value="">Select Tire Option</option>');
            load_json_data1('trim', year_name, make_name, model_name);

        }
        else
        {
            $('#trim').html('<option value="">Select Trim</option>');
            $('#tiresize').html('<option value="">Select Tire Option</option>');
        }
    });
    $(document).on('change', '#trim', function(){
        var make_id = $(this).val();
        var year_name = $("#year :selected").text()
        var make_name = $("#make :selected").text()
        var model_name = $("#model :selected").text()
        var trim_name = $("#trim :selected").text()

        if(make_id != '')
        {
            $('#tiresize').html('<option value="">Select Tire Option</option>');
            load_json_data1('tiresize', year_name, make_name, model_name, trim_name);
        }
        else
        {
            $('#tiresize').html('<option value="">Select Tire Option</option>');
        }
    });
    $(document).on('change', '#width', function(){
        var make_id = $(this).val();
        var width_name = $("#width :selected").text()

        if(make_id != '')
        {
            $('#aspectratio').html('<option value="">Select Aspect Ratio</option>');
            $('#diameter').html('<option value="">Select Diameter</option>');
            load_json_data_wrd_find('aspectratio', width_name);
        }
        else
        {
            $('#aspectratio').html('<option value="">Select Aspect Ratio</option>');
            $('#diameter').html('<option value="">Select Diameter</option>');
        }
    });
    $(document).on('change', '#aspectratio', function(){
        var make_id = $(this).val();
        var width_name = $("#width :selected").text()
        var ratio_name = $("#aspectratio :selected").text()

        if(make_id != '')
        {
            $('#diameter').html('<option value="">Select Diameter</option>');
            load_json_data_wrd_find('diameter', width_name, ratio_name);
        }
        else
        {
            $('#diameter').html('<option value="">Select Diameter</option>');
        }
    });

});
(function clickMe() {
    const button = document.getElementById("search-vehicle");
    button.addEventListener("click", event => {
        var year_name = $("#year :selected").text()
        var make_name = $("#make :selected").text()
        var model_name = $("#model :selected").text()
        var trim_name = $("#trim :selected").text()
        let selected_size = $("#tiresize :selected").text()
        //url = "https://api.joyroadtires.ca"
        link = 'https://api.joyroadtires.ca' + '/query_ymmt/width, aspectratio, diameter/?' + 'year=' + year_name + '&make=' + make_name + '&model=' + model_name + '&trim=' + trim_name + '&TireSize=' + selected_size
        $.getJSON(link, function (data, status) {
            if (status == "success") {
                $.each(data, function (key, value) {
                    let url = "https://www.joyroadtires.ca/tire-collection/" + "tc-w" + value["width"] +"-a" + value["aspectratio"]+"-r" + value["diameter"]
                    location.href = url;
                });
            }
        });
    });
})();
