$(function() {
    $('.enter-url-form__btn').on('click', function (e) {
        e.preventDefault();

        var url = $('#url').val();
        if (!url.length) {
            return;
        }

        $.ajax({
            url: '/api/shorten',
            type: 'POST',
            dataType: 'JSON',
            data: {
                url: url
            },
            success: function (data) {
                var resultHTML = '<a class="result" href="' + data.shortUrl + '">'
                    + data.shortUrl + '</a>';
                $('#short-url').html(resultHTML);
                $('#short-url').hide().fadeIn('slow');
            }
        });

    });
});
