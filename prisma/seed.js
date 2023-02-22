const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function category() {
    const createCategory = await prisma.categories.createMany({
        data: [
            { name: "фильмы" },
            { name: "сериалы" },
            { name: "мультфильмы"}
        ],
        skipDuplicates: true
        }
    );
   
}
async function years() {
    const years = await prisma.years.createMany({
        data: [
            { 
                name: "2023 год",
                date: 2023
            },
            { 
                name: "2022 год",
                date: 2022
            },
            { 
                name: "2021 год",
                date: 2021
            },
            { 
                name: "2020 год",
                date: 2020
            },
            { 
                name: "2019 год",
                date: 2019
            },
            { 
                name: "2018 год",
                date: 2018
            },
            { 
                name: "2017 год",
                date: 2017
            },
            { 
                name: "2016 год",
                date: 2016
            },
            { 
                name: "2015 год",
                date: 2015
            },
            { 
                name: "2010-ые годы",
                date: 2010
            },
            { 
                name: "2000-ые года",
                date: 2000
            },
            { 
                name: "1990-ые года",
                date: 1990
            },
            { 
                name: "1890-ые года",
                date: 1890
            },
        ],  
        skipDuplicates: true
        }
    );
   
}
async function genres() {
    const createGenre = await prisma.genres.createMany({
        data: [
            { 
                name: "боевик" ,
                image:"bovik.png"
            },
            {
                name: "комедии",
                image:"comedy.png"
            },
            { 
                name: "романтика",
                image:"romantic.png"
            },
            { 
                name: "драма",
                image:"drama.png"
            },
            { 
                name: "мелодрама",
                image:"melodrama.png"
            },
            {
                name: "триллер",
                image:"triller.png"
            },
            {
                name: "исторический",
                image:"history.png"
            },
            {  
                name: "трагедия",
                image:"drama.png"
            },
            {
                name: "фантастика",
                image:"fantasy.png"
                },
            { 
                name: "приключения",
                image:"adventure.png"
            },
            { 
                name: "семейный",
                image:"move.png"
            },
            { 
                name: "детский",
                image:"voina.png"
            },
            {
                 name: "детектив",
                image:"detective.png"
            },
            { 
                name: "мистика",
                image:"horror.png"
            },
            {
                 name: "криминал",
                 image:"triller.png"
            },    
        ],
        skipDuplicates: true
        }
    );
}
async function cartoonGenres() {
    const createGenre = await prisma.cartoonGenres.createMany({
        data: [
            { 
                name: "боевик",
                image:"bovik.png"
            },
            { 
                name: "романтика",
                image:"romantic.png"
            },
            { 
                name: "исторический",
                image:"history.png"
            },
            { 
                name: "фантастика",
                image:"fantasy.png"
            },
            {
                 name: "приключения",
                 image:"adventure.png"
            },
            { 
                name: "семейный",
                image:"move.png"
            },
            {
                 name: "детектив",
                 image:"detective.png"
            },
            {
                 name: "мистика",
                 image:"horror.png"
            },
            {
                 name: "военный мультфильм",
                 image:"voina.png"
            },  
            {
                 name: "развлекательный",
                 image:"fantasy.png"
            },   
            {
                 name: "учебный",
                 image:"super.png"
            },   
        ],
        skipDuplicates: true
        }
    );
}
async function country() {
    const country = await prisma.country.createMany({
        data: [
            { 
                name: "Россия" ,
            },  
            { 
                name: "СССР" ,
            },
            { 
                name: "США" ,
            },
            { 
                name: "Франция" ,
            },
            { 
                name: "Южная Корея" ,
            },
            { 
                name: "Великобритания" ,
            },  
            { 
                name: "Япония" ,
            },
            { 
                name: "Италия" ,
            },
            { 
                name: "Испания" ,
            },
            { 
                name: "Германия" ,
            },
            { 
                name: "Турция" ,
            },
            { 
                name: "Швеция" ,
            },
            { 
                name: "Дания" ,
            },

        ],
        skipDuplicates: true
        }
    );
}
country()
category()
genres()
cartoonGenres()
years() 

    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1); 
    })