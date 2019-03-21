const path = require('path');

module.exports = {

  save: (title) => {
    let errors = [];

    if (title.title == null || title.title.length < 3) {
      errors.push('O título do título deve conter no mínimo 3 caracteres');
    }

    if (isNaN(title.age) || title.age <= 0) {
      errors.push('A idade da censura deve ser maior que 0');
    }

    if (isNaN(title.durationMinutes) || title.age <= 0) {
      errors.push('A duração do título deve ser maior que 0');
    }

    if (title.tags == null || title.tags.length == 0) {
      errors.push('Informe pelo menos uma tag');
    }

    if (title.synopsis == null || title.synopsis.length < 10) {
      errors.push('A sinopse deve conter no mínimo 10 caracteres');
    }

    if (title.fileVideo && title.fileVideo.size && path.extname(title.fileVideo.name) != ".mp4") {
      errors.push("O vídeo deve estar no formato MP4")
    }

    let extensionsImages = [".jpg", ".png", ".jpeg"]

    if (title.fileImageCover && title.fileImageCover.size && extensionsImages.indexOf(path.extname(title.fileImageCover.name)) < 0) {
      errors.push("A extensão da imagem de capa deve ser " + extensionsImages);
    }

    console.log(title);

    return { isValid: errors.length == 0, errors };
  },

}
