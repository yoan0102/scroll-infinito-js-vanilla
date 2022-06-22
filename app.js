let page = 1
let peliculas = ''
let shiftPelicula
// const btnAnterior = document.getElementById('btnAnterior')
// const btnSiguiente = document.getElementById('btnSiguiente')

// btnSiguiente.addEventListener('click', () => {
// 	if (page < 1000) {
// 		page += 1
// 		cargarPeliculas()
// 	}
// 	return
// })

// btnAnterior.addEventListener('click', () => {
//   if (page > 1) {
//     page -= 1
//     cargarPeliculas()
//   }
//   return
// })

let observer = new IntersectionObserver(
  (entradas, observador) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        page++
        cargarPeliculas()
      }
    })
  },
  {
    rootMargin: '0px 0px 200px 0px',
    threshold: 1.0,
  }
)

const cargarPeliculas = async () => {
  try {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=52320960b80170f78a4cc414563a03e6&languaje=es-mx&page=${page}`
    )

    if (resp.status === 200) {
      const data = await resp.json()

      data.results.forEach((movie) => {
        peliculas += `
				<div class="pelicula">
					<img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" />
					<h3 class="titulo">${movie.title}</h3>
				</div>
				`
      })

      document.getElementById('contenedor').innerHTML = peliculas

      if (page < 1000) {
        if (shiftPelicula) {
          observer.unobserve(shiftPelicula)
        }

        let peliculasPantalla = document.querySelectorAll(
          '.contenedor .pelicula'
        )

        shiftPelicula = peliculasPantalla[peliculasPantalla.length - 1]
        observer.observe(shiftPelicula)
      }
    } else if (resp.status === 401) {
      console.log(`apiKey invalido`)
    } else if (resp.status === 404) {
      console.log(`La pelicula no existe`)
    } else {
      console.log(`Error no identificado`)
    }
  } catch (error) {
    console.log(error)
  }
}

cargarPeliculas()

// header
// Cuando hago click  .button, .nav Toogle 'active'

const button = document.querySelector('.button')
const nav = document.querySelector('.nav')

button.addEventListener('click', () => {
  nav.classList.toggle('active')
})
