    $(document).ready(function(){
        //url = "https://api.joyroadtires.ca"
        url = "http://localhost:3000"
        load_json_data();
        function load_json_data() {
            let html_code = '';
            html_code += '<option value="">Select Your Province</option>';
            $.getJSON(url+ '/queryall_prov', function (data) {
                $.each(data, function (key, value) {
                    html_code += '<option value=' + key + '>' + value["Province_Territory"] + '</option>';
                });
                $('#province').html(html_code);
                $('#city').html('<option value="">Select Your City</option>');
            });
        }

        $(document).on('change', '#province', function(){
        var province_id = $(this).val();
        var province_name = $("#province :selected").text()
        if(province_id != '')
        {
            $('#city').html('<option value="">Select Your City</option>');
            load_json_data1('city', province_name);

        }
        else
        {
            $('#city').html('<option value="">Select Your City</option>');
        }
    });
        function load_json_data1(id, province_name) {
            let html_code = '';
            let link =''
            html_code += '<option value="">Select Your City</option>';
            link = url + '/query_city/city/?' + 'province_territory=' + province_name
            $.getJSON(link, function (data, status) {
                if (status == "success") {
                    $.each(data, function (key, value) {
                        html_code += '<option value="' + key + '">' + value[id] + '</option>';
                    });
                    $('#' + id).html(html_code);
                }
            });
        }
    });
