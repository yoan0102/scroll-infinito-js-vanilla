const getMovies = async () => {
  try {
    const { data, status } = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          // api_key: "52320960b80170f78a4cc414563a03e6",
          language: "es-MX",
        },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjMyMDk2MGI4MDE3MGY3OGE0Y2M0MTQ1NjNhMDNlNiIsInN1YiI6IjYwZTczMGMzYjc2Y2JiMDAyZDQ3MDhkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KHerDg9aN0wLEWfcJt4DA3i2z-jqt4eBL5WxPnAsgnY",
        },
      }
    )

    if (status === 200) {
      console.log(data.results)
    }
  } catch (error) {
    console.log(error)
  }
}

getMovies()
