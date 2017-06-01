var FrontEndChallenge = {};

FrontEndChallenge = (function () {
    return {
        start: function () {
            this.startSlider();
            this.startAccordion();
            this.setPhoneMask();
            this.createCustomPhoneValidator();
            this.setFormSubmit();
        },

        startSlider: function () {
            $('.rewards-carousel').slick({
                arrows: true,
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 910,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        },

        startAccordion: function () {
            $('.accordion-item').click(function () {
                $('.accordion-item').removeClass('is-open');
                $(this).addClass('is-open');
            });
        },

        setPhoneMask: function () {
            $('#phone').inputmask({ mask: '(99) 9999-9999[9]' });
        },

        createCustomPhoneValidator: function () {
            $.validator.addMethod("isPhoneValid", function (value, element) {
                var regex = /\d+\.\d+|\.\d+|\d+/g, results = [], n;
                while (n = regex.exec(value)) {
                    results.push(parseFloat(n[0]));
                }
                var phone = results.join('');
                return (phone.length === 10 || phone.length === 11);
            }, 'Por favor informe um telefone válido');
        },

        setFormSubmit: function () {
            $("form[name='contactForm']").validate({
                rules: {
                    firstname: {
                        required: true,
                        minlength: 3
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    phone: {
                        required: true,
                        isPhoneValid: true
                    },
                    message: 'required'
                },
                messages: {
                    name: 'Por favor informe um nome válido',
                    email: 'Por favor informe um e-mail válido',
                    phone: 'Por favor informe um telefone válido',
                    message: 'Por favor, deixe sua mensagem',

                },
                submitHandler: function (form) {
                    alert('Contato enviado com sucesso!' +
                        '\n' + '\n' +
                        'Nome: ' + $("input[name='name']").val() +
                        '\n' +
                        'E-mail: ' + $("input[name='email']").val() +
                        '\n' +
                        'Telefone: ' + $("input[name='phone']").val() +
                        '\n' +
                        'Mensagem: ' + $("input[name='message']").val());
                }
            });
        }
    };
}());

(function () {
    FrontEndChallenge.start();
}());