
        // Función para extraer los enlaces y las imágenes de las películas
        function extractMovieData(html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
            var results = doc.querySelectorAll('.MovieList.Rows.AX.A06.B04.C03.E20 li.TPostMv');
            var moviesData = [];

            results.forEach(function(result) {
                var link = 'https://cuevana3.ch' + result.querySelector('a').getAttribute('href');
                var image = result.querySelector('img').getAttribute('data-src');
                moviesData.push({ link: link, image: image });
            });

            return moviesData;
        }

        // Función para hacer la solicitud HTTP
        function fetchData(url, callback) {
            fetch(url)
                .then(response => response.text())
                .then(data => callback(data))
                .catch(error => console.log('Hubo un problema con la solicitud: ' + error));
        }

        // Función principal
        function main() {
            var form = document.getElementById('searchForm');
            form.addEventListener('submit', function(event) {
                event.preventDefault(); // Evitar que el formulario se envíe

                var keyword = document.getElementById('keyword').value;
                var url = "https://cuevana3.ch/search.html?keyword=" + keyword;

                fetchData(url, function(response) {
                    var moviesData = extractMovieData(response);
                    var ul = document.getElementById('searchResults');
                    ul.innerHTML = ''; // Limpiar resultados anteriores

                    moviesData.forEach(function(movie) {
                        var li = document.createElement('li');
                        var a = document.createElement('a');
                        a.href = movie.link;

                        var img = document.createElement('img');
                        img.src = movie.image;
                        img.alt = 'Imagen de película';

                        a.appendChild(img);
                        li.appendChild(a);
                        ul.appendChild(li);
                    });
                });
            });
        }

        // Llamar a la función principal al cargar la página
        main();
