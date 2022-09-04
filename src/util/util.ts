export const getWeatherCategories = (data: any) => {
  const { list } = data;
  const count = list.length;
  let refTime = '';

  let currentCategory = {
    date: '',
    min: 0,
    max: 0,
    description: '',
    icon: '',
  }

  return list.reduce((acc: any, { dt, dt_txt, main, weather }: any, index: number) => {
    const { temp_min, temp_max } = main;
    const { description, icon } = weather[0];
    const [currentDate, currentTime] = dt_txt.split(' ');

    // refTime es la hora del primer corte disponible
    // en la lista de resultados.
    if (refTime === '') {
      refTime = currentTime;
    }
    
    if (currentDate !== currentCategory.date) {
      if (currentCategory.date !== '') {
        acc = [ ...acc, currentCategory ];
      }

      currentCategory = {
        date: currentDate,
        min: temp_min,
        max: temp_max,
        description,
        icon,
      };
    } else {
      // Calcular temp min y max de cada categoría.
      const { min, max } = currentCategory;
      const newMin = temp_min < min ? temp_min : min;
      const newMax = temp_max > max ? temp_max : max;

      currentCategory = { ...currentCategory, min: newMin, max: newMax };

      // Asignar icon y description correspondientes
      // al refTime en cada categoría.

      if (currentTime <= refTime) {
        currentCategory = { ...currentCategory, description, icon };
      }
    }

    // Última categoría.
    if (index === count - 1) {
      acc = [ ...acc, currentCategory ];
    }

    return acc;
  }, []);
}