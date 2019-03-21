module.exports = {

  save: async (movie) => {
    let errors = [];

    if (movie.title == null || movie.title.length < 3) {
      errors.push('O título do filme deve conter no mínimo 3 caracteres');
    }

    if (isNaN(movie.age) || movie.age <= 0) {
      errors.push('A idade da censura deve ser maior que 0');
    }

    if (isNaN(movie.durationMinutes) || movie.age <= 0) {
      errors.push('A duração do filme deve ser maior que 0');
    }

    if (movie.tags == null || movie.tags.length == 0) {
      errors.push('Informe pelo menos uma tag');
    }

    if (movie.synopsis == null || movie.synopsis.length < 10) {
      errors.push('A sinopse deve conter no mínimo 10 caracteres');
    }

    return { isValid: errors.length == 0, errors };
  }

}
