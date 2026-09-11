import styles from './loadingRender.module.css';

export const Spinner = () => {
  // На картинке ровно 20 палочек. Создаем массив из 20 элементов.
  const bars = Array.from({ length: 20 });

  return (
    <div className={styles.loaderWrapper}>
      <svg className={styles.spinner} viewBox="0 0 100 100">
        <g transform="translate(50, 50)">
          {bars.map((_, index) => {
            // Рассчитываем угол поворота для каждой из 20 палочек: 360 / 20 = 18 градусов
            const rotateAngle = index * 18;

            // Задаем индивидуальную задержку анимации для каждого луча,
            // чтобы блик бежал последовательно друг за другом
            const animationDelay = `${(index * 1) / 20 - 1}s`;

            return (
              <line
                key={index}
                className={styles.bar}
                x1="0"
                y1="-35" // Начало палочки (отступ от центра круга)
                x2="0"
                y2="-45" // Конец палочки (длина палочки = 10 единиц)
                style={{
                  transform: `rotate(${rotateAngle}deg)`,
                  animationDelay: animationDelay,
                }}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};
