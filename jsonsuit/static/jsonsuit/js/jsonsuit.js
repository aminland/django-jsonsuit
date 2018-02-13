;(function(window, document) {
    function setup() {
        var widgets = document.querySelectorAll('*[class="jsonsuit"][data-jsonsuit]');

        for (var i = 0; i < widgets.length; i++) {
            var name = widgets[i].dataset.jsonsuit,
                textarea = document.getElementById('id_' + name),
                suit = widgets[i].querySelector('.suit'),
                code = suit.querySelector('code'),
                button = widgets[i].querySelector('button.toggle');

            validate(textarea);
            code.innerHTML = Prism.highlight(textarea.value, Prism.languages.json);
            button.textarea = textarea;
            button.code = code;
            button.suit = suit;
            button.addEventListener("click", toggle, false);
            textarea.addEventListener("blur", function(e){validate(e.target)}, false);
            validate(textarea);
        }
    }
    function validate(textarea) {
        try {
            textarea.value = JSON.stringify(Hjson.parse(textarea.value), null, 2)
            textarea.parentElement.classList.remove('errors')
            return true;
        } catch (error) {
            textarea.value = '/*' + error.toString() + '*/\n' + textarea.value.replace(/(\/\*.*?\*\/)[\s]*/igm, '');
            textarea.parentElement.classList.add('errors');
        }
        return false;
    }
    function toggle(e) {
        e.preventDefault();
        if (e.target.suit.classList.contains('hidden')) {
            if (!validate(e.target.textarea)) return;
            e.target.code.innerHTML = Prism.highlight(e.target.textarea.value, Prism.languages.json);
            e.target.innerHTML = e.target.dataset.raw;
        } else {
            e.target.innerHTML = e.target.dataset.suit;
        }
        e.target.textarea.classList.toggle('hidden');
        e.target.suit.classList.toggle('hidden');
    }


    function DOMReady(a,b,c){b=document,c='addEventListener';b[c]?b[c]('DOMContentLoaded',a):window.attachEvent('onload',a)}
    DOMReady(setup);
}(window, document));
