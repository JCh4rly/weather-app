export interface WeatherCategory {
  date: string,
  min: number,
  max: number,
  currentItem: any,
  weatherItems: any[],
}

const getCurrentTime = () => `${new Date().getHours()}:00:00`;

export const getWeatherCategories = (data: any) => {
  const { list } = data;
  const count = list.length;
  const refTime = getCurrentTime();

  let currentCategory: WeatherCategory = {
    date: '',
    min: 0,
    max: 0,
    currentItem: null,
    weatherItems: [],
  }

  return list.reduce((acc: any, item: any, index: number) => {
    const { dt_txt, main } = item;
    const { temp_min, temp_max } = main;
    const [currentDate, currentTime] = dt_txt.split(' ');

    const addCurrentItem = () => currentCategory = { ...currentCategory, currentItem: item };

    const addCurrentCategory = () => {
      // Asegurar existencia de currentItem.
      if (!currentCategory.currentItem) {
        addCurrentItem();
      }

      acc = [ ...acc, currentCategory ]
    };

    if (currentDate !== currentCategory.date) {
      if (currentCategory.date !== '') {
        addCurrentCategory();
      }

      currentCategory = {
        date: currentDate,
        min: temp_min,
        max: temp_max,
        currentItem: null,
        weatherItems: [item]
      };
    } else {
      // Calcular temp min y max de cada categoría.
      const { min, max } = currentCategory;
      const newMin = temp_min < min ? temp_min : min;
      const newMax = temp_max > max ? temp_max : max;

      currentCategory = { ...currentCategory, min: newMin, max: newMax };

      // Asignar currentItem si el item actual cubre el 
      // pronóstico para la hora actual.

      if (currentTime >= refTime) {
        addCurrentItem();
      }

      // Agregar el item actual a la lista
      // en la categoría actual.

      const { weatherItems } = currentCategory;
      currentCategory = { ...currentCategory, weatherItems: [...weatherItems, item] }
    }

    // Última categoría.
    if (index === count - 1) {
      addCurrentCategory();
    }

    return acc;
  }, []);
}
