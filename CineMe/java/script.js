 // CineMe Productions - interactive website features

(function () {
    'use strict';

    // Tell the page that the main JavaScript file has loaded.
    window.cinemeReady = true;

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


    // 1. Highlight the current page in the navigation.
    function markCurrentPage() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';

        document.querySelectorAll('nav a').forEach(function (link) {
            var target = link.getAttribute('href').split('/').pop();

            if (target === currentPage) {
                link.setAttribute('aria-current', 'page');
            }
        });
    }


    // 2. Reveal sections as they enter the screen.
    function initReveal() {
        var sections = document.querySelectorAll('main section:not(.hero)');

        if (prefersReduced || !('IntersectionObserver' in window)) {
            sections.forEach(function (section) {
                section.classList.add('in-view');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -40px 0px'
        });

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }


    // 3. FAQ accordion using jQuery.
    function initAccordion($) {
        var $accordion = $('.accordion');

        if (!$accordion.length) {
            return;
        }

        var $panels = $accordion.find('.accordion-panel').hide();

        $accordion.on('click', '.accordion-trigger', function () {
            var $trigger = $(this);
            var $panel = $('#' + $trigger.attr('aria-controls'));
            var isOpen = $trigger.attr('aria-expanded') === 'true';

            $accordion.find('.accordion-trigger')
                .not($trigger)
                .attr('aria-expanded', 'false');

            $panels.not($panel).stop(true, true).slideUp(200);

            $trigger.attr('aria-expanded', String(!isOpen));

            if (isOpen) {
                $panel.stop(true, true).slideUp(200);
            } else {
                $panel.stop(true, true).slideDown(200);
            }
        });
    }


    // 4. Build category filters for the portfolio gallery.
    function initGalleryFilter($) {
        var $grids = $('.gallery-grid');
        var $items = $grids.find('.portfolio-item[data-category]');

        // Also support galleries that put the category on the image itself.
        if (!$items.length) {
            $items = $grids.find('img[data-category]');
        }

        if (!$grids.length || !$items.length) {
            return;
        }

        var order = [
            'crew', 'editing', 'drone', 'lighting',
            'photography', 'sound', 'stage', 'stills'
        ];

        var labels = {
            crew: 'Crew',
            editing: 'Video Editing',
            drone: 'Drone',
            lighting: 'Lighting',
            photography: 'Photography',
            sound: 'Sound',
            stage: 'Stage',
            stills: 'Stills'
        };

        var counts = {};

        $items.each(function () {
            var key = $(this).attr('data-category');

            if (key) {
                counts[key] = (counts[key] || 0) + 1;
            }
        });

        var $bar = $('<div class="filter-bar" role="group" aria-label="Filter the gallery by category"></div>');
        var $status = $('<p class="filter-status" aria-live="polite"></p>');

        function addButton(key, label, count) {
            $('<button type="button" class="filter-btn"></button>')
                .attr('data-filter', key)
                .attr('aria-pressed', key === 'all' ? 'true' : 'false')
                .text(label + ' (' + count + ')')
                .appendTo($bar);
        }

        addButton('all', 'All', $items.length);

        order.forEach(function (key) {
            if (counts[key]) {
                addButton(key, labels[key], counts[key]);
            }
        });

        Object.keys(counts).forEach(function (key) {
            if (order.indexOf(key) === -1) {
                addButton(
                    key,
                    key.charAt(0).toUpperCase() + key.slice(1),
                    counts[key]
                );
            }
        });

        function updateStatus(number) {
            $status.text('Showing ' + number + ' of ' + $items.length + ' projects');
        }

        updateStatus($items.length);
        $grids.first().before($bar, $status);

        $bar.on('click', '.filter-btn', function () {
            var $button = $(this);
            var key = $button.attr('data-filter');

            $bar.find('.filter-btn').attr('aria-pressed', 'false');
            $button.attr('aria-pressed', 'true');

            var $show = key === 'all'
                ? $items
                : $items.filter('[data-category="' + key + '"]');

            var $hide = $items.not($show);

            updateStatus($show.length);

            $hide.stop(true, true).fadeOut(120, function () {
                $show.stop(true, true).fadeIn(180);
            });
        });
    }


    // 5. Open portfolio photographs in a lightbox.
    function initLightbox() {
        var grids = document.querySelectorAll('.gallery-grid');

        if (!grids.length) {
            return;
        }

        var images = Array.prototype.slice.call(
            document.querySelectorAll('.gallery-grid img')
        );

        if (!images.length) {
            return;
        }

        images.forEach(function (img) {
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            img.setAttribute('aria-label', 'View larger: ' + (img.alt || 'photo'));
        });

        var overlay = document.createElement('div');
        overlay.className = 'lightbox';
        overlay.hidden = true;
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Image viewer');

        overlay.innerHTML =
            '<button type="button" class="lightbox-close" aria-label="Close image viewer">×</button>' +
            '<button type="button" class="lightbox-prev" aria-label="Previous image">‹</button>' +
            '<figure class="lightbox-figure">' +
                '<img class="lightbox-img" alt="">' +
                '<figcaption class="lightbox-caption"></figcaption>' +
            '</figure>' +
            '<button type="button" class="lightbox-next" aria-label="Next image">›</button>';

        document.body.appendChild(overlay);

        var bigImg = overlay.querySelector('.lightbox-img');
        var caption = overlay.querySelector('.lightbox-caption');
        var closeBtn = overlay.querySelector('.lightbox-close');
        var prevBtn = overlay.querySelector('.lightbox-prev');
        var nextBtn = overlay.querySelector('.lightbox-next');

        var visibleImages = [];
        var currentIndex = 0;
        var lastFocused = null;
        var closeTimer = null;

        function getVisibleImages() {
            return images.filter(function (img) {
                return img.offsetParent !== null;
            });
        }

        function showImage(index) {
            currentIndex = (index + visibleImages.length) % visibleImages.length;

            var img = visibleImages[currentIndex];
            bigImg.src = img.currentSrc || img.src;
            bigImg.alt = img.alt;

            caption.textContent = (img.alt || 'Photo') + ' (' +
                (currentIndex + 1) + ' of ' + visibleImages.length + ')';
        }

        function openLightbox(img) {
            visibleImages = getVisibleImages();

            var start = visibleImages.indexOf(img);
            if (start === -1) {
                return;
            }

            clearTimeout(closeTimer);
            lastFocused = document.activeElement;
            prevBtn.hidden = nextBtn.hidden = visibleImages.length < 2;

            showImage(start);

            overlay.hidden = false;
            document.body.style.overflow = 'hidden';

            requestAnimationFrame(function () {
                overlay.classList.add('is-open');
            });

            closeBtn.focus();
        }

        function closeLightbox() {
            overlay.classList.remove('is-open');
            document.body.style.overflow = '';

            closeTimer = setTimeout(function () {
                overlay.hidden = true;
            }, 200);

            if (lastFocused) {
                lastFocused.focus();
            }
        }

        grids.forEach(function (grid) {
            grid.addEventListener('click', function (event) {
                var img = event.target.closest('img');

                if (img && grid.contains(img)) {
                    openLightbox(img);
                }
            });

            grid.addEventListener('keydown', function (event) {
                if (
                    (event.key === 'Enter' || event.key === ' ') &&
                    event.target.tagName === 'IMG'
                ) {
                    event.preventDefault();
                    openLightbox(event.target);
                }
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', function () {
            showImage(currentIndex - 1);
        });
        nextBtn.addEventListener('click', function () {
            showImage(currentIndex + 1);
        });

        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (overlay.hidden) {
                return;
            }

            if (event.key === 'Escape') {
                closeLightbox();
            } else if (event.key === 'ArrowLeft' && visibleImages.length > 1) {
                showImage(currentIndex - 1);
            } else if (event.key === 'ArrowRight' && visibleImages.length > 1) {
                showImage(currentIndex + 1);
            }
        });
    }


    // 6. Create the interactive Johannesburg map on the Contact page.
    function initMap() {
        var mapElement = document.getElementById('map');

        if (!mapElement) {
            return;
        }

        if (typeof window.L === 'undefined') {
            mapElement.innerHTML =
                '<p class="map-error">The map could not load. Please check your internet connection and refresh the page.</p>';
            return;
        }

        // This is the centre of Johannesburg, not an exact studio address.
        var position = [-26.2041, 28.0473];

        var map = window.L.map(mapElement, {
            scrollWheelZoom: false
        }).setView(position, 12);

        window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        window.L.marker(position)
            .addTo(map)
            .bindPopup('<strong>CineMe Productions</strong><br>Johannesburg, South Africa')
            .openPopup();

        map.on('click', function () {
            map.scrollWheelZoom.enable();
        });

        map.on('mouseout', function () {
            map.scrollWheelZoom.disable();
        });

        // Recalculate the map size after the page has settled.
        window.setTimeout(function () {
            map.invalidateSize();
        }, 300);
    }


    // Start the website features.
    markCurrentPage();
    initReveal();
    initLightbox();
    initMap();

    // Start jQuery features after jQuery has loaded.
    if (window.jQuery) {
        var $ = window.jQuery;

        if (prefersReduced) {
            $.fx.off = true;
        }

        $(function () {
            initAccordion($);
            initGalleryFilter($);
        });
    }

})();