## Chat

Макет в Figma: https://www.figma.com/file/uWw53RC3kPddjEAzlNQSj8/Chat

Ссылка на Netlify: https://deploy-preview-5--chipper-cascaron-93e47f.netlify.app/

Ссылка на render.com: https://messenger-xpza.onrender.com/

### Инструменты:
* Parcel
* Pug
* Stylus
* Express

### Инструменты для тестирования:
* Mocha
* Chai
* Sinon

### Инструменты для webpack:
* ts-loader
* pug-loader
* css-loader
* stylus-loader

### Запуск Docker:
build:
```
docker build -t chat .
```

run:
```
docker run -p 4000:3000 -d chat
```

### Запуск проекта:
```
npm run start
```
### Сборка проекта:
```
npm run build
```
