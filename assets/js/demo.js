$().ready(function() {
    $sidebar = $('.sidebar');
    $sidebar_img_container = $sidebar.find('.sidebar-background');

    $full_page = $('.full-page');

    $sidebar_responsive = $('body > .navbar-collapse');

    window_width = $(window).width();

    // Init Datetimepicker

    if ($("#datetimepicker").length != 0) {
        $('.datetimepicker').datetimepicker({
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }
        });

        $('.datepicker').datetimepicker({
            format: 'MM/DD/YYYY',
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }
        });

        $('.timepicker').datetimepicker({
            //          format: 'H:mm',    // use this format if you want the 24hours timepicker
            format: 'h:mm A', //use this format if you want the 12hours timpiecker with AM/PM toggle
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }
        });

    };
    fixed_plugin_open = $('.sidebar .sidebar-wrapper .nav li.active a p').html();

    if (window_width > 767 && fixed_plugin_open == 'Dashboard') {
        if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
            $('.fixed-plugin .dropdown').addClass('show');
        }

    }

    $('.fixed-plugin a').click(function(event) {
        // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
        if ($(this).hasClass('switch-trigger')) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else if (window.event) {
                window.event.cancelBubble = true;
            }
        }
    });

    $('.fixed-plugin .background-color span').click(function() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        var new_color = $(this).data('color');

        if ($sidebar.length != 0) {
            $sidebar.attr('data-color', new_color);
        }

        if ($full_page.length != 0) {
            $full_page.attr('filter-color', new_color);
        }

        if ($sidebar_responsive.length != 0) {
            $sidebar_responsive.attr('data-color', new_color);
        }
    });

    $('.fixed-plugin .img-holder').click(function() {
        $full_page_background = $('.full-page-background');

        $(this).parent('li').siblings().removeClass('active');
        $(this).parent('li').addClass('active');


        var new_image = $(this).find("img").attr('src');

        if ($sidebar_img_container.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
            $sidebar_img_container.fadeOut('fast', function() {
                $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
                $sidebar_img_container.fadeIn('fast');
            });
        }

        if ($full_page_background.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
            var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

            $full_page_background.fadeOut('fast', function() {
                $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
                $full_page_background.fadeIn('fast');
            });
        }

        if ($('.switch-sidebar-image input:checked').length == 0) {
            var new_image = $('.fixed-plugin li.active .img-holder').find("img").attr('src');
            var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

            $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
            $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
        }

        if ($sidebar_responsive.length != 0) {
            $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
        }
    });

    $('.switch-image input').on("switchChange.bootstrapSwitch", function() {

        $full_page_background = $('.full-page-background');

        $input = $(this);

        if ($input.is(':checked')) {
            if ($sidebar_img_container.length != 0) {
                $sidebar_img_container.fadeIn('fast');
                $sidebar.attr('data-image', '#');
            }

            if ($full_page_background.length != 0) {
                $full_page_background.fadeIn('fast');
                $full_page.attr('data-image', '#');
            }

            background_image = true;
        } else {
            if ($sidebar_img_container.length != 0) {
                $sidebar.removeAttr('data-image');
                $sidebar_img_container.fadeOut('fast');
            }

            if ($full_page_background.length != 0) {
                $full_page.removeAttr('data-image', '#');
                $full_page_background.fadeOut('fast');
            }

            background_image = false;
        }
    });

    $('.switch-mini input').on("switchChange.bootstrapSwitch", function() {
        $body = $('body');

        $input = $(this);

        if (lbd.misc.sidebar_mini_active == true) {
            $('body').removeClass('sidebar-mini');
            lbd.misc.sidebar_mini_active = false;

            if (isWindows) {
                $('.sidebar .sidebar-wrapper').perfectScrollbar();
            }

        } else {

            $('.sidebar .collapse').collapse('hide').on('hidden.bs.collapse', function() {
                $(this).css('height', 'auto');
            });

            if (isWindows) {
                $('.sidebar .sidebar-wrapper').perfectScrollbar('destroy');
            }

            setTimeout(function() {
                $('body').addClass('sidebar-mini');

                $('.sidebar .collapse').css('height', 'auto');
                lbd.misc.sidebar_mini_active = true;
            }, 300);
        }

        // we simulate the window Resize so the charts will get updated in realtime.
        var simulateWindowResize = setInterval(function() {
            window.dispatchEvent(new Event('resize'));
        }, 180);

        // we stop the simulation of Window Resize after the animations are completed
        setTimeout(function() {
            clearInterval(simulateWindowResize);
        }, 1000);

    });

    $('.switch-nav input').on("switchChange.bootstrapSwitch", function() {
        $nav = $('nav.navbar').first();

        $nav.toggleClass("navbar-fixed");

        // if($nav.hasClass('navbar-fixed')){
        //     $nav.removeClass('navbar-fixed').prependTo('.main-panel');
        // } else {
        //     $nav.prependTo('.wrapper').addClass('navbar-fixed');
        // }

    });


});

type = ['primary', 'info', 'success', 'warning', 'danger'];

demo = {
    initPickColor: function() {
        $('.pick-class-label').click(function() {
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if (display_div.length) {
                var display_buttons = display_div.find('.btn');
                display_buttons.removeClass(old_class);
                display_buttons.addClass(new_class);
                display_div.attr('data-class', new_class);
            }
        });
    },

    checkFullPageBackgroundImage: function() {
        $page = $('.full-page');
        image_src = $page.data('image');

        if (image_src !== undefined) {
            image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    },

    initLBDWizard: function() {
        // Code for the Validator
        var $validator = $('#wizardForm').validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                    minlength: 5
                },
                first_name: {
                    required: false,
                    minlength: 5
                },
                last_name: {
                    required: false,
                    minlength: 5
                },
                website: {
                    required: true,
                    minlength: 5,
                    url: true
                },
                framework: {
                    required: false,
                    minlength: 4
                },
                cities: {
                    required: true
                },
                price: {
                    number: true
                }
            },
            highlight: function(element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            success: function(element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
            },

            // errorPlacement: function(error, element) {
            //     $(element).parent('div').addClass('has-danger');
            //  }
        });


        //Function to show image before upload

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

        $(window).resize(function() {
            $('.card-wizard').each(function() {
                $wizard = $(this);

                index = $wizard.bootstrapWizard('currentIndex');
                refreshAnimation($wizard, index);

                $('.moving-tab').css({
                    'transition': 'transform 0s'
                });
            });
        });

        function refreshAnimation($wizard, index) {
            $total = $wizard.find('.nav li').length;
            $li_width = 100 / $total;

            total_steps = $wizard.find('.nav li').length;
            move_distance = $wizard.width() / total_steps;
            index_temp = index;
            vertical_level = 0;

            mobile_device = $(document).width() < 600 && $total > 3;

            if (mobile_device) {
                move_distance = $wizard.width() / 2;
                index_temp = index % 2;
                $li_width = 50;
            }

            $wizard.find('.nav li').css('width', $li_width + '%');

            step_width = move_distance;
            move_distance = move_distance * index_temp;

            $current = index + 1;

            if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
                move_distance -= 8;
            } else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
                move_distance += 8;
            }

            if (mobile_device) {
                vertical_level = parseInt(index / 2);
                vertical_level = vertical_level * 38;
            }

            $wizard.find('.moving-tab').css('width', step_width);
            $('.moving-tab').css({
                'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
                'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

            });
        }
    },

    initSliders: function() {
        // Sliders for demo purpose in refine cards section
        var slider = document.getElementById('sliderRegular');

        noUiSlider.create(slider, {
            start: 40,
            connect: [true, false],
            range: {
                min: 0,
                max: 100
            }
        });

        var slider2 = document.getElementById('sliderDouble');

        noUiSlider.create(slider2, {
            start: [20, 60],
            connect: true,
            range: {
                min: 0,
                max: 100
            }
        });
    },


    initFullCalendar: function() {
        $calendar = $('#fullCalendar');

        today = new Date();
        y = today.getFullYear();
        m = today.getMonth();
        d = today.getDate();

        $calendar.fullCalendar({
            header: {
                left: 'title',
                center: '',
                right: 'prev,next,today'
            },
            defaultDate: today,
            defaultView: 'agendaDay',
            selectable: true,
            selectHelper: true,
            titleFormat: {
                day: 'D MMM, YYYY', // Tuesday, Sep 8, 2015
                month: 'MMMM YYYY', // September 2015
                week: "MMMM D YYYY" // September 2015
            },
            views: {
                // week:{ titleFormat: "DD MMMM YYYY" },
                month: {
                    titleFormat: 'MMMM YYYY'
                }, // September 2015
                week: {
                    titleFormat: "MMMM D YYYY"
                }, // September 2015
                day: {
                    titleFormat: 'D MMM, YYYY'
                } // Tuesday, Sep 8, 2015
            },
            select: function(start, end) {

                // on select we show the Sweet Alert modal with an input
                swal({
                    title: 'Create an Event',
                    html: '<br><input class="form-control" placeholder="Event Title" id="input-field">',
                    confirmButtonClass: "btn btn-primary btn-fill confirm-remove",
                    cancelButtonClass: "btn btn-primary btn-outline",
                    showCancelButton: true,
                    closeOnConfirm: true
                }, function() {

                    var eventData;
                    event_title = $('#input-field').val();

                    if (event_title) {
                        eventData = {
                            title: event_title,
                            start: start,
                            end: end
                        };
                        $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true
                    }

                    $calendar.fullCalendar('unselect');

                });
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events


            // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
            events: [{
                    title: 'All Day Event',
                    start: new Date(y, m, 1)
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d - 4, 6, 0),
                    allDay: false,
                    className: 'event-blue'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 3, 6, 0),
                    allDay: false,
                    className: 'event-blue'
                },
                {
                    title: 'Meeting',
                    start: new Date(y, m, d - 1, 10, 30),
                    allDay: false,
                    className: 'event-green'
                },
                {
                    title: 'Lunch',
                    start: new Date(y, m, d + 7, 12, 0),
                    end: new Date(y, m, d + 7, 14, 0),
                    allDay: false,
                    className: 'event-red'
                },
                {
                    title: 'LBD Launch',
                    start: new Date(y, m, d - 2, 12, 0),
                    allDay: true,
                    className: 'event-azure'
                },
                {
                    title: 'Birthday Party',
                    start: new Date(y, m, d + 1, 19, 0),
                    end: new Date(y, m, d + 1, 22, 30),
                    allDay: false,
                },
                {
                    title: 'Click for Creative Tim',
                    start: new Date(y, m, 21),
                    end: new Date(y, m, 22),
                    url: 'http://www.creative-tim.com/',
                    className: 'event-orange'
                },
                {
                    title: 'Click for Google',
                    start: new Date(y, m, 23),
                    end: new Date(y, m, 23),
                    url: 'http://www.creative-tim.com/',
                    className: 'event-orange'
                }
            ]
        });
    },

    showNotification: function(from, align) {
        color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "nc-icon nc-app",
            message: "Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer."

        }, {
            type: type[color],
            timer: 8000,
            placement: {
                from: from,
                align: align
            }
        });
    },

    // Sweet Alerts

    showSwal: function(type, e, value, row, index) {
        if (type == 'basic') {
            swal("Here's a message!");

        } else if (type == 'title-and-text') {
            swal("Here's a message!", "It's pretty, isn't it?")

        } else if (type == 'success-message') {
            swal("Good job!", "You clicked the button!", "success")

        } else if (type == 'warning-message-and-confirmation') {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover it!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn btn-primary btn-outline confirm-remove",
                confirmButtonText: "Yes, delete it!",
                cancelButtonClass: "btn btn-danger btn-outline",
                closeOnConfirm: false,
            }, function() {
                swal("Deleted!", "", "success");
                console.log("deleted!");
                $table.bootstrapTable('remove', {
                    field: 'id',
                    values: [row.id]
                });
            });

        } else if (type == 'warning-message-and-cancel') {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover it!",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel plx!",
                confirmButtonClass: "btn btn-primary btn-outline confirm-remove",
                cancelButtonClass: "btn btn-danger btn-outline",
                closeOnConfirm: false,
                closeOnCancel: true
            }, function(isConfirm) {
                if (isConfirm) {
                    swal("Deleted!", "", "success");
                } else {
                    swal("Cancelled", "", "error");
                }
            });

        } else if (type == 'custom-html') {
            swal({
                title: '',
                html: 'You can use <b>bold text</b>, ' +
                    '<a href="http://github.com">links</a> ' +
                    'and other HTML tags'
            });

        } else if (type == 'auto-close') {
            swal({
                title: "Auto close alert!",
                text: "I will close in 2 seconds.",
                timer: 2000,
                showConfirmButton: false
            });
        } else if (type == 'input-field') {
            swal({
                title: 'Information editing',
                html: '<form method="#" action="#" id="InformationEditing"><div class="row"><div class="col-md-6"><div class="form-group"><label>Email address<star class="star">*</star></label><div class="form-group"><input class="form-control valid" type="text" name="email" email="true" required="true" placeholder="Email address" aria-invalid="true"></div></div><div class="form-group"><label>Type of vehicle<star class="star">*</star></label><div class="form-group"><input class="form-control" type="text" name="requiredType" required="true"  placeholder="Type of vehicle" aria-invalid="true"></div></div><div class="form-group"><label>License plate<star class="star">*</star></label><div class="form-group"><input class="form-control" type="text" name="requiredPlate" required="true"  placeholder="License plate" aria-invalid="true"></div></div><div class="form-group"><label>Account status<star class="star">*</star></label><div class="form-group"><select name="region" class="selectpicker" data-title="Select One..." name="requiredStatus" required="true" data-style="btn-default btn-outline" data-menu-style="dropdown-blue"><option value="Sinaai-Waas">Ban</option><option value="Baileux">Activate</option></select></div> </div></div><div class="col-md-6"><div class="form-group"><label>Industry<star class="star">*</star></label><div class="form-group"><input class="form-control" type="text" name="requiredIndustry" required="true"  placeholder="Industry" aria-invalid="true"></div></div><div class="form-group"><label>Company<star class="star">*</star></label><div class="form-group"><input class="form-control" type="text" name="requiredCompany" required="true"  placeholder="Company" aria-invalid="true"></div></div><div class="form-group"><label>Region<star class="star">*</star></label><div class="form-group"><input class="form-control" type="text" name="requiredRegion" required="true"  placeholder="Region" aria-invalid="true"></div></div></div></div></form></div>',
                showCancelButton: true,
                closeOnConfirm: false,
                allowOutsideClick: false,
                confirmButtonText: "Edit"
            },
                function() {
                    info = JSON.stringify(row);

                    swal({
                        html: 'You entered: <strong>' +
                            $('#input-field').val() +
                            '</strong>'
                    });
                })
        }
    }

}